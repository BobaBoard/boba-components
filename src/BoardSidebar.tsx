import React from "react";

import BoardPreview from "../src/BoardPreview";

const BoardSidebar: React.FC<BoardSidebarProps> = ({ board }) => {
  return (
    <div className="sidebar">
      <div className="board-details">
        <BoardPreview
          slug={board.slug}
          avatar={board.avatar}
          description={board.description}
          color={board.color}
        />
      </div>
      <style jsx>{`
        .sidebar {
          padding: 15px;
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
