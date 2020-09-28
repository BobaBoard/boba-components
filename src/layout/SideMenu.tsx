import React from "react";

import { DisplayStyle } from "../board/BoardPreview";
import BoardsDisplay from "../board/BoardsDisplay";
import SearchBar from "../common/SearchBar";
import Button from "../common/Button";
import LoadingBar from "../common/LoadingBar";

import classnames from "classnames";
import Scrollbar from "../common/Scrollbar";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { LinkWithAction } from "types";

const SideMenu: React.FC<SideMenuProps> = ({
  loading,
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
      <LoadingBar loading={loading} />
      <Scrollbar>
        <div className="side-menu">
          {pinnedBoards && (
            <div className="pinned-boards">
              <BoardsDisplay
                title="Pinned Boards"
                boards={pinnedBoards}
                boardsDisplayStyle={DisplayStyle.MINI}
              />
            </div>
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
                  <BoardsDisplay title="Search Results" boards={searchBoards} />
                )}
              </div>
            </>
          )}
          <div
            className={classnames("recent-boards", { visible: !searchVisible })}
          >
            {recentBoards && (
              <BoardsDisplay
                title="Recent Boards"
                boards={recentBoards}
              ></BoardsDisplay>
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
          .pinned-boards {
            max-width: 400px;
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
    link: LinkWithAction;
  }[];
  recentBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    link: LinkWithAction;
  }[];
  searchBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    link: LinkWithAction;
  }[];
  showSearch?: boolean;
  showDismissNotifications?: boolean;
  onNotificationsDismissRequest?: () => void;
  loading?: boolean;
}
