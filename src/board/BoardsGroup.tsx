import React from "react";

const BoardsGroup: React.FC<BoardsGroupProps> = (props) => {
  return (
    <div className="boards-group">
      {props.title && <div className="title">{props.title}</div>}
      <div className="boards">
        {props.children.map((board, i) => (
          <div className="single-board" key={i}>
            {board}
          </div>
        ))}
      </div>
      <style jsx>{`
        .title {
          color: white;
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 20px;
        }
        .boards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
        }
        .boards-group {
          margin-bottom: 15px;
        }
        .single-board {
        }
      `}</style>
    </div>
  );
};

export default BoardsGroup;

export interface BoardsGroupProps {
  children: JSX.Element[];
  title?: string;
}
