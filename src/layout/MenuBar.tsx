import React from "react";
import Button, { ButtonStyle } from "../common/Button";
import DropdownListMenu, { DropdownStyle } from "../common/DropdownListMenu";
import {
  faInbox,
  faTh,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { LinkWithAction } from "types";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItem: React.FC<{
  icon: IconDefinition | string;
  selected?: boolean;
  link: LinkWithAction;
  accentColor?: string;
  defaultBorderColor?: string;
}> = ({ icon, selected, link, accentColor, defaultBorderColor }) => {
  return (
    <div className={classnames("menu-item", { selected })}>
      <a href={link?.href} className="icon">
        {typeof icon == "string" ? (
          <img src={icon} />
        ) : (
          <FontAwesomeIcon icon={icon} />
        )}
      </a>
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
        .menu-item:hover .icon {
          color: white;
        }
        .menu-item.selected .icon {
          border-color: ${accentColor || "white"};
          color: white;
        }
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
        .icon img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
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
    </div>
  );
};

const MenuBar: React.FC<MenuBarProps> = ({
  user,
  accentColor,
  onClick,
  loading,
  menuOptions,
  userMenuOptions,
  selectedOption,
  compact,
}) => {
  const indicator = (
    <Button
      icon={user?.avatarUrl ? undefined : faUser}
      imageUrl={user?.avatarUrl}
      onClick={onClick}
      color={accentColor}
      theme={ButtonStyle.DARK}
      compact={compact}
    >
      {loading ? "loading..." : user?.username || "Login"}
    </Button>
  );

  return (
    <div className="container">
      {menuOptions?.map((option) => (
        <MenuItem
          icon={option.icon}
          link={option.link}
          selected={selectedOption == option.id}
          accentColor={accentColor}
        />
      ))}
      <DropdownListMenu
        options={userMenuOptions}
        style={DropdownStyle.DARK}
        accentColor={accentColor}
      >
        <MenuItem
          icon={user?.avatarUrl ? user?.avatarUrl : faUser}
          link={{}}
          accentColor={accentColor}
          defaultBorderColor="green"
        />
      </DropdownListMenu>
      <style jsx>{`
        .container {
          height: 100%;
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </div>
  );
};

export default MenuBar;

export interface MenuBarProps {
  loading?: boolean;
  accentColor?: string;
  onClick?: () => void;
  menuOptions?: {
    id: string;
    icon: IconDefinition;
    link: LinkWithAction;
  }[];
  userMenuOptions?: {
    name: string;
    link: LinkWithAction;
  }[];
  compact?: boolean;
  selectedOption?: string;
  user?: { username: string; avatarUrl?: string };
}
