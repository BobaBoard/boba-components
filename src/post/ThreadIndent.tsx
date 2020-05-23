import React from "react";

import Theme from "../theme/default";

const ThreadIndent: React.FC<ThreadIndentProps> = (props) => {
  return (
    <>
      <div className={`nested`}>{props.children}</div>
      <style jsx>{`
        .nested {
          position: relative;
        }
        .nested:nth-child(n + 2) {
          margin-left: ${Theme.BORDER_RADIUS_REGULAR};
        }
        .nested:nth-child(n + 2)::before {
          content: "";
          position: absolute;
          left: -3px;
          top: 0;
          bottom: 15px;
          border-bottom-left-radius: 5px;
          background-color: ${Theme.INDENT_COLORS[
            (props.level - 1) % Theme.INDENT_COLORS.length
          ]};
          width: 3px;
          opacity: 0.6;
        }
      `}</style>
    </>
  );
};

export default ThreadIndent;

export interface ThreadIndentProps {
  children: JSX.Element | JSX.Element[];
  level: number;
}
