import React from "react";
import { BoardType } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons";

import PinnedMenu, { PinnedMenuSectionProps } from "./PinnedMenu";
import BoardsMenuSection, { BoardsMenuSectionProps } from "./BoardsMenuSection";
import DropdownMenu, {
  DropdownProps,
  DropdownStyle,
} from "../common/DropdownListMenu";
import classnames from "classnames";
import DefaultTheme from "../theme/default";
import { extractCompounds } from "../utils/compound-utils";

export interface SideMenuHandler {
  focusBoardFilter: () => void;
}

export interface SideMenuCompoundComponent
  extends React.ForwardRefExoticComponent<
    SideMenuProps & React.RefAttributes<SideMenuHandler>
  > {
  BoardsMenuSection: React.FC<BoardsMenuSectionProps>;
  PinnedMenuSection: React.FC<PinnedMenuSectionProps>;
}
//
const SideMenu = React.forwardRef<SideMenuHandler, SideMenuProps>(
  function SideMenuForwardRef(
    { menuOptions, showPinned, onFilterChange, currentBoardSlug, children },
    ref
  ) {
    const boardFilterRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => ({
      focusBoardFilter: () => {
        boardFilterRef.current?.focus();
      },
    }));

    const boardSections = extractCompounds(children, BoardsMenuSection);
    const pinnedSections = extractCompounds(children, PinnedMenu.Section);
    return (
      <div className="side-menu">
        <div
          className={classnames("pinned-boards-container", {
            visible: !!showPinned && !!pinnedSections?.length,
          })}
        >
          <PinnedMenu>{pinnedSections}</PinnedMenu>
        </div>
        <div className="board-menus">
          <div
            className={classnames("board-filter", {
              "with-options": menuOptions && menuOptions.length > 0,
            })}
          >
            <div className="icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              placeholder="Filter boards"
              onChange={(e) => onFilterChange?.(e.target.value)}
              ref={boardFilterRef}
            />
            <DropdownMenu
              options={menuOptions}
              style={DropdownStyle.DARK}
              zIndex={101}
            >
              <div className={classnames("board-filter-options")}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </div>
            </DropdownMenu>
          </div>
          <div className="boards">
            <div
              className={classnames("board-sections", {
                collapsed: true,
              })}
            >
              {boardSections.map((section) =>
                React.cloneElement(section, {
                  key: section.props.title,
                  currentBoardSlug,
                })
              )}
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .side-menu {
              background-color: ${DefaultTheme.BOARD_MENU_BACKGROUND};
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
            .boards {
              display: flex;
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
              flex-grow: 1;
            }
            .board-sections.collapsed {
              width: 0;
            }
            .board-filter {
              padding: 10px;
              position: relative;
              border-bottom: 2px solid ${DefaultTheme.PINNED_BAR_BACKGROUND};
              display: flex;
              width: 100%;
              justify-content: space-between;
              box-sizing: border-box;
            }
            .board-filter.with-options input {
              margin-right: 5px;
            }
            .board-filter .icon {
              color: ${DefaultTheme.BOARD_FILTER_TEXT_COLOR};
              opacity: 0.8;
              position: absolute;
              font-size: 14px;
              left: 20px;
              top: 50%;
              transform: translateY(-50%);
            }
            .board-filter input {
              background: ${DefaultTheme.BOARD_FILTER_BACKGROUND};
              color: ${DefaultTheme.BOARD_FILTER_TEXT_COLOR};
              font-size: var(--font-size-regular);
              line-height: 16px;
              padding: 3px 10px;
              width: 100%;
              border: 1px solid transparent;
              border-radius: 15px;
              border: 1px rgba(255, 255, 255, 0.2) solid;
              padding-left: 32px;
            }
            .board-filter input:focus {
              outline: none;
              border: 1px rgba(255, 255, 255, 0.8) solid;
            }
            .board-filter-options {
              height: 25px;
              width: 25px;
              background: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
              border-radius: 15px;
              color: #bfbfbf;
              display: none;
              justify-content: center;
              align-items: center;
            }
            .board-filter-options:hover {
              cursor: pointer;
            }
            .board-filter.with-options .board-filter-options {
              display: flex;
            }
          `}
        </style>
      </div>
    );
  }
) as SideMenuCompoundComponent;

SideMenu.BoardsMenuSection = BoardsMenuSection;
SideMenu.PinnedMenuSection = PinnedMenu.Section;
export default SideMenu;

export interface SideMenuProps {
  pinnedBoards?: BoardType[];
  currentBoardSlug?: string | null;
  menuOptions?: DropdownProps["options"];
  showPinned?: boolean;
  onFilterChange?: (text: string) => void;
  children: React.ReactNode;
}
