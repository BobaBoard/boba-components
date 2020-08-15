import React from "react";

import BoardPreview, { DisplayStyle } from "../board/BoardPreview";
import BoardsGroup from "../board/BoardsGroup";
import SearchBar from "../common/SearchBar";
import Button from "../common/Button";

import classnames from "classnames";
import Scrollbar from "../common/Scrollbar";

import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SideMenu: React.FC<SideMenuProps> = ({
  pinnedBoards,
  recentBoards,
  searchBoards,
  showSearch,
  showDismissNotifications,
  onNotificationsDismissRequest,
}) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const hasSearchBar = showSearch || typeof showSearch === "undefined";
  return (
    <div>
      <Scrollbar>
        <div className="side-menu">
          {pinnedBoards && (
            <BoardsGroup title="Pinned Boards">
              {pinnedBoards.map((board) => (
                <BoardPreview
                  key={board.slug}
                  slug={board.slug}
                  avatar={board.avatar}
                  description={board.description}
                  onClick={() => board.onClick?.(board.slug)}
                  href={board.href}
                  displayStyle={DisplayStyle.MINI}
                  updates={board.updates}
                  color={board.color}
                />
              ))}
            </BoardsGroup>
          )}

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
                        href={board.href}
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
                    href={board.href}
                  />
                ))}
              </BoardsGroup>
            )}
          </div>
          {showDismissNotifications && (
            <div className="notifications-dismiss-container">
              <Button icon={faCheck} onClick={onNotificationsDismissRequest}>
                Dismiss Notifications
              </Button>
            </div>
          )}
        </div>
      </Scrollbar>
      <style jsx>
        {`
          .side-menu {
            padding: 20px 15px;
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
          .notifications-dismiss-container {
            margin-top: 30px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default SideMenu;

export interface SideMenuProps {
  pinnedBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    onClick?: (slug: string) => void;
    href?: string;
  }[];
  recentBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    onClick?: (slug: string) => void;
    href?: string;
  }[];
  searchBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    onClick?: (slug: string) => void;
    href?: string;
  }[];
  showSearch?: boolean;
  showDismissNotifications?: boolean;
  onNotificationsDismissRequest?: () => void;
}
