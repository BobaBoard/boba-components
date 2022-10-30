import "@bobaboard/boba-editor/dist/main.css";
import "normalize.css";

import { CreateBaseCompound, extractCompound } from "utils/compound-utils";
import MenuBar, { MenuBarProps } from "./MenuBar";
import {
  useOpenCloseTransition,
  useSwipeHandler,
} from "./useOpenCloseTransition";

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

    const {
      setOpen: setShowSideMenu,
      transitionerRefHandler: sideMenuRefHandler,
      isOpen: showSideMenu,
      inTransition,
    } = useOpenCloseTransition();
    const swipeHandler = useSwipeHandler({ setOpen: setShowSideMenu });
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
      <main
        ref={swipeHandler}
        className={classnames({
          "side-menu-fully-closed": sideMenuFullyClosed,
          "side-menu-open": showSideMenu,
          "side-menu-closing": !showSideMenu && inTransition,
        })}
      >
        <LoadingBar
          loading={loading}
          accentColor={headerAccent}
          label="header loading bar"
        />
        <div
          className="backdrop"
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
        <div className={"sidemenu-button"}>
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
        <nav className="pinned-menu">{pinnedMenuContent}</nav>
        <nav className="side-menu" ref={sideMenuRefHandler}>
          <div className="side-menu-options">{menuBar}</div>
          {sideMenuFullyClosed ? null : sideMenuContent}
        </nav>
        <div className="layout-content">
          {mainContent}
          {actionButton}
        </div>
        <style jsx>{`
          main {
            background-color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
            display: flex;
            font-family: "Inter", sans-serif;
            --side-menu-width: min(
              calc(100vw - 100px),
              ${Theme.SIDE_MENU_MAX_WIDTH_PX}px
            );
            position: relative;
          }
          .layout-content {
            position: relative;
            margin-left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            width: calc(100% - ${Theme.PINNED_BAR_WIDTH_PX}px);
            background-color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
            transition: transform 0.6s ease-out;
            margin-top: ${Theme.HEADER_HEIGHT_PX}px;
          }
          .backdrop {
            position: absolute;
            background-color: ${Theme.MODAL_BACKGROUND_COLOR};
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            transition: transform 0.6s ease-out;
            opacity: 0.9;
            z-index: 100;
            width: 0;
          }
          .sidemenu-button {
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
            z-index: 1;
            width: var(--side-menu-width);
            flex-shrink: 0;
            overscroll-behavior: contain;
            position: fixed;
            top: 0;
            left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            bottom: 0;
            transition: transform 0.6s ease-out;
          }
          .side-menu-options {
            display: none;
          }
          .pinned-menu {
            background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
            z-index: 48;
            left: 0px;
            bottom: 0px;
            min-height: calc(100vh - ${Theme.HEADER_HEIGHT_PX}px);
            width: ${Theme.PINNED_BAR_WIDTH_PX}px;
            display: block;
            position: fixed;
            top: ${Theme.HEADER_HEIGHT_PX}px;
            overflow: hidden scroll;
            overscroll-behavior: contain;
            scrollbar-width: none;
          }
          .pinned-menu::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* Chrome/Safari/Webkit */
          }
          @media only screen and (max-width: 600px) {
            .side-menu {
              margin-left: 0;
              margin-top: ${Theme.HEADER_HEIGHT_PX}px;
            }
            .layout-content {
              margin-left: 0px;
              width: 100%;
            }
            .side-menu-open .layout-content {
              margin-left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            }
            .side-menu-options {
              position: absolute;
              top: -${Theme.HEADER_HEIGHT_PX}px;
              left: 0;
              right: 0;
              height: ${Theme.HEADER_HEIGHT_PX}px;
              background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
              display: block;
              width: 100%;
              max-width: var(--side-menu-width);
              overflow: hidden;
              z-index: 10;
              width: var(--side-menu-width);
            }
          }
        `}</style>
        <style jsx>{`
          main:not(.side-menu-fully-closed) {
            overflow: hidden;
          }
          main.side-menu-open .layout-content {
            transform: translateX(var(--side-menu-width));
          }
          :global(header) {
            transition: transform 0.6s ease-out;
          }
          main.side-menu-open :global(header) {
            transform: translateX(var(--side-menu-width));
          }
          main.side-menu-open .backdrop {
            display: block;
            width: 100%;
            transform: translateX(var(--side-menu-width));
            left: ${Theme.PINNED_BAR_WIDTH_PX}px;
          }
          .side-menu {
            transform: translateX(calc(-1 * var(--side-menu-width)));
          }
          main.side-menu-open .side-menu {
            transform: translateX(0);
            visibility: visible;
          }
          @media only screen and (max-width: 600px) {
            .side-menu {
              transform: translateX(calc(-1 * var(--side-menu-width)));
            }
            main.side-menu-fully-closed .side-menu {
              margin-left: -${Theme.PINNED_BAR_WIDTH_PX}px;
            }
            main.side-menu-closing .side-menu {
              margin-left: -${Theme.PINNED_BAR_WIDTH_PX}px;
              // Note: this works well as an animation for when the menu goes all
              // the way out and then back in, but it still jumps when the animation
              // is cancelled halfway through (because the animation delay is static,
              // and not tied to how long it will take to transition from the in-between
              // point). Unfortunately, I can't figure out how to fix this.
              transition: transform 0.6s ease-out,
                margin-left 0.4s ease-out 0.58s;
            }
            main.side-menu-open .side-menu {
              margin-left: 0;
            }
            .pinned-menu {
              transform: translateX(-${Theme.PINNED_BAR_WIDTH_PX}px);
              transition: transform 0.5s ease-out;
            }
            main.side-menu-open .pinned-menu {
              transform: translateX(0);
            }
          }
        `}</style>
      </main>
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
