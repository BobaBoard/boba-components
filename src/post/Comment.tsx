import Header, { HeaderStyle } from "./Header";
import { LinkWithAction, SecretIdentityType } from "types";
import {
  faCertificate,
  faComment,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

import ActionLink from "buttons/ActionLink";
import Badge from "./Badge";
import { DropdownProps } from "../common/DropdownListMenu";
import Editor from "@bobaboard/boba-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Theme from "../theme/default";
import classnames from "classnames";
import css from "styled-jsx/css";
import debug from "debug";

const log = debug("bobaui:comment-log");

const {
  className: extraActionClassName,
  styles: extraActionStyles,
} = css.resolve`
  .extra-action {
    position: absolute;
    bottom: 3px;
    right: 16px;
    transform: translate(50%, 50%);
    display: none;
    background-color: transparent;
    padding: 0;
    border: 0;
  }
  .extra-action:focus,
  .extra-action:focus-visible {
    outline: none;
  }
  .extra-action:focus-visible .extra-action-icon {
    outline: auto;
  }
  .extra-action-icon {
    border-radius: 50%;
    background-color: ${Theme.COMMENT_BACKGROUND_COLOR};
    border: 1px solid ${Theme.COMMENT_BORDER_COLOR};
    width: 20px;
    height: 20px;
    margin: 15px;
    margin-right: 0px;
    position: relative;
    transition: all 0.2s ease-out;
  }
  .extra-action-icon :global(svg) {
    color: ${Theme.COMMENT_TEXT_COLOR};
    opacity: 0.6;
  }
  .extra-action.visible {
    display: block;
  }
  .extra-action :global(svg) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
  }
  .extra-action:hover {
    cursor: pointer;
  }
  .extra-action:hover .extra-action-icon :global(svg) {
    color: ${Theme.COMMENT_TEXT_COLOR};
    background-color: ${Theme.COMMENT_BACKGROUND_COLOR};
    opacity: 1;
  }
`;

const Comment = React.forwardRef<CommentHandler, CommentProps>(
  (
    {
      comments,
      secretIdentity,
      userIdentity,
      options,
      createdTime,
      forceHideIdentity,
      disableMotionOnScroll,
      op,
      new: isNew,
      onExtraAction,
    },
    ref
  ) => {
    const headerRef = React.useRef<HTMLDivElement>(null);
    const avatarRef = React.useRef<HTMLDivElement>(null);
    const commentContainerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      highlight: (color: string) => {
        console.log("highlight");
        log(`Highlighting comment with ${color}!`);
        if (!commentContainerRef.current) {
          return;
        }
        commentContainerRef.current.ontransitionend = () => {
          commentContainerRef.current?.style.setProperty(
            "--comment-container-shadow",
            null
          );
        };
        commentContainerRef.current.style.setProperty(
          "--comment-container-shadow",
          color
        );
      },
      avatarRef,
      headerRef,
    }));

    return (
      <article className="comment-chain-container">
        <div className="header" ref={headerRef}>
          <Header
            size={HeaderStyle.COMPACT}
            secretIdentity={secretIdentity}
            userIdentity={userIdentity}
            avatarOptions={options}
            createdMessage={createdTime}
            forceHide={forceHideIdentity}
            ref={avatarRef}
          />
        </div>
        <div className={classnames("badges")}>
          {!!isNew && (
            <div className="badge">
              <Badge
                icon={faCertificate}
                label="new"
                color={Theme.DEFAULT_ACCENT_COLOR}
              />
            </div>
          )}
          {!!op && (
            <div className="badge">
              <Badge label="OP" color={Theme.OP_BADGE_COLOR} icon={faCrown} />
            </div>
          )}
        </div>
        <div className="comments-container" ref={commentContainerRef}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              role="comment"
              className={classnames("comment")}
            >
              <Editor
                initialText={JSON.parse(comment.text)}
                singleLine={true}
                forceSSR={true}
              />
            </div>
          ))}
        </div>
        <ActionLink
          className={classnames("extra-action", extraActionClassName, {
            visible: !!onExtraAction,
          })}
          link={onExtraAction}
        >
          <div
            className={classnames("extra-action-icon", extraActionClassName)}
          >
            <FontAwesomeIcon icon={faComment} />
          </div>
        </ActionLink>
        <style jsx>{`
          .comment-chain-container {
            position: relative;
            align-items: start;
            display: flex;
            --comment-container-stacked-radius: 0;
            max-width: ${Theme.POST_WIDTH_PX}px;
            width: 100%;
            margin-bottom: 14px;
            --text-padding: 13px;
          }
          .header {
            cursor: pointer;
            position: ${disableMotionOnScroll ? "relative" : "sticky"};
            top: ${disableMotionOnScroll
              ? "0"
              : `${Theme.HEADER_HEIGHT_PX + 2}px`};
            margin-right: 3px;
          }
          .badges {
            display: flex;
            justify-content: flex-end;
            padding-right: 18px;
            position: absolute;
            top: 1px;
            left: 0;
            right: 0;
            z-index: 3;
            transform: translateY(-50%);
          }
          .badges .badge + .badge {
            margin-left: 5px;
          }
          .comment-chain {
            position: relative;
            align-items: start;
            display: flex;
            --comment-container-stacked-radius: 0;
            max-width: ${Theme.POST_WIDTH_PX}px;
            width: 100%;
            margin-bottom: 14px;
            --text-padding: 13px;
          }
          .comments-container {
            font-size: var(--font-size-regular);
            position: relative;
            max-width: ${Theme.POST_WIDTH_PX}px;
            width: calc(100% - 3px);
            box-shadow: 0px 0px 5px 3px var(--comment-container-shadow);
            transition: box-shadow 0.5s ease-out;
            border-radius: ${Theme.BORDER_RADIUS_REGULAR};
          }
          .comments-container::after {
            content: "";
            border: 2px solid ${Theme.COMMENT_BORDER_COLOR};
            box-sizing: border-box;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            position: absolute;
            z-index: 0;
            width: 100%;
            height: 100%;
            border-radius: ${Theme.BORDER_RADIUS_REGULAR};
            pointer-events: none;
          }
          .comment {
            position: relative;
            padding: 0px;
            min-width: 0;
            align-self: flex-end;
            --text-color: ${Theme.COMMENT_TEXT_COLOR};
            background: ${Theme.COMMENT_BACKGROUND_COLOR};
            min-height: 38px;
          }
          .comment:last-of-type {
            border-bottom-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-bottom-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
            overflow: hidden;
          }
          .comment:first-of-type {
            border-top-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-top-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
            overflow: hidden;
          }
          .comment:not(:first-of-type) {
            border-top: 1px dashed ${Theme.COMMENT_BORDER_COLOR};
          }
        `}</style>
        {extraActionStyles}
      </article>
    );
  }
);
Comment.displayName = "Comment";

export interface CommentHandler {
  highlight: (color: string) => void;
  avatarRef?: React.RefObject<HTMLDivElement>;
  headerRef?: React.RefObject<HTMLDivElement>;
}

export interface CommentProps {
  comments: { id: string; text: string }[];
  secretIdentity: SecretIdentityType;
  userIdentity?: {
    avatar: string;
    name: string;
  };
  forceHideIdentity?: boolean;
  createdTime: string;
  new?: boolean;
  op?: boolean;
  options?: DropdownProps["options"];
  onExtraAction?: LinkWithAction;
  disableMotionOnScroll?: boolean;
  ref?: React.Ref<CommentHandler>;
}

export default Comment;
