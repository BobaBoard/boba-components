import React, { Children } from "react";

import Theme from "../theme/default";
import CollapsedPlaceholder from "./CollapsedPlaceholder";
import CircleMask from "../images/circle-mask.svg";
import RectangleMask from "../images/rectangle-mask.svg";
import classnames from "classnames";
import css from "styled-jsx/css";

const INDENT_WIDTH_PX = 8;
const getThreadCss = (level: number) => css.resolve`
  ol.level-container {
    list-style: none;
    position: relative;
    margin-inline-start: ${INDENT_WIDTH_PX}px;
    padding-inline-start: 0;
    pointer-events: none;
  }
  div[data-level="0"],
  ol.level-container[data-level="1"] {
    padding-inline-start: 0;
    margin-inline-start: 0;
  }
  li.level-item {
    position: relative;
    pointer-events: none;
  }
  .thread-element {
    position: relative;
    z-index: 1;
    pointer-events: none;
  }
  .thread-element
    > :global(*:not(.level-item .level-container .thread-element)) {
    pointer-events: all;
  }
  .thread-stem {
    position: absolute;
    top: 0;
    bottom: -10px;
    left: ${INDENT_WIDTH_PX}px;
    width: ${INDENT_WIDTH_PX}px;
    background-color: ${Theme.INDENT_COLORS[
      level % Theme.INDENT_COLORS.length
    ]};
    border-radius: 15px;
    pointer-events: all;
  }
  .thread-stem.hover {
    cursor: pointer;
    background-color: purple;
  }
  div[data-level="0"] > .thread-stem {
    left: 0px;
  }
  div[data-level="0"] {
    position: relative;
  }
`;

const ThreadContext = React.createContext<ThreadProps | null>(null);
const ThreadLevel = React.createContext<number>(0);
const ThreadStem = React.createContext<{
  visible: boolean;
  setVisible: (x: boolean) => void;
} | null>(null);

interface ThreadProps {
  onCollapseLevel: (id: string) => void;
  onUncollapseLevel: (id: string) => void;
  getCollapseReason: (id: string) => React.ReactNode;
}

interface IndentProps {
  id: string | null;
  collapsed: boolean;
  level?: number;
  // Internal: do not use.
  childOfItem?: boolean;
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
const Thread: React.FC<ThreadProps> & {
  Indent: typeof Indent;
  Item: typeof Item;
} = (props) => {
  // Thread should have up to two children, one which is the item to display at "level 0",
  // and a potential second element of type Thread.Indent, which contains the subthread.
  // Actually, at least for now, we just take all the children that aren't an indent, and simply
  // display them as the "top" element.
  const { levelItems, indent } = processItemChildren(props.children);

  // We wrap both elements in a Thread.Item, so we can simply use the regular Thread.Item
  // recursion even for the first level.
  return (
    <ThreadContext.Provider value={props}>
      <div className="thread">
        <Thread.Item>
          {levelItems}
          {indent}
        </Thread.Item>
        <style jsx>{`
          .thread {
            max-width: 550px;
          }
        `}</style>
      </div>
    </ThreadContext.Provider>
  );
};

export const CollapseGroup: React.FC<CollapseGroupProps> = (props) => {
  const threadContext = React.useContext(ThreadContext);
  return props.collapsed ? (
    <div
      className={classnames("collapsed", { "ends-level": !!props.endsLevel })}
    >
      <div className="placeholder">
        <CollapsedPlaceholder
          onUncollapseClick={() =>
            threadContext?.onUncollapseLevel?.(props.id as string)
          }
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

const Item: React.FC<{ children?: React.ReactNode }> = (props) => {
  const level = React.useContext(ThreadLevel);
  const { levelItems, indent } = processItemChildren(props.children);
  const { styles, className } = getThreadCss(level);
  // We only wrap the result in a <li> when it's above level 0.

  if (Children.toArray(props.children).some(isThreadItem)) {
    throw new Error("Items shouldn't be children of items");
  }
  return (
    <>
      {level === 0 ? (
        <div data-level={0} className={className}>
          <div className={`thread-element ${className}`}>{levelItems}</div>
          {indent &&
            // @ts-ignore
            React.cloneElement(indent, {
              ...indent?.props,
              childOfItem: true,
            })}
        </div>
      ) : (
        <li data-level={level} className={`level-item ${className}`}>
          <div className={`thread-element ${className}`}>{levelItems}</div>
          {indent &&
            // @ts-ignore
            React.cloneElement(indent, {
              ...indent?.props,
              childOfItem: true,
            })}
        </li>
      )}
      {styles}
    </>
  );
};

export const Indent: React.FC<IndentProps> = (props) => {
  const threadContext = React.useContext(ThreadContext);
  const level = React.useContext(ThreadLevel);
  const { styles, className } = getThreadCss(level);
  const childrenArray = React.Children.toArray(props.children);

  if (!props.childOfItem) {
    throw new Error("indent should be child of item");
  }

  const toRender = childrenArray.flatMap((child) =>
    isCollapseGroup(child) && !child.props.collapsed
      ? child.props.children
      : child
  );
  const indentContext = React.useContext(ThreadStem);
  if (indentContext && !indentContext.visible) {
    indentContext.setVisible(true);
  }
  const stemHoverEnterHandler = React.useCallback((e) => {
    const target = e.target as HTMLElement;
    target.classList.add("hover");
  }, []);
  const stemHoverLeaveHandler = React.useCallback((e) => {
    const target = e.target as HTMLElement;
    target.classList.remove("hover");
  }, []);

  return (
    <>
      <div
        className={`thread-stem ${className}`}
        onMouseEnter={stemHoverEnterHandler}
        onMouseLeave={stemHoverLeaveHandler}
        onClick={() => {
          if (props.collapsed) {
            threadContext?.onUncollapseLevel?.(props.id as string);
          } else {
            threadContext?.onCollapseLevel?.(props.id as string);
          }
        }}
      />
      <ol data-level={level + 1} className={`level-container ${className}`}>
        <ThreadLevel.Provider value={level + 1}>
          {props.collapsed ? <CollapseGroup {...props} endsLevel /> : toRender}
        </ThreadLevel.Provider>
        {styles}
      </ol>
    </>
  );
};

Thread.Indent = Indent;
Thread.Item = Item;
export default Thread;
