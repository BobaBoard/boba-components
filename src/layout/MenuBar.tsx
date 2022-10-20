import DropdownListMenu, { DropdownStyle } from "common/DropdownListMenu";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

import CircleButton from "buttons/CircleButton";
import { IconProps } from "common/Icon";
import { LinkWithAction } from "types";
import React from "react";

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
          <CircleButton
            icon={{ icon: faHome }}
            link={onHomeMenuClick}
            accentColor={accentColor}
            loading={loading}
          />
        </div>
      )}
      {menuOptions?.map((option) => (
        <div className="menu-item" key={option.id}>
          <CircleButton
            icon={option.icon}
            link={option.link}
            selected={selectedOption == option.id}
            accentColor={accentColor}
          />
        </div>
      ))}
      <DropdownListMenu
        options={isLoggedIn ? userMenuOptions : undefined}
        style={DropdownStyle.DARK}
        accentColor={accentColor}
      >
        <div className="menu-item">
          <CircleButton
            icon={{ icon: user?.avatarUrl ? user?.avatarUrl : faUser }}
            link={!loading && !isLoggedIn ? onLoggedOutUserClick : undefined}
            accentColor={accentColor}
            defaultBorderColor={isLoggedIn ? "green" : undefined}
            loading={loading}
            withDropdown={
              !!isLoggedIn && !!userMenuOptions?.length ? {} : undefined
            }
            blurred={forceHideIdentity}
            aria-label={!loading && !isLoggedIn ? "login" : "User menu"}
          />
        </div>
      </DropdownListMenu>
      <style jsx>{`
        .container {
          height: 100%;
          display: flex;
          justify-content: space-around;
          font-size: var(--font-size-regular);
        }
        .home {
          display: none;
        }
        .menu-item {
          padding: 0 10px;
        }
        .menu-item:last-child {
          padding-right: 0px;
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
    icon: IconProps;
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
