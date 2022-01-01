import "@bobaboard/boba-editor/dist/main.css";
import "normalize.css";

import { CreateBaseCompound, extractCompound } from "../utils/compound-utils";

import Header from "./Header";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconProps } from "common/Icon";
import { LinkWithAction } from "types";
import LoadingBar from "../common/LoadingBar";
import MenuBar from "./MenuBar";
import QuickAccessBar from "./QuickAccessBar";
import React from "react";
import Theme from "../theme/default";
import classnames from "classnames";
import useSideMenuTransition from "./useSideMenuTransition";

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
      hideTitleOnDesktop,
      loggedInMenuOptions,
      forceHideIdentity,
      onSideMenuButtonClick,
      onSideMenuFullyOpen,
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

    const sideMenuButtonAction = React.useMemo(() => {
      return {
        onClick: () => {
          if (!showSideMenu) {
            onSideMenuButtonClick?.();
          }
          setShowSideMenu(!showSideMenu);
        },
      };
    }, [showSideMenu, setShowSideMenu, onSideMenuButtonClick]);

    const compassAction = React.useMemo(() => {
      return {
        onClick: onCompassClick,
      };
    }, [onCompassClick]);

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
      <div ref={layoutRef}>
        <LoadingBar
          loading={loading}
          accentColor={headerAccent}
          label="header loading bar"
        />
        <div className="layout">
          <QuickAccessBar
            hasNotifications={!!hasNotifications}
            hasOutdatedNotifications={!!hasOutdatedNotifications}
            sideMenuOpen={showSideMenu}
            setShowSideMenu={setShowSideMenu}
            onSideMenuButtonClick={sideMenuButtonAction}
            pinnedMenuContent={pinnedMenuContent}
            menuBarContent={menuBar}
            sideMenuContent={sideMenuContent}
            ref={sideMenuRef}
          />
          <div
            className={classnames("layout-body", {
              "side-menu-open": showSideMenu,
            })}
          >
            <Header
              accentColor={headerAccent}
              logoLink={logoLink}
              title={title}
              titleLink={titleLink}
              hideTitleOnDesktop={hideTitleOnDesktop}
              onCompassClick={compassAction}
            >
              {menuBar}
            </Header>
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
              width: 100%;
            }
            .layout-body {
              background-color: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
              transition: transform 0.3s ease-out;
            }
            .layout-body.side-menu-open {
              transform: translateX(var(--side-menu-width));
            }
            .layout-body.side-menu-open .content {
              flex-shrink: 0;
            }
            .content {
              flex-grow: 1;
            }
            .layout-body {
              flex-shrink: 0;
              width: calc(100% - ${Theme.PINNED_BAR_WIDTH_PX}px);
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
        </div>
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
  hasNotifications: boolean;
  hasOutdatedNotifications: boolean;
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
