import React from "react";

const BoardsGroup: React.FC<BoardsGroupProps> = (props) => {
  return (
    <div className="boards-group">
      <div className="title">{props.title}</div>
      {props.children.map((board, i) => (
        <div className="single-board" key={i}>
          {board}
        </div>
      ))}
      <style jsx>{`
        .title {
          color: white;
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 20px;
        }
        .boards-group {
          margin-bottom: 15px;
        }
        .single-board {
          margin-bottom: 5px;
          margin-right: 15px;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default BoardsGroup;

export interface BoardsGroupProps {
  children: JSX.Element[];
  title: string;
}
