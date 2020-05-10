import React from "react";

import Tooltip from "../common/Tooltip";

import classnames from "classnames";

export enum HeaderStyle {
  REGULAR = "REGULAR",
  COMPACT = "COMPACT",
}

const Metadata: React.FC<PostHeaderProps> = (props) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  let metadata = (
    <>
      <div
        className={classnames("container", {
          compact: HeaderStyle.COMPACT == props.size,
        })}
      >
        <div className="metadata">
          <div className="metadata-main">
            <div className="nickname">
              {props.userIdentity && !props.forceHide
                ? props.userIdentity.name
                : props.secretIdentity.name}
              {props.userIdentity && !props.forceHide && (
                <div className="secret-identity">
                  ({props.secretIdentity.name})
                </div>
              )}
            </div>
            <div className="timestamp">{props.createdMessage}</div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .nickname {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .timestamp {
            font-size: smaller;
            color: rgba(255, 255, 255, 0.5);
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
            display: inline-block;
            opacity: 0.7;
            margin-left: 5px;
          }
          .metadata {
            display: flex;
            align-items: center;
            height: 60px;
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
  return (
    <>
      <div className="post-header">
        <Metadata {...props}>
          <div className="avatar" />
        </Metadata>
      </div>
      <style jsx>{`
        .avatar {
          position: relative;
          width: 60px;
          margin-right: 15px;
          height: 60px;
          display: block;
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
          border-radius: 15px;
        }
        .post-container {
          display: flex;
          flex-direction: column;
        }
        .post-header {
          display: flex;
          align-items: flex-start;
          margin-top: 10px;
          position: relative;
        }
      `}</style>
    </>
  );
};

export default PostHeader;

export interface PostHeaderProps {
  size: string;
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
}
