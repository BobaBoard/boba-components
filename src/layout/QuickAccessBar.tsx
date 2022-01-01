import IconButton from "../buttons/IconButton";
import { IconProps } from "common/Icon";
import { LinkWithAction } from "types";
import React from "react";
import Theme from "../theme/default";
import classnames from "classnames";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface QuickAccessBarProps {
  hasNotifications: boolean;
  hasOutdatedNotifications: boolean;
  notificationIcon?: IconProps["icon"];
  sideMenuOpen: boolean;
  setShowSideMenu: (show: boolean) => void;
  onSideMenuButtonClick?: LinkWithAction;
  pinnedMenuContent: React.ReactNode;
  menuBarContent: React.ReactNode;
  sideMenuContent: React.ReactNode;
}

const QuickAccessBar: React.ForwardRefRenderFunction<
  HTMLDivElement,
  QuickAccessBarProps
> = (
  {
    hasNotifications,
    hasOutdatedNotifications,
    sideMenuOpen,
    sideMenuContent,
    onSideMenuButtonClick,
    pinnedMenuContent,
    menuBarContent,
    notificationIcon,
  },
  sideMenuRef
) => {
  return (
    <div
      className={classnames("pinned-bar", {
        "side-menu-open": sideMenuOpen,
      })}
    >
      <div className={"sidemenu-button-container"}>
        <IconButton
          icon={faBars}
          label="menu"
          notificationIcon={notificationIcon}
          notificationColor={
            hasNotifications
              ? hasOutdatedNotifications
                ? Theme.NOTIFICATIONS_OUTDATED_COLOR
                : Theme.NOTIFICATIONS_NEW_COLOR
              : undefined
          }
          link={onSideMenuButtonClick}
        />
      </div>
      <div className="menus-container">
        <div className="pinned-boards">{pinnedMenuContent}</div>
        <div
          className={classnames("side-menu", { visible: sideMenuOpen })}
          ref={sideMenuRef}
        >
          <div className="side-bottom-menu">{menuBarContent}</div>
          <div className="side-menu-content">{sideMenuContent}</div>
        </div>
      </div>
      <style jsx>{`
        .sidemenu-button-container {
          width: ${Theme.PINNED_BAR_WIDTH_PX}px;
          height: ${Theme.HEADER_HEIGHT_PX}px;
          background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 95;
        }
        .side-menu {
          background-color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
          overflow: hidden;
          z-index: 1;
          width: var(--side-menu-width);
          flex-shrink: 0;
          overscroll-behavior: contain;
          position: fixed;
          top: 0;
          left: ${Theme.PINNED_BAR_WIDTH_PX}px;
          bottom: 0;
          transition: transform 0.3s ease-out;
          transform: translateX(
            calc(-1 * var(--side-menu-width) - ${Theme.PINNED_BAR_WIDTH_PX}px)
          );
        }
        .side-menu.closed {
          //visibility: hidden;
        }
        .side-menu-content {
          width: var(--side-menu-width);
          position: relative;
          height: 100%;
        }
        .side-menu.visible {
          transform: translateX(0);
          visibility: visible;
        }
        .side-bottom-menu {
          display: none;
        }
        /**
         * Having overflow: auto as the iOS page loads will cause a weird bug
         * where the sidemenu flickers before disappearing. We cannot use display:none
         * to fix it, because it then messes with the width transition. Keeping
         * overflow: auto only when the side-menu is open fixes the problem.
         */
        .side-menu.opened .side-menu-content {
          overflow: auto;
        }
        .side-menu:not(.opened) .side-menu-content {
          overflow: hidden;
        }
        .menus-container {
          background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
          color: white;
          min-height: 100vh;
          height: 100%;
        }
        .pinned-bar {
          background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
        }
        .pinned-boards {
          background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
          z-index: 94;
          padding-top: ${Theme.HEADER_HEIGHT_PX}px;
          left: 0px;
          bottom: 0px;
          min-height: calc(100vh - ${Theme.HEADER_HEIGHT_PX}px);
          width: ${Theme.PINNED_BAR_WIDTH_PX}px;
          display: block;
          position: fixed;
          top: 0;
          overflow: hidden scroll;
          overscroll-behavior: contain;
          scrollbar-width: none;
        }
        .pinned-boards::-webkit-scrollbar {
          width: 0px;
          background: transparent; /* Chrome/Safari/Webkit */
        }
        @media only screen and (max-width: 600px) {
          .side-menu {
            background-color: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
          }
          .side-menu-content {
            height: calc(100% - ${Theme.HEADER_HEIGHT_PX}px);
            margin-top: ${Theme.HEADER_HEIGHT_PX}px;
            width: var(--side-menu-width);
          }
          .side-bottom-menu {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 0px;
            background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
            display: block;
            width: 100%;
            max-width: var(--side-menu-width);
            overflow: hidden;
            z-index: 10;
            width: var(--side-menu-width);
          }
          .side-menu:not(.visible) .side-menu-content {
            height: 100%;
          }
          .side-menu:not(.closed) .side-bottom-menu {
            height: ${Theme.HEADER_HEIGHT_PX}px;
          }
          .pinned-boards {
            display: none;
          }
          .side-menu-open .pinned-boards {
            display: block;
            position: fixed;
            top: 0;
          }
        }
        @media only screen and (max-width: 450px) {
          .sidemenu-button.menu {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default React.forwardRef(QuickAccessBar);
