import React from "react";

import DefaultTheme from "../theme/default";
import Tooltip from "../common/Tooltip";
import DropdownListMenu from "../common/DropdownListMenu";
import Tag from "../common/Tag";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useComponentSize from "@rehooks/component-size";
import fitty from "fitty";
import debug from "debug";

import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faCaretDown, faCertificate } from "@fortawesome/free-solid-svg-icons";

import { LinkWithAction } from "types";

//const log = debug("bobaui:header-log");
const info = debug("bobaui:header-info");

export enum HeaderStyle {
  REGULAR = "REGULAR",
  COMPACT = "COMPACT",
}

const Metadata: React.FC<PostHeaderProps> = (props) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  let ref = React.useRef<HTMLDivElement>(null);
  let nicknameRef = React.useRef(null);
  // @ts-ignore
  let { width, height } = useComponentSize(ref);
  React.useLayoutEffect(() => {
    if (!nicknameRef.current) {
      return;
    }
    // @ts-ignore
    fitty(nicknameRef.current, {
      maxSize: 24,
    });
  }, [width]);
  const hasUserIdentity =
    props.userIdentity?.name && props.userIdentity?.avatar;
  let metadata = (
    <>
      <div
        className={classnames("container", {
          compact: HeaderStyle.COMPACT == props.size,
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
                  <DropdownListMenu
                    zIndex={200}
                    options={[
                      {
                        name: "Random Identity",
                        link: {
                          onClick: () => props.onSelectIdentity?.(undefined),
                        },
                      },
                      ...props.additionalIdentities.map((identity) => ({
                        name: identity.name,
                        link: {
                          onClick: () => props.onSelectIdentity?.(identity),
                        },
                      })),
                    ]}
                  >
                    <div>
                      <div className="identities-dropdown">
                        <div className="secret-identity">
                          as: {props.secretIdentity?.name || "Random Identity"}
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} />
                      </div>
                    </div>
                  </DropdownListMenu>
                ) : (
                  <div className="secret-identity">
                    as: {props.secretIdentity?.name || "Random Identity"}
                  </div>
                )}
              </>
            )}
          </div>
          {props.createdMessage && (
            <div className="timestamp">
              {props.createdMessageLink ? (
                <a
                  onClick={(e) => {
                    props.createdMessageLink?.onClick();
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
      <style jsx>
        {`
          .nickname {
            font-size: 24px;
            font-weight: bold;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            max-width: 100%;
          }
          .timestamp {
            font-size: smaller;
            color: ${DefaultTheme.POST_HEADER_DATE_COLOR};
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .timestamp a {
            color: ${DefaultTheme.POST_HEADER_DATE_COLOR};
            text-decoration: none;
          }
          .timestamp a:hover {
            text-decoration: underline;
          }
          .container {
            min-width: 0;
          }
          .container.compact .nickname {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.9);
          }
          .container.compact .timestamp {
            font-size: 13px;
          }
          .container.compact .metadata {
            font-size: 13px;
            height: auto;
          }
          .secret-identity {
            font-size: 15px;
            color: #575757;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
            min-height: 60px;
            flex-direction: column;
            min-width: 0;
          }
        `}
      </style>
    </>
  );
  return props.size == HeaderStyle.COMPACT ? (
    <Tooltip isOpen={popoverOpen} position="top" content={metadata}>
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
  let ref = React.useRef<HTMLDivElement>(null);
  // @ts-ignore
  let { width, height } = useComponentSize(ref);
  React.useEffect(() => {
    setTagsOnNewLine(width < 300);
  }, [width]);

  info(`Rendering post header`);
  return (
    <>
      <div
        className={classnames("post-header", { squeezed: tagsOnNewLine })}
        ref={ref}
      >
        <div className="identity">
          <Metadata {...props}>
            <div className="avatar">
              <div
                className={classnames("secret-avatar", {
                  visible:
                    !props.forceHide &&
                    props.userIdentity?.avatar &&
                    props.secretIdentity?.avatar,
                })}
              />
            </div>
          </Metadata>
        </div>
        {props.children}
        <div className="new-tags">
          {props.newPost && (
            <Tag
              name="new"
              symbol={<FontAwesomeIcon icon={faCertificate} />}
              compact
              color={DefaultTheme.NEW_POST_COLOR}
            />
          )}
          {props.newComments && (
            <Tag
              name="new"
              symbol={<FontAwesomeIcon icon={faPlusSquare} />}
              compact
              color={DefaultTheme.NEW_CONTRIBUTION_COLOR}
            />
          )}
          {props.newContributions && (
            <Tag
              name="new"
              symbol={<FontAwesomeIcon icon={faComment} />}
              compact
              color={DefaultTheme.NEW_COMMENT_COLOR}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .avatar {
          position: relative;
          width: 60px;
          margin-right: 5%;
          height: 60px;
          min-width: 30px;
          min-height: 30px;
          display: block;
          align-self: center;
        }
        .post-header.squeezed .avatar {
          width: 35px;
          height: 35px;
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
        .avatar::before {
          background: url("${props.forceHide
            ? (props.secretIdentity || {}).avatar
            : (props.userIdentity || {}).avatar ||
              (props.secretIdentity || {}).avatar}");
          background-size: cover;
          display: block;
          content: "";
          width: 100%;
          padding-top: 100%;
          position: absolute;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        .secret-avatar {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40%;
          height: 40%;
          display: none;
        }
        .secret-avatar.visible {
          display: block;
        }
        .secret-avatar::before {
          border: 3px solid ${props.backgroundColor || "white"};
          background: url("${(props.secretIdentity || {}).avatar}");
          background-size: cover;
          display: block;
          content: "";
          width: 100%;
          padding-top: 100%;
          position: absolute;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        .post-header {
          display: flex;
          align-items: center;
          position: relative;
          justify-content: space-between;
          overflow: hidden;
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
}
