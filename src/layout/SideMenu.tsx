import React from "react";
import { BoardType } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faClock, faTh } from "@fortawesome/free-solid-svg-icons";

import PinnedBoardsMenu from "../common/PinnedBoardsMenu";
import BoardsMenuSection from "../common/BoardsMenuSection";
import DropdownMenu, {
  DropdownProps,
  DropdownStyle,
} from "../common/DropdownListMenu";
import classnames from "classnames";

const SideMenu: React.FC<SideMenuProps> = ({
  pinnedBoards,
  allBoards,
  recentBoards,
  menuOptions,
  showRecent,
  showPinned,
  onFilterChange,
}) => {
  return (
    <div className="side-menu">
      <div
        className={classnames("pinned-boards-container", {
          visible: !!showPinned,
        })}
      >
        <PinnedBoardsMenu boards={pinnedBoards} />
      </div>
      <div className="board-menus">
        <div className="board-filter">
          <input
            placeholder="Filter boards"
            onChange={(e) => onFilterChange?.(e.target.value)}
          />
          <DropdownMenu
            options={menuOptions}
            style={DropdownStyle.DARK}
            zIndex={101}
          >
            <div
              className={classnames("board-filter-options", {
                visible: menuOptions && menuOptions.length > 0,
              })}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
          </DropdownMenu>
        </div>
        <div className="board-sections">
          <div
            className={classnames("recent-section", {
              visible: showRecent,
            })}
          >
            <BoardsMenuSection
              key="recent-unreads"
              title="recent unreads"
              icon={faClock}
              boards={recentBoards}
              emptyTitle="Congratulations!"
              emptyDescription="You read 'em all."
            />
          </div>
          <BoardsMenuSection
            key="all-boards"
            title="all boards"
            icon={faTh}
            boards={allBoards}
            emptyTitle="There's no board here."
            emptyDescription="Somehow, that feels wrong."
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
          .pinned-boards-container {
            display: none;
          }
          .pinned-boards-container.visible {
            display: block;
          }
          .recent-section {
            display: none;
          }
          .recent-section.visible {
            display: block;
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
            display: none;
            justify-content: center;
            align-items: center;
          }
          .board-filter-options.visible {
            display: flex;
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
  pinnedBoards?: BoardType[];
  recentBoards?: BoardType[];
  allBoards?: BoardType[];
  menuOptions?: DropdownProps["options"];
  showRecent?: boolean;
  showPinned?: boolean;
  // TODO: actually implement loading
  loading?: boolean;
  onFilterChange?: (text: string) => void;
}
