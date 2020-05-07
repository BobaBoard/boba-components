import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../src/Button";
import classnames from "classnames";

const Layout: React.FC<LayoutProps> = ({
  sideMenuContent,
  mainContent,
  sidebarContent,
}) => {
  const [showSideMenu, setShowSideMenu] = React.useState(false);
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div className="layout">
      <div className="header">
        <Button
          icon={faBars}
          compact
          onClick={() => setShowSideMenu(!showSideMenu)}
        >
          Menu
        </Button>{" "}
        This will be the header.
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
      <div className="body">
        <div className={classnames("side-menu", { visible: showSideMenu })}>
          <div className="side-menu-content">{sideMenuContent}</div>
        </div>
        {sidebarContent && (
          <div className={classnames("sidebar", { visible: showSidebar })}>
            {sidebarContent}
          </div>
        )}
        <div className="content">{mainContent}</div>
      </div>
      <style jsx>{`
        .layout {
          background-color: pink;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .body {
          display: flex;
          flex-grow: 1;
          position: relative;
        }
        .header {
          background-color: green;
          height: 50px;
        }
        .sidebar {
          width: 25%;
          background-color: red;
        }
        .content {
          background-color: yellow;
          flex-grow: 1;
        }
        .side-menu {
          position: absolute;
          background-color: purple;
          top: 0;
          bottom: 0;
          width: 0;
          overflow: hidden;
          transition-property: width;
          transition-duration: 1s;
          transition-timing-function: easeInSine;
          z-index: 1;
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
          }
          .sidebar.visible {
            height: 90%;
          }
        }
      `}</style>
    </div>
  );
};

interface LayoutProps {
  sidebarContent?: Element;
  mainContent: Element;
  sideMenuContent: Element;
}

export default Layout;
