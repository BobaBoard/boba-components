import React from "react";
import BoardPreview, { DisplayStyle } from "./BoardPreview";

const BoardsDisplay: React.FC<BoardsDisplayProps> = (props) => {
  return (
    <div className="boards-display">
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
              href={props.getBoardHref(board.slug)}
            ></BoardPreview>
          </div>
        ))}
      </div>
      <style jsx>{`
        .boards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
        }
        .boards-display {
          margin-bottom: 15px;
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
  getBoardHref: (slug: string) => string;
}
