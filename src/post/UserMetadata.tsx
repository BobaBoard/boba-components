import AccessorySelector, { AccessorySelectorProps } from "./AccessorySelector";
import DropdownListMenu, { DropdownProps } from "common/DropdownListMenu";
import Icon, { IconProps } from "common/Icon";
import { LinkWithAction, SecretIdentityType, UserIdentityType } from "types";

import ActionLink from "buttons/ActionLink";
import Avatar from "./Avatar";
import DefaultTheme from "theme/default";
import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import noop from "noop-ts";

export enum UserMetadataStyle {
  REGULAR = "REGULAR",
  COMPACT = "COMPACT",
}
export interface UserMetadataProps extends Partial<AccessorySelectorProps> {
  secretIdentity?: SecretIdentityType;
  userIdentity?: UserIdentityType;
  forceHideIdentity?: boolean;
  withDropdownMetadata?: boolean;
  avatarDropdownOptions?: DropdownProps["options"];
  avatarDropdownLabel?: string;
  identityDropdownLabel?: string;
  identityOptions?: DropdownProps["options"];
  createdMessage?: string;
  createdMessageIcon?: IconProps["icon"];
  createdMessageLink?: LinkWithAction;
  size?: UserMetadataStyle;
}
const {
  className: messageIconClassName,
  styles: messageIconStyles,
} = css.resolve`
  .icon {
    margin-right: 2px;
    color: ${DefaultTheme.POST_HEADER_DATE_COLOR};
  }
`;

const {
  className: dropdownIconClassName,
  styles: dropdownIconStyles,
} = css.resolve`
  .icon {
    margin-left: 5px;
  }
`;

const IdentityMetadata: React.FC<UserMetadataProps> = (props) => {
  const {
    secretIdentity,
    userIdentity,
    forceHideIdentity,
    size = UserMetadataStyle.REGULAR,
    selectedAccessory,
    accessories,
    onSelectAccessory,
    identityOptions,
    identityDropdownLabel,
    avatarDropdownLabel,
    createdMessageLink,
    createdMessage,
  } = props;

  const hasUserIdentity = !!(userIdentity?.name && userIdentity?.avatar);
  const showUserIdentity = hasUserIdentity && !forceHideIdentity;
  return (
    <div
      className={classnames("metadata", {
        "with-identity-selector": !!identityOptions?.length,
        "with-accessory-selector": accessories?.length && onSelectAccessory,
        "with-message-icon": props.createdMessageIcon,
        "with-user-identity": showUserIdentity,
      })}
    >
      <DropdownListMenu
        buttonClassName="identity-button"
        zIndex={200}
        options={identityOptions}
        label={identityDropdownLabel || avatarDropdownLabel}
      >
        <div className="identity-container">
          <div className="user-identity">{secretIdentity?.name}</div>
          {!!identityOptions?.length && (
            <Icon icon={faCaretDown} className={dropdownIconClassName} />
          )}
        </div>
      </DropdownListMenu>
      {showUserIdentity && (
        <div className="secret-identity">@{userIdentity?.name || "You"}</div>
      )}
      <div className="accessory-selector">
        <AccessorySelector
          selectedAccessory={selectedAccessory}
          accessories={accessories || []}
          onSelectAccessory={onSelectAccessory ?? noop}
          size={size || UserMetadataStyle.REGULAR}
        />
      </div>
      {props.createdMessageIcon && (
        <div className="message-icon">
          <Icon
            className={messageIconClassName}
            icon={props.createdMessageIcon}
          />
        </div>
      )}
      <div className="timestamp">
        <ActionLink
          link={createdMessageLink}
          aria-label="The timestamp of the post"
        >
          {createdMessage}
        </ActionLink>
      </div>
      <style jsx>
        {`
          .metadata {
            display: grid;
            max-width: 100%;
            grid-template-columns: 30px 1fr minmax(50px, 160px);
            grid-template-rows: auto auto auto;
            grid-template-areas:
              "user-identity user-identity user-identity"
              "secret-identity secret-identity accessory-selector"
              "message-icon timestamp timestamp";
            grid-row-gap: 2px;
            align-items: center;
            justify-items: start;
            position: relative;
            width: 100%;
          }
          .metadata:not(.with-user-identity):not(.with-accessory-selector) {
            // When there's no user identity or accessory selector, the second line
            // of the grid becomes useless. We remove it so it doesn't cause extra
            // space because of the two grid graps one after the other.
            grid-template-rows: auto auto;
            grid-template-areas:
              "user-identity user-identity user-identity"
              "message-icon timestamp timestamp";
          }
          @media only screen and (max-width: 450px) {
            .metadata {
              grid-template-columns: 30px 1fr 80px;
            }
          }
          :not(.with-accessory-selector) .secret-identity {
            grid-column-start: secret-identity-start;
            grid-column-end: accessory-selector-end;
          }
          :not(.with-message-icon) .timestamp {
            grid-column-start: message-icon-start;
            grid-column-end: timestamp-end;
          }

          .identity-container,
          :global(.identity-button) {
            grid-area: user-identity;
            max-width: 100%;
          }
          .user-identity {
            font-size: var(--font-size-large);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 100%;
            color: ${secretIdentity?.color || "black"};
          }
          .secret-identity {
            font-size: var(--font-size-small);
            color: ${DefaultTheme.POST_HEADER_USERNAME_COLOR};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            min-width: 50px;
            grid-area: secret-identity;
            max-width: 100%;
          }
          .with-identity-selector .identity-container {
            display: inline-flex;
            border-radius: 10px;
            padding: 1px 5px;
            max-width: 100%;
          }
          .with-identity-selector :global(.identity-button) {
            margin-left: -5px;
          }

          .with-identity-selector .identity-container:hover {
            cursor: pointer;
            background-color: #ececec;
          }

          .accessory-selector {
            display: none;
            grid-area: accessory-selector;
            justify-self: end;
            width: 100%;
          }
          .accessory-selector > :global(button) {
            width: 100%;
          }
          .with-accessory-selector .accessory-selector {
            display: block;
          }
          .timestamp {
            font-size: var(--font-size-small);
            color: ${DefaultTheme.POST_HEADER_DATE_COLOR};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;
            grid-area: timestamp;
            line-height: 20px;
            max-width: 100%;
          }
          .timestamp :global(a):hover {
            text-decoration: underline;
          }
          .message-icon {
            --border-color: #a1a1a1;
            text-align: center;
            width: 25px;
            padding-right: 5px;
            margin-right: 5px;
            border-right: 1px solid var(--border-color);
            border-image: linear-gradient(
              to bottom,
              transparent 0%,
              transparent 8%,
              var(--border-color) 25%,
              var(--border-color) 75%,
              transparent 92%,
              transparent 100%
            );
            border-image-slice: 0 1 0 0;
            display: flex;
            align-items: center;
            grid-area: message-icon;
          }
        `}
      </style>
      {dropdownIconStyles}
      {messageIconStyles}
    </div>
  );
};

const UserMetadata = React.forwardRef<HTMLImageElement, UserMetadataProps>(
  (props, avatarRef) => {
    const {
      secretIdentity,
      userIdentity,
      forceHideIdentity,
      avatarDropdownOptions,
      avatarDropdownLabel,
      withDropdownMetadata = true,
      createdMessage,
      accessories,
      onSelectAccessory,
      selectedAccessory,
      size = UserMetadataStyle.REGULAR,
    } = props;
    const isCompact = size == UserMetadataStyle.COMPACT;

    return (
      <div
        className={classnames("metadata-container", {
          compact: UserMetadataStyle.COMPACT == size,
        })}
      >
        <DropdownListMenu
          options={avatarDropdownOptions}
          zIndex={200}
          label={avatarDropdownLabel}
        >
          {withDropdownMetadata && (
            <DropdownListMenu.Header>
              <div className="dropdown-metadata">
                <UserMetadata
                  secretIdentity={secretIdentity}
                  userIdentity={userIdentity}
                  forceHideIdentity={forceHideIdentity}
                  size={UserMetadataStyle.REGULAR}
                  createdMessage={createdMessage}
                  withDropdownMetadata={false}
                />
              </div>
            </DropdownListMenu.Header>
          )}
          <Avatar
            forceHide={forceHideIdentity}
            userIdentity={userIdentity}
            secretIdentity={secretIdentity}
            compact={size == UserMetadataStyle.COMPACT}
            ref={avatarRef}
          />
        </DropdownListMenu>
        {!isCompact && <IdentityMetadata {...props} />}
        {isCompact && accessories?.length && onSelectAccessory && (
          <div className="accessory-selector">
            <AccessorySelector
              selectedAccessory={selectedAccessory}
              accessories={accessories}
              onSelectAccessory={onSelectAccessory}
              size={size || UserMetadataStyle.REGULAR}
            />
          </div>
        )}
        <style jsx>
          {`
            .metadata-container {
              display: flex;
              grid-gap: 5px;
              align-items: flex-start;
              width: 100%;
            }
            .metadata-container.compact {
              flex-direction: column;
              align-items: center;
            }
            .metadata-container :global(*) {
              box-sizing: border-box;
            }
            .dropdown-metadata {
              padding: 15px;
            }
          `}
        </style>
      </div>
    );
  }
);
UserMetadata.displayName = "UserMetadata";

export default UserMetadata;
