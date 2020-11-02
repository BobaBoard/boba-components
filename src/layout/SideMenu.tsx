import React from "react";
import { LinkWithAction } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import PinnedBoardsMenu from "../common/PinnedBoardsMenu";
import BoardsMenuSection from "../common/BoardsMenuSection";
import DropdownMenu from "../common/DropdownListMenu";
import Scrollbar from "../common/Scrollbar";

import StarIcon from "../images/star.svg";
import ClockIcon from "../images/clock.svg";

const SideMenu: React.FC<SideMenuProps> = ({
  pinnedBoards,
  recentBoards,
  menuOptions,
}) => {
  return (
    <div>
      <Scrollbar>
        <div className="side-menu">
          <PinnedBoardsMenu boards={pinnedBoards} />
          <div className="board-menus">
            <div className="board-filter">
              <input placeholder="Filter boards" />
              <DropdownMenu options={menuOptions}>
                <div className="board-filter-options">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
              </DropdownMenu>
            </div>
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
            height: 100%;
          }
          .board-filter {
            padding: 10px;
            position: relative;
            border-bottom: 2px solid #131518;
          }
          .board-filter input {
            background: #2e2e30;
            color: #fff;
            font-size: 16px;
            line-height: 20px;
            padding: 2px 10px;
            border: none;
            border-radius: 15px;
            width: 160px;
          }
          .board-filter input:focus {
            outline: none;
          }
          .board-filter-options {
            height: 25px;
            width: 25px;
            background: #2e2e30;
            border-radius: 15px;
            position: absolute;
            top: 10px;
            right: 12px;
            color: #bfbfbf;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media only screen and (max-width: 575px) {
            .board-filter {
              border-bottom: 0;
              border-top: 2px solid #131518;
              position: absolute;
              bottom: 0;
              width: 92%;
            }
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
