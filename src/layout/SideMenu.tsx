import React from "react";

import BoardPreview, { DisplayStyle } from "../board/BoardPreview";
import BoardsGroup from "../board/BoardsGroup";
import SearchBar from "../common/SearchBar";

import classnames from "classnames";
import Scrollbar from "../common/Scrollbar";
import "simplebar/dist/simplebar.min.css";

const SideMenu: React.FC<SideMenuProps> = ({
  pinnedBoards,
  recentBoards,
  searchBoards,
}) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  return (
    <Scrollbar>
      <div className="side-menu">
        <BoardsGroup title="Pinned Boards">
          {pinnedBoards.map((board) => (
            <BoardPreview
              slug={board.slug}
              avatar={board.avatar}
              description={board.description}
              onClick={() => console.log("go!")}
              displayStyle={DisplayStyle.MINI}
              updates={board.updates}
              color={board.color}
            />
          ))}
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
            {searchBoards.map((board) => (
              <BoardPreview
                slug={board.slug}
                avatar={board.avatar}
                description={board.description}
                onClick={() => console.log("go!")}
                displayStyle={DisplayStyle.COMPACT}
                updates={board.updates}
                color={board.color}
              />
            ))}
          </BoardsGroup>
        </div>
        <div
          className={classnames("recent-boards", { visible: !searchVisible })}
        >
          <BoardsGroup title="Recent Boards">
            {recentBoards.map((board) => (
              <BoardPreview
                slug={board.slug}
                avatar={board.avatar}
                description={board.description}
                onClick={() => console.log("go!")}
                displayStyle={DisplayStyle.COMPACT}
                updates={board.updates}
                color={board.color}
              />
            ))}
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
    </Scrollbar>
  );
};

export default SideMenu;

export interface SideMenuProps {
  pinnedBoards: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
  }[];
  recentBoards: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
  }[];
  searchBoards: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
  }[];
}
