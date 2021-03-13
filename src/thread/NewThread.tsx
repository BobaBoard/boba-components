import React, { Children } from "react";

import Theme from "../theme/default";
import CollapsedPlaceholder from "./CollapsedPlaceholder";
import CircleMask from "../images/circle-mask.svg";
import RectangleMask from "../images/rectangle-mask.svg";
import classnames from "classnames";
import { lightenColor } from "../utils";
import PopupButtons, { PopupButtonsProps } from "../common/PopupButtons";

import debug from "debug";
const info = debug("bobaui:NewThread-info");

const INDENT_WIDTH_PX = 8;

type PopupData = {
  level: number;
  levelId: string | null;
  x: number;
  y: number;
};
interface ThreadContext extends ThreadProps {
  addResizeCallback: (callback: () => void) => void;
  removeResizeCallback: (callback: () => void) => void;
  // There's a problem with click being triggered after dragging outside of an element with the pointer
  // pressed, and there's no easy way of preventing default in that case.
  // See: https://stackoverflow.com/questions/33389641/clicking-inside-element-and-dragging-mouse-outside-it
  // Solution is to set this to true while the mouse moves, and if this is true swallowing the click
  // event once.
  setPreventClick: (prevent: boolean) => void;
  onPopupOpenRequest: (position: PopupData) => void;
  popupData: PopupData | null;
  boundaries: Map<string, HTMLElement | null>;
}

const ThreadContext = React.createContext<ThreadContext | null>(null);
const ThreadLevel = React.createContext<number>(0);

interface ThreadProps {
  onCollapseLevel: (id: string) => void;
  onUncollapseLevel: (id: string) => void;
  getCollapseReason: (id: string) => React.ReactNode;
  getStemOptions: (levelId: string | null) => PopupButtonsProps["options"];
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
  parentBoundary?: string;
  children?:
    | JSX.Element
    | ((
        refCallback: (element: HTMLElement | null) => void,
        id: string
      ) => React.ReactNode);
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
  CollapseGroup: typeof CollapseGroup;
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

  const [popupData, onPopupOpenRequest] = React.useState<PopupData | null>(
    null
  );
  const [shouldPreventClick, setPreventClick] = React.useState(false);

  // We wrap children in a Thread.Item, so we can simply use the regular Thread.Item
  // recursion even for the first level. We do this unless the child is already a
  // Thread.Item, mostly so if the first level can be done through recursion there's
  // no need for the users of this class to special case it.
  const children = isThreadItem(props.children) ? (
    props.children
  ) : (
    <Thread.Item>{props.children}</Thread.Item>
  );
  const { getStemOptions } = props;
  const stemOptions = React.useMemo(
    () => (popupData ? getStemOptions(popupData.levelId) : []),
    [getStemOptions, popupData]
  );
  const popupColor =
    Theme.INDENT_COLORS[(popupData?.level || 0) % Theme.INDENT_COLORS.length];
  const boundaries = React.useRef(new Map<string, HTMLElement>());

  React.useEffect(() => {
    if (popupData) {
      const closePopup = () => onPopupOpenRequest(null);
      window.addEventListener("scroll", closePopup);
      return () => {
        window.removeEventListener("scroll", closePopup);
      };
    }
    return;
  }, [popupData]);
  return (
    <ThreadContext.Provider
      value={React.useMemo(
        () => ({
          ...props,
          addResizeCallback,
          removeResizeCallback,
          onPopupOpenRequest,
          setPreventClick,
          popupData: popupData,
          boundaries: boundaries.current,
        }),
        [props, addResizeCallback, removeResizeCallback, popupData]
      )}
    >
      <div
        className="thread"
        ref={threadRef}
        onClick={React.useCallback(
          (e) => {
            if (shouldPreventClick) {
              e.nativeEvent.stopImmediatePropagation();
              setPreventClick(false);
            }
          },
          [shouldPreventClick]
        )}
      >
        {children}
        <style jsx>{`
          .thread {
            width: 100%;
            max-width: 550px;
          }
        `}</style>
      </div>
      <PopupButtons
        options={stemOptions}
        show={!!popupData}
        centerTop={`${popupData?.y}px`}
        centerLeft={`${popupData?.x}px`}
        defaultColor={popupColor}
        onCloseRequest={React.useCallback(() => {
          onPopupOpenRequest(null);
        }, [])}
      />
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
  // Sometimes a lower level might want its boundary element to be the same as one of its
  // "parents". We create a unique boundary id that children of this element can refer
  // to if they want to tie up their boundary with the one of a level above them.
  const boundaryId = React.useRef(`${Math.ceil(Math.random() * 10000000)}`);
  const levelContent = React.createRef<HTMLLIElement & HTMLDivElement>();
  // Setting this won't trigger any re-rendering, and so we can simply set it to make sure
  // it's always up to date in time for the commit phase.
  threadContext?.boundaries.set(boundaryId.current, boundaryElement);

  let children: React.ReactNode = props.children;
  if (typeof props.children == "function") {
    children = props.children(setBoundaryElement, boundaryId.current);
    // Since thread indent must always be a direct child of Item, but the component
    // rendered by using a render props function will likely need to wrap more than one
    // element as a return value, we check if the returned children are a fragment,
    // and just iterate on the returned children in that case.
    if (React.isValidElement(children) && children.type === React.Fragment) {
      children = children.props.children;
    }
  }

  const parentBoundary = props.parentBoundary
    ? threadContext?.boundaries.get(props.parentBoundary)
    : null;
  React.useEffect(() => {
    if (props.parentBoundary && parentBoundary && !boundaryElement) {
      setBoundaryElement(parentBoundary);
    }
  }, [props.parentBoundary, parentBoundary, boundaryElement]);

  React.useEffect(() => {
    if (!boundaryElement || !levelContent.current) {
      return;
    }

    const contentRef = levelContent.current;
    const setTopMarginCallback = () => {
      const { top: stemTop } = contentRef.getBoundingClientRect();
      const { top } = boundaryElement.getBoundingClientRect();
      contentRef.style.setProperty("--stem-margin-top", `${top - stemTop}px`);
    };
    threadContext?.addResizeCallback(setTopMarginCallback);
    setTopMarginCallback();
    return () => {
      threadContext?.removeResizeCallback(setTopMarginCallback);
    };
  }, [boundaryElement, threadContext, levelContent]);

  const { levelItems, indent } = processItemChildren(children);
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
        .thread-element {
          position: relative;
          z-index: 2;
          pointer-events: none;
        }
        .thread-element
          > :global(*:not(.level-item .level-container .thread-element)) {
          pointer-events: all;
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
  levelId: string | null;
}
export const Stem: React.FC<StemProps> = (props) => {
  const level = React.useContext(ThreadLevel);
  const threadContext = React.useContext(ThreadContext);
  // This is used when moving around with "pointer move" events to remove the
  // "hover" target from previously-hovered stems.
  const previousTarget = React.useRef<HTMLElement>();

  const stemColor = Theme.INDENT_COLORS[level % Theme.INDENT_COLORS.length];
  const onStemClick = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      threadContext?.onPopupOpenRequest({
        level,
        levelId: props.levelId,
        x: e.pageX,
        y: e.pageY,
      });
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    },
    [level, threadContext, props.levelId]
  );

  const pointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (threadContext?.popupData === null) {
        // We only use this event to handle the case when the popup data
        // is open and the user drags their pointer around.
        return;
      }
      // If we're in a mouse situation, only do this when the main
      // button is pressed.
      if (e.pointerType == "mouse" && e.buttons !== 1) {
        return;
      }
      // Find the target underneath the new clientX and clientY
      const target = document.elementFromPoint(e.clientX, e.clientY) as
        | HTMLElement
        | undefined;
      const targetLevel = parseInt(target?.dataset?.level || "");
      const targetLevelId = target?.dataset?.levelId || null;
      info(
        `Found target underneath pointer at level ${targetLevel} with id ${targetLevelId}:`
      );
      info(target);
      if (
        !target ||
        isNaN(targetLevel) ||
        !target.classList.contains("thread-stem") ||
        threadContext?.popupData.level === targetLevel
      ) {
        // If we're at the same level as before (or not on a "level" element, a.k.a. a stem)
        // we bail.
        return;
      }
      // See documentation of "setPreventClick"
      threadContext?.setPreventClick(true);
      previousTarget.current?.classList.remove("hover");
      target.classList.add("hover");
      previousTarget.current = target;
      threadContext?.onPopupOpenRequest({
        level: targetLevel,
        levelId: targetLevelId,
        x: e.pageX,
        y: e.pageY,
      });
    },
    [threadContext]
  );

  const stemHoverColor = lightenColor(stemColor, 0.1);
  return (
    <>
      <button
        className={`thread-stem`}
        data-level={level}
        data-level-id={props.levelId}
        onPointerEnter={React.useCallback((e) => {
          const target = e.target as HTMLElement;
          target.classList.add("hover");
        }, [])}
        onPointerLeave={React.useCallback(
          (e: React.PointerEvent<HTMLButtonElement>) => {
            const target = e.target as HTMLElement;
            target.classList.remove("hover");
          },
          []
        )}
        onPointerMove={pointerMove}
        onPointerDownCapture={onStemClick}
        onPointerUp={React.useCallback(() => {
          previousTarget.current = undefined;
        }, [])}
        onClickCapture={React.useCallback((e) => {
          // Prevents the click that opens the stem menu from bubbling up to document.
          // TODO: this should likely be taken care of by the popup buttons menu itself.
          // IMPORTANT TODO: readd accessibility on tabbing here.
          e.nativeEvent.stopImmediatePropagation();
        }, [])}
        onContextMenu={React.useCallback((e) => {
          // Prevents the opening of the contextual menu on android long press
          e.stopPropagation();
          e.preventDefault();

          return false;
        }, [])}
      />
      <style jsx>{`
        .thread-stem {
          position: absolute;
          top: 0;
          bottom: -10px;
          left: ${INDENT_WIDTH_PX}px;
          width: ${INDENT_WIDTH_PX}px;
          background-color: ${stemColor};
          border-radius: 15px;
          pointer-events: all;
          border: 0;
          padding: 0;
          margin-top: var(--stem-margin-top, 0);
          margin-bottom: var(--stem-margin-bottom, 0);
          touch-action: none;
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

  // If the child is an uncollapsed CollapseGroup, then skip the CollapseGroup
  // and render its children instead. If not, render whatever the child is.
  const childrenForRendering = childrenArray.flatMap((child) =>
    isCollapseGroup(child) && !child.props.collapsed
      ? child.props.children
      : child
  );

  return (
    <>
      <Stem levelId={props.id} />
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
          }
          ol.level-container[data-level="1"] {
            padding-inline-start: 0;
            margin-inline-start: 0;
          }
        `}</style>
      </ol>
    </>
  );
};

Thread.CollapseGroup = CollapseGroup;
Thread.Indent = Indent;
Thread.Item = Item;
export default Thread;
