import { faCertificate, faCrown } from "@fortawesome/free-solid-svg-icons";
import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import Badge from "./Badge";
import Icon from "common/Icon";
import { PostProps } from "./Post";
import React from "react";
import Tags from "tags/Tags";
import TagsFactory from "tags/TagsFactory";
import Theme from "theme/default";
import classnames from "classnames";
import pluralize from "pluralize";

export interface PostPreambleProps {
  newPost?: boolean;
  op?: boolean;
  tags?: PostProps["tags"];
  newContributions?: number;
  newComments?: number;
  hideUpdates?: boolean;
  getOptionsForTag?: PostProps["getOptionsForTag"];
}

export const PostBadges = ({
  newPost = false,
  op = false,
  className,
}: {
  newPost?: boolean;
  op?: boolean;
  className?: string;
}) => {
  if (!newPost && !op) {
    return null;
  }
  return (
    <div className={classnames("badges", className)}>
      {newPost && (
        <Badge
          icon={faCertificate}
          label="new"
          color={Theme.DEFAULT_ACCENT_COLOR}
        />
      )}
      {op && <Badge label="OP" color={Theme.OP_BADGE_COLOR} icon={faCrown} />}
      <style jsx>{`
        .badges {
          display: flex;
          justify-content: flex-end;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 18px;
          z-index: 3;
          transform: translateY(50%);
          gap: 5px;
        }
      `}</style>
    </div>
  );
};

const UpdatesHeader = (props: {
  newPost?: boolean;
  newComments?: number;
  newContributions?: number;
}) => (
    <>
      {props.newPost && (
        <div className="update new-post">
          <Icon icon={faCertificate} /> New post
        </div>
      )}
      {!!props.newContributions && (
        <div className="update new-contributions">
          <Icon icon={faPlusSquare} /> {props.newContributions} new{" "}
          {pluralize("contribution", props.newContributions)}
        </div>
      )}
      {!!props.newComments && (
        <div className="update new-comments">
          <Icon icon={faComment} /> {props.newComments} new{" "}
          {pluralize("comment", props.newComments)}
        </div>
      )}
      <style jsx>{`
        .update {
          color: white;
          opacity: 0.6;
          font-size: 12px;
          margin-left: 10px;
        }
        .update + .update {
          margin-top: 2px;
        }
      `}</style>
    </>
  );

const PostPreamble: React.FC<PostPreambleProps> = (props) => {
  const hasUpdate =
    props.newComments || props.newContributions || props.newPost;
  const hasContentWarnings = !!props.tags?.contentWarnings?.length;
  return (
    <div className="preamble">
      {hasUpdate && !props.hideUpdates && (
        <UpdatesHeader
          newPost={props.newPost}
          newComments={props.newComments}
          newContributions={props.newContributions}
        />
      )}
      {hasContentWarnings && (
        <Tags
          tags={TagsFactory.getTagsFromTagObject({
            indexTags: [],
            categoryTags: [],
            whisperTags: [],
            contentWarnings: props.tags?.contentWarnings || [],
          })}
          getOptionsForTag={props.getOptionsForTag}
          packBottom
        />
      )}
      <PostBadges {...props} />
      <style jsx>{`
        .preamble {
          position: relative;
          margin-left: 10px;
          margin-bottom: 1px;
        }
      `}</style>
    </div>
  );
};

export default PostPreamble;
