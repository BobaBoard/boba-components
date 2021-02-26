import React, { createRef, PureComponent, RefObject } from "react";
import classNames from "classnames";
import Editor from "@bobaboard/boba-editor";
import Header, { HeaderStyle } from "./Header";
import debug from "debug";
import Theme from "../theme/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { DropdownProps } from "../common/DropdownListMenu";
import { AvatarProps } from "./Avatar";
const log = debug("bobaui:comment-log");

class Comment extends PureComponent<CommentProps> {
  containerRef = createRef<HTMLDivElement>();
  editorRef = createRef<HTMLDivElement>();
  avatarRef = createRef<HTMLDivElement>();

  highlight = (color: string) => {
    log(`Highlighting post with ${color}!`);
    if (!this.containerRef.current) {
      return;
    }
    this.containerRef.current.ontransitionend = () => {
      this.containerRef.current?.style.setProperty(
        "--comment-container-shadow",
        null
      );
    };
    this.containerRef.current.style.setProperty(
      "--comment-container-shadow",
      color
    );
  };

  render() {
    return (
      <>
        <div
          className={classNames("comment-container", {
            muted: this.props.muted,
            "with-extra-action": !!this.props.onExtraAction,
            "image-only": true,
          })}
          ref={this.containerRef}
        >
          <div className="header">
            <Header
              size={HeaderStyle.COMPACT}
              secretIdentity={this.props.secretIdentity}
              userIdentity={this.props.userIdentity}
              avatarOptions={this.props.options}
              accessory={this.props.accessory}
              createdMessage={this.props.createdTime}
              ref={this.avatarRef}
            />
          </div>
          <div className="highlight">
            <div className={classNames("comment")} ref={this.editorRef}>
              <Editor
                key={this.props.id + "_editor"}
                editable={false}
                initialText={JSON.parse(this.props.initialText)}
                singleLine={true}
                showTooltip={false}
              />
            </div>
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
            bottom: 0px;
            right: 6px;
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
          .highlight {
            filter: drop-shadow(0px 0px 3px var(--comment-container-shadow))
              drop-shadow(0px 0px 3px var(--comment-container-shadow))
              drop-shadow(0px 0px 3px var(--comment-container-shadow));
            transition: filter 0.5s ease-out;
            flex-grow: 1;
          }
          .extra-action-icon {
            border-radius: 50%;
            background-color: #5e5e5f;
            border: 1px solid rgba(255, 255, 255, 0.3);
            width: 20px;
            height: 20px;
            margin: 15px;
            color: rgba(255, 255, 255, 0.6);
            transition: all 0.2s ease-out;
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
          .extra-action:hover .extra-action-icon {
            cursor: pointer;
            color: white;
            background-color: #757575;
          }
          .comment-container {
            margin-top: ${this.props.paddingTop || "15px"};
            margin-left: 10px;
            align-items: start;
            display: flex;
            max-width: 550px;
            position: relative;
          }
          .header {
            margin-right: 4px;
            cursor: pointer;
          }
          .comment {
            position: relative;
            padding: 0 3px;
            color: black;
            min-width: 0;
            align-self: flex-end;
            color: white;
            background: #5e5e5f;
            border-radius: ${Theme.BORDER_RADIUS_REGULAR};
            min-height: 38px;
          }
          .image-only .comment {
            padding: 0px;
          }
          .comment-container.with-extra-action:last-child .comment {
            mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
              radial-gradient(
                  28px circle at bottom 0px right 6px,
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
            border: 2px solid rgba(255, 255, 255, 0.2);
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
          .comment-container:first-child .comment::after {
            border-top-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-top-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-top-width: 2px;
          }
          .comment-container:last-child .comment::after {
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
}

export interface CommentProps {
  id: string;
  focus?: boolean;
  initialText: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  createdTime: string;
  muted?: boolean;
  paddingTop?: string;
  onExtraAction?: () => void;
  options?: DropdownProps["options"];
  accessory?: AvatarProps["accessory"];
  ref?: RefObject<CommentHandler> | undefined | null;
}

export default Comment;
