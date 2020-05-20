import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonStyle } from "./common/Button";
import UserBar from "../src/UserBar";
import classnames from "classnames";
import HighlightedText from "./common/HighlightedText";
import Theme from "./theme/default";
import "@bobaboard/boba-editor/dist/main.css";

import "normalize.css";
import "simplebar/dist/simplebar.min.css";

import logo from "./images/logo.svg";
import compactLogo from "./images/logo-compact.svg";

const Layout: React.FC<LayoutProps> = ({
  sideMenuContent,
  mainContent,
  headerAccent,
  title,
  onTitleClick,
}) => {
  const [showSideMenu, setShowSideMenu] = React.useState(false);
  return (
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
              >
                Menu
              </Button>{" "}
            </div>
            <a className="logo">
              <img src={logo} className="regular" />
              <img src={compactLogo} className="compact" />
            </a>
            {title && (
              <div className="title" onClick={onTitleClick}>
                <HighlightedText highlightColor={headerAccent || "#fffff"}>
                  <span>{title}</span>
                </HighlightedText>
              </div>
            )}
          </div>
          <UserBar color={headerAccent} />
        </div>
        <div className="content">{mainContent}</div>
      </div>
      <style jsx>{`
        .layout {
          background-color: pink;
          display: flex;
          height: 100vh;
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
          background-color: black;
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
          padding: 15px 0px;
          flex-shrink: 0;
        }
        .side-menu-content {
          width: 500px;
        }
        .side-menu.visible {
          width: 500px;
        }
        .title {
          display: none;
          margin: 0px 35px;
          color: white;
          font-size: 30px;
          font-weight: bold;
          cursor: pointer;
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
  );
};

export interface LayoutProps {
  sidebarContent?: JSX.Element;
  mainContent: JSX.Element;
  sideMenuContent: JSX.Element;
  headerAccent?: string;
  title?: string;
  onTitleClick?: () => void;
}

export default Layout;
