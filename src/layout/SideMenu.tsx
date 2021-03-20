import React, { Children } from "react";
import { BoardType } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons";

import PinnedBoardsMenu from "../common/PinnedBoardsMenu";
import BoardsMenuSection, {
  BoardsMenuSectionProps,
} from "../board/BoardsMenuSection";
import DropdownMenu, {
  DropdownProps,
  DropdownStyle,
} from "../common/DropdownListMenu";
import classnames from "classnames";

interface CompoundComponents {
  BoardsMenuSection: React.FC<BoardsMenuSectionProps>;
}

const SideMenu: React.FC<SideMenuProps> & CompoundComponents = ({
  pinnedBoards,
  menuOptions,
  showPinned,
  onFilterChange,
  currentBoardSlug,
  children,
}) => {
  return (
    <div className="side-menu">
      <div
        className={classnames("pinned-boards-container", {
          visible: !!showPinned,
        })}
      >
        <PinnedBoardsMenu
          boards={pinnedBoards}
          currentBoardSlug={currentBoardSlug}
        />
      </div>
      <div className="board-menus">
        <div className="board-filter">
          <div className="icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
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
          {Children.toArray(children).map((child) => {
            if (
              !React.isValidElement<BoardsMenuSectionProps>(child) ||
              child.type !== BoardsMenuSection
            ) {
              throw Error(
                "SideMenu only accepts BoardsMenuSections as children"
              );
            }
            const menuSection: React.ReactElement<BoardsMenuSectionProps> = child;
            return React.cloneElement<BoardsMenuSectionProps>(menuSection, {
              key: menuSection.props.title,
              currentBoardSlug,
            });
          })}
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
            overflow-x: hidden;
          }
          .icon {
            color: #bfbfbf;
            align-self: center;
            margin-right: 10px;
          }
          .pinned-boards-container {
            display: none;
          }
          .pinned-boards-container.visible {
            display: block;
          }
          .pinned-boards-container.visible::-webkit-scrollbar {
            display: none;
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
          .board-filter-options:hover {
            cursor: pointer;
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

SideMenu.BoardsMenuSection = BoardsMenuSection;
export default SideMenu;

export interface SideMenuProps {
  pinnedBoards?: BoardType[];
  currentBoardSlug?: string | null;
  menuOptions?: DropdownProps["options"];
  showPinned?: boolean;
  onFilterChange?: (text: string) => void;
  children: React.ReactNode;
}
