import React, { createRef, PureComponent, RefObject } from "react";
import classNames from "classnames";
import Editor from "@bobaboard/boba-editor";
import Theme from "../theme/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { DropdownProps } from "../common/DropdownListMenu";
import { SecretIdentityType } from "types";

class Comment extends PureComponent<CommentProps> {
  editorRef = createRef<HTMLDivElement>();

  highlight() {
    console.log("deprecated!");
  }

  render() {
    return (
      <>
        <div
          className={classNames("comment-container", {
            muted: this.props.muted,
            "with-extra-action": !!this.props.onExtraAction,
            "image-only": true,
          })}
        >
          <div className={classNames("comment")} ref={this.editorRef}>
            <Editor
              key={this.props.id + "_editor"}
              editable={false}
              initialText={JSON.parse(this.props.initialText)}
              singleLine={true}
              showTooltip={false}
              forceSSR={true}
            />
          </div>
          <button
            className={classNames("extra-action", {
              visible: !!this.props.onExtraAction,
            })}
            onClick={this.props.onExtraAction}
          >
            <div className="extra-action-icon">
              <FontAwesomeIcon icon={faComment} />
            </div>
          </button>
        </div>
        <style jsx>{`
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
          .extra-action:focus {
            outline: none;
          }
          .extra-action:focus-visible {
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
          .comment-container {
            font-size: var(--font-size-regular);
            position: relative;
            max-width: ${Theme.POST_WIDTH_PX}px;
            width: calc(100% - 3px);
          }
          .comment {
            position: relative;
            padding: 0 3px;
            min-width: 0;
            align-self: flex-end;
            --text-color: ${Theme.COMMENT_TEXT_COLOR};
            background: ${Theme.COMMENT_BACKGROUND_COLOR};
            border-radius: ${Theme.BORDER_RADIUS_REGULAR};
            min-height: 38px;
            overflow: hidden;
          }
          .image-only .comment {
            padding: 0px;
          }
          .comment-container.with-extra-action:last-child .comment {
            mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
              radial-gradient(
                  28px circle at bottom 3px right 9px,
                  transparent 50%,
                  black 51%
                )
                bottom right;
            mask-size: cover;
          }
          .comment-container.muted .comment {
            color: rgba(255, 255, 255, 0.8);
          }
          .comment::after {
            content: "";
            border: 2px solid ${Theme.COMMENT_BORDER_COLOR};
            border-bottom-width: 0px;
            border-top-width: 0px;
            box-sizing: border-box;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            position: absolute;
            z-index: 2;
            width: 100%;
            height: 100%;
            border-radius: var(
              --comment-container-stacked-radius,
              ${Theme.BORDER_RADIUS_REGULAR}
            );
            pointer-events: none;
          }
          .comment-container:first-of-type .comment::after {
            border-top-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-top-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-top-width: 2px;
          }
          .comment-container:last-of-type .comment::after {
            border-bottom-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-bottom-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-bottom-width: 2px;
          }
        `}</style>
      </>
    );
  }
}

export interface CommentHandler {
  highlight: (color: string) => void;
  editorRef?: React.RefObject<HTMLDivElement>;
  avatarRef?: React.RefObject<HTMLDivElement>;
  headerRef?: React.RefObject<HTMLDivElement>;
}

export interface CommentProps {
  id: string;
  focus?: boolean;
  initialText: string;
  secretIdentity: SecretIdentityType;
  userIdentity?: {
    avatar: string;
    name: string;
  };
  createdTime: string;
  muted?: boolean;
  paddingTop?: string;
  onExtraAction?: () => void;
  options?: DropdownProps["options"];
  ref?: RefObject<CommentHandler> | undefined | null;
}

export default Comment;
