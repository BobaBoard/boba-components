import React from "react";
import DropdownListMenu, { DropdownStyle } from "../common/DropdownListMenu";
import CircleButton from "../buttons/CircleButton";
import {
  faHome,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { LinkWithAction } from "types";

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
            id={"home"}
            icon={faHome}
            link={onHomeMenuClick}
            accentColor={accentColor}
            loading={loading}
          />
        </div>
      )}
      {menuOptions?.map((option) => (
        <CircleButton
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
        <CircleButton
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
          font-size: var(--font-size-regular);
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
