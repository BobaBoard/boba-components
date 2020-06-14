import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonStyle } from "../common/Button";
import UserBar from "./UserBar";
import classnames from "classnames";
import HighlightedText from "../common/HighlightedText";
import Theme from "../theme/default";
import Div100vh from "react-div-100vh";
import LoadingBar from "../common/LoadingBar";

import "@bobaboard/boba-editor/dist/main.css";

import "normalize.css";
import "simplebar/dist/simplebar.min.css";

import logo from "../images/logo.svg";
import compactLogo from "../images/logo-compact.svg";

const Layout = React.forwardRef<{ closeSideMenu: () => void }, LayoutProps>(
  (
    {
      sideMenuContent,
      mainContent,
      headerAccent,
      title,
      onTitleClick,
      onUserBarClick,
      onLogoClick,
      actionButton,
      user,
      loading,
      updates,
      forceHideTitle,
    },
    ref
  ) => {
    const [showSideMenu, setShowSideMenu] = React.useState(false);
    React.useImperativeHandle(ref, () => ({
      closeSideMenu: () => {
        setShowSideMenu(false);
      },
    }));

    return (
      <Div100vh>
        <LoadingBar loading={loading} accentColor={headerAccent} />
        <div className="layout">
          <div className={classnames("side-menu", { visible: showSideMenu })}>
            <div className="side-menu-content">{sideMenuContent}</div>
          </div>
          <div
            className={classnames("body", {
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
            <div className="header">
              <div className="title-bar">
                <div className="sidemenu-button">
                  <Button
                    icon={faBars}
                    compact
                    onClick={() => setShowSideMenu(!showSideMenu)}
                    color={headerAccent}
                    theme={ButtonStyle.DARK}
                    updates={updates}
                  >
                    Menu
                  </Button>{" "}
                </div>
                <a className="logo" onClick={onLogoClick}>
                  <img src={logo} className="regular" />
                  <img src={compactLogo} className="compact" />
                </a>
                {title && (
                  <div
                    className={classnames("title", {
                      "desktop-hidden": forceHideTitle,
                    })}
                    onClick={onTitleClick}
                  >
                    <HighlightedText highlightColor={headerAccent || "#fffff"}>
                      <span className="title-text">{title}</span>
                    </HighlightedText>
                  </div>
                )}
              </div>
              <UserBar
                color={headerAccent}
                onClick={onUserBarClick}
                user={user}
                loading={loading}
              />
            </div>
            <div className="content">
              {mainContent}
              {actionButton}
            </div>
          </div>
          <style jsx>{`
            .layout {
              background-color: pink;
              display: flex;
              height: 100%;
              font-family: "Inter", sans-serif;
              overflow: hidden;
            }
            .body {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              position: relative;
            }
            .content {
              display: flex;
              flex-grow: 1;
              position: relative;
              overflow-y: auto;
              background: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
              overflow-x: hidden;
            }
            .backdrop {
              position: absolute;
              background-color: ${Theme.MODAL_BACKGROUND_COLOR};
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              opacity: 0.5;
              z-index: 3;
              display: none;
            }
            .backdrop.visible {
              display: block;
            }
            .header {
              background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
              height: 40px;
              flex-shrink: 0;
              position: relative;
              padding: 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .title-bar {
              display: flex;
              align-items: center;
              min-width: 250px;
              position: relative;
              height: 100%;
            }
            .logo {
              position: relative;
              height: 100%;
              cursor: pointer;
            }
            .logo > img {
              height: 100%;
              z-index: 2;
              position: relative;
            }
            .logo .compact {
              display: none;
            }
            .logo::after {
              content: "";
              background-color: ${headerAccent || "transparent"};
              mask: url(${logo}) no-repeat;
              display: block;
              position: absolute;
              z-index: 1;
              mask-size: 100%;
              top: 2px;
              left: 3px;
              width: 100%;
              height: 100%;
            }
            .sidemenu-button {
              margin: 0 10px;
              display: inline-block;
            }
            .content {
              flex-grow: 1;
            }
            .side-menu {
              background-color: ${Theme.LAYOUT_SIDEMENU_BACKGROUND_COLOR};
              overflow: hidden;
              transition-property: width;
              transition-duration: 0.3s;
              transition-timing-function: easeInSine;
              z-index: 1;
              width: 0;
              flex-shrink: 0;
            }
            .side-menu-content {
              width: 500px;
              position: relative;
            }
            .side-menu.visible {
              width: 500px;
            }
            .title {
              margin: 0px 35px;
              color: white;
              font-size: 30px;
              font-weight: bold;
              cursor: pointer;
            }
            .title.desktop-hidden {
              display: none;
            }
            .title-text {
              outline: none;
            }
            .body {
              flex-shrink: 0;
              width: 100%;
            }
            @media only screen and (max-width: 850px) {
              .body {
                flex-direction: column;
                flex-shrink: 1;
              }
              .body.side-menu-open {
                flex-shrink: 0;
              }
              .sidebar-button {
                display: inline-block;
              }
              .side-menu-content {
                width: calc(100vw - 100px);
                max-width: 500px;
              }
              .side-menu {
                transition-duration: 0.5s;
              }
              .title {
                display: block;
              }
              .title.desktop-hidden {
                display: block;
              }
              .side-menu.visible {
                width: calc(100vw - 100px);
                max-width: 500px;
              }
              .logo .regular {
                display: none;
              }
              .logo .compact {
                display: block;
              }
              .logo::after {
                mask: url(${compactLogo}) no-repeat;
              }
            }
          `}</style>
        </div>
      </Div100vh>
    );
  }
);

export interface LayoutProps {
  sidebarContent?: JSX.Element;
  mainContent: JSX.Element;
  sideMenuContent: JSX.Element;
  headerAccent?: string;
  title?: string;
  // Force hides the title from desktop
  forceHideTitle?: boolean;
  actionButton?: JSX.Element;
  user?: { username: string; avatarUrl?: string };
  onLogoClick?: () => void;
  onTitleClick?: () => void;
  onUserBarClick?: () => void;
  loading?: boolean;
  updates?: number | boolean;
}

export default Layout;
