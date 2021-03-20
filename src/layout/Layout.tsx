import React from "react";
import {
  faBars,
  faCompass,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import HighlightedText from "../common/HighlightedText";
import Theme from "../theme/default";
import LoadingBar from "../common/LoadingBar";
import noop from "noop-ts";
// @ts-ignore
import type HammerManager from "hammerjs";

import "@bobaboard/boba-editor/dist/main.css";

import "normalize.css";

import debug from "debug";
import { LinkWithAction } from "types";
import MenuBar from "./MenuBar";

import logo from "../images/logo.svg";
import compactLogo from "../images/logo-compact.svg";

const log = debug("bobaui:layout-log");

const MemoizedMenuBar = React.memo(MenuBar);
const Layout = React.forwardRef<{ closeSideMenu: () => void }, LayoutProps>(
  (
    {
      sideMenuContent,
      mainContent,
      headerAccent,
      title,
      menuOptions,
      selectedMenuOption,
      onUserBarClick,
      titleLink,
      actionButton,
      userLoading,
      user,
      loading,
      logoLink,
      updates,
      outdated,
      forceHideTitle,
      loggedInMenuOptions,
      forceHideIdentity,
      onSideMenuButtonClick,
      onSideMenuFullyOpen,
      onCompassClick,
    },
    ref
  ) => {
    const [showSideMenu, setShowSideMenu] = React.useState(false);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const layoutRef = React.useRef<HTMLDivElement>(null);
    const sideMenuRef = React.useRef<HTMLDivElement>(null);
    const swipeHandler = React.useRef<HammerManager>(null);
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

    React.useEffect(() => {
      const Hammer = require("hammerjs") as HammerStatic;
      if (layoutRef.current && !swipeHandler.current) {
        // @ts-ignore
        delete Hammer.defaults.cssProps.userSelect;
        // @ts-ignore
        delete Hammer.defaults.cssProps.touchCallout;
        // @ts-ignore
        swipeHandler.current = new Hammer(layoutRef.current, {
          inputClass: Hammer.TouchInput,
          touchAction: "auto",
        });
        swipeHandler.current.get("swipe").set({
          threshold: 30,
        });
        swipeHandler.current.on("swiperight", () => {
          setShowSideMenu(true);
        });
        swipeHandler.current.on("swipeleft", () => {
          setShowSideMenu(false);
        });
      }
    }, [layoutRef]);

    React.useEffect(() => {
      log(`${showSideMenu ? "Opening" : "Closing"} side`);
      const scrollY = document.body.style.top;
      log(`Current body top position: ${scrollY}`);
      log(`Current body scrollY: ${window.scrollY}`);

      if (!contentRef.current || !layoutRef.current || !sideMenuRef.current) {
        return;
      }
      log(`Current sideMenu scrollY: ${sideMenuRef.current.offsetWidth}`);
      log(`Current sideMenu scrollY: ${sideMenuRef.current.clientWidth}`);

      if (!showSideMenu) {
        if (sideMenuRef.current.classList.contains("opened")) {
          sideMenuRef.current.classList.add("closing");
          sideMenuRef.current.classList.remove("opened");
        } else {
          sideMenuRef.current.classList.add("closed");
        }
        return;
      }
      sideMenuRef.current.classList.add("opening");
      sideMenuRef.current.classList.remove("closed");
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
      const transitionEndListener = (e: TransitionEvent) => {
        log(`Animation finished...`);
        if (e.propertyName !== "transform") {
          // We only listen to this on transform or it might fire multiple
          // times for the same transition, which makes the logic not work.
          // This is because we're relying on ".opening" as a condition, since
          // we don't want to deal with parsing the CSS transform property.
          return;
        }
        if (
          !contentRef.current ||
          !layoutRef.current ||
          !sideMenuRef.current ||
          sideMenuRef.current.classList.contains("opening")
        ) {
          // The menu is open (or the refs are not available).
          // This means that we're still waiting for the menu to
          // close so we can remove all styles from the body.
          sideMenuRef.current?.classList.remove("opening");
          sideMenuRef.current?.classList.add("opened");
          onSideMenuFullyOpen?.();
          return;
        }
        sideMenuRef.current.classList.remove("closing");
        sideMenuRef.current.classList.add("closed");

        log(`...Reactivating!`);
        sideMenuRef.current?.removeEventListener(
          "transitionend",
          transitionEndListener
        );
        document.body.style.overflow = "";
        layoutRef.current.style.overflow = "";
        contentRef.current.style.overflow = "";
      };
      log(`Adding event listener for end of transition...`);
      sideMenuRef.current.addEventListener(
        "transitionend",
        transitionEndListener
      );
    }, [showSideMenu, onSideMenuFullyOpen]);

    const menuBar = (
      <MemoizedMenuBar
        menuOptions={menuOptions}
        selectedOption={selectedMenuOption}
        userMenuOptions={loggedInMenuOptions}
        onLoggedOutUserClick={React.useMemo(
          () => ({ onClick: onUserBarClick || noop }),
          [onUserBarClick]
        )}
        user={user}
        accentColor={headerAccent}
        loading={userLoading}
        onHomeMenuClick={logoLink}
        forceHideIdentity={forceHideIdentity}
      />
    );
    return (
      <div ref={layoutRef}>
        <LoadingBar loading={loading} accentColor={headerAccent} />
        <div className="layout">
          <div
            className={classnames("side-menu", { visible: showSideMenu })}
            ref={sideMenuRef}
          >
            <div className="side-menu-content">{sideMenuContent}</div>
            <div className="side-bottom-menu">{menuBar}</div>
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
              <button
                className={classnames("sidemenu-button menu", {
                  notification: updates,
                  outdated: outdated,
                })}
                onClick={React.useCallback(() => {
                  if (!showSideMenu) {
                    onSideMenuButtonClick?.();
                  }
                  setShowSideMenu(!showSideMenu);
                }, [showSideMenu, onSideMenuButtonClick])}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <a
                className="logo"
                onClick={React.useCallback(
                  (e) => {
                    logoLink?.onClick?.();
                    if (logoLink?.onClick) {
                      e.preventDefault();
                    }
                  },
                  [logoLink]
                )}
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
                    titleLink?.onClick?.();
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
              <div
                className={classnames("header-menu-bar", {
                  "has-compass": !!onCompassClick,
                })}
              >
                <button
                  className={classnames("sidemenu-button compass")}
                  onClick={React.useCallback(() => onCompassClick?.(), [
                    onCompassClick,
                  ])}
                >
                  <FontAwesomeIcon icon={faCompass} />
                </button>
                <div className="menu-bar">{menuBar}</div>
              </div>
            </div>
            <div ref={contentRef} className="content">
              {mainContent}
              {actionButton}
            </div>
          </div>
          <style jsx>{`
            .layout {
              background-color: #131518;
              display: flex;
              font-family: "Inter", sans-serif;
              --side-menu-width: 400px;
            }
            .layout-body {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              position: relative;
            }
            .content {
              display: flex;
              flex-grow: 1;
              position: relative;
              padding-top: 70px;
              background: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
              transition: transform 0.3s ease-out;
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
              transition: transform 0.3s ease-out;
              transform: translateX(var(--side-menu-width));
              width: 100%;
            }
            .header {
              background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
              height: ${Theme.HEADER_HEIGHT_PX}px;
              position: fixed;
              top: 0;
              right: 0;
              left: 0;
              flex-shrink: 0;
              padding: 0 15px;
              display: flex;
              align-items: center;
              z-index: 10;
              transition: transform 0.3s ease-out;
            }
            .layout-body.side-menu-open .header {
              transform: translateX(var(--side-menu-width));
            }
            .layout-body.side-menu-open .content {
              transform: translateX(var(--side-menu-width));
              flex-shrink: 0;
            }
            .sidemenu-button {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              border: 0;
              background: transparent;
              color: rgb(191, 191, 191);
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              flex-shrink: 0;
              font-size: 20px;
              padding: 0;
            }
            .sidemenu-button:focus {
              outline: none;
            }
            .sidemenu-button:focus-visible {
              outline: white auto 1px;
            }
            .sidemenu-button.notification::after {
              content: "";
              position: absolute;
              top: 2px;
              right: 2px;
              width: 10px;
              height: 10px;
              background: ${Theme.DEFAULT_ACCENT_COLOR};
              border-radius: 50%;
              border: 2px solid ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
            }

            .sidemenu-button.notification.outdated::after {
              background: white;
            }

            .sidemenu-button.notification:hover::after {
              border-color: rgb(46, 46, 48);
            }

            .sidemenu-button:hover {
              cursor: pointer;
              background-color: rgb(46, 46, 48);
            }

            .sidemenu-button:hover {
              color: white;
            }
            .sidemenu-button.menu {
              margin-left: -3px;
              font-size: 22px;
              margin-right: 5px;
            }
            .sidemenu-button.compass {
              margin-right: -3px;
              display: flex;
              align-items: center;
            }
            .header-menu-bar:not(.has-compass) .sidemenu-button.compass {
              display: none;
            }
            .content {
              flex-grow: 1;
            }
            .side-menu {
              background-color: ${Theme.LAYOUT_SIDEMENU_BACKGROUND_COLOR};
              overflow: hidden;
              z-index: 1;
              width: var(--side-menu-width);
              flex-shrink: 0;
              overscroll-behavior: contain;
              position: fixed;
              top: 0;
              left: 0;
              bottom: 0;
              transition: transform 0.3s ease-out;
              transform: translateX(calc(-1 * var(--side-menu-width)));
            }
            .side-menu.closed {
              visibility: hidden;
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
            .title {
              margin: 0px 35px;
              margin-left: 25px;
              color: white;
              font-size: 24px;
              font-weight: bold;
              cursor: pointer;
              text-decoration: none;
              min-width: 0;
            }
            .title-text {
              outline: none;
              display: block;
              z-index: 2;
              position: relative;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .layout-body {
              flex-shrink: 0;
              width: 100%;
            }
            .header-menu-bar {
              height: 100%;
              display: flex;
              flex-grow: 1;
              justify-content: flex-end;
            }
            .logo {
              position: relative;
              height: calc(100% - 30px);
              cursor: pointer;
            }
            .logo > img {
              height: 100%;
              z-index: 2;
              position: relative;
            }
            .logo .regular {
              width: 87px;
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
            .sidemenu-button.compass {
              display: none;
            }
            .title.desktop-hidden {
              display: none;
            }
            @media only screen and (max-width: 950px) {
              .sidemenu-button.compass {
                display: block;
                margin-right: 15px;
                align-self: center;
              }
              .title.desktop-hidden {
                display: block;
              }
              .header-menu-bar.has-compass .menu-bar {
                padding-left: 10px;
                border-left: 2px solid #2e2e30;
                border-image: linear-gradient(
                  to bottom,
                  #131518 0%,
                  #131518 15%,
                  #2e2e30 20%,
                  #2e2e30 80%,
                  #131518 85%,
                  #131518 100%
                );
                border-image-slice: 1;
              }
              .logo .regular {
                display: none;
              }
              .logo .compact {
                display: block;
                width: 35px;
                height: 40px;
              }
              .logo::after {
                mask: url(${compactLogo}) no-repeat;
                width: 35px;
                height: 40px;
              }
            }
            @media only screen and (max-width: 850px) {
              .title {
                font-size: 24px;
              }
              .layout-body {
                flex-direction: column;
                flex-shrink: 1;
              }
              .sidebar-button {
                display: inline-block;
              }
              .side-menu-content {
                width: calc(100vw - 100px);
                max-width: var(--side-menu-width);
              }
              /* On Android browsers, there's a sidebar when overflow:auto and no sidebar
               * when overflow:hidden. Therefore, we account for the sidebar width (which
               * is specified in the body) when the menu is not opened.
               * This causes a small resize on iOS, which doesn't respect the sidebar width.
               * The best way to do this would be to somehow calculate the sidebar width at
               * load time and add the correct value here.
               * TODO: do this, maybe, one day.
               */
              .side-menu:not(.opened) .side-menu-content {
                width: calc(100vw - 100px);
              }
              .title {
                display: block;
              }
              .title.desktop-hidden {
                display: block;
              }
              .side-menu.visible {
                width: calc(100vw - 100px);
                max-width: var(--side-menu-width);
              }
            }
            @media only screen and (max-width: 600px) {
              .layout {
                --side-menu-width: calc(100vw - 100px);
              }
              .header {
                justify-content: space-between;
              }
              .side-menu-content {
                height: calc(100% - 60px);
                transition: height 0.3s ease-out;
              }
              .side-bottom-menu {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 0px;
                background-color: #131518;
                display: block;
                width: calc(100vw - 100px);
                max-width: var(--side-menu-width);
                transition: height 0.3s ease-out;
                overflow: hidden;
                z-index: 10;
              }
              .sidemenu-button.compass {
                margin-right: 0;
              }
              .menu-bar {
                display: none;
              }
              .side-menu:not(.visible) .side-menu-content {
                height: 100%;
              }
              .side-menu.visible .side-bottom-menu {
                height: 60px;
              }
            }
            @media only screen and (max-width: 450px) {
              .logo {
                display: none;
              }
              .header {
                justify-content: space-between;
              }
              .header-menu-bar {
                flex-grow: 0;
              }
              .sidemenu-button.menu {
                margin-right: 0;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }
);

export interface LayoutProps {
  sidebarContent?: React.ReactNode;
  mainContent: React.ReactNode;
  sideMenuContent: React.ReactNode;
  headerAccent?: string;
  title?: string;
  // Force hides the title from desktop
  forceHideTitle?: boolean;
  actionButton?: React.ReactNode;
  user?: { username: string; avatarUrl?: string };
  logoLink?: LinkWithAction;
  titleLink?: LinkWithAction;
  onUserBarClick?: () => void;
  onCompassClick?: () => void;
  loading?: boolean;
  userLoading?: boolean;
  updates?: number | boolean;
  outdated?: boolean;
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
}

Layout.displayName = "LayoutForwardRef";
export default Layout;
