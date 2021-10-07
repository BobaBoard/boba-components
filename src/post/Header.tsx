import React from "react";

import classnames from "classnames";
import debug from "debug";
import { AccessoryType, LinkWithAction, SecretIdentityType } from "../types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCross,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

import Avatar from "./Avatar";
import AccessorySelector from "./AccessorySelector";
import DefaultTheme from "../theme/default";
import DropdownListMenu, { DropdownProps } from "../common/DropdownListMenu";
import ActionLink from "../buttons/ActionLink";
import css from "styled-jsx/css";
import questionMark from "../images/question_mark.png";
import Icon from "../common/Icon";
//const log = debug("bobaui:header-log");
const info = debug("bobaui:header-info");

const { className: timestampClassname, styles: timestampStyles } = css.resolve`
  a:hover {
    text-decoration: underline;
  }
`;

const useIdentityOptions = (props: {
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

export enum HeaderStyle {
  REGULAR = "REGULAR",
  COMPACT = "COMPACT",
}

const Metadata: React.FC<PostHeaderProps> = (props) => {
  const identityOptions = useIdentityOptions({
    additionalIdentities: props.additionalIdentities,
    onSelectIdentity: props.onSelectIdentity,
  });
  const hasUserIdentity =
    props.userIdentity?.name && props.userIdentity?.avatar;

  const currentAccessory = props.accessory
    ? props.accessories?.find(
        (accessory) => accessory.id == props.accessory?.id
      )
    : props.secretIdentity?.accessory
    ? {
        name: "Role",
        accessory: props.secretIdentity?.accessory,
      }
    : undefined;
  const metadata = (
    <>
      <div
        className={classnames("container", {
          compact: HeaderStyle.COMPACT == props.size,
          "with-options": identityOptions.length > 0,
        })}
      >
        <div className="metadata">
          <div className="metadata-identity">
            {props.additionalIdentities?.length ? (
              <div>
                <DropdownListMenu zIndex={200} options={identityOptions}>
                  <div>
                    <div className="identities-dropdown">
                      <div className="nickname">
                        {props.secretIdentity?.name || "Random Identity"}
                      </div>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                  </div>
                </DropdownListMenu>
              </div>
            ) : (
              <div className="nickname">
                {props.secretIdentity?.name || "Random Identity"}
              </div>
            )}
            {hasUserIdentity && !props.forceHide && (
              <>
                <div className="secret-identity-container">
                  <div className="secret-identity">
                    @{props.userIdentity?.name || "You"}
                  </div>
                  <AccessorySelector
                    currentAccessory={currentAccessory}
                    accessories={props.accessories}
                    onSelectAccessory={props.onSelectAccessory}
                    size={props.size || HeaderStyle.REGULAR}
                  />
                </div>
                {props.createdMessage && (
                  <div className="timestamp">
                    <ActionLink
                      link={props.createdMessageLink}
                      className={timestampClassname}
                    >
                      {props.createdMessage}
                    </ActionLink>
                  </div>
                )}
              </>
            )}
            {(!hasUserIdentity || props.forceHide) && props.createdMessage && (
              <div className="timestamp">
                <ActionLink link={props.createdMessageLink}>
                  {props.createdMessage}
                </ActionLink>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .secret-identity-container {
            display: flex;
            margin-top: 1px;
            align-items: center;
          }
          .nickname {
            font-size: var(--font-size-large);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 100%;
            padding-left: 5px;
            color: ${props.secretIdentity?.color || "inherit"};
          }
          .timestamp,
          .secret-identity {
            font-size: 14px;
            line-height: 17px;
            color: ${DefaultTheme.POST_HEADER_DATE_COLOR};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding-left: 5px;
          }
          .secret-identity {
            color: ${DefaultTheme.POST_HEADER_USERNAME_COLOR};
            flex-grow: 1;
            min-width: 50px;
          }
          .container {
            min-width: 0;
            width: 100%;
          }
          .container.compact-names .nickname {
            font-size: var(--font-size-large);
          }
          .container.compact-names .timestamp {
            font-size: var(--font-size-small);
          }
          .container.compact-names .metadata {
            font-size: var(--font-size-small);
            height: auto;
          }
          .identities-dropdown {
            display: inline-flex;
            border-radius: 10px;
            padding: 1px 5px;
            max-width: 100%;
          }
          .identities-dropdown .nickname {
            margin-right: 5px;
            padding-left: 0;
          }
          .identities-dropdown:hover {
            cursor: pointer;
            background-color: #ececec;
          }
          .metadata-identity {
            margin-bottom: 5px;
          }
          .metadata {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }
        `}
      </style>
      {timestampStyles}
    </>
  );
  return (
    <>
      {props.children}
      {metadata}
    </>
  );
};

const PostHeader = React.forwardRef<HTMLDivElement, PostHeaderProps>(
  (props, avatarRef) => {
    info(`Rendering post header`);
    const isCompact = props.size == HeaderStyle.COMPACT;
    const dropdownMetadata = (
      <div
        className={classnames("metadata-identity", {
          "with-options": !!props.avatarOptions,
        })}
      >
        <Avatar
          forceHide={props.forceHide}
          userIdentity={props.userIdentity}
          secretIdentity={props.secretIdentity}
          compact={isCompact}
        />
        <Metadata {...props} />
        <style jsx>{`
          .metadata-identity {
            color: black;
            padding: 10px;
            display: flex;
          }
          .metadata-identity.with-options {
            padding-bottom: 0px;
            margin-bottom: 5px;
            border-bottom: 1px dashed black;
          }
        `}</style>
      </div>
    );
    const currentAccessory = props.accessory
      ? props.accessories?.find(
          (accessory) => accessory.id == props.accessory?.id
        )
      : props.secretIdentity?.accessory
      ? {
          name: "Role",
          accessory: props.secretIdentity?.accessory,
        }
      : undefined;

    return (
      <div
        className={classnames("header-container", {
          compact: isCompact,
          "with-accessory-select": !!props.accessories?.length,
        })}
      >
        <DropdownListMenu
          options={props.avatarOptions}
          header={
            props.showMetadata !== false && (props.avatarOptions || isCompact)
              ? dropdownMetadata
              : undefined
          }
          zIndex={200}
        >
          <div className={classnames("post-header")}>
            <div className="identity">
              <Avatar
                forceHide={props.forceHide}
                userIdentity={props.userIdentity}
                secretIdentity={
                  props.secretIdentity
                    ? {
                        ...props.secretIdentity,
                        accessory:
                          currentAccessory?.accessory ||
                          props.secretIdentity?.accessory,
                      }
                    : {
                        accessory: currentAccessory?.accessory,
                      }
                }
                compact={isCompact}
                ref={avatarRef}
              />
              {!isCompact && <Metadata {...props} />}
            </div>
          </div>
        </DropdownListMenu>
        {isCompact && (
          <AccessorySelector
            currentAccessory={currentAccessory}
            accessories={props.accessories}
            onSelectAccessory={props.onSelectAccessory}
            size={props.size || HeaderStyle.REGULAR}
          />
        )}
        <style jsx>{`
          .header-container {
            max-width: 100%;
            width: 100%;
          }
          .header-container.compact {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .identity {
            display: flex;
            max-width: 100%;
            flex-grow: 1;
            min-width: 0;
          }
          .new-tags {
            display: flex;
            flex-direction: column;
            align-self: stretch;
            justify-content: space-evenly;
            margin-right: 15px;
          }
          .post-header {
            display: flex;
            align-items: center;
            position: relative;
            justify-content: space-between;
            text-align: left;
            max-width: 100%;
          }
          .header-container.compact.with-accessory-select .post-header {
            margin-bottom: 7px;
          }
          .post-header.squeezed {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }
          .post-header.squeezed .new-tags {
            margin-top: 5px;
            flex-direction: row;
            justify-content: flex-start;
          }
          .post-header.squeezed .new-tags > :global(div) {
            margin-right: 3px;
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
  userIdentity?: {
    avatar: string;
    name: string;
  };
  createdMessage?: string;
  createdMessageLink?: LinkWithAction;
  forceHide?: boolean;
  newPost?: boolean;
  newComments?: boolean;
  newContributions?: boolean;
  backgroundColor?: string;
  avatarOptions?: DropdownProps["options"];
  showMetadata?: boolean;
}
