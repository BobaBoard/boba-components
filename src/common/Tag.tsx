import React from "react";
import classnames from "classnames";

export interface TagProps {
  name: string;
  symbol?: string | JSX.Element;
  avatar?: string;
  color?: string;
  compact?: boolean;
}
const Tag: React.FC<TagProps> = (props) => {
  return (
    <>
      <div className={classnames("tag", { compact: !!props.compact })}>
        <span className="hashtag">{props.symbol || "#"}</span>
        {props.name}
      </div>
      <style jsx>{`
        .hashtag {
          opacity: 0.6;
          margin-right: 2px;
        }
        .tag {
          display: inline-block;
          padding: 5px 10px;
          border: 3px black solid;
          border-radius: 10px;
          background-color: ${props.color};
          font-weight: bold;
          cursor: pointer;
        }
        .tag.compact {
          border: 0px;
          font-size: smaller;
          padding: 3px 6px;
          font-weight: normal;
        }
      `}</style>
    </>
  );
};

export default Tag;
