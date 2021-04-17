import React from "react";
import DropdownListMenu, { DropdownStyle } from "../common/DropdownListMenu";
import {
  faChevronCircleDown,
  faHome,
  faSpinner,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { LinkWithAction } from "types";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionLink from "../common/ActionLink";
import css from "styled-jsx/css";

const getIconStyle = ({
  accentColor,
  defaultBorderColor,
}: {
  accentColor?: string;
  defaultBorderColor?: string;
}) => css.resolve`
  .icon {
    width: 35px;
    height: 35px;
    background-color: #2e2e30;
    border: 2px solid ${defaultBorderColor || "#2e2e30"};
    border-radius: 50%;
    color: #bfbfbf;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon.blurred :global(img) {
    filter: blur(3px) invert(1);
  }
  .icon.blurred:hover :global(img) {
    filter: none;
  }
  .icon.dropdown {
    mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
      radial-gradient(18px at right 3px bottom 6px, transparent 50%, black 55%)
        bottom right;
  }
  .icon img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .selected.icon {
    border-color: ${accentColor || "white"};
    color: white;
  }
  .loading.icon :global(svg) {
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

const MenuItem: React.FC<{
  id: string;
  loading?: boolean;
  icon: IconDefinition | string;
  selected?: boolean;
  link?: LinkWithAction;
  accentColor?: string;
  defaultBorderColor?: string;
  withDropdown?: boolean;
  blurred?: boolean;
}> = ({
  id,
  loading,
  icon,
  selected,
  link,
  accentColor,
  defaultBorderColor,
  withDropdown,
  blurred,
}) => {
  const { className: iconClassName, styles: iconStyle } = getIconStyle({
    accentColor,
    defaultBorderColor,
  });
  return (
    <div key={id} className={classnames("menu-item", { selected, loading })}>
      <div className="icon-wrapper">
        <ActionLink
          link={link}
          className={classnames("icon", iconClassName, {
            dropdown: !!withDropdown,
            loading,
            selected,
            blurred,
          })}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} />
          ) : typeof icon == "string" ? (
            <img src={icon} />
          ) : (
            <FontAwesomeIcon icon={icon} />
          )}
        </ActionLink>
        <div
          className={classnames("dropdown-indicator", {
            visible: !!withDropdown,
          })}
        >
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </div>
      </div>
      {selected && <div className="select-bar" />}
      <style jsx>{`
        .menu-item {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0px 10px;
          position: relative;
        }
        .menu-item:hover {
          cursor: pointer;
        }
        .menu-item:hover :global(.icon) {
          color: white;
        }
        .icon-wrapper {
          position: relative;
        }
        .dropdown-indicator {
          position: absolute;
          right: -3px;
          bottom: 1px;
          color: rgb(46, 46, 48);
          background-color: rgb(191, 191, 191);
          border-radius: 50%;
          width: 10px;
          height: 10px;
          display: none;
        }
        .dropdown-indicator.visible {
          display: block;
        }
        .dropdown-indicator :global(svg) {
          height: 15px;
          width: 15px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .select-bar {
          height: 3px;
          position: absolute;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: ${accentColor || "white"};
        }
      `}</style>
      {iconStyle}
    </div>
  );
};

const MenuBar: React.FC<MenuBarProps> = ({
  user,
  accentColor,
  onHomeMenuClick,
  onLoggedOutUserClick,
  loading,
  menuOptions,
  userMenuOptions,
  selectedOption,
  forceHideIdentity,
}) => {
  const isLoggedIn = !loading && user?.avatarUrl;
  return (
    <div className="container">
      {onHomeMenuClick && (
        <div className="home">
          <MenuItem
            id={"home"}
            icon={faHome}
            link={onHomeMenuClick}
            accentColor={accentColor}
            loading={loading}
          />
        </div>
      )}
      {menuOptions?.map((option) => (
        <MenuItem
          key={option.id}
          id={option.id}
          icon={option.icon}
          link={option.link}
          selected={selectedOption == option.id}
          accentColor={accentColor}
        />
      ))}
      <DropdownListMenu
        options={isLoggedIn ? userMenuOptions : undefined}
        style={DropdownStyle.DARK}
        accentColor={accentColor}
      >
        <MenuItem
          id={"login"}
          icon={user?.avatarUrl ? user?.avatarUrl : faUser}
          link={!loading && !isLoggedIn ? onLoggedOutUserClick : undefined}
          accentColor={accentColor}
          defaultBorderColor={isLoggedIn ? "green" : undefined}
          loading={loading}
          withDropdown={!!isLoggedIn && !!userMenuOptions?.length}
          blurred={forceHideIdentity}
        />
      </DropdownListMenu>
      <style jsx>{`
        .container {
          height: 100%;
          display: flex;
          justify-content: space-around;
        }
        .home {
          display: none;
        }
        @media only screen and (max-width: 450px) {
          .home {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default MenuBar;

export interface MenuBarProps {
  loading?: boolean;
  accentColor?: string;
  onLoggedOutUserClick: LinkWithAction;
  onHomeMenuClick?: LinkWithAction;
  menuOptions?: {
    id: string;
    icon: IconDefinition;
    link: LinkWithAction;
  }[];
  userMenuOptions?: {
    name: string;
    link: LinkWithAction;
  }[];
  selectedOption?: string | null;
  user?: { username: string; avatarUrl?: string };
  forceHideIdentity?: boolean;
}
