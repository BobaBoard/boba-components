import React from "react";

import BoardPreview from "../src/BoardPreview";
import Tag from "../src/Tag";

const BoardSidebar: React.FC<BoardSidebarProps> = ({ board }) => {
  return (
    <div className="sidebar">
      <div className="board-details">
        <BoardPreview
          slug={board.slug}
          avatar={board.avatar}
          description={board.description}
          color={board.color}
        >
          <Tag name="blood" color="#f96680" />
          <Tag name="knifeplay" color="#93b3b0" />
          <Tag name="aesthetic" color="#24d282" />
        </BoardPreview>
      </div>
      <style jsx>{`
        .sidebar {
          padding: 20px;
        }
        .board-details {
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
};

export default BoardSidebar;

export interface BoardSidebarProps {
  board: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
  };
}
