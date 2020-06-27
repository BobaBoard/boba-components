import React from "react";
import classnames from "classnames";

export interface ReactionProps {
  image: string;
  count: number;
}
const Reaction: React.FC<ReactionProps> = (props) => {
  return (
    <>
      <div className={classnames("reaction")}>
        <div className="image" />
        <span className="count"> {props.count}</span>
      </div>
      <style jsx>{`
        .reaction {
          border: 3px solid black;
          display: inline-flex;
          width: 63px;
          border-radius: 10px;
          align-items: center;
        }
        .count:hover,
        .reaction:hover {
          cursor: pointer;
        }
        .count {
          flex-grow: 1;
          text-align: center;
          font-size: larger;
          margin-right: 3px;
        }
        .image {
          width: 30px;
          height: 30px;
          background-image: url(${props.image});
          background-position: center;
          background-size: contain;
          border-right: 3px solid black;
          border-radius: 5px 0px 0px 5px;
        }
        .hashtag {
          opacity: 0.6;
          margin-right: 2px;
        }
      `}</style>
    </>
  );
};

export default Reaction;
