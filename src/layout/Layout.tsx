import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonStyle } from "../common/Button";
import UserBar from "./UserBar";
import classnames from "classnames";
import HighlightedText from "../common/HighlightedText";
import Theme from "../theme/default";
import LoadingBar from "../common/LoadingBar";
import useComponentSize from "@rehooks/component-size";

import "@bobaboard/boba-editor/dist/main.css";

import "normalize.css";

import logo from "../images/logo.svg";
import compactLogo from "../images/logo-compact.svg";

import debug from "debug";
import { LinkWithAction } from "types";

const log = debug("bobaui:layout-log");

const Layout = React.forwardRef<{ closeSideMenu: () => void }, LayoutProps>(
  (
    {
      sideMenuContent,
      mainContent,
      headerAccent,
      title,
      logoLink,
      onUserBarClick,
      titleLink,
      actionButton,
      user,
      loading,
      updates,
      forceHideTitle,
      loggedInMenuOptions,
      onSideMenuButtonClick,
    },
    ref
  ) => {
    const [showSideMenu, setShowSideMenu] = React.useState(false);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const layoutRef = React.useRef<HTMLDivElement>(null);
    const sideMenuRef = React.useRef<HTMLDivElement>(null);
    let { width } = useComponentSize(headerRef);
    React.useImperativeHandle(ref, () => ({
      closeSideMenu: () => {
        setShowSideMenu(false);
      },
    }));

    React.useEffect(() => {
      log(`${showSideMenu ? "Opening" : "Closing"} side`);
      const scrollY = document.body.style.top;
      log(`Current body top position: ${scrollY}`);
      log(`Current body scrollY: ${window.scrollY}`);

      if (!contentRef.current || !layoutRef.current) {
        return;
      }

      log(`Changing overflow of content`);
      log(showSideMenu);
      if (showSideMenu) {
        // NOTE: body doesn't respect overflow hidden on mobile, so we
        // move it to layout
        document.body.style.overflow = "hidden";
        layoutRef.current.style.overflow = "hidden";
        contentRef.current.style.overflow = "hidden";
        // This will be triggered when the animation for either
        // closing the sidemenu ends.
        // We attach it when we get the first request for showing
        // the sidemenu, and then reattach it only once that
        // transition is finished.
        const transitionEndListener = () => {
          log(`Animation finished...`);
          if (
            !contentRef.current ||
            !layoutRef.current ||
            sideMenuRef.current?.clientWidth
          ) {
            // The menu is open (or the refs are not available).
            // This means that we're still waiting for the menu to
            // close so we can remove all styles from the body.
            return;
          }

          log(`...Reactivating!`);
          sideMenuRef.current?.removeEventListener(
            "transitionend",
            transitionEndListener
          );
          document.body.style.overflow = "";
          layoutRef.current.style.overflow = "";
          contentRef.current.style.overflow = "";
        };
        sideMenuRef.current?.addEventListener(
          "transitionend",
          transitionEndListener
        );
      }
    }, [showSideMenu]);

    return (
      <div ref={layoutRef}>
        <LoadingBar loading={loading} accentColor={headerAccent} />
        <div className="layout">
          <div
            className={classnames("side-menu", { visible: showSideMenu })}
            ref={sideMenuRef}
          >
            <div className="side-menu-content">{sideMenuContent}</div>
          </div>
          <div
            className={classnames("layout-body", {
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
            <div className="header" ref={headerRef}>
              <div className="title-bar">
                <div className="sidemenu-button">
                  <Button
                    icon={faBars}
                    compact
                    onClick={() => {
                      if (!showSideMenu) {
                        onSideMenuButtonClick?.();
                      }
                      setShowSideMenu(!showSideMenu);
                    }}
                    color={headerAccent}
                    theme={ButtonStyle.DARK}
                    updates={updates}
                  >
                    Menu
                  </Button>{" "}
                </div>
                <a
                  className="logo"
                  onClick={(e) => {
                    logoLink?.onClick();
                    if (logoLink?.onClick) {
                      e.preventDefault();
                    }
                  }}
                  href={logoLink?.href}
                >
                  <img src={logo} className="regular" />
                  <img src={compactLogo} className="compact" />
                </a>
                {title && (
                  <a
                    className={classnames("title", {
                      "desktop-hidden": forceHideTitle,
                    })}
                    onClick={(e) => {
                      titleLink?.onClick();
                      if (titleLink?.onClick) {
                        e.preventDefault();
                      }
                    }}
                    href={titleLink?.href}
                  >
                    <HighlightedText highlightColor={headerAccent || "#fffff"}>
                      <span className="title-text">{title}</span>
                    </HighlightedText>
                  </a>
                )}
              </div>
              <UserBar
                color={headerAccent}
                onClick={onUserBarClick}
                user={user}
                loading={loading}
                menuOptions={loggedInMenuOptions}
                compact={width < 500}
              />
            </div>
            <div ref={contentRef} className="content">
              {mainContent}
              {actionButton}
            </div>
          </div>
          <style jsx>{`
            .layout {
              background-color: pink;
              display: flex;
              font-family: "Inter", sans-serif;
            }
            .layout-body {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              position: relative;
              transition: margin-left 0.3s ease-out;
            }
            .content {
              display: flex;
              flex-grow: 1;
              position: relative;
              overflow-y: auto;
              background: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
              overflow-x: hidden;
              padding-top: 70px;
            }
            .backdrop {
              position: absolute;
              background-color: ${Theme.MODAL_BACKGROUND_COLOR};
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              opacity: 0.5;
              z-index: 100;
              display: none;
            }
            .backdrop.visible {
              display: block;
            }
            .header {
              background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
              height: 40px;
              position: fixed;
              top: 0;
              right: 0;
              left: 0;
              flex-shrink: 0;
              padding: 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              z-index: 10;
              transition: left 0.3s ease-out;
            }
            .side-menu-open .header {
              left: 500px;
            }
            .side-menu-open.layout-body {
              margin-left: 500px;
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
              z-index: 1;
              width: 0;
              flex-shrink: 0;
              overscroll-behavior: contain;
              position: fixed;
              top: 0;
              left: 0;
              bottom: 0;
              transition: width 0.3s ease-out;
            }
            .side-menu-content {
              width: 500px;
              position: relative;
              height: 100%;
            }
            .side-menu.visible {
              width: 500px;
            }
            .side-menu.visible .side-menu-content {
              overflow: auto;
            }
            .title {
              margin: 0px 35px;
              color: white;
              font-size: 30px;
              font-weight: bold;
              cursor: pointer;
              text-decoration: none;
            }
            .title.desktop-hidden {
              display: none;
            }
            .title-text {
              outline: none;
            }
            .layout-body {
              flex-shrink: 0;
              width: 100%;
            }
            @media only screen and (max-width: 850px) {
              .layout-body {
                flex-direction: column;
                flex-shrink: 1;
              }
              .layout-body.side-menu-open {
                margin-left: 500px;
                flex-shrink: 0;
              }
              .side-menu-open .header {
                left: 500px;
              }
              .sidebar-button {
                display: inline-block;
              }
              .side-menu-content {
                width: calc(100vw - 100px);
                max-width: 500px;
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
            @media only screen and (max-width: 600px) {
              .layout-body.side-menu-open {
                margin-left: calc(100vw - 100px);
              }
              .side-menu-open .header {
                left: calc(100vw - 100px);
              }
            }
          `}</style>
        </div>
      </div>
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
  logoLink?: LinkWithAction;
  titleLink?: LinkWithAction;
  onUserBarClick?: () => void;
  loading?: boolean;
  updates?: number | boolean;
  loggedInMenuOptions?: {
    name: string;
    link: LinkWithAction;
  }[];
  onSideMenuButtonClick?: () => void;
}

export default Layout;
