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
  headerRef = createRef<HTMLDivElement>();

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
          })}
          ref={this.containerRef}
        >
          <div className="header" ref={this.headerRef}>
            <Header
              size={HeaderStyle.COMPACT}
              secretIdentity={this.props.secretIdentity}
              userIdentity={this.props.userIdentity}
              avatarOptions={this.props.options}
              accessory={this.props.accessory}
              createdMessage={this.props.createdTime}
            />
          </div>
          <div className={classNames("comment")} ref={this.editorRef}>
            <Editor
              key={this.props.id + "_editor"}
              editable={false}
              initialText={JSON.parse(this.props.initialText)}
              singleLine={true}
              showTooltip={false}
            />
          </div>
          <div
            className={classNames("extra-action", {
              visible: !!this.props.onExtraAction,
            })}
            onClick={this.props.onExtraAction}
          >
            <FontAwesomeIcon icon={faComment} />
          </div>
        </div>
        <style jsx>{`
          .extra-action {
            position: absolute;
            bottom: 0;
            right: 0;
            transform: translate(50%, 50%);
            border-radius: 50%;
            background-color: #5e5e5f;
            border: 1px solid rgba(255, 255, 255, 0.3);
            width: 24px;
            height: 24px;
            color: rgba(255, 255, 255, 0.6);
            display: none;
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
          .extra-action:hover {
            cursor: pointer;
            color: white;
            background-color: #757575;
          }

          .extra-action:hover {
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
            margin-right: 10px;
            cursor: pointer;
          }
          .comment {
            position: relative;
            padding: 0 5px;
            color: black;
            flex-grow: 1;
            min-width: 0;
            align-self: flex-end;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: #5e5e5f;
            border-radius: ${Theme.BORDER_RADIUS_REGULAR};
          }
          .comment-container.muted .comment {
            color: rgba(255, 255, 255, 0.8);
          }
          .comment::after {
            content: "";
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            opacity: 0.8;
            border-radius: var(
              --comment-container-stacked-radius,
              ${Theme.BORDER_RADIUS_REGULAR}
            );
            transition: box-shadow 0.5s ease-out;
            box-shadow: 0px 0px 5px 3px var(--comment-container-shadow);
          }
          .comment-container:first-child .comment::after {
            border-top-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-top-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
          }
          .comment-container:last-child .comment::after {
            border-bottom-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
            border-bottom-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
          }
        `}</style>
      </>
    );
  }
}

export interface CommentHandler {
  highlight: (color: string) => void;
  editorRef?: React.RefObject<HTMLDivElement>;
  headerRef?: React.RefObject<HTMLDivElement>;
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
