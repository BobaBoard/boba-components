import DropdownListMenu, {
  DropdownProps,
  DropdownStyle,
} from "common/DropdownListMenu";
import { LinkWithAction, UserIdentityType } from "types";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

import CircleButton from "buttons/CircleButton";
import { IconProps } from "common/Icon";
import React from "react";

const MenuBar: React.FC<MenuBarProps> = ({
  user,
  accentColor,
  onHomeMenuClick,
  onLoggedOutUserClick,
  menuOptions,
  selectedOption,
  forceHideIdentity,
}) => {
  const isLoggedIn = !user?.loading && user?.avatar;
  return (
    <div className="container">
      {onHomeMenuClick && (
        <div className="home">
          <CircleButton
            icon={{ icon: faHome }}
            link={onHomeMenuClick}
            accentColor={accentColor}
            loading={user?.loading}
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
        options={isLoggedIn ? user.menuOptions : undefined}
        style={DropdownStyle.DARK}
        accentColor={accentColor}
      >
        <div className="menu-item">
          <CircleButton
            icon={{ icon: user?.avatar ?? faUser }}
            link={
              !user?.loading && !isLoggedIn ? onLoggedOutUserClick : undefined
            }
            accentColor={accentColor}
            defaultBorderColor={isLoggedIn ? "green" : undefined}
            loading={user?.loading}
            withDropdown={
              !!isLoggedIn && !!user.menuOptions?.length ? {} : undefined
            }
            blurred={forceHideIdentity}
            aria-label={!user?.loading && !isLoggedIn ? "login" : "User menu"}
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
  accentColor?: string;
  onLoggedOutUserClick: LinkWithAction;
  onHomeMenuClick?: LinkWithAction;
  menuOptions?: {
    id: string;
    icon: IconProps;
    link: LinkWithAction;
  }[];
  selectedOption?: string | null;
  user?:
    | (UserIdentityType & {
        loading?: false;
        menuOptions?: DropdownProps["options"];
      })
    | (Partial<UserIdentityType> & {
        loading?: true;
        menuOptions?: DropdownProps["options"];
      });
  forceHideIdentity?: boolean;
}
