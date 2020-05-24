import React from "react";

import Theme from "../theme/default";

const indentationSizePx = 4;
const barGap = 5;

const withNesting = (
  el: JSX.Element | JSX.Element[],
  level: number,
  maxLevel: number
) => {
  return (
    <>
      <div className={`nested`}> {el}</div>
      <style jsx>{`
        .nested {
          position: relative;
        }
        .nested {
          margin-left: ${indentationSizePx * (maxLevel - level) + barGap}px;
        }
        .nested::before {
          content: "";
          position: absolute;
          left: -${indentationSizePx + barGap}px;
          top: -30px;
          bottom: 15px;
          background-color: ${Theme.INDENT_COLORS[
            (maxLevel - level) % Theme.INDENT_COLORS.length
          ]};
          width: ${indentationSizePx}px;
          opacity: 1;
          border-bottom-left-radius: ${30}px;
        }
      `}</style>
    </>
  );
};

const ThreadIndent: React.FC<ThreadIndentProps> = (props) => {
  let current = (
    <div className="content">
      {props.children}
      <style jsx>{`
        .content {
          z-index: 2;
          position: relative;
        }
      `}</style>
    </div>
  );
  for (let i = 0; i < props.level; i++) {
    current = withNesting(current, i + 1, props.level);
  }
  return (
    <div className="thread-level">
      {current}
      <style jsx>{`
        .thread-level {
          position: relative;
          margin-left: ${props.level == 0 ? 0 : indentationSizePx}px;
          {/* margin-left: ${10 * props.level}px; */}
          ]};
        }
        .thread-level::before {
          border-radius: ${Theme.BORDER_RADIUS_REGULAR} 0 0
            ${Theme.BORDER_RADIUS_REGULAR};
          content: "";
          position: absolute;
          left: -${indentationSizePx}px;
          top: 0;
          bottom: 0;
          width: ${30 * props.level}px;
          opacity: 1;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default ThreadIndent;

export interface ThreadIndentProps {
  children: JSX.Element | JSX.Element[];
  level: number;
  hasMorePeers: boolean;
}
