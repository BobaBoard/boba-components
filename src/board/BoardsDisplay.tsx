import React from "react";
import BoardPreview, { DisplayStyle } from "./BoardPreview";

const BoardsDisplay: React.FC<BoardsDisplayProps> = (props) => {
  return (
    <div className="boards-group">
      <div className="boards">
        {props.boards.map((board, i) => (
          <div
            className="single-board"
            key={i}
            onClick={() => props.onBoardClick(board.slug)}
          >
            <BoardPreview
              slug={board.slug}
              avatar={board.avatar}
              description={board.description}
              color={board.color}
              updates={board.updates}
              displayStyle={DisplayStyle.COMPACT}
            ></BoardPreview>
          </div>
        ))}
      </div>
      <style jsx>{`
        .boards {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }
        .boards-group {
          margin-bottom: 15px;
        }
        .single-board {
          margin-bottom: 5px;
          margin-right: 15px;
        }
      `}</style>
    </div>
  );
};

export default BoardsDisplay;

export interface BoardsDisplayProps {
  boards: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number | boolean;
  }[];
  onBoardClick: (slug: string) => void;
}
