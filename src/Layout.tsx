import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonStyle } from "../src/Button";
import classnames from "classnames";

import "normalize.css";

import logo from "./images/logo.svg";

const LIGHT_GREY = "#2f2f30";
const MEDIUM_GREY = "#1c1c1c";
const DARK_GREY = "#131518";

const Layout: React.FC<LayoutProps> = ({
  sideMenuContent,
  mainContent,
  sidebarContent,
  headerAccent,
}) => {
  const [showSideMenu, setShowSideMenu] = React.useState(false);
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div className="layout">
      <div className={classnames("side-menu", { visible: showSideMenu })}>
        <div className="side-menu-content">{sideMenuContent}</div>
      </div>
      <div className="body">
        <div className="header">
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
            <img src={logo} />
          </a>
          {sidebarContent && (
            <div className="sidebar-button">
              <Button
                icon={faInfoCircle}
                compact
                onClick={() => setShowSidebar(!showSidebar)}
              >
                Menu
              </Button>
            </div>
          )}
        </div>
        <div className="board-content">
          {sidebarContent && (
            <div className={classnames("sidebar", { visible: showSidebar })}>
              {sidebarContent}
            </div>
          )}
          <div className="content">{mainContent}</div>
        </div>
      </div>
      <style jsx>{`
        .layout {
          background-color: pink;
          display: flex;
          height: 100vh;
          font-family: "Inter", sans-serif;
        }
        .body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .board-content {
          display: flex;
          flex-grow: 1;
          position: relative;
        }
        .header {
          background-color: ${DARK_GREY};
          height: 70px;
          flex-shrink: 0;
          position: relative;
          padding: 15px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }
        .logo {
          position: relative;
          height: 100%;
        }
        .logo > img {
          height: 100%;
          z-index: 5;
          position: relative;
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
        }
        .sidebar {
          width: 350px;
          background-color: ${MEDIUM_GREY};
        }
        .content {
          background-color: ${LIGHT_GREY};
          flex-grow: 1;
        }
        .side-menu {
          background-color: ${DARK_GREY};
          overflow: hidden;
          transition-property: width;
          transition-duration: 0.4s;
          transition-timing-function: easeInSine;
          z-index: 1;
          width: 0;
          padding: 15px 0px;
        }
        .side-menu-content {
          width: 300px;
        }
        .side-menu.visible {
          width: 300px;
        }
        .sidebar-button {
          display: none;
        }
        .body {
        }
        @media only screen and (max-width: 600px) {
          .body {
            flex-direction: column;
          }
          .sidebar-button {
            display: inline-block;
          }
          .sidebar {
            width: 95%;
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            height: 0;
            overflow: hidden;
            transition-property: height;
            transition-duration: 1s;
            transition-timing-function: easeInSine;
            z-index: 5;
          }
          .sidebar.visible {
            height: 90%;
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
}

export default Layout;
