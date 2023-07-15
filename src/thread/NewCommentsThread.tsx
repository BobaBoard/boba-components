import React, { Children } from "react";

import Theme from "theme/default";
import { lightenColor } from "utils";

const INDENT_WIDTH_PX = 25;
const STEM_WIDTH_PX = 1;
// This is given by the commentchain avatar padding,
// and it might be calculated that way too, one day.
const STICKY_TOP_PX = 0;
// Note: this turns on transparency for stems, which helps with debugging.
const DEBUG = false;

// TODO: make the avatar itself be the center.
const STEM_LEFT_OFFSET = 0;

type BoundaryElement = {
  positionX: HTMLElement;
  positionY: HTMLElement;
};
interface ThreadContext extends ThreadProps {
  addResizeCallback: (callback: () => void) => void;
  removeResizeCallback: (callback: () => void) => void;
  registerItemBoundary: (element: {
    levelElement: HTMLElement;
    boundaryElement: BoundaryElement;
  }) => void;
  unregisterItemBoundary: (element: { levelElement: HTMLElement }) => void;
  getNextLevelBoundaries: (levelElement: HTMLElement) => {
    levelElement: HTMLElement;
    boundaryElement: BoundaryElement;
  }[];
  hasMotionEffect: boolean;
}

const ThreadContext = React.createContext<ThreadContext | null>(null);
const ThreadLevel = React.createContext<number>(0);

interface ThreadProps {
  resizeSpy?: React.RefObject<HTMLElement>;
  disableMotionEffect?: boolean;
}

const isIndentElement = (
  node: React.ReactNode
): node is React.Component<IndentProps> =>
  React.isValidElement(node) && node.type === Indent;

const isThreadItem = (
  node: React.ReactNode
): node is React.Component<ChildrenWithRenderProps> =>
  React.isValidElement(node) && node.type === Item;

const processItemChildren = (children: React.ReactNode | undefined) => {
  const indent = Children.toArray(children).find(isIndentElement);
  const levelItems = Children.toArray(children).filter(
    (child) => !isIndentElement(child)
  );
  return { levelItems, indent };
};

interface ChildrenWithRenderProps {
  children?:
    | React.ReactNode
    | ((
        refCallback: (
          element: HTMLElement | Partial<BoundaryElement> | null
        ) => void
      ) => React.ReactNode);
}

const useResizeCallbacks = (toWatch: React.RefObject<HTMLElement>) => {
  const resizeCallbacks = React.useRef<(() => void)[]>([]);
  React.useEffect(() => {
    if (!toWatch.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      resizeCallbacks.current.forEach((callback) => callback());
    });
    resizeObserver.observe(toWatch.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [toWatch]);
  const addResizeCallback = React.useCallback((callback: () => void) => {
    resizeCallbacks.current.push(callback);
  }, []);
  const removeResizeCallback = React.useCallback((callback: () => void) => {
    resizeCallbacks.current = resizeCallbacks.current.filter(
      (entry) => callback !== entry
    );
  }, []);

  return {
    addResizeCallback,
    removeResizeCallback,
  };
};

const useBoundariesMap = () => {
  const levelsBoundariesMap = React.useRef(
    new Map<HTMLElement, BoundaryElement>()
  );
  const registerItemBoundary = React.useCallback(
    (element: {
      levelElement: HTMLElement;
      boundaryElement: BoundaryElement;
    }) => {
      levelsBoundariesMap.current.set(
        element.levelElement,
        element.boundaryElement
      );
    },
    []
  );
  const unregisterItemBoundary = React.useCallback(
    (element: { levelElement: HTMLElement }) => {
      levelsBoundariesMap.current.delete(element.levelElement);
    },
    []
  );
  const getNextLevelBoundaries = React.useCallback(
    (levelElement: HTMLElement) => {
      const nextLevelBoundaries: {
        levelElement: HTMLElement;
        boundaryElement: BoundaryElement;
      }[] = [];
      const nextLevelElements =
        levelElement.querySelectorAll(":scope > ol > li");
      nextLevelElements.forEach((element) => {
        const boundaryElement: BoundaryElement | undefined =
          levelsBoundariesMap.current.get(element as HTMLElement);
        if (!boundaryElement) {
          // This can happen when an element is added after the first render, and has not yet registered
          // while the parent is already re-rendering.
          return;
        }
        nextLevelBoundaries.push({
          levelElement: element as HTMLElement,
          boundaryElement,
        });
      });
      return nextLevelBoundaries;
    },
    []
  );

  return {
    registerItemBoundary,
    unregisterItemBoundary,
    getNextLevelBoundaries,
  };
};

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
  // When the overall thread container is resized, cycle through all the handlers to
  // "warn" the stems that readjustment might be needed (+ whatever other callback might
  // have been assigned).
  const threadRef = React.createRef<HTMLDivElement>();
  const { addResizeCallback, removeResizeCallback } = useResizeCallbacks(
    props.resizeSpy || threadRef
  );
  const {
    registerItemBoundary,
    unregisterItemBoundary,
    getNextLevelBoundaries,
  } = useBoundariesMap();

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
          getNextLevelBoundaries,
          hasMotionEffect: props.disableMotionEffect !== true,
        }),
        [
          props,
          addResizeCallback,
          removeResizeCallback,
          registerItemBoundary,
          unregisterItemBoundary,
          getNextLevelBoundaries,
        ]
      )}
    >
      <div className="thread" ref={threadRef} data-thread-start="true">
        {children}
        <style jsx>{`
          .thread {
            width: 100%;
            max-width: ${Theme.POST_WIDTH_PX}px;
          }
        `}</style>
      </div>
    </ThreadContext.Provider>
  );
};

const getLevelIndex = (levelElement: HTMLElement) => {
  let previousSibling = levelElement.previousElementSibling;
  while (previousSibling && !(previousSibling instanceof HTMLElement)) {
    previousSibling = levelElement.previousElementSibling;
  }
  const previousLevel =
    (previousSibling as HTMLElement)?.dataset.listIndex || "0";
  return parseInt(previousLevel) + 1;
};

// When something is position sticky, it moves alongside the viewport.
// In order to accurately calculate its position, we make it position
// relative, calculate, and set it back to sticky.
const getStickyElementBoundingRect = (
  element: BoundaryElement
): {
  left: number;
  width: number;
  top: number;
  height: number;
  bottom: number;
} => {
  const { left, width } = element.positionX.getBoundingClientRect();
  let yBoundingRect = element.positionY.getBoundingClientRect();
  if (getComputedStyle(element.positionY).position === "sticky") {
    const previousTop = getComputedStyle(element.positionY).top;
    element.positionY.style.position = "relative";
    element.positionY.style.top = "0";
    yBoundingRect = element.positionY.getBoundingClientRect();
    element.positionY.style.position = "sticky";
    element.positionY.style.top = previousTop;
  }

  return {
    left,
    width,
    top: yBoundingRect.top,
    height: yBoundingRect.height,
    bottom: yBoundingRect.bottom,
  };
};

const setLevelStemBoundaries = ({
  levelElement,
  boundaryElement,
  nextLevelBoundaries,
}: {
  levelElement: HTMLElement;
  boundaryElement: BoundaryElement;
  nextLevelBoundaries: BoundaryElement[];
}) => {
  const {
    top: levelTop,
    left: levelLeft,
    bottom: levelBottom,
  } = levelElement.getBoundingClientRect();
  const {
    bottom: boundaryBottom,
    left: boundaryLeft,
    width: boundaryWidth,
  } = getStickyElementBoundingRect(boundaryElement);
  levelElement.style.setProperty(
    "--stem-margin-top",
    `${boundaryBottom - levelTop}px`
  );
  const boundaryMiddlePoint = boundaryLeft - levelLeft + boundaryWidth / 2;
  levelElement.style.setProperty(
    "--stem-margin-left",
    `${boundaryMiddlePoint - STEM_WIDTH_PX / 2 - STEM_LEFT_OFFSET}px`
  );
  if (nextLevelBoundaries.length) {
    const lastBoundary = nextLevelBoundaries[nextLevelBoundaries.length - 1];
    const { top: nextLevelTop } = getStickyElementBoundingRect(lastBoundary);
    levelElement.style.setProperty(
      "--stem-margin-bottom",
      `${levelBottom - nextLevelTop}px`
    );
  }
};

const setNextLevelStemBoundaries = ({
  levelBoundary,
  nextLevelElement,
  nextLevelBoundary,
}: {
  levelBoundary: BoundaryElement;
  nextLevelElement: HTMLElement;
  nextLevelBoundary: BoundaryElement;
}) => {
  const { left: levelBoundaryLeft, width: levelBoundaryWidth } =
    getStickyElementBoundingRect(levelBoundary);
  const { top: nextLevelTop, left: nextLevelLeft } =
    nextLevelElement.getBoundingClientRect();
  const {
    left: nextLevelBoundaryLeft,
    top: nextLevelBoundaryTop,
    bottom: nextLevelBoundaryBottom,
    height: nextLevelBoundaryHeight,
  } = getStickyElementBoundingRect(nextLevelBoundary);
  const currentLevelMiddlePoint = levelBoundaryLeft + levelBoundaryWidth / 2;
  const stemLeft = currentLevelMiddlePoint - nextLevelLeft - STEM_WIDTH_PX / 2;
  nextLevelElement.style.setProperty(
    "--level-stem-left",
    `${stemLeft - STEM_LEFT_OFFSET}px`
  );
  nextLevelElement.style.setProperty(
    "--level-stem-top",
    `${nextLevelBoundaryTop - nextLevelTop}px`
  );
  nextLevelElement.style.setProperty(
    "--level-stem-margin-bottom",
    `${nextLevelBoundaryHeight / 2 - STEM_WIDTH_PX / 2}px`
  );
  nextLevelElement.style.setProperty(
    "--level-stem-height",
    `${nextLevelBoundaryHeight / 2 + STICKY_TOP_PX + STEM_WIDTH_PX / 2}px`
  );
  nextLevelElement.style.setProperty(
    "--level-stem-width",
    `${
      nextLevelBoundaryLeft -
      currentLevelMiddlePoint +
      STEM_WIDTH_PX / 2 +
      STEM_LEFT_OFFSET
    }px`
  );
  nextLevelElement.style.setProperty(
    "--level-stem-mask-width",
    `${STEM_WIDTH_PX}px`
  );
  nextLevelElement.style.setProperty(
    "--level-stem-mask-height",
    `${nextLevelBoundaryBottom - nextLevelBoundaryTop}px`
  );
  nextLevelElement.style.setProperty(
    "--level-stem-mask-margin-top",
    `${-nextLevelBoundaryHeight - STICKY_TOP_PX}px`
  );
  nextLevelElement.style.setProperty(
    "--level-stem-mask-margin-left",
    `${nextLevelBoundaryLeft - levelBoundaryLeft}px`
  );
};

const Item: React.FC<ChildrenWithRenderProps> = (props) => {
  const threadContext = React.useContext(ThreadContext);
  const level = React.useContext(ThreadLevel);
  const [boundaryElement, setBoundaryElement] =
    React.useState<BoundaryElement | null>(null);
  const levelContent = React.createRef<HTMLLIElement & HTMLDivElement>();
  const levelStem = React.createRef<HTMLDivElement>();
  const levelStemContainer = React.createRef<HTMLDivElement>();

  const boundaryElementCallback = React.useCallback(
    (ref: HTMLElement | Partial<BoundaryElement> | null) => {
      // If anything in the ref is null, set everything to null.
      if (
        !ref ||
        (!(ref instanceof HTMLElement) && (!ref.positionX || !ref.positionY))
      ) {
        if (boundaryElement) {
          setBoundaryElement(null);
        }
        return;
      }
      if (ref instanceof HTMLElement) {
        const isUpdatedBoundary =
          boundaryElement?.positionX !== ref ||
          boundaryElement?.positionY !== ref;
        if (isUpdatedBoundary) {
          setBoundaryElement({
            positionX: ref,
            positionY: ref,
          });
        }
        return;
      }
      if ("positionX" in ref) {
        const isUpdatedBoundary =
          boundaryElement?.positionX !== ref.positionX ||
          boundaryElement?.positionY !== ref.positionY;
        if (isUpdatedBoundary) {
          setBoundaryElement(ref as BoundaryElement);
          return;
        }
      }
    },
    [setBoundaryElement, boundaryElement]
  );

  let { children } = props;
  if (typeof props.children === "function") {
    children = props.children(boundaryElementCallback);
    // Since thread indent must always be a direct child of Item, but the component
    // rendered by using a render props function will likely need to wrap more than one
    // element as a return value, we check if the returned children are a fragment,
    // and just iterate on the returned children in that case.
    if (React.isValidElement(children) && children.type === React.Fragment) {
      // eslint-disable-next-line prefer-destructuring
      children = children.props.children;
    }
  }

  React.useEffect(() => {
    if (!boundaryElement || !levelContent.current || !threadContext) {
      return;
    }
    const levelElement = levelContent.current;
    const index = getLevelIndex(levelElement);
    levelElement.dataset.levelIndex = `${index}`;
    threadContext.registerItemBoundary({
      levelElement,
      boundaryElement,
    });
    const setStemPositions = () => {
      const nextLevelBoundaries =
        threadContext.getNextLevelBoundaries(levelElement);
      setLevelStemBoundaries({
        levelElement,
        boundaryElement,
        nextLevelBoundaries: nextLevelBoundaries.map(
          (boundary) => boundary.boundaryElement
        ),
      });
      if (level === 0) {
        setNextLevelStemBoundaries({
          // TODO: figure out why this works
          levelBoundary: boundaryElement,
          nextLevelElement: levelElement,
          nextLevelBoundary: boundaryElement,
        });
      }
      nextLevelBoundaries.forEach((boundary) => {
        setNextLevelStemBoundaries({
          levelBoundary: boundaryElement,
          nextLevelElement: boundary.levelElement,
          nextLevelBoundary: boundary.boundaryElement,
        });
      });
    };
    threadContext?.addResizeCallback(setStemPositions);
    setStemPositions();
    return () => {
      threadContext.removeResizeCallback(setStemPositions);
      threadContext.unregisterItemBoundary({ levelElement });
    };
  }, [boundaryElement, threadContext, levelContent, level]);

  const { levelItems, indent } = processItemChildren(children);
  if (Children.toArray(children).some(isThreadItem)) {
    throw new Error("Items shouldn't be children of items");
  }
  const stemColor =
    Theme.INDENT_COLORS[(level - 1) % Theme.INDENT_COLORS.length];
  const content = (
    <>
      <div className={`thread-element`}>
        <div className="level-stem-container" ref={levelStemContainer}>
          <div className="level-stem" ref={levelStem} />
          <div className="level-mask" />
        </div>
        {levelItems}
      </div>
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
        .thread-element > :global(*:not(.level-item)),
        .thread-element > :global(*:not(.level-container)),
        .thread-element > :global(*:not(.thread-element)) {
          pointer-events: all;
        }
        .level-stem-container {
          position: absolute;
          top: var(--level-stem-top, 0);
          bottom: 0;
          left: var(--level-stem-left, 0);
          pointer-events: all;
        }
        .level-stem {
          position: ${threadContext?.hasMotionEffect ? "sticky" : "absolute"};
          top: ${threadContext?.hasMotionEffect
            ? `${Theme.HEADER_HEIGHT_PX + 2}px`
            : "0"};
          height: var(--level-stem-height, 0);
          width: var(--level-stem-width, 0);
          margin-bottom: var(--level-stem-margin-bottom, 0);
          border-left: ${STEM_WIDTH_PX}px solid ${stemColor};
          border-bottom: ${STEM_WIDTH_PX}px solid ${stemColor};
          box-sizing: border-box;
          border-bottom-left-radius: 15px;
          opacity: ${DEBUG ? "0.5" : "1"};
        }
        .level-mask {
          position: "sticky";
          visibility: ${threadContext?.hasMotionEffect ? "visible" : "hidden"};
          width: var(--level-stem-mask-width, 0);
          height: var(--level-stem-mask-height, 0);
          background-color: ${DEBUG
            ? "blue"
            : Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
          top: ${Theme.HEADER_HEIGHT_PX}px;
          margin-left: var(--level-stem-mask-margin-left, 0);
          margin-top: var(--level-stem-mask-margin-top, 0);
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
        }
      `}</style>
    </>
  );
  // We only wrap the result in a <li> when it's above level 0, and is thus child
  // of a Thread.Indent
  return (
    <>
      {level === 0 ? (
        <div data-level={0} ref={levelContent}>
          {content}
        </div>
      ) : (
        <li data-level={level} className={`level-item`} ref={levelContent}>
          {content}
        </li>
      )}
      <style jsx>{`
        li.level-item {
          position: relative;
          pointer-events: none;
          --stem-margin-top: 0;
        }
        div[data-level="0"] {
          position: relative;
          --stem-margin-top: 0;
        }
      `}</style>
    </>
  );
};

export const Stem: React.FC = () => {
  const level = React.useContext(ThreadLevel);

  const stemColor = Theme.INDENT_COLORS[level % Theme.INDENT_COLORS.length];
  const stemHoverColor = lightenColor(stemColor, 0.07);
  return (
    <>
      <button className={`thread-stem`} data-level={level} />
      <style jsx>{`
        .thread-stem {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 0;
          pointer-events: all;
          border: 0;
          padding: 0;
          margin-top: var(--stem-margin-top, 0);
          margin-left: var(--stem-margin-left, 0);
          margin-bottom: var(--stem-margin-bottom, 0);
          border-left: ${STEM_WIDTH_PX}px solid ${stemColor};
          opacity: ${DEBUG ? "0.5" : "1"};
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
  const level = React.useContext(ThreadLevel);
  const childrenArray = React.Children.toArray(props.children);

  if (!props._childOfItem) {
    throw new Error("indent should be child of item");
  }

  return (
    <>
      <Stem />
      <ol data-level={level + 1} className={`level-container`}>
        <ThreadLevel.Provider value={level + 1}>
          {childrenArray}
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
