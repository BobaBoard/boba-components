import React from "react";
import { LinkWithAction } from "types";
import BoardPreview, { DisplayStyle } from "./BoardPreview";

const BoardsDisplay: React.FC<BoardsDisplayProps> = (props) => {
  return (
    <div className="boards-display">
      {props.title && <div className="title">{props.title}</div>}
      <div className="boards">
        {props.boards.map((board, i) => (
          <div
            className="single-board"
            key={board.slug}
            onClick={board.link?.onClick}
          >
            <BoardPreview
              slug={board.slug}
              avatar={board.avatar}
              description={board.description}
              color={board.color}
              updates={board.updates}
              displayStyle={props.boardsDisplayStyle || DisplayStyle.COMPACT}
              href={board.link?.href}
            ></BoardPreview>
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
          grid-template-columns: repeat(
            auto-fit,
            minmax(${props.minSizePx || 100}px, 1fr)
          );
          gap: 10px;
          row-gap: 10px;
          grid-row-gap: 10px;
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
    link: LinkWithAction;
  }[];
  title?: string;
  boardsDisplayStyle?: DisplayStyle;
  minSizePx?: number;
}
