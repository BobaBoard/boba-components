import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonStyle } from "../src/Button";
import UserBar from "../src/UserBar";
import classnames from "classnames";
import HighlightedText from "./HighlightedText";

import "normalize.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import logo from "./images/logo.svg";

const LIGHT_GREY = "#2f2f30";
const MEDIUM_GREY = "#1c1c1c";
const DARK_GREY = "#131518";

const Layout: React.FC<LayoutProps> = ({
  sideMenuContent,
  mainContent,
  sidebarContent,
  headerAccent,
  boardName,
}) => {
  const [showSideMenu, setShowSideMenu] = React.useState(false);
  const [showSidebar, setShowSidebar] = React.useState(false);
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
            visible: showSideMenu || showSidebar,
          })}
          onClick={() => {
            setShowSidebar(false);
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
              <img src={logo} />
            </a>
            {sidebarContent && boardName && (
              <div
                className="sidebar-button"
                onClick={() => {
                  setShowSidebar(!showSidebar);
                }}
              >
                <HighlightedText highlightColor={headerAccent || "#fffff"}>
                  <span>!{boardName}</span>
                </HighlightedText>
              </div>
            )}
          </div>
          <UserBar color={headerAccent} />
        </div>
        <div className="board-content">
          {sidebarContent && (
            <div
              className={classnames("sidebar", { visible: showSidebar })}
              onClick={(e) => {
                console.log("clack!");
                e.stopPropagation();
              }}
            >
              {showSidebar ? (
                <SimpleBar style={{ maxHeight: "100vh" }}>
                  {sidebarContent}
                </SimpleBar>
              ) : (
                sidebarContent
              )}
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
          overflow: hidden;
        }
        .body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          position: relative;
        }
        .board-content {
          display: flex;
          flex-grow: 1;
          position: relative;
          overflow-y: auto;
          background: linear-gradient(
            to right,
            ${MEDIUM_GREY} 350px,
            ${LIGHT_GREY} 350px
          );
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
          background-color: ${DARK_GREY};
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
        .sidebar {
          width: 350px;
        }
        .content {
          flex-grow: 1;
        }
        .side-menu {
          background-color: ${DARK_GREY};
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
        .sidebar-button {
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
          .content {
            padding: 0 20px;
            width: calc(100% - 40px);
          }
          .board-content {
            background: ${LIGHT_GREY};
          }
          .sidebar-button {
            display: inline-block;
          }
          .side-menu-content {
            width: 100%;
            max-width: 500px;
          }
          .side-menu {
            transition-duration: 0.5s;
          }
          .side-menu.visible {
            width: calc(100% - 100px);
            max-width: 500px;
          }
          .sidebar {
            border-radius: 25px 25px 0px 0px;
            width: 95%;
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            height: 0;
            overflow: hidden;
            transition-property: height;
            transition-duration: 0.5s;
            transition-timing-function: easeInSine;
            z-index: 5;
            background: ${MEDIUM_GREY};
          }
          .sidebar.visible {
            height: 85%;
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
  boardName: string;
}

export default Layout;
