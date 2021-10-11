import {
  AccessoryType,
  LinkWithAction,
  SecretIdentityType,
  UserIdentityType,
} from "../types";
import DropdownListMenu, { DropdownProps } from "../common/DropdownListMenu";

import AccessorySelector from "./AccessorySelector";
import ActionLink from "../buttons/ActionLink";
import Avatar from "./Avatar";
import DefaultTheme from "../theme/default";
import Icon from "../common/Icon";
import React from "react";
import classnames from "classnames";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export enum UserMetadataStyle {
  REGULAR = "REGULAR",
  COMPACT = "COMPACT",
}

export interface UserMetadataProps {
  secretIdentity?: SecretIdentityType;
  userIdentity?: UserIdentityType;
  forceHideIdentity?: boolean;
  withDropdownMetadata?: boolean;
  avatarDropdownOptions?: DropdownProps["options"];
  identityOptions?: DropdownProps["options"];
  createdMessage?: string;
  createdMessageLink?: LinkWithAction;
  size?: UserMetadataStyle;
}

export interface AccessorySelectionProps {
  selectedAccessory?: AccessoryType;
  accessories?: AccessoryType[];
  onSelectAccessory?: (accessory: AccessoryType | undefined) => void;
}

const IdentityMetadata: React.FC<
  UserMetadataProps & AccessorySelectionProps
> = (props) => {
  const {
    secretIdentity,
    userIdentity,
    forceHideIdentity,
    size = UserMetadataStyle.REGULAR,
    selectedAccessory,
    accessories,
    onSelectAccessory,
    identityOptions,
  } = props;

  const hasUserIdentity = !!(userIdentity?.name && userIdentity?.avatar);
  const showUserIdentity = hasUserIdentity && !forceHideIdentity;
  return (
    <div className="metadata-identity">
      {/* This wrapper div makes the dropdown popup appear where expected. */}
      <div>
        <DropdownListMenu zIndex={200} options={identityOptions}>
          <div
            className={classnames("identity-container", {
              "with-selector": !!identityOptions?.length,
            })}
          >
            <div className="user-identity">{secretIdentity?.name}</div>
            {!!identityOptions?.length && <Icon icon={faCaretDown} />}
          </div>
        </DropdownListMenu>
      </div>
      {showUserIdentity && (
        <div
          className={classnames("secret-identity-container", {
            "with-accessory-selector": accessories?.length,
          })}
        >
          <div className="secret-identity">@{userIdentity?.name || "You"}</div>
          {onSelectAccessory && (
            <div className="accessory-selector">
              <AccessorySelector
                currentAccessory={selectedAccessory}
                accessories={accessories || []}
                onSelectAccessory={onSelectAccessory}
                size={size || UserMetadataStyle.REGULAR}
              />
            </div>
          )}
        </div>
      )}
      <style jsx>
        {`
          .metadata-identity {
            display: flex;
            flex-direction: column;
            min-width: 0;
            margin-bottom: 2px;
            flex-grow: 1;
          }
          .user-identity {
            font-size: var(--font-size-large);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 100%;
            padding-left: 5px;
            color: ${secretIdentity?.color || "black"};
          }
          .secret-identity {
            font-size: 14px;
            line-height: 17px;
            color: ${DefaultTheme.POST_HEADER_USERNAME_COLOR};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding-left: 5px;
            flex-grow: 1;
            min-width: 50px;
          }
          .identity-container.with-selector {
            display: inline-flex;
            border-radius: 10px;
            padding: 1px 5px;
            max-width: 100%;
          }
          .identity-container.with-selector .user-identity {
            margin-right: 5px;
            padding-left: 0;
          }
          .identity-container.with-selector:hover {
            cursor: pointer;
            background-color: #ececec;
          }
          .secret-identity-container.with-accessory-selector {
            display: flex;
            align-items: center;
          }
          .accessory-selector {
            margin-left: 0px;
            display: none;
          }
          .secret-identity-container.with-accessory-selector
            .accessory-selector {
            display: block;
          }
        `}
      </style>
    </div>
  );
};

const UserMetadata = React.forwardRef<
  HTMLDivElement,
  UserMetadataProps & AccessorySelectionProps
>((props, avatarRef) => {
  const {
    secretIdentity,
    userIdentity,
    forceHideIdentity,
    avatarDropdownOptions,
    withDropdownMetadata = true,
    createdMessage,
    createdMessageLink,
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
      <DropdownListMenu options={avatarDropdownOptions} zIndex={200}>
        {withDropdownMetadata && (
          <DropdownListMenu.Header>
            <div
              className={classnames("dropdown-metadata", {
                "with-options": avatarDropdownOptions?.length,
              })}
            >
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
      {!isCompact && (
        <div className="metadata">
          <IdentityMetadata {...props} />
          <div className="timestamp">
            <ActionLink
              link={createdMessageLink}
              label="The timestamp of the post"
            >
              {createdMessage}
            </ActionLink>
          </div>
        </div>
      )}
      {isCompact && accessories?.length && onSelectAccessory && (
        <div className="accessory-selector">
          <AccessorySelector
            currentAccessory={selectedAccessory}
            accessories={accessories}
            onSelectAccessory={onSelectAccessory}
            size={size || UserMetadataStyle.REGULAR}
          />
        </div>
      )}
      <style jsx>
        {`
          .metadata-container {
            min-width: 0;
            width: 100%;
            display: flex;
            flex-grow: 1;
            align-items: flex-start;
          }
          .metadata-container.compact {
            flex-direction: column;
          }
          .timestamp {
            font-size: 14px;
            line-height: 17px;
            color: ${DefaultTheme.POST_HEADER_DATE_COLOR};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding-left: 8px;
          }
          .timestamp :global(a):hover {
            text-decoration: underline;
          }
          .dropdown-metadata {
            padding: 15px;
          }
          .dropdown-metadata.with-options {
            padding-bottom: 10px;
            margin-bottom: 5px;
            border-bottom: 1px dashed black;
          }
          .metadata {
            flex-grow: 1;
            overflow: hidden;
            padding-right: 5px;
          }
          .accessory-selector {
            margin-top: 5px;
          }
        `}
      </style>
    </div>
  );
});
UserMetadata.displayName = "UserMetadata";

export default UserMetadata;
