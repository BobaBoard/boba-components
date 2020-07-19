import React from "react";

import Theme from "../theme/default";
import classnames from "classnames";

const indentationSizePx = 4;
const barGap = 5;

const withNesting = (
  el: JSX.Element | JSX.Element[],
  level: number,
  maxLevel: number,
  ends?: number[]
) => {
  const hasAddNew = ends?.includes(level);
  return (
    <>
      <div className={classnames(`nested`, { "has-new": hasAddNew })}>
        {" "}
        {el}
        {hasAddNew && <div className="add-new">+</div>}
      </div>
      <style jsx>{`
        .nested {
          position: relative;
        }
        .nested {
          margin-left: ${indentationSizePx + barGap}px;
        }
        .nested.has-new {
          padding-bottom: 20px;
          margin-bottom: 10px;
        }
        .nested::before {
          content: "";
          position: absolute;
          left: -${indentationSizePx + barGap}px;
          top: -150px;
          bottom: 0;
          background-color: ${Theme.INDENT_COLORS[
            (maxLevel - level) % Theme.INDENT_COLORS.length
          ]};
          width: ${indentationSizePx}px;
          opacity: 1;
          border-radius: 100px;
        }
        .add-new {
          position: absolute;
          bottom: -10px;
          left: -${indentationSizePx + 10 + Math.ceil(barGap / 2)}px;
          width: 20px;
          height: 20px;
          text-align: center;
          background-color: ${Theme.INDENT_COLORS[
            (maxLevel - level) % Theme.INDENT_COLORS.length
          ]};
          border-radius: 50%;
          z-index: 5;
        }
        .add-new:hover {
          cursor: pointer;
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
    current = withNesting(current, i + 1, props.level, props.ends);
  }
  return (
    <div className={classnames("thread-level", `level-${props.level}`)}>
      {current}
      <style jsx>{`
        .thread-level {
          position: relative;
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
  ends?: number[];
}
