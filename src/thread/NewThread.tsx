import React from "react";

import Theme from "../theme/default";
import CollapsedPlaceholder from "./CollapsedPlaceholder";
import CircleMask from "../images/circle-mask.svg";
import RectangleMask from "../images/rectangle-mask.svg";
import classnames from "classnames";

const ThreadContext = React.createContext<ThreadProps | null>(null);

interface ThreadProps {
  onCollapseLevel: (id: string) => void;
  onUncollapseLevel: (id: string) => void;
  getCollapseReason: (id: string) => React.ReactNode;
}
interface IndentProps {
  id: string | null;
  collapsed: boolean;
  level?: number;
}

interface CollapseGroupProps extends IndentProps {
  endsLevel?: boolean;
}

const INDENT_WIDTH_PX = 8;

const isIndentElement = (
  node: React.ReactNode
): node is React.Component<IndentProps> => {
  return React.isValidElement(node) && node.type == Indent;
};

const isCollapseGroup = (
  node: React.ReactNode
): node is React.Component<CollapseGroupProps> => {
  return React.isValidElement(node) && node.type == CollapseGroup;
};

const Thread: React.FC<ThreadProps> = (props) => {
  return (
    <ThreadContext.Provider value={props}>
      <div className="thread">
        <Indent level={0} id={null} collapsed={false}>
          {props.children}
        </Indent>
        <style jsx>{`
          .thread {
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
      <CollapsedPlaceholder
        onUncollapseClick={() =>
          threadContext?.onUncollapseLevel?.(props.id as string)
        }
      >
        {threadContext?.getCollapseReason?.(props.id as string)}
      </CollapsedPlaceholder>
      <div className="background" />
      <style jsx>{`
        .collapsed {
          pointer-events: all;
          margin-bottom: 20px;
        }
        .collapsed .background {
          mask: url(${RectangleMask}), url(${CircleMask}) 0px -6px/8px 10px;
          mask-composite: source-out;
          mask-repeat: repeat-y;
           {
            /* 
          mask-repeat: no-repeat; */
          }
          background-color: #2e2e30;
          position: absolute;
          top: -15px;
          bottom: -17px;
          left: 0;
          width: ${INDENT_WIDTH_PX}px;
          z-index: -1;
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

export const Indent: React.FC<IndentProps> = (props) => {
  const threadContext = React.useContext(ThreadContext);
  const level = props.level || 0;
  const childrenArray = React.Children.toArray(props.children);

  const stemHoverEnterHandler = React.useCallback((e) => {
    const target = e.target as HTMLElement;
    target.classList.add("hover");
  }, []);
  const stemHoverLeaveHandler = React.useCallback((e) => {
    const target = e.target as HTMLElement;
    target.classList.remove("hover");
  }, []);

  const toRender = childrenArray.flatMap((child) =>
    isCollapseGroup(child) && !child.props.collapsed
      ? child.props.children
      : child
  );
  return (
    <ol data-level={level}>
      {!props.collapsed &&
        toRender.map((child, index) => {
          if (isIndentElement(child)) {
            // We render nothing for indents as they are already printed as part
            // of the elements they're preceeded by.
            return;
          }
          const indentedSibling =
            index !== toRender.length - 1 &&
            isIndentElement(toRender[index + 1])
              ? toRender[index + 1]
              : undefined;
          return (
            <li key={`${props.id}_${index}`}>
              {indentedSibling && (
                <div
                  className="thread-stem"
                  onMouseEnter={stemHoverEnterHandler}
                  onMouseLeave={stemHoverLeaveHandler}
                  onClick={(e) => {
                    const nextIndent = toRender[index + 1];
                    if (isIndentElement(nextIndent)) {
                      if (nextIndent.props.collapsed) {
                        threadContext?.onUncollapseLevel?.(
                          nextIndent.props.id as string
                        );
                      } else {
                        threadContext?.onCollapseLevel?.(
                          nextIndent.props.id as string
                        );
                      }
                    }
                  }}
                />
              )}
              <div className="thread-element">
                {child}
                {indentedSibling &&
                  // @ts-ignore
                  React.cloneElement(indentedSibling, {
                    level: level + 1,
                  })}
              </div>
            </li>
          );
        })}
      {props.collapsed && <CollapseGroup {...props} endsLevel />}
      <style jsx>{`
        ol {
          list-style: none;
          position: relative;
          margin-inline-start: ${INDENT_WIDTH_PX}px;
          padding-inline-start: 0;
        }
        ol[data-level="0"],
        ol[data-level="1"] {
          padding-inline-start: 0;
          margin-inline-start: 0;
        }
        li {
          position: relative;
        }
        .thread-element {
          position: relative;
          z-index: 1;
          pointer-events: none;
        }
        .thread-element > :global(*:not(ol)) {
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
        ol[data-level="0"] > li > .thread-stem {
          left: 0px;
        }
      `}</style>
    </ol>
  );
};

export default Thread;
