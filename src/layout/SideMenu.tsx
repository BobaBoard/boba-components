import React from "react";
import { LinkWithAction } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faClock, faTh } from "@fortawesome/free-solid-svg-icons";

import PinnedBoardsMenu from "../common/PinnedBoardsMenu";
import BoardsMenuSection from "../common/BoardsMenuSection";
import DropdownMenu from "../common/DropdownListMenu";

const SideMenu: React.FC<SideMenuProps> = ({
  pinnedBoards,
  allBoards,
  recentBoards,
  menuOptions,
  onFilterChange,
}) => {
  return (
    <div className="side-menu">
      <div className="pinned-boards-container">
        <PinnedBoardsMenu boards={pinnedBoards} />
      </div>
      <div className="board-menus">
        <div className="board-filter">
          <input
            placeholder="Filter boards"
            onChange={(e) => onFilterChange?.(e.target.value)}
          />
          <DropdownMenu options={menuOptions}>
            <div className="board-filter-options">
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
          </DropdownMenu>
        </div>
        <div className="board-sections">
          <BoardsMenuSection
            title="recent unreads"
            icon={faClock}
            boards={recentBoards}
          />
          <BoardsMenuSection
            title="all boards"
            icon={faTh}
            boards={allBoards}
          />
        </div>
      </div>
      <style jsx>
        {`
          .side-menu {
            background-color: #1c1c1c;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            position: absolute;
            display: flex;
          }
          .board-menus {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .board-sections {
            height: 100%;
            overflow-y: scroll;
          }
          .board-filter {
            padding: 10px;
            position: relative;
            border-bottom: 2px solid #131518;
            display: flex;
            width: 100%;
            justify-content: space-between;
            box-sizing: border-box;
          }
          .board-filter input {
            background: #2e2e30;
            color: #fff;
            font-size: 16px;
            line-height: 16px;
            padding: 3px 10px;
            width: 100%;
            border: 1px solid transparent;
            border-radius: 15px;
            margin-right: 10px;
          }
          .board-filter input:focus {
            outline: none;
            border: 1px rgba(255, 255, 255, 0.8) solid;
          }
          .board-filter-options {
            height: 25px;
            width: 25px;
            background: #2e2e30;
            border-radius: 15px;
            color: #bfbfbf;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media only screen and (max-width: 575px) {
            .board-filter {
              border-top: 2px solid #131518;
            }
            .board-menus {
              flex-direction: column-reverse;
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
  onFilterChange?: (text: string) => void;
}
