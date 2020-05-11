import React from "react";

import BoardPreview, { DisplayStyle } from "../src/BoardPreview";
import BoardsGroup from "../src/BoardsGroup";
import SearchBar from "../src/common/SearchBar";

import classnames from "classnames";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const SideMenu: React.FC<SideMenuProps> = ({ board }) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
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
            updates={2}
            backgroundColor="#131518"
          />
          <BoardPreview
            slug="meta"
            avatar={board.avatar}
            description="Love me some bruised bois (and more)."
            onClick={() => console.log("go!")}
            displayStyle={DisplayStyle.MINI}
            color="#f9e066"
          />
          <BoardPreview
            slug="meta"
            avatar={board.avatar}
            description="Love me some bruised bois (and more)."
            onClick={() => console.log("go!")}
            displayStyle={DisplayStyle.MINI}
            color="#7724d2"
            updates={5}
            backgroundColor="#131518"
          />
          <BoardPreview
            slug="meta"
            avatar={board.avatar}
            description="Love me some bruised bois (and more)."
            onClick={() => console.log("go!")}
            displayStyle={DisplayStyle.MINI}
            color="#f9e066"
          />
          <BoardPreview
            slug="meta"
            avatar={board.avatar}
            description="Love me some bruised bois (and more)."
            onClick={() => console.log("go!")}
            displayStyle={DisplayStyle.MINI}
            color="#e22b4b"
          />
        </BoardsGroup>

        <div className="search-bar">
          <SearchBar
            initialText={"Search Boards"}
            onChange={(text) => {
              setSearchVisible(text != "");
            }}
          />
        </div>
        <div
          className={classnames("search-result", { visible: searchVisible })}
        >
          <BoardsGroup title="Search Results">
            <BoardPreview
              slug="fic-club"
              avatar={board.avatar}
              description="Come enjoy all the fics!"
              onClick={() => console.log("go!")}
              color="#7724d2"
              displayStyle={DisplayStyle.COMPACT}
            />
            <BoardPreview
              slug="fic-club"
              avatar={board.avatar}
              description="Come enjoy all the fics!"
              onClick={() => console.log("go!")}
              color="#27caba"
              displayStyle={DisplayStyle.COMPACT}
            />
          </BoardsGroup>
        </div>
        <div
          className={classnames("recent-boards", { visible: !searchVisible })}
        >
          <BoardsGroup title="Recent Boards">
            <BoardPreview
              slug="fic-club"
              avatar={board.avatar}
              description="Come enjoy all the fics!"
              onClick={() => console.log("go!")}
              color="#27caba"
              displayStyle={DisplayStyle.COMPACT}
              updates={10}
              backgroundColor="#131518"
            />
            <BoardPreview
              slug="fic-club"
              avatar={board.avatar}
              description="Come enjoy all the fics!"
              onClick={() => console.log("go!")}
              color="#7724d2"
              displayStyle={DisplayStyle.COMPACT}
            />
            <BoardPreview
              slug="fic-club"
              avatar={board.avatar}
              description="Come enjoy all the fics!"
              onClick={() => console.log("go!")}
              color="#000000"
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
              color="#f9e066"
              displayStyle={DisplayStyle.COMPACT}
              updates={3}
              backgroundColor="#131518"
            />
          </BoardsGroup>
        </div>
        <style jsx>
          {`
            .side-menu {
              padding: 15px;
            }
            .search-bar {
              margin-top: 20px;
              text-align: center;
              margin-bottom: 15px;
            }
            .recent-boards {
              display: none;
            }
            .recent-boards.visible {
              display: block;
            }
            .search-result {
              display: none;
            }
            .search-result.visible {
              display: block;
            }
          `}
        </style>
      </div>
    </SimpleBar>
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