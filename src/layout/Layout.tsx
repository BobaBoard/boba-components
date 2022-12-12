import "@bobaboard/boba-editor/dist/main.css";
import "normalize.css";

import { CreateBaseCompound, extractCompound } from "utils/compound-utils";
import IconButton, { IconButtonProps } from "buttons/IconButton";
import MenuBar, { MenuBarProps } from "./MenuBar";
import {
  useOpenCloseTransition,
  useSwipeHandler,
} from "./useOpenCloseTransition";

import Header from "./Header";
import { LinkWithAction } from "types";
import LoadingBar from "common/LoadingBar";
import React from "react";
import Theme from "theme/default";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// import debug from "debug";
// const log = debug("bobaui:layout-log");

const MemoizedMenuBar = React.memo(MenuBar);

type SideMenuStatus = "open" | "opening" | "closed" | "closing";

export interface LayoutHandler {
  closeSideMenu: () => void;
}

const MainContent = CreateBaseCompound("MainContent");
const PinnedMenuContent = CreateBaseCompound("PinnedMenuContent");
const SideMenuContent = CreateBaseCompound("SideMenuContent");
const ActionButton = CreateBaseCompound("ActionButton");
const BottomBar = CreateBaseCompound("BottomBar");
export interface LayoutCompoundComponent
  extends React.ForwardRefExoticComponent<
    LayoutProps & React.RefAttributes<LayoutHandler>
  > {
  MainContent: React.FC<unknown>;
  PinnedMenuContent: React.FC<unknown>;
  SideMenuContent: React.FC<unknown>;
  ActionButton: React.FC<unknown>;
  BottomBar: React.FC<unknown>;
}

const { className: headerClassName, styles: headerStyles } = css.resolve`
  header {
    transition: transform 0.35s ease-out;
    background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
    background-image: var(--header-background-image);
    height: ${Theme.HEADER_HEIGHT_PX}px;
    position: fixed;
    top: 0;
    right: 0;
    left: ${Theme.PINNED_BAR_WIDTH_PX}px;
    z-index: 10;
  }
  :global([data-side-menu-status^="open"]) header {
    transform: translateX(var(--side-menu-width));
  }
`;

const Backdrop = (props: { onClick: () => void }) => (
  <div className="backdrop" onClick={props.onClick}>
    <style jsx>{`
      .backdrop {
        position: absolute;
        background-color: ${Theme.MODAL_BACKGROUND_COLOR};
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: transform 0.35s ease-out;
        opacity: 0.9;
        z-index: 100;
        width: 0;
      }

      :global([data-side-menu-status^="open"]) .backdrop {
        display: block;
        width: 100%;
        transform: translateX(var(--side-menu-width));
        left: ${Theme.PINNED_BAR_WIDTH_PX}px;
      }
    `}</style>
  </div>
);

const Layout = React.forwardRef<LayoutHandler, LayoutProps>(
  function LayoutForwardRef(
    {
      accentColor,
      title,
      menuOptions,
      selectedMenuOption,
      onUserBarClick,
      titleLink,
      user,
      loading,
      logoLink,
      notificationIcon,
      hideTitleFromDesktopHeader,
      forceHideIdentity,
      onSideMenuStatusChange,
      children,
    },
    ref
  ) {
    const sideMenuContent = extractCompound(children, SideMenuContent);
    const mainContent = extractCompound(children, MainContent);
    const pinnedMenuContent = extractCompound(children, PinnedMenuContent);
    const actionButton = extractCompound(children, ActionButton);
    const bottomBar = extractCompound(children, BottomBar);

    const {
      setOpen: setShowSideMenu,
      transitionerRefHandler: sideMenuRefHandler,
      isOpen: showSideMenu,
      inTransition,
    } = useOpenCloseTransition();
    const swipeHandler = useSwipeHandler({ setOpen: setShowSideMenu });

    React.useImperativeHandle(
      ref,
      () => ({
        closeSideMenu: () => {
          setShowSideMenu(false);
        },
      }),
      [setShowSideMenu]
    );

    const sideMenuFullyClosed = !showSideMenu && !inTransition;
    React.useEffect(() => {
      // This is to manage the overflow status of the body while the menu
      // opens or closes.
      if (!sideMenuFullyClosed) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.removeProperty("overflow");
      }
      return () => {
        document.body.style.removeProperty("overflow");
      };
    }, [sideMenuFullyClosed]);

    let sideMenuStatus: SideMenuStatus = showSideMenu ? "open" : "closed";
    if (inTransition) {
      sideMenuStatus = showSideMenu ? "opening" : "closing";
    }
    React.useEffect(() => {
      onSideMenuStatusChange?.(sideMenuStatus);
    }, [sideMenuStatus, onSideMenuStatusChange]);

    return (
      <div
        ref={swipeHandler}
        className={classnames("layout", {
          "with-bottom-bar": !!bottomBar,
        })}
        data-side-menu-status={sideMenuStatus}
      >
        <LoadingBar
          loading={loading}
          accentColor={accentColor}
          label="header loading bar"
        />
        <Backdrop
          onClick={() => {
            setShowSideMenu(false);
          }}
        />
        <Header
          className={classnames(headerClassName, {
            "side-menu-open": showSideMenu,
          })}
          accentColor={accentColor}
          logoLink={logoLink}
          title={title}
          titleLink={titleLink}
          hideTitleOnDesktop={hideTitleFromDesktopHeader}
          onLoggedOutUserClick={onUserBarClick}
          user={user}
          forceHideIdentity={forceHideIdentity}
        >
          <MemoizedMenuBar
            menuOptions={menuOptions}
            selectedOption={selectedMenuOption}
            accentColor={accentColor}
            onHomeMenuClick={logoLink}
            forceHideIdentity={forceHideIdentity}
          />
        </Header>
        <div className={"side-menu-button"}>
          <IconButton
            icon={{ icon: faBars }}
            aria-label="menu"
            withNotifications={notificationIcon}
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
          <div className="side-menu-options">
            <MemoizedMenuBar
              menuOptions={menuOptions}
              selectedOption={selectedMenuOption}
              accentColor={accentColor}
              onHomeMenuClick={logoLink}
              forceHideIdentity={forceHideIdentity}
              onLoggedOutUserClick={onUserBarClick}
              user={user}
            />
          </div>
          {sideMenuFullyClosed ? null : sideMenuContent}
        </nav>
        {bottomBar && <nav className="bottom-bar">{bottomBar}</nav>}
        <main>
          {mainContent}
          {actionButton}
        </main>
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
          main {
            position: relative;
            margin-left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            width: calc(100% - ${Theme.PINNED_BAR_WIDTH_PX}px);
            min-height: calc(100vh - 70px);
            background-color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
            margin-top: ${Theme.HEADER_HEIGHT_PX}px;
          }
          .side-menu-button {
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
          }
          .side-menu-options {
            display: none;
          }
          .pinned-menu {
            background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
            z-index: 2;
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
          .bottom-bar {
            pointer-events: none;
            transition: transform 0.35s ease-out;
            background-image: var(--header-background-image);
            height: ${Theme.BOTTOM_BAR_HEIGHT_PX}px;
            position: fixed;
            bottom: 0;
            right: 0;
            left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            z-index: 10;
          }
          :global([data-side-menu-status^="open"]) .bottom-bar {
            transform: translateX(var(--side-menu-width));
          }

          @media only screen and (max-width: 600px) {
            .side-menu {
              margin-left: 0;
              margin-top: ${Theme.HEADER_HEIGHT_PX}px;
            }
            main {
              margin-left: 0px;
              width: 100%;
            }
            .bottom-bar {
              left: 0;
            }
            .with-bottom-bar main {
              margin-bottom: ${Theme.BOTTOM_BAR_HEIGHT_PX}px;
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
          // These are all the styles related to the opening/closing animation
          .layout:not([data-side-menu-status="closed"]) {
            overflow: hidden;
          }
          main,
          .bottom-menu {
            transition: transform 0.35s ease-out;
          }
          [data-side-menu-status^="open"] main,
          [data-side-menu-status^="open"] .bottom-menu {
            transform: translateX(var(--side-menu-width));
          }
          .side-menu {
            transform: translateX(calc(-1 * var(--side-menu-width)));
            transition: transform 0.35s ease-out;
          }
          [data-side-menu-status^="closed"] .side-menu {
            transition: unset;
          }
          [data-side-menu-status^="open"] .side-menu {
            transform: translateX(0);
          }
          @media only screen and (max-width: 600px) {
            .side-menu {
              transform: translateX(calc(-1 * var(--side-menu-width)));
            }
            [data-side-menu-status="closed"] .side-menu {
              margin-left: -${Theme.PINNED_BAR_WIDTH_PX}px;
            }
            [data-side-menu-status="closing"] .side-menu {
              margin-left: -${Theme.PINNED_BAR_WIDTH_PX}px;
              // Note: this works well as an animation for when the menu goes all
              // the way out and then back in, but it still jumps when the animation
              // is cancelled halfway through (because the animation delay is static,
              // and not tied to how long it will take to transition from the in-between
              // point). Unfortunately, I can't figure out how to fix this.
              transition: transform 0.35s ease-out,
                margin-left 0.12s ease-out 0.33s;
            }

            [data-side-menu-status^="open"] .side-menu {
              margin-left: 0;
            }
            [data-side-menu-status^="open"] main,
            [data-side-menu-status^="open"] .bottom-bar {
              margin-left: ${Theme.PINNED_BAR_WIDTH_PX}px;
            }
            [data-side-menu-status="closing"] main,
            [data-side-menu-status="closing"] .bottom-bar {
              margin-left: 0px;
              transition: transform 0.35s ease-out,
                margin-left 0.12s ease-out 0.33s;
            }
            .pinned-menu {
              transform: translateX(-${Theme.PINNED_BAR_WIDTH_PX}px);
              transition: transform 0.7s ease-out;
            }
            [data-side-menu-status^="open"] .pinned-menu {
              transform: translateX(0);
              transition: transform 0.2s ease-out;
            }
            [data-side-menu-status^="closed"] .pinned-menu {
              transition: unset;
            }
          }
        `}</style>
        {headerStyles}
      </div>
    );
  }
) as LayoutCompoundComponent;

export interface LayoutProps {
  notificationIcon?: IconButtonProps["withNotifications"];
  accentColor?: string;
  logoLink?: LinkWithAction;
  title?: string;
  titleLink?: LinkWithAction;
  user?: MenuBarProps["user"];
  onUserBarClick: LinkWithAction;
  loading?: boolean;
  menuOptions?: MenuBarProps["menuOptions"];
  selectedMenuOption?: string | null;
  onSideMenuStatusChange?: (status: SideMenuStatus) => void;
  forceHideIdentity?: boolean;
  // At desktop size, the "page title" is often repeated somewhere
  // else in the UI (for example in the sidebar), which can create
  // an unsightly repetition. When this is not desired, this prop
  // can be used to hide the header title at desktop size.
  hideTitleFromDesktopHeader?: boolean;
  children: React.ReactNode[];
}

Layout.MainContent = MainContent;
Layout.PinnedMenuContent = PinnedMenuContent;
Layout.SideMenuContent = SideMenuContent;
Layout.ActionButton = ActionButton;
Layout.BottomBar = BottomBar;

export default Layout;
