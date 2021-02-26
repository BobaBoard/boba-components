import React, { Children } from "react";

import Theme from "../theme/default";
import CollapsedPlaceholder from "./CollapsedPlaceholder";
import CircleMask from "../images/circle-mask.svg";
import RectangleMask from "../images/rectangle-mask.svg";
import classnames from "classnames";
import { lightenColor } from "../utils";

const INDENT_WIDTH_PX = 50;
const STEM_WIDTH_PX = 3;
const LEVEL_STEM_HEIGHT_PX = 5;

interface ThreadContext extends ThreadProps {
  addResizeCallback: (callback: () => void) => void;
  removeResizeCallback: (callback: () => void) => void;
  registerItemBoundary: (element: {
    index: number;
    level: number;
    boundaryElement: HTMLElement;
  }) => void;
  unregisterItemBoundary: (element: { index: number; level: number }) => void;
  addItemBoundaryCallback: (level: number, callback: () => void) => void;
  removeItemBoundaryCallback: (level: number, callback: () => void) => void;
  getLevelBoundaries: (level: number) => HTMLElement[];
}

const ThreadContext = React.createContext<ThreadContext | null>(null);
const ThreadLevel = React.createContext<number>(0);

interface ThreadProps {
  onCollapseLevel: (id: string) => void;
  onUncollapseLevel: (id: string) => void;
  getCollapseReason: (id: string) => React.ReactNode;
}

interface CollapseGroupProps extends IndentProps {
  endsLevel?: boolean;
}

const isIndentElement = (
  node: React.ReactNode
): node is React.Component<IndentProps> => {
  return React.isValidElement(node) && node.type == Indent;
};

const isThreadItem = (
  node: React.ReactNode
): node is React.Component<IndentProps> => {
  return React.isValidElement(node) && node.type == Item;
};

const isCollapseGroup = (
  node: React.ReactNode
): node is React.Component<CollapseGroupProps> => {
  return React.isValidElement(node) && node.type == CollapseGroup;
};

const processItemChildren = (children: React.ReactNode | undefined) => {
  const indent = Children.toArray(children).find(isIndentElement);
  const levelItems = Children.toArray(children).filter(
    (child) => !isIndentElement(child)
  );
  return { levelItems, indent };
};

interface ChildrenWithRenderProps {
  children?:
    | JSX.Element
    | ((refCallback: (element: HTMLElement | null) => void) => React.ReactNode);
}

/**
 * This is how the thread structure is supposed to look like:
 *
 * <Thread>
 *   <Post>
 *   <Thread.Indent>
 *     <Thread.Item><Post></Thread.Item>
 *     <Thread.Item><Post></Thread.Item>
 *     <Thread.Item><Post></Thread.Item>
 *     <Thread.Item>
 *        <Post>
 *        <Thread.Indent>
 *          <Thread.Item><Post></Thread.Item>
 *          <Thread.Item><Post></Thread.Item>
 *        </Thread.Indent>
 *      </Thread.Item>
 *   </Thread.Indent>
 * </Thread>
 *
 * IMPORTANT NOTE: Thread.Indent should always be a direct discendant of Thread.Item.
 * If a component is wrapped around levels of these tree, make sure that it wraps a
 * Thread.Item and not simply the indentation.
 */
const Thread: React.FC<ThreadProps & ChildrenWithRenderProps> & {
  Indent: typeof Indent;
  Item: typeof Item;
} = (props) => {
  const threadRef = React.createRef<HTMLDivElement>();

  // When the overall thread container is resized, cycle through all the handlers to
  // "warn" the stems that readjustment might be needed (+ whatever other callback might
  // have been assigned).
  const resizeCallbacks = React.useRef<(() => void)[]>([]);
  React.useEffect(() => {
    if (!threadRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      resizeCallbacks.current.forEach((callback) => callback());
    });
    resizeObserver.observe(threadRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [threadRef]);
  const addResizeCallback = React.useCallback((callback: () => void) => {
    resizeCallbacks.current.push(callback);
  }, []);
  const removeResizeCallback = React.useCallback((callback: () => void) => {
    resizeCallbacks.current = resizeCallbacks.current.filter(
      (entry) => callback != entry
    );
  }, []);
  const levelsBoundariesMap = React.useRef(
    new Map<number, Map<number, HTMLElement>>()
  );
  const itemBoundariesCallbacks = React.useRef(
    new Map<number, (() => void)[]>()
  );
  const registerItemBoundary = React.useCallback(
    (element: {
      index: number;
      level: number;
      boundaryElement: HTMLElement;
    }) => {
      let levelMap = levelsBoundariesMap.current.get(element.level);
      if (!levelMap) {
        levelMap = new Map();
        levelsBoundariesMap.current.set(element.level, levelMap);
      }
      levelMap.set(element.index, element.boundaryElement);
    },
    []
  );
  const unregisterItemBoundary = React.useCallback(
    (element: { index: number; level: number }) => {
      const levelMap = levelsBoundariesMap.current.get(element.level);
      levelMap?.delete(element.level);
    },
    []
  );
  const addItemBoundaryCallback = React.useCallback(
    (level: number, callback: () => void) => {
      let levelCallbacks = itemBoundariesCallbacks.current.get(level);
      if (!levelCallbacks) {
        levelCallbacks = [];
        itemBoundariesCallbacks.current.set(level, levelCallbacks);
      }
      levelCallbacks.push(callback);
    },
    []
  );
  const removeItemBoundaryCallback = React.useCallback(
    (level: number, callback: () => void) => {
      const levelCallbacks = itemBoundariesCallbacks.current.get(level) || [];
      itemBoundariesCallbacks.current.set(
        level,
        levelCallbacks.filter((savedCallback) => savedCallback !== callback)
      );
    },
    []
  );
  const getLevelBoundaries = React.useCallback((level: number) => {
    const levelMap = levelsBoundariesMap.current.get(level);
    if (!levelMap) {
      return [];
    }
    const returnArray: HTMLElement[] = [];
    levelMap.forEach((value, key) => {
      returnArray[key] = value;
    });
    // Remove the holes in the array, if any.
    return returnArray.filter((el) => el != undefined);
  }, []);

  // We wrap children in a Thread.Item, so we can simply use the regular Thread.Item
  // recursion even for the first level. We do this unless the child is already a
  // Thread.Item, mostly so if the first level can be done through recursion there's
  // no need for the users of this class to special case it.
  const children = isThreadItem(props.children) ? (
    props.children
  ) : (
    <Thread.Item>{props.children}</Thread.Item>
  );
  return (
    <ThreadContext.Provider
      value={React.useMemo(
        () => ({
          ...props,
          addResizeCallback,
          removeResizeCallback,
          registerItemBoundary,
          unregisterItemBoundary,
          addItemBoundaryCallback,
          removeItemBoundaryCallback,
          getLevelBoundaries,
        }),
        [
          props,
          addResizeCallback,
          removeResizeCallback,
          registerItemBoundary,
          unregisterItemBoundary,
          addItemBoundaryCallback,
          removeItemBoundaryCallback,
          getLevelBoundaries,
        ]
      )}
    >
      <div className="thread" ref={threadRef}>
        {children}
        <style jsx>{`
          .thread {
            width: 100%;
            max-width: 550px;
          }
        `}</style>
      </div>
    </ThreadContext.Provider>
  );
};

export const CollapseGroup: React.FC<CollapseGroupProps> = (props) => {
  const threadContext = React.useContext(ThreadContext);
  const level = React.useContext(ThreadLevel);
  const stemColor =
    Theme.INDENT_COLORS[level - (1 % Theme.INDENT_COLORS.length)];
  return props.collapsed ? (
    <div
      className={classnames("collapsed", { "ends-level": !!props.endsLevel })}
    >
      <div className="placeholder">
        <CollapsedPlaceholder
          onUncollapseClick={() =>
            threadContext?.onUncollapseLevel?.(props.id as string)
          }
          accentColor={stemColor}
        >
          {threadContext?.getCollapseReason?.(props.id as string)}
        </CollapsedPlaceholder>
      </div>
      <div className="background" />
      <style jsx>{`
        .collapsed {
          pointer-events: all;
          margin-bottom: 20px;
          position: relative;
        }
        .placeholder {
          z-index: 2;
          position: relative;
        }
        .collapsed .background {
          mask: url(${RectangleMask}), url(${CircleMask}) 0px -6px/8px 10px;
          mask-composite: source-out;
          mask-repeat: repeat-y;
          background-color: #2e2e30;
          position: absolute;
          top: -15px;
          bottom: -17px;
          left: 0;
          width: ${INDENT_WIDTH_PX}px;
          z-index: 1;
          pointer-events: none;
        }
        .collapsed.ends-level .background {
          bottom: 10px;
        }
      `}</style>
    </div>
  ) : (
    <>{props.children}</>
  );
};

const Item: React.FC<ChildrenWithRenderProps> = (props) => {
  const threadContext = React.useContext(ThreadContext);
  const level = React.useContext(ThreadLevel);
  const [
    boundaryElement,
    setBoundaryElement,
  ] = React.useState<HTMLElement | null>(null);
  const levelContent = React.createRef<HTMLLIElement & HTMLDivElement>();
  const levelStem = React.createRef<HTMLDivElement>();

  //
  let children: React.ReactNode = props.children;
  if (typeof props.children == "function") {
    children = props.children(setBoundaryElement);
    // Since thread indent must always be a direct child of Item, but the component
    // rendered by using a render props function will likely need to wrap more than one
    // element as a return value, we check if the returned children are a fragment,
    // and just iterate on the returned children in that case.
    if (React.isValidElement(children) && children.type === React.Fragment) {
      children = children.props.children;
    }
  }

  React.useEffect(() => {
    if (!boundaryElement || !levelContent.current || !threadContext) {
      return;
    }

    const contentRef = levelContent.current;
    const index = contentRef.previousElementSibling
      ? parseInt(contentRef.previousElementSibling.dataset.listIndex) + 1
      : 1;
    const setTopMarginCallback = () => {
      const {
        top: stemTop,
        bottom: stemBottom,
      } = contentRef.getBoundingClientRect();
      const { bottom, top, width } = boundaryElement.getBoundingClientRect();
      contentRef.style.setProperty(
        "--stem-margin-top",
        `${bottom - stemTop}px`
      );
      contentRef.style.setProperty(
        "--stem-margin-left",
        `${width / 2 + STEM_WIDTH_PX}px`
      );
      contentRef.dataset.listIndex = "" + index;
      threadContext.registerItemBoundary({
        level,
        index,
        boundaryElement,
      });
      const nextLevelBoundaries = threadContext.getLevelBoundaries(level + 1);
      if (!nextLevelBoundaries.length) {
        return;
      }
      const { top: lastTop } = nextLevelBoundaries[
        nextLevelBoundaries?.length - 1
      ].getBoundingClientRect();

      contentRef.style.setProperty(
        "--stem-margin-bottom",
        `${stemBottom - lastTop + LEVEL_STEM_HEIGHT_PX}px`
      );

      if (level == 0) {
        return;
      }
      const previousLevelBoundaries = threadContext.getLevelBoundaries(
        level - 1
      );
      if (!previousLevelBoundaries.length) {
        return;
      }
      const {
        left: levelLeft,
        top: levelTop,
      } = contentRef.getBoundingClientRect();
      const {
        left: previousLevelLeft,
        right: previousLevelRight,
      } = previousLevelBoundaries[0].getBoundingClientRect();
      const { top: boundaryTop } = boundaryElement.getBoundingClientRect();
      const stemStart =
        previousLevelLeft - levelLeft + width / 2 - STEM_WIDTH_PX - 1;
      contentRef.style.setProperty("--level-stem-left", `${stemStart}px`);
      contentRef.style.setProperty(
        "--level-stem-top",
        `${boundaryTop - levelTop - LEVEL_STEM_HEIGHT_PX}px`
      );
      contentRef.style.setProperty(
        "--level-stem-height",
        `${LEVEL_STEM_HEIGHT_PX}px`
      );
      contentRef.style.setProperty(
        "--level-stem-width",
        `${-stemStart + width / 2 + 2 * STEM_WIDTH_PX}px`
      );
    };
    threadContext?.addResizeCallback(setTopMarginCallback);
    setTopMarginCallback();
    return () => {
      threadContext?.removeResizeCallback(setTopMarginCallback);
      threadContext?.unregisterItemBoundary({ level, index });
    };
  }, [boundaryElement, threadContext, levelContent, level]);

  const { levelItems, indent } = processItemChildren(children);
  0;
  if (Children.toArray(children).some(isThreadItem)) {
    throw new Error("Items shouldn't be children of items");
  }
  const content = (
    <>
      <div className={`thread-element`}>{levelItems}</div>
      {React.isValidElement(indent) &&
        React.cloneElement(indent, {
          ...indent.props,
          // Add this so an indent that is not a direct child of an item will
          // raise an exception
          _childOfItem: true,
        })}
      <style jsx>{`
        .thread-element {
          position: relative;
          z-index: 2;
          pointer-events: none;
        }
        .thread-element
          > :global(*:not(.level-item .level-container .thread-element)) {
          pointer-events: all;
        }
      `}</style>
    </>
  );
  // We only wrap the result in a <li> when it's above level 0, and is thus child
  // of a Thread.Indent

  const stemColor =
    Theme.INDENT_COLORS[(level - 1) % Theme.INDENT_COLORS.length];
  return (
    <>
      {level === 0 ? (
        <div data-level={0} ref={levelContent}>
          {content}
        </div>
      ) : (
        <li data-level={level} className={`level-item`} ref={levelContent}>
          <div className="level-stem" ref={levelStem} />
          {content}
        </li>
      )}
      <style jsx>{`
        li.level-item {
          position: relative;
          pointer-events: none;
          --stem-margin-top: 0;
        }
        .thread-element {
          position: relative;
          z-index: 2;
          pointer-events: none;
        }
        .thread-element
          > :global(*:not(.level-item .level-container .thread-element)) {
          pointer-events: all;
        }
        .level-stem {
          position: absolute;
          top: var(--level-stem-top, 0);
          left: var(--level-stem-left, 0);
          width: var(--level-stem-width, 0);
          height: var(--level-stem-height, 0);
          border-top: ${STEM_WIDTH_PX}px solid ${stemColor};
          border-right: ${STEM_WIDTH_PX}px solid ${stemColor};
          box-sizing: border-box;
        }
        div[data-level="0"] {
          position: relative;
          --stem-margin-top: 0;
        }
      `}</style>
    </>
  );
};

interface StemProps {
  clickHandler: () => void;
}
export const Stem: React.FC<StemProps> = (props) => {
  const level = React.useContext(ThreadLevel);
  const stemHoverEnterHandler = React.useCallback((e) => {
    const target = e.target as HTMLElement;
    target.classList.add("hover");
  }, []);
  const stemHoverLeaveHandler = React.useCallback((e) => {
    const target = e.target as HTMLElement;
    target.classList.remove("hover");
  }, []);

  const stemColor = Theme.INDENT_COLORS[level % Theme.INDENT_COLORS.length];
  const stemHoverColor = lightenColor(stemColor, 0.07);
  return (
    <>
      <button
        className={`thread-stem`}
        data-level={level}
        onMouseEnter={stemHoverEnterHandler}
        onMouseLeave={stemHoverLeaveHandler}
        onClick={props.clickHandler}
      />
      <style jsx>{`
        .thread-stem {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: ${STEM_WIDTH_PX}px;
          background-color: ${stemColor};
          border-radius: 15px;
          pointer-events: all;
          border: 0;
          padding: 0;
          margin-top: var(--stem-margin-top, 0);
          margin-left: var(--stem-margin-left, 0);
          margin-bottom: var(--stem-margin-bottom, 0);
        }
        .thread-stem:focus {
          outline: none;
        }
        .thread-stem:focus-visible {
          outline: auto;
        }
        .thread-stem.hover {
          cursor: pointer;
          background-color: ${stemHoverColor};
          z-index: 1;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.1);
        }
        .thread-stem[data-level="0"] {
          left: 0px;
        }
      `}</style>
    </>
  );
};

interface IndentProps {
  id: string | null;
  collapsed?: boolean;
  // Internal: do not use.
  _childOfItem?: boolean;
}
export const Indent: React.FC<IndentProps> = (props) => {
  const threadContext = React.useContext(ThreadContext);
  const level = React.useContext(ThreadLevel);
  const childrenArray = React.Children.toArray(props.children);

  if (!props._childOfItem) {
    throw new Error("indent should be child of item");
  }

  const stemClickHandler = React.useCallback(() => {
    if (props.collapsed) {
      threadContext?.onUncollapseLevel?.(props.id as string);
    } else {
      threadContext?.onCollapseLevel?.(props.id as string);
    }
  }, [threadContext, props.collapsed, props.id]);

  // If the child is an uncollapsed CollapseGroup, then skip the CollapseGroup
  // and render its children instead. If not, render whatever the child is.
  const childrenForRendering = childrenArray.flatMap((child) =>
    isCollapseGroup(child) && !child.props.collapsed
      ? child.props.children
      : child
  );

  return (
    <>
      <Stem clickHandler={stemClickHandler} />
      <ol data-level={level + 1} className={`level-container`}>
        <ThreadLevel.Provider value={level + 1}>
          {props.collapsed ? (
            <CollapseGroup {...props} endsLevel />
          ) : (
            childrenForRendering
          )}
        </ThreadLevel.Provider>
        <style jsx>{`
          ol.level-container {
            list-style: none;
            position: relative;
            margin-inline-start: ${INDENT_WIDTH_PX}px;
            padding-inline-start: 0;
            pointer-events: none;
            margin-block-start: 0;
          }
          ol.level-container[data-level="1"] {
            padding-inline-start: 0;
          }
        `}</style>
      </ol>
    </>
  );
};

Thread.Indent = Indent;
Thread.Item = Item;
export default Thread;
