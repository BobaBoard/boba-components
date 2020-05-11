import React from "react";

import BoardPreview, { DisplayStyle } from "../src/BoardPreview";
import BoardsGroup from "../src/BoardsGroup";

const SideMenu: React.FC<SideMenuProps> = ({ board }) => {
  return (
    <div className="side-menu">
      <BoardsGroup title="Pinned Boards">
        <BoardPreview
          slug="fic-club"
          avatar={board.avatar}
          description="Come enjoy all the fics!"
          onClick={() => console.log("go!")}
          color="#f96680"
          displayStyle={DisplayStyle.MINI}
        />
        <BoardPreview
          slug="meta"
          avatar={board.avatar}
          description="Love me some bruised bois (and more)."
          onClick={() => console.log("go!")}
          displayStyle={DisplayStyle.MINI}
          color="#24d282"
        />
        <BoardPreview
          slug="meta"
          avatar={board.avatar}
          description="Love me some bruised bois (and more)."
          onClick={() => console.log("go!")}
          displayStyle={DisplayStyle.MINI}
          color="#24d282"
        />
        <BoardPreview
          slug="meta"
          avatar={board.avatar}
          description="Love me some bruised bois (and more)."
          onClick={() => console.log("go!")}
          displayStyle={DisplayStyle.MINI}
          color="#24d282"
        />
        <BoardPreview
          slug="meta"
          avatar={board.avatar}
          description="Love me some bruised bois (and more)."
          onClick={() => console.log("go!")}
          displayStyle={DisplayStyle.MINI}
          color="#24d282"
        />
        <BoardPreview
          slug="meta"
          avatar={board.avatar}
          description="Love me some bruised bois (and more)."
          onClick={() => console.log("go!")}
          displayStyle={DisplayStyle.MINI}
          color="#24d282"
        />
      </BoardsGroup>
      <BoardsGroup title="Recent Boards">
        <BoardPreview
          slug="fic-club"
          avatar={board.avatar}
          description="Come enjoy all the fics!"
          onClick={() => console.log("go!")}
          color="#f96680"
          displayStyle={DisplayStyle.COMPACT}
        />
        <BoardPreview
          slug="fic-club"
          avatar={board.avatar}
          description="Come enjoy all the fics!"
          onClick={() => console.log("go!")}
          color="#f96680"
          displayStyle={DisplayStyle.COMPACT}
        />
        <BoardPreview
          slug="fic-club"
          avatar={board.avatar}
          description="Come enjoy all the fics!"
          onClick={() => console.log("go!")}
          color="#f96680"
          displayStyle={DisplayStyle.COMPACT}
        />
        <BoardPreview
          slug="fic-club"
          avatar={board.avatar}
          description="Come enjoy all the fics!"
          onClick={() => console.log("go!")}
          color="#f96680"
          displayStyle={DisplayStyle.COMPACT}
        />
        <BoardPreview
          slug="fic-club"
          avatar={board.avatar}
          description="Come enjoy all the fics!"
          onClick={() => console.log("go!")}
          color="#f96680"
          displayStyle={DisplayStyle.COMPACT}
        />
        <BoardPreview
          slug="fic-club"
          avatar={board.avatar}
          description="Come enjoy all the fics!"
          onClick={() => console.log("go!")}
          color="#f96680"
          displayStyle={DisplayStyle.COMPACT}
        />
      </BoardsGroup>
      <style jsx>
        {`
          .side-menu {
            padding: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default SideMenu;

export interface SideMenuProps {
  board: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
  };
}
