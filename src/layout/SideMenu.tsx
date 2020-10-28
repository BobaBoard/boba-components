import React from "react";
import { LinkWithAction } from "types";

import PinnedBoardsMenu from "../common/PinnedBoardsMenu";
import BoardsMenuSection from "../common/BoardsMenuSection";

import StarIcon from "../images/star.svg";
import ClockIcon from "../images/clock.svg";

import Scrollbar from "../common/Scrollbar";

const SideMenu: React.FC<SideMenuProps> = ({
  pinnedBoards,
  recentBoards,
  allBoards,
}) => {
  return (
    <div>
      <Scrollbar>
        <div className="side-menu">
          <PinnedBoardsMenu boards={pinnedBoards} />
          <div className="board-menus">
            <BoardsMenuSection
              title="favorites"
              icon={StarIcon}
              emptyTitle="Title for empty state"
              emptyDescription="Text for an empty states' description"
            />
            <BoardsMenuSection
              title="recent updates"
              icon={ClockIcon}
              boards={recentBoards}
            />
          </div>
        </div>
      </Scrollbar>
      <style jsx>
        {`
          .side-menu {
            background-color: #1c1c1c;
            height: 100vh;
            width: 311px;
            position: relative;
          }
          .board-menus {
            position: absolute;
            top: 0;
            left: 65px;
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
    muted?: boolean;
    link: LinkWithAction;
  }[];
  recentBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    muted?: boolean;
    link: LinkWithAction;
  }[];
  allBoards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    muted?: boolean;
    link: LinkWithAction;
  }[];
  menuOptions?: {
    name: string;
    link: LinkWithAction;
  }[];
}
