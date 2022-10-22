import DropdownListMenu, { DropdownProps } from "common/DropdownListMenu";
import { SecretIdentityType, UserIdentityType } from "types";

import Avatar from "./Avatar";
import Icon from "common/Icon";
import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const { styles: headerStyles, className: headerClassName } = css.resolve`
  .metadata {
    max-width: calc(100% - 20px);
  }
  button {
    display: block;
    width: 40px;
    height: 30px;
    font-size: var(--font-size-regular);
    color: rgb(28, 28, 28, 0.45);
    position: absolute;
    top: 5px;
    right: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button:is(:hover, :focus) {
    color: rgb(28, 28, 28);
    cursor: pointer;
  }
  @media only screen and (max-width: 500px) {
    button {
      // By this point the user has switched to a mobile view, so we don't
      // have to worry about the arrow. The user is also probably going
      // to use the finger, so a clickable area closer to the bottom will come in
      // handy.
      top: 0;
      width: 40px;
      height: 40px;
    }
  }
`;

/**
 * The tiniest header in the world. Used where we want to have access to the
 * necessary information about the posts and to its options but don't
 * have a lot of space
 */
const TinyHeader = React.forwardRef<HTMLImageElement, TinyHeaderProps>(
  (props, avatarRef) => {
    return (
      <div className={classnames("header-container", props.className)}>
        <Avatar
          secretIdentity={props.secretIdentity}
          userIdentity={props.forceHide ? undefined : props.userIdentity}
          compact="mini"
          ref={avatarRef}
        />
        {props.secretIdentity?.name && <div>{props.secretIdentity?.name}</div>}
        {props.userIdentity?.name && <div>({props.userIdentity?.name})</div>}
        {props.postOptions?.length && (
          <DropdownListMenu
            buttonClassName={classnames(headerClassName)}
            options={props.postOptions}
            label="Post options"
          >
            <DropdownListMenu.Header>
              {props.postOptions}
            </DropdownListMenu.Header>
            <Icon icon={faEllipsisV} />
          </DropdownListMenu>
        )}
        <style jsx>{`
          .header-container {
            max-width: 100%;
            width: 100%;
            display: flex;
            padding: 5px 8px;
            align-items: center;
          }
        `}</style>
        {headerStyles}
      </div>
    );
  }
);

TinyHeader.displayName = "TinyHeader";
export default TinyHeader;

// TODO: readd accessory here
export interface TinyHeaderProps {
  secretIdentity?: SecretIdentityType;
  userIdentity?: UserIdentityType;
  avatarOptions?: DropdownProps["options"];
  postOptions?: DropdownProps["options"];
  forceHide?: boolean;
  className?: string;
}
