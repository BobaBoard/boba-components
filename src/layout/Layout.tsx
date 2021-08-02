import React from "react";
import {
  faBars,
  faCompass,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import Theme from "../theme/default";
import LoadingBar from "../common/LoadingBar";
import noop from "noop-ts";

import "@bobaboard/boba-editor/dist/main.css";

import "normalize.css";

import { LinkWithAction } from "types";
import MenuBar from "./MenuBar";
import Logo from "./Logo";
import useSideMenuTransition from "./useSideMenuTransition";
import BoardTitle from "../board/BoardTitle";

import { CreateBaseCompound, extractCompound } from "../utils/compound-utils";

// import debug from "debug";
// const log = debug("bobaui:layout-log");

const MemoizedMenuBar = React.memo(MenuBar);

export interface LayoutHandler {
  closeSideMenu: () => void;
}

const MainContent = CreateBaseCompound("MainContent");
const PinnedMenuContent = CreateBaseCompound("PinnedMenuContent");
const SideMenuContent = CreateBaseCompound("SideMenuContent");
const ActionButton = CreateBaseCompound("ActionButton");
export interface LayoutCompoundComponent
  extends React.ForwardRefExoticComponent<
    LayoutProps & React.RefAttributes<LayoutHandler>
  > {
  MainContent: React.FC<any>;
  PinnedMenuContent: React.FC<any>;
  SideMenuContent: React.FC<any>;
  ActionButton: React.FC<any>;
}

const Layout = React.forwardRef<LayoutHandler, LayoutProps>(
  function LayoutForwardRef(
    {
      headerAccent,
      title,
      menuOptions,
      selectedMenuOption,
      onUserBarClick,
      titleLink,
      userLoading,
      user,
      loading,
      logoLink,
      updates,
      outdated,
      forceHideTitle,
      loggedInMenuOptions,
      forceHideIdentity,
      onSideMenuButtonClick,
      onSideMenuFullyOpen,
      onCompassClick,
      children,
    },
    ref
  ) {
    const headerRef = React.useRef<HTMLDivElement>(null);
    const sideMenuContent = extractCompound(children, SideMenuContent);
    const mainContent = extractCompound(children, MainContent);
    const pinnedMenuContent = extractCompound(children, PinnedMenuContent);
    const actionButton = extractCompound(children, ActionButton);

    const {
      layoutRef,
      contentRef,
      sideMenuRef,
      setShowSideMenu,
      showSideMenu,
    } = useSideMenuTransition(onSideMenuFullyOpen);

    React.useImperativeHandle(ref, () => ({
      closeSideMenu: () => {
        setShowSideMenu(false);
      },
    }));

    React.useEffect(() => {
      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    const menuBar = (
      <MemoizedMenuBar
        menuOptions={menuOptions}
        selectedOption={selectedMenuOption}
        userMenuOptions={loggedInMenuOptions}
        onLoggedOutUserClick={React.useMemo(
          () => ({ onClick: onUserBarClick || noop, label: "login" }),
          [onUserBarClick]
        )}
        user={user}
        accentColor={headerAccent}
        loading={userLoading}
        onHomeMenuClick={logoLink}
        forceHideIdentity={forceHideIdentity}
      />
    );
    return (
      <div ref={layoutRef}>
        <LoadingBar loading={loading} accentColor={headerAccent} />
        <div className="layout">
          <div
            className={classnames("pinned-bar", {
              "side-menu-open": showSideMenu,
            })}
          >
            <div className={"sidemenu-button-container"}>
              <button
                className={classnames("sidemenu-button menu", {
                  notification: updates,
                  outdated: outdated,
                })}
                aria-label="menu"
                onClick={React.useCallback(() => {
                  if (!showSideMenu) {
                    onSideMenuButtonClick?.();
                  }
                  setShowSideMenu(!showSideMenu);
                }, [showSideMenu, setShowSideMenu, onSideMenuButtonClick])}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <div className="menus-container">
              <div className="pinned-boards">{pinnedMenuContent}</div>
              <div
                className={classnames("side-menu", { visible: showSideMenu })}
                ref={sideMenuRef}
              >
                <div className="side-bottom-menu">{menuBar}</div>
                <div className="side-menu-content">{sideMenuContent}</div>
              </div>
            </div>
          </div>
          <div
            className={classnames("layout-body", {
              "side-menu-open": showSideMenu,
            })}
          >
            <header ref={headerRef}>
              <Logo accentColor={headerAccent} link={logoLink} />
              {title && !forceHideTitle && (
                <BoardTitle
                  accentColor={headerAccent}
                  title={title}
                  link={titleLink}
                />
              )}
              <div
                className={classnames("header-menu-bar", {
                  "has-compass": !!onCompassClick,
                })}
              >
                <button
                  className={classnames("sidemenu-button compass")}
                  onClick={React.useCallback(
                    () => onCompassClick?.(),
                    [onCompassClick]
                  )}
                >
                  <FontAwesomeIcon icon={faCompass} />
                </button>
                <div className="menu-bar">{menuBar}</div>
              </div>
            </header>
            <div
              className={classnames("backdrop", {
                visible: showSideMenu,
              })}
              onClick={() => {
                setShowSideMenu(false);
              }}
            />
            <div ref={contentRef} className="content">
              {mainContent}
              {actionButton}
            </div>
          </div>
          <style jsx>{`
            .layout {
              background-color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
              display: flex;
              font-family: "Inter", sans-serif;
              --side-menu-width: min(
                calc(100vw - 100px),
                ${Theme.SIDE_MENU_MAX_WIDTH_PX}px
              );
            }
            .layout-body {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              position: relative;
              margin-left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            }
            .content {
              display: flex;
              flex-grow: 1;
              position: relative;
              padding-top: ${Theme.HEADER_HEIGHT_PX}px;
              background: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
              transition: transform 0.3s ease-out;
            }
            .backdrop {
              position: absolute;
              background-color: ${Theme.MODAL_BACKGROUND_COLOR};
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              opacity: 0.9;
              z-index: 100;
              width: 0;
            }
            .backdrop.visible {
              display: block;
              transition: transform 0.3s ease-out;
              transform: translateX(var(--side-menu-width));
              width: 100%;
            }
            header {
              background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
              background-image: var(--header-background-image);
              height: ${Theme.HEADER_HEIGHT_PX}px;
              position: fixed;
              top: 0;
              right: 0;
              left: ${Theme.PINNED_BAR_WIDTH_PX}px;
              flex-shrink: 0;
              padding-right: 15px;
              padding-left: 5px;
              display: flex;
              align-items: center;
              z-index: 10;
              transition: transform 0.3s ease-out;
            }
            .layout-body {
              background-color: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
            }
            .layout-body.side-menu-open header {
              transform: translateX(var(--side-menu-width));
            }
            .layout-body.side-menu-open .content {
              transform: translateX(var(--side-menu-width));
              flex-shrink: 0;
            }
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
            .sidemenu-button {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              border: 0;
              background: transparent;
              color: ${Theme.MENU_ITEM_ICON_COLOR};
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              flex-shrink: 0;
              font-size: 20px;
              padding: 0;
            }
            .sidemenu-button:focus {
              outline: none;
            }
            .pinned-bar {
              background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
            }
            .menus-container {
              background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
              color: white;
              min-height: 100vh;
              height: 100%;
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
            .sidemenu-button:focus-visible {
              outline: white auto 1px;
            }
            .sidemenu-button.notification::after {
              content: "";
              position: absolute;
              top: 2px;
              right: 2px;
              width: 10px;
              height: 10px;
              background: ${Theme.NOTIFICATIONS_NEW_COLOR};
              border-radius: 50%;
              border: 2px solid ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
            }

            .sidemenu-button.notification.outdated::after {
              background: ${Theme.NOTIFICATIONS_OUTDATED_COLOR};
            }

            .sidemenu-button.notification:hover::after {
              border-color: ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR};
            }

            .sidemenu-button:hover {
              cursor: pointer;
              background-color: ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR};
            }

            .sidemenu-button:hover {
              color: ${Theme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
            }
            .sidemenu-button.menu {
              margin-left: -3px;
              margin-right: -3px;
              font-size: 22px;
            }
            .sidemenu-button.compass {
              margin-right: -3px;
              display: flex;
              align-items: center;
            }
            .header-menu-bar:not(.has-compass) .sidemenu-button.compass {
              display: none;
            }
            .content {
              flex-grow: 1;
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
                calc(
                  -1 * var(--side-menu-width) - ${Theme.PINNED_BAR_WIDTH_PX}px
                )
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
            .title-text {
              outline: none;
              display: block;
              z-index: 2;
              position: relative;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .layout-body {
              flex-shrink: 0;
              width: calc(100% - ${Theme.PINNED_BAR_WIDTH_PX}px);
            }
            .header-menu-bar {
              height: 100%;
              display: flex;
              flex-grow: 1;
              justify-content: flex-end;
            }
            .sidemenu-button.compass {
              display: none;
            }
            @media only screen and (max-width: ${Theme.MOBILE_WIDTH_TRIGGER_PX}px) {
              .sidemenu-button.compass {
                display: block;
                margin-right: 15px;
                align-self: center;
              }
              .header-menu-bar.has-compass .menu-bar {
                padding-left: 10px;
                border-left: 2px solid #2e2e30;
                border-image: linear-gradient(
                  to bottom,
                  #131518 0%,
                  #131518 15%,
                  #2e2e30 20%,
                  #2e2e30 80%,
                  #131518 85%,
                  #131518 100%
                );
                border-image-slice: 1;
              }
            }
            @media only screen and (max-width: 850px) {
              .layout-body {
                flex-direction: column;
                flex-shrink: 1;
              }
              .sidebar-button {
                display: inline-block;
              }
            }
            @media only screen and (max-width: 600px) {
              header {
                justify-content: space-between;
              }
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
              .header-menu-bar {
                flex-grow: 0;
              }
              .sidemenu-button.compass {
                margin-right: 0;
              }
              .menu-bar {
                display: none;
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
              .layout-body {
                margin-left: 0px;
              }
              .layout-body.side-menu-open {
                margin-left: ${Theme.PINNED_BAR_WIDTH_PX}px;
              }
            }
            @media only screen and (max-width: 450px) {
              .header-menu-bar {
                flex-grow: 0;
              }
              .sidemenu-button.menu {
                margin-right: 0;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }
) as LayoutCompoundComponent;

export interface LayoutProps {
  headerAccent?: string;
  title?: string;
  // Force hides the title from desktop
  forceHideTitle?: boolean;
  user?: { username: string; avatarUrl?: string };
  logoLink?: LinkWithAction;
  titleLink?: LinkWithAction;
  onUserBarClick?: () => void;
  onCompassClick?: () => void;
  loading?: boolean;
  userLoading?: boolean;
  updates?: number | boolean;
  outdated?: boolean;
  menuOptions?: {
    id: string;
    icon: IconDefinition;
    link: LinkWithAction;
  }[];
  selectedMenuOption?: string | null;
  loggedInMenuOptions?: {
    icon: IconDefinition;
    name: string;
    link: LinkWithAction;
  }[];
  onSideMenuButtonClick?: () => void;
  onSideMenuFullyOpen?: () => void;
  forceHideIdentity?: boolean;
  children: JSX.Element[];
}

Layout.MainContent = MainContent;
Layout.PinnedMenuContent = PinnedMenuContent;
Layout.SideMenuContent = SideMenuContent;
Layout.ActionButton = ActionButton;

export default Layout;
