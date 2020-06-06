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
  showSearch,
}) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const hasSearchBar = showSearch || typeof showSearch === "undefined";
  return (
    <Scrollbar>
      <div className="side-menu">
        <BoardsGroup title="Pinned Boards">
          {pinnedBoards.map((board) => (
            <BoardPreview
              slug={board.slug}
              avatar={board.avatar}
              description={board.description}
              onClick={() => board.onClick?.(board.slug)}
              displayStyle={DisplayStyle.MINI}
              updates={board.updates}
              color={board.color}
            />
          ))}
        </BoardsGroup>

        {hasSearchBar && (
          <>
            <div className="search-bar">
              <SearchBar
                initialText={"Search Boards"}
                onChange={(text) => {
                  setSearchVisible(text != "");
                }}
              />
            </div>
            <div
              className={classnames("search-result", {
                visible: searchVisible,
              })}
            >
              {searchBoards && (
                <BoardsGroup title="Search Results">
                  {searchBoards.map((board) => (
                    <BoardPreview
                      slug={board.slug}
                      avatar={board.avatar}
                      description={board.description}
                      onClick={() => board.onClick?.(board.slug)}
                      displayStyle={DisplayStyle.COMPACT}
                      updates={board.updates}
                      color={board.color}
                    />
                  ))}
                </BoardsGroup>
              )}
            </div>
          </>
        )}
        <div
          className={classnames("recent-boards", { visible: !searchVisible })}
        >
          {recentBoards && (
            <BoardsGroup title="Recent Boards">
              {recentBoards.map((board) => (
                <BoardPreview
                  slug={board.slug}
                  avatar={board.avatar}
                  description={board.description}
                  onClick={() => board.onClick?.(board.slug)}
                  displayStyle={DisplayStyle.COMPACT}
                  updates={board.updates}
                  color={board.color}
                />
              ))}
            </BoardsGroup>
          )}
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
    onClick?: (slug: string) => void;
  }[];
  recentBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    onClick?: (slug: string) => void;
  }[];
  searchBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    onClick?: (slug: string) => void;
  }[];
  showSearch?: boolean;
}
