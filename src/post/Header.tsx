import {
  AccessoryType,
  LinkWithAction,
  SecretIdentityType,
  UserIdentityType,
} from "types";
import UserMetadata, { UserMetadataStyle } from "./UserMetadata";

import { DropdownProps } from "common/DropdownListMenu";
import { IconProps } from "common/Icon";
import React from "react";
import classnames from "classnames";
import debug from "debug";
import questionMark from "images/question_mark.png";

// import Icon from "common/Icon";
//const log = debug("bobaui:header-log");
const info = debug("bobaui:header-info");

export enum HeaderStyle {
  REGULAR = "REGULAR",
  COMPACT = "COMPACT",
}

const getSelectedAccessory = ({
  secretIdentity,
  accessories,
  currentAccessory,
}: {
  secretIdentity?: SecretIdentityType;
  accessories?: AccessoryType[];
  currentAccessory?: AccessoryType;
}) => {
  return currentAccessory
    ? accessories?.find((accessory) => accessory.id == currentAccessory?.id)
    : secretIdentity?.accessory
    ? {
        name: "Role",
        accessory: secretIdentity?.accessory,
      }
    : undefined;
};

const mergeIdentityWithAccessory = ({
  secretIdentity,
  currentAccessory,
}: {
  secretIdentity?: SecretIdentityType;
  currentAccessory?: AccessoryType;
}): SecretIdentityType => {
  return secretIdentity
    ? {
        ...secretIdentity,
        accessory: currentAccessory?.accessory || secretIdentity?.accessory,
      }
    : {
        name: "Random Identity",
        avatar: questionMark,
        accessory: currentAccessory?.accessory,
      };
};

const useIdentitySelectionOptions = (props: {
  additionalIdentities: PostHeaderProps["additionalIdentities"];
  onSelectIdentity: PostHeaderProps["onSelectIdentity"];
}) => {
  const { onSelectIdentity } = props;
  const identityOptions = React.useMemo(
    () => [
      {
        name: "Random Identity",
        icon: questionMark,
        link: {
          onClick: () => onSelectIdentity?.(undefined),
        },
      },
      ...(props.additionalIdentities || []).map((identity) => ({
        name: identity.name,
        icon: identity.avatar,
        color: identity.color,
        link: {
          onClick: () => onSelectIdentity?.(identity),
        },
      })),
    ],
    [props.additionalIdentities, onSelectIdentity]
  );

  return identityOptions;
};

const PostHeader = React.forwardRef<HTMLImageElement, PostHeaderProps>(
  (props, avatarRef) => {
    info(`Rendering post header`);
    const isCompact = props.size == HeaderStyle.COMPACT;
    const selectedAccessory = getSelectedAccessory({
      secretIdentity: props.secretIdentity,
      accessories: props.accessories,
      currentAccessory: props.accessory,
    });
    const secretIdentity = mergeIdentityWithAccessory({
      secretIdentity: props.secretIdentity,
      currentAccessory: selectedAccessory,
    });
    const identityOptions = useIdentitySelectionOptions({
      additionalIdentities: props.additionalIdentities,
      onSelectIdentity: props.onSelectIdentity,
    });
    const hasIdentitySelector =
      !props.avatarOptions &&
      props.size === HeaderStyle.COMPACT &&
      props.additionalIdentities?.length;

    return (
      <div
        className={classnames("header-container", {
          compact: isCompact,
          "with-accessory-select": !!props.accessories?.length,
        })}
      >
        <UserMetadata
          secretIdentity={secretIdentity}
          userIdentity={props.userIdentity}
          forceHideIdentity={props.forceHide}
          withDropdownMetadata={
            props.size === HeaderStyle.COMPACT && !props.additionalIdentities
          }
          avatarDropdownOptions={
            hasIdentitySelector ? identityOptions : props.avatarOptions
          }
          avatarDropdownLabel={
            hasIdentitySelector ? "Select visible identity" : undefined
          }
          identityDropdownLabel="Select visible identity"
          createdMessage={props.createdMessage}
          createdMessageIcon={props.createdMessageIcon}
          createdMessageLink={props.createdMessageLink}
          selectedAccessory={selectedAccessory}
          accessories={props.accessories}
          onSelectAccessory={props.onSelectAccessory}
          identityOptions={
            props.additionalIdentities?.length ? identityOptions : []
          }
          size={
            props.size === HeaderStyle.REGULAR
              ? UserMetadataStyle.REGULAR
              : UserMetadataStyle.COMPACT
          }
          ref={avatarRef}
        />
        <style jsx>{`
          .header-container {
            max-width: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .header-container.compact {
            align-items: center;
          }
          .header-containetypeIconr.compact.with-accessory-select {
            margin-bottom: 7px;
          }
        `}</style>
      </div>
    );
  }
);

PostHeader.displayName = "PostHeader";
export default PostHeader;

export interface PostHeaderProps {
  size?: HeaderStyle;
  secretIdentity?: SecretIdentityType;
  additionalIdentities?: SecretIdentityType[];
  accessory?: AccessoryType;
  accessories?: AccessoryType[];
  onSelectIdentity?: (identity: SecretIdentityType | undefined) => void;
  onSelectAccessory?: (accessory: AccessoryType | undefined) => void;
  userIdentity?: UserIdentityType;
  avatarOptions?: DropdownProps["options"];
  createdMessage?: string;
  createdMessageIcon?: IconProps["icon"];
  createdMessageLink?: LinkWithAction;
  forceHide?: boolean;
  newPost?: boolean;
  newComments?: boolean;
  newContributions?: boolean;
  backgroundColor?: string;
}
