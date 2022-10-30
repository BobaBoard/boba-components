import "@bobaboard/boba-editor/dist/main.css";
import "normalize.css";

import { CreateBaseCompound, extractCompound } from "utils/compound-utils";
import MenuBar, { MenuBarProps } from "./MenuBar";
import useSideMenuTransition, {
  useSwipeHandler,
} from "./useSideMenuTransition";

import { DropdownProps } from "common/DropdownListMenu";
import Header from "./Header";
import IconButton from "buttons/IconButton";
import { IconProps } from "common/Icon";
import { LinkWithAction } from "types";
import LoadingBar from "common/LoadingBar";
import React from "react";
import Theme from "theme/default";
import classnames from "classnames";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
  MainContent: React.FC<unknown>;
  PinnedMenuContent: React.FC<unknown>;
  SideMenuContent: React.FC<unknown>;
  ActionButton: React.FC<unknown>;
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
      hasNotifications,
      hasOutdatedNotifications,
      notificationIcon,
      notificationColor,
      hideTitleOnDesktop,
      loggedInMenuOptions,
      forceHideIdentity,
      onCompassClick,
      children,
    },
    ref
  ) {
    const sideMenuContent = extractCompound(children, SideMenuContent);
    const mainContent = extractCompound(children, MainContent);
    const pinnedMenuContent = extractCompound(children, PinnedMenuContent);
    const actionButton = extractCompound(children, ActionButton);

    const { setShowSideMenu, sideMenuRefHandler, showSideMenu, inTransition } =
      useSideMenuTransition();
    const swipeHandler = useSwipeHandler({ setShowSideMenu });
    const sideMenuFullyClosed = !showSideMenu && !inTransition;

    React.useImperativeHandle(
      ref,
      () => ({
        closeSideMenu: () => {
          setShowSideMenu(false);
        },
      }),
      [setShowSideMenu]
    );

    React.useEffect(() => {
      if (!sideMenuFullyClosed) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.removeProperty("overflow");
      }
      return () => {
        document.body.style.removeProperty("overflow");
      };
    }, [sideMenuFullyClosed]);

    const menuBar = (
      <MemoizedMenuBar
        menuOptions={menuOptions}
        selectedOption={selectedMenuOption}
        userMenuOptions={loggedInMenuOptions}
        onLoggedOutUserClick={onUserBarClick}
        user={user}
        accentColor={headerAccent}
        loading={userLoading}
        onHomeMenuClick={logoLink}
        forceHideIdentity={forceHideIdentity}
      />
    );

    return (
      <div
        ref={swipeHandler}
        className={classnames("container", {
          "side-menu-closed": sideMenuFullyClosed,
        })}
      >
        <LoadingBar
          loading={loading}
          accentColor={headerAccent}
          label="header loading bar"
        />
        <div
          className={classnames("layout", {
            "side-menu-open": showSideMenu,
          })}
        >
          <div
            className={classnames("backdrop", {
              visible: showSideMenu,
            })}
            onClick={() => {
              setShowSideMenu(false);
            }}
          />
          <Header
            accentColor={headerAccent}
            logoLink={logoLink}
            title={title}
            titleLink={titleLink}
            hideTitleOnDesktop={hideTitleOnDesktop}
            onCompassClick={React.useMemo(() => {
              return {
                onClick: onCompassClick,
              };
            }, [onCompassClick])}
          >
            {menuBar}
          </Header>
          <div
            className={classnames("pinned-bar", {
              "side-menu-open": showSideMenu,
            })}
          >
            <div className={"sidemenu-button-container"}>
              <IconButton
                icon={{ icon: faBars }}
                aria-label="menu"
                withNotifications={
                  hasNotifications
                    ? {
                        icon: notificationIcon,
                        color:
                          notificationColor ??
                          (hasOutdatedNotifications
                            ? Theme.NOTIFICATIONS_OUTDATED_COLOR
                            : Theme.NOTIFICATIONS_NEW_COLOR),
                      }
                    : undefined
                }
                link={React.useMemo(() => {
                  return {
                    onClick: () => {
                      setShowSideMenu((showSideMenu) => !showSideMenu);
                    },
                  };
                }, [setShowSideMenu])}
              />
            </div>
            <div className="menus-container">
              <div className="pinned-boards">{pinnedMenuContent}</div>
              <div
                className={classnames("side-menu", {
                  visible: showSideMenu,
                  open: showSideMenu,
                  closed: !showSideMenu,
                })}
                ref={sideMenuRefHandler}
              >
                <div className="side-bottom-menu">{menuBar}</div>
                <div className="side-menu-content">
                  {sideMenuFullyClosed ? null : sideMenuContent}
                </div>
              </div>
            </div>
          </div>
          <div
            className={classnames("layout-body", {
              "side-menu-open": showSideMenu,
            })}
          >
            <div className="layout-content">
              {mainContent}
              {actionButton}
            </div>
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
            position: relative;
          }
          .layout-body {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            position: relative;
            margin-left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            flex-shrink: 0;
            width: calc(100% - ${Theme.PINNED_BAR_WIDTH_PX}px);
            overflow: hidden;
            background-color: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
            transition: transform 2s ease-out;
          }
          .layout-body.side-menu-open {
            transform: translateX(var(--side-menu-width));
          }
          :global(header) {
            transition: transform 2s ease-out;
          }
          .side-menu-open :global(header) {
            transform: translateX(var(--side-menu-width));
          }
          .layout-body.side-menu-open .layout-content {
            flex-shrink: 0;
          }
          .layout-content {
            display: flex;
            flex-grow: 1;
            position: relative;
            padding-top: ${Theme.HEADER_HEIGHT_PX}px;
            background: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
          }
          .container:not(.side-menu-closed) {
            overflow: hidden;
          }
          .backdrop {
            position: absolute;
            background-color: ${Theme.MODAL_BACKGROUND_COLOR};
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            transition: transform 2s ease-out;
            opacity: 0.9;
            z-index: 100;
            width: 0;
          }
          .backdrop.visible {
            display: block;
            width: 100%;
            transform: translateX(var(--side-menu-width));
            left: 65px;
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
            .layout-body {
              margin-left: 0px;
            }
            .layout-body.side-menu-open {
              margin-left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            }
          }
        `}</style>
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
            z-index: 49;
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
            transition: transform 2s ease-out;
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
            z-index: 48;
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
              maring-left: 0;
              transform: translateX(calc(-1 * var(--side-menu-width)));
            }
            .side-menu.closed {
              margin-left: -${Theme.PINNED_BAR_WIDTH_PX}px;
              transition: transform 2s ease-out, margin 2s ease-out;
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
              transform: translateX(-${Theme.PINNED_BAR_WIDTH_PX}px);
              transition: transform 1s ease-out;
            }
            .side-menu-open .pinned-boards {
              transform: translateX(0);
            }
            .layout-body.side-menu-open,
            .side-menu-open :global(header),
            .backdrop.visible {
               {
                /* transform: translateX(var(--side-menu-width)); */
              }
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
  }
) as LayoutCompoundComponent;

export interface LayoutProps {
  headerAccent?: string;
  title?: string;
  // Force hides the title from desktop
  hideTitleOnDesktop?: boolean;
  user?: { username: string; avatarUrl?: string };
  logoLink?: LinkWithAction;
  titleLink?: LinkWithAction;
  onUserBarClick: LinkWithAction;
  onCompassClick?: () => void;
  loading?: boolean;
  userLoading?: boolean;
  notificationIcon?: IconProps["icon"];
  notificationColor?: string;
  hasNotifications: boolean;
  // TODO: remove this
  hasOutdatedNotifications: boolean;
  menuOptions?: MenuBarProps["menuOptions"];
  selectedMenuOption?: string | null;
  loggedInMenuOptions?: DropdownProps["options"];
  // TODO: switch this to "onSideMenuStatusChange"
  onSideMenuButtonClick?: () => void;
  forceHideIdentity?: boolean;
  children: JSX.Element[];
}

Layout.MainContent = MainContent;
Layout.PinnedMenuContent = PinnedMenuContent;
Layout.SideMenuContent = SideMenuContent;
Layout.ActionButton = ActionButton;

export default Layout;
