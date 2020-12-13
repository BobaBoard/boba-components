import React from "react";
import useComponentSize from "@rehooks/component-size";

import classnames from "classnames";
import debug from "debug";
import { LinkWithAction } from "types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import Avatar, { AvatarProps } from "./Avatar";
import DefaultTheme from "../theme/default";
import Tooltip from "../common/Tooltip";
import DropdownListMenu, { DropdownProps } from "../common/DropdownListMenu";
//const log = debug("bobaui:header-log");
const info = debug("bobaui:header-info");

export enum HeaderStyle {
  REGULAR = "REGULAR",
  COMPACT = "COMPACT",
}

const Metadata: React.FC<PostHeaderProps> = (props) => {
  const [forceCompact, setForceCompact] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const nicknameRef = React.useRef(null);
  const { width } = useComponentSize(ref);
  React.useEffect(() => {
    setForceCompact(width < 300);
  }, [width]);

  const { onSelectIdentity } = props;
  const identityOptions = React.useMemo(
    () => [
      {
        name: "Random Identity",
        link: {
          onClick: () => onSelectIdentity?.(undefined),
        },
      },
      ...(props.additionalIdentities || []).map((identity) => ({
        name: identity.name,
        icon: identity.avatar,
        link: {
          onClick: () => onSelectIdentity?.(identity),
        },
      })),
    ],
    [props.additionalIdentities, onSelectIdentity]
  );
  const hasUserIdentity =
    props.userIdentity?.name && props.userIdentity?.avatar;
  const metadata = (
    <>
      <div
        className={classnames("container", {
          compact: HeaderStyle.COMPACT == props.size,
          "compact-names": forceCompact,
        })}
        ref={ref}
      >
        <div className="metadata">
          <div className="metadata-identity">
            <div className="nickname" ref={nicknameRef}>
              {hasUserIdentity && !props.forceHide
                ? props.userIdentity?.name
                : props.secretIdentity?.name || "Random Identity"}
            </div>
            {hasUserIdentity && !props.forceHide && (
              <>
                {props.additionalIdentities &&
                props.additionalIdentities.length > 0 ? (
                  <div>
                    <DropdownListMenu zIndex={200} options={identityOptions}>
                      <div>
                        <div className="identities-dropdown">
                          <div className="secret-identity">
                            as:{" "}
                            {props.secretIdentity?.name || "Random Identity"}
                          </div>
                          <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                      </div>
                    </DropdownListMenu>
                  </div>
                ) : (
                  <>
                    <div className="secret-identity">
                      as: {props.secretIdentity?.name || "Random Identity"}
                    </div>
                    {props.createdMessage && (
                      <div className="timestamp">
                        {props.createdMessageLink ? (
                          <a
                            onClick={(e) => {
                              props.createdMessageLink?.onClick?.();
                              e.preventDefault();
                            }}
                            href={props.createdMessageLink.href}
                          >
                            {props.createdMessage}
                          </a>
                        ) : (
                          props.createdMessage
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {(!hasUserIdentity || props.forceHide) && props.createdMessage && (
              <div className="timestamp">
                {props.createdMessageLink ? (
                  <a
                    onClick={(e) => {
                      props.createdMessageLink?.onClick?.();
                      e.preventDefault();
                    }}
                    href={props.createdMessageLink.href}
                  >
                    {props.createdMessage}
                  </a>
                ) : (
                  props.createdMessage
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .nickname {
            font-size: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 100%;
          }
          .timestamp,
          .secret-identity {
            font-size: 14px;
            line-height: 17px;
            color: ${DefaultTheme.TEXT_MUTED};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .timestamp a {
            color: ${DefaultTheme.TEXT_MUTED};
            text-decoration: none;
          }
          .timestamp a:hover {
            text-decoration: underline;
          }
          .container {
            min-width: 0;
            width: 100%;
          }
          .container.compact-names .nickname {
            font-size: 18px;
          }
          .container.compact-names .timestamp {
            font-size: 13px;
          }
          .container.compact-names .metadata {
            font-size: 13px;
            height: auto;
          }
          .identities-dropdown {
            display: inline-flex;
            color: #575757;
            border-radius: 10px;
            padding: 3px 6px;
            margin-left: -6px;
            margin-top: -3px;
            max-width: 100%;
          }
          .identities-dropdown .secret-identity {
            margin-right: 5px;
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
    </>
  );
  return props.size == HeaderStyle.COMPACT ? (
    <Tooltip
      isOpen={popoverOpen}
      position="top"
      content={metadata}
      onClickOutside={() => setPopoverOpen(false)}
    >
      <div
        onMouseEnter={() => setPopoverOpen(true)}
        onMouseLeave={() => setPopoverOpen(false)}
      >
        {props.children}
      </div>
    </Tooltip>
  ) : (
    <>
      {props.children}
      {metadata}
    </>
  );
};

const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const [tagsOnNewLine, setTagsOnNewLine] = React.useState(false);
  const [forceCompact, setForceCompact] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const { width } = useComponentSize(ref);
  React.useEffect(() => {
    setTagsOnNewLine(width < 300);
    setForceCompact(width < 500);
  }, [width]);

  info(`Rendering post header`);
  return (
    <>
      <DropdownListMenu options={props.avatarOptions} zIndex={200}>
        <div
          className={classnames("post-header", { squeezed: tagsOnNewLine })}
          ref={ref}
        >
          <div className="identity">
            <Metadata {...props}>
              <Avatar
                forceHide={props.forceHide}
                userIdentity={props.userIdentity}
                secretIdentity={props.secretIdentity}
                compact={props.size == HeaderStyle.COMPACT || forceCompact}
                accessory={props.accessory}
              />
            </Metadata>
          </div>
          {props.children}
        </div>
      </DropdownListMenu>
      <style jsx>{`
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
    </>
  );
};

export default PostHeader;

export interface PostHeaderProps {
  size?: string;
  secretIdentity?: {
    avatar: string;
    name: string;
  };
  additionalIdentities?: {
    id: string;
    avatar: string;
    name: string;
  }[];
  onSelectIdentity?: (
    identity:
      | {
          avatar: string;
          name: string;
          id: string;
        }
      | undefined
  ) => void;
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
  accessory?: AvatarProps["accessory"];
  children?: JSX.Element | undefined;
}
