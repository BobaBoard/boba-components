import React from "react";

import BoardPreview, { DisplayStyle } from "./board/BoardPreview";
import BoardsGroup from "./board/BoardsGroup";
import SearchBar from "../src/common/SearchBar";

import classnames from "classnames";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import anime from "../stories/images/anime.png";
import crack from "../stories/images/crack.png";
import oncelerBoard from "../stories/images/onceler-board.png";
import meta from "../stories/images/meta.png";
import book from "../stories/images/book.png";
import villains from "../stories/images/villains.png";
import kinkmeme from "../stories/images/kink-meme.png";
import art from "../stories/images/art-crit.png";

const SideMenu: React.FC<SideMenuProps> = ({ board }) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
      <div className="side-menu">
        <BoardsGroup title="Pinned Boards">
          <BoardPreview
            slug="gore"
            avatar={board.avatar}
            description="Love me some bruised bois (and more)."
            onClick={() => console.log("go!")}
            color="#f96680"
            displayStyle={DisplayStyle.MINI}
          />
          <BoardPreview
            slug="anime"
            avatar={"/" + anime}
            description="We put the weeb in dweeb."
            onClick={() => console.log("go!")}
            displayStyle={DisplayStyle.MINI}
            color="#24d282"
            updates={2}
            backgroundColor="#131518"
          />
          <BoardPreview
            slug="crack"
            avatar={"/" + crack}
            description="What's crackalackin"
            onClick={() => console.log("go!")}
            displayStyle={DisplayStyle.MINI}
            color="#f9e066"
            updates={3}
            backgroundColor="#131518"
          />
          <BoardPreview
            slug="fic-club"
            avatar={"/" + book}
            description="Come enjoy all the fics!"
            onClick={() => console.log("go!")}
            displayStyle={DisplayStyle.MINI}
            color="#7724d2"
            updates={5}
            backgroundColor="#131518"
          />
          <BoardPreview
            slug="meta"
            avatar={"/" + meta}
            description="In My TiMeS wE CaLlEd It WaNk"
            onClick={() => console.log("go!")}
            displayStyle={DisplayStyle.MINI}
            color="#f9e066"
          />
          <BoardPreview
            slug="villain-thirst"
            avatar={"/" + villains}
            description="Love to love 'em."
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
              slug="villain-thirst"
              avatar={"/" + villains}
              description="Love to love 'em."
              onClick={() => console.log("go!")}
              displayStyle={DisplayStyle.COMPACT}
              color="#e22b4b"
            />
            <BoardPreview
              slug="art-crit"
              avatar={"/" + art}
              description="Let's learn together!"
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
              slug="gore"
              avatar={board.avatar}
              description="Love me some bruised bois (and more)."
              onClick={() => console.log("go!")}
              color="#f96680"
              displayStyle={DisplayStyle.COMPACT}
            />
            <BoardPreview
              slug="oncie-den"
              avatar={"/" + oncelerBoard}
              description="Party like it's 2012"
              onClick={() => console.log("go!")}
              color="#27caba"
              displayStyle={DisplayStyle.COMPACT}
              updates={10}
              backgroundColor="#131518"
            />
            <BoardPreview
              slug="fic-club"
              avatar={"/" + book}
              description="Come enjoy all the fics!"
              onClick={() => console.log("go!")}
              color="#7724d2"
              displayStyle={DisplayStyle.COMPACT}
              updates={5}
              backgroundColor="#131518"
            />
            <BoardPreview
              slug="kink-memes"
              avatar={"/" + kinkmeme}
              description="No limits. No shame."
              onClick={() => console.log("go!")}
              color="#000000"
              displayStyle={DisplayStyle.COMPACT}
            />
            <BoardPreview
              slug="crack"
              avatar={"/" + crack}
              description="What's crackalackin"
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
