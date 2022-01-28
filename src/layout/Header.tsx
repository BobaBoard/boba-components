import BoardTitle from "../board/BoardTitle";
import IconButton from "../buttons/IconButton";
import { LinkWithAction } from "../types";
import Logo from "./Logo";
import React from "react";
import Theme from "../theme/default";
import classnames from "classnames";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  accentColor?: string;
  logoLink?: LinkWithAction;
  titleLink?: LinkWithAction;
  onCompassClick?: LinkWithAction;
  title?: string;
  hideTitleOnDesktop?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  accentColor,
  logoLink,
  title,
  titleLink,
  hideTitleOnDesktop,
  onCompassClick,
  children,
}) => {
  return (
    <header>
      <Logo accentColor={accentColor} link={logoLink} />
      {title && (
        <BoardTitle
          accentColor={accentColor}
          title={title}
          link={titleLink}
          hideOnDesktop={hideTitleOnDesktop}
        />
      )}
      <div
        className={classnames("header-menu-bar", {
          "has-compass": !!onCompassClick,
        })}
      >
        <div className="compass">
          <IconButton
            icon={faCompass}
            link={onCompassClick}
            label="compass-menu"
          />
        </div>
        <div className="menu-bar">{children}</div>
      </div>
      <style jsx>{`
        header {
          background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
          background-image: var(--header-background-image);
          height: ${Theme.HEADER_HEIGHT_PX}px;
          position: fixed;
          top: 0;
          right: 0;
          left: ${Theme.PINNED_BAR_WIDTH_PX}px;
          flex-shrink: 0;
          padding-right: 15px;
          padding-left: 5px;
          display: flex;
          align-items: center;
          z-index: 10;
          transition: transform 0.3s ease-out;
        }
        .header-menu-bar {
          height: 100%;
          display: flex;
          flex-grow: 1;
          justify-content: flex-end;
          align-items: center;
        }
        .compass {
          display: none;
          margin-right: -3px;
        }
        .header-menu-bar:not(.has-compass) .compass {
          display: none;
        }
        .menu-bar {
          height: 100%;
        }
        @media only screen and (max-width: ${Theme.MOBILE_WIDTH_TRIGGER_PX}px) {
          .compass {
            display: block;
            margin-right: 15px;
            align-self: center;
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
        }
        @media only screen and (max-width: 600px) {
          header {
            justify-content: space-between;
            padding-left: 0px;
          }
          .header-menu-bar {
            flex-grow: 0;
          }
          .compass {
            margin-right: 0;
          }
          .menu-bar {
            display: none;
          }
        }
        @media only screen and (max-width: 450px) {
          .header-menu-bar {
            flex-grow: 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
