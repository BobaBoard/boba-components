import React from "react";

import DefaultTheme from "../theme/default";
import Tooltip from "../common/Tooltip";
import Tag from "../common/Tag";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useComponentSize from "@rehooks/component-size";
import fitty from "fitty";

import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

export enum HeaderStyle {
  REGULAR = "REGULAR",
  COMPACT = "COMPACT",
}

const Metadata: React.FC<PostHeaderProps> = (props) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  let ref = React.useRef<HTMLDivElement>(null);
  let nicknameRef = React.useRef(null);
  let { width, height } = useComponentSize(ref);
  React.useEffect(() => {
    if (!nicknameRef.current) {
      return;
    }
    // @ts-ignore
    fitty(nicknameRef.current, {
      maxSize: 24,
    });
  }, [width]);
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
              {props.userIdentity && !props.forceHide
                ? props.userIdentity.name
                : props.secretIdentity.name}
            </div>
            {props.userIdentity && !props.forceHide && (
              <div className="secret-identity">
                ({props.secretIdentity.name})
              </div>
            )}
          </div>
          <div className="timestamp">{props.createdMessage}</div>
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
            opacity: 0.7;
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
  let { width, height } = useComponentSize(ref);
  React.useEffect(() => {
    setTagsOnNewLine(width < 300);
  }, [width]);
  return (
    <>
      <div
        className={classnames("post-header", { squeezed: tagsOnNewLine })}
        ref={ref}
      >
        <div className="identity">
          <Metadata {...props}>
            <div className="avatar" />
          </Metadata>
        </div>
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
          min-height:  30px;
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
          background: url("${
            props.forceHide
              ? props.secretIdentity.avatar
              : props.userIdentity?.avatar || props.secretIdentity.avatar
          }");
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
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  createdMessage: string;
  forceHide?: boolean;
  newPost?: boolean;
  newComments?: boolean;
  newContributions?: boolean;
}
