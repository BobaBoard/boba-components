import DropdownListMenu, {
  DropdownProps,
  DropdownStyle,
} from "common/DropdownListMenu";
import { LinkWithAction, UserIdentityType } from "types";

import BoardTitle from "board/BoardTitle";
import CircleButton from "buttons/CircleButton";
import Logo from "./Logo";
import React from "react";
import classnames from "classnames";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  accentColor?: string;
  logoLink?: LinkWithAction;
  titleLink?: LinkWithAction;
  title?: string;
  hideTitleOnDesktop?: boolean;
  className?: string;
  user?:
    | Partial<UserIdentityType> & {
        loading?: boolean;
        menuOptions?: DropdownProps["options"];
      };
  onLoggedOutUserClick: LinkWithAction;
  forceHideIdentity?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  className,
  accentColor,
  logoLink,
  title,
  titleLink,
  hideTitleOnDesktop,
  children,
  user,
  forceHideIdentity,
  onLoggedOutUserClick,
}) => {
  const isLoggedIn = !user?.loading && user?.avatar;
  return (
    <header className={className}>
      <Logo accentColor={accentColor} link={logoLink} />
      {title && (
        <BoardTitle
          accentColor={accentColor}
          title={title}
          link={titleLink}
          hideOnDesktop={hideTitleOnDesktop}
        />
      )}
      <div className={classnames("header-menu-bar")}>
        <div className="menu-bar">{children}</div>
        <DropdownListMenu
          options={isLoggedIn ? user.menuOptions : undefined}
          style={DropdownStyle.DARK}
          accentColor={accentColor}
        >
          <div className="user-menu">
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
      </div>
      <style jsx>{`
        header {
          flex-shrink: 0;
          padding-right: 15px;
          padding-left: 5px;
          display: flex;
          align-items: center;
        }
        .header-menu-bar {
          height: 100%;
          display: flex;
          flex-grow: 1;
          justify-content: flex-end;
          align-items: center;
        }
        .menu-bar {
          height: 100%;
        }
        .user-menu {
          margin-left: 10px;
        }
        @media only screen and (max-width: 600px) {
          header {
            justify-content: space-between;
            padding-left: 0px;
          }
          .header-menu-bar {
            flex-grow: 0;
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
