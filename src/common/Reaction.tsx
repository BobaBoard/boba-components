import React from "react";
import classnames from "classnames";

export interface ReactionProps {
  image: string;
  count: number;
  onClick?: () => void;
}
const Reaction: React.FC<ReactionProps> = (props) => {
  return (
    <>
      <div className={classnames("reaction")} onClick={props.onClick}>
        <div className="image" />
        <span className="count"> {props.count}</span>
      </div>
      <style jsx>{`
        .reaction {
          display: inline-block;
          position: relative;
          width: 40px;
        }
        .count:hover,
        .reaction:hover,
        .image:hover {
          cursor: pointer;
        }
        .count {
          text-align: center;
          font-size: x-small;
          line-height: 15px;
          width: 20px;
          height: 15px;
          border-radius: 5px;
          background-color: rgb(28, 28, 28);
          color: white;
          position: absolute;
          bottom: -5px;
          left: 20px;
        }
        .image {
          width: 30px;
          height: 30px;
          background-image: url(${props.image});
          background-position: center;
          background-size: contain;
          border-radius: 50%;
          border: 2px solid rgb(28, 28, 28);
        }
      `}</style>
    </>
  );
};

export default Reaction;
