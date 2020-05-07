import React from "react";

const BoardsGroup: React.FC<BoardsGroupProps> = (props) => {
  return (
    <div className="boards-group">
      {props.children.map((board, i) => (
        <div className="single-board" key={i}>
          {board}
        </div>
      ))}
      <style jsx>{`
        .boards-group {
          text-align: center;
        }
        .single-board {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default BoardsGroup;

export interface BoardsGroupProps {
  children: JSX.Element[];
}
