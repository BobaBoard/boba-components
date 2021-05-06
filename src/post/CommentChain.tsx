import React, { PureComponent, createRef } from "react";
import Comment, { CommentHandler, CommentProps } from "./Comment";
import Header, { HeaderStyle } from "./Header";
import Theme from "../theme/default";
import debug from "debug";
import { SecretIdentityType } from "types";
import classnames from "classnames";
import Icon from "../common/Icon";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
const log = debug("bobaui:comment-log");

const MemoizedComment = React.memo(Comment);
class CommentChain extends PureComponent<CommentChainProps> {
  editorRef = createRef<HTMLDivElement>();
  handlerRefs = new Map<number, CommentHandler>();
  avatarRef = createRef<HTMLDivElement>();
  headerRef = createRef<HTMLDivElement>();
  containerRef = createRef<HTMLDivElement>();
  saveRefMethods = new Map<number, (ref: Comment) => void>();

  getSaveRefAtIndex(index: number) {
    if (!this.saveRefMethods.has(index)) {
      this.saveRefMethods.set(index, (ref) => this.handlerRefs.set(index, ref));
    }
    return this.saveRefMethods.get(index);
  }

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
    const hasMotionEffect = this.props.disableMotionEffect !== true;
    return (
      <div className="comment-chain" ref={this.editorRef}>
        <div className="header" ref={this.headerRef}>
          <Header
            size={HeaderStyle.COMPACT}
            secretIdentity={this.props.secretIdentity}
            userIdentity={this.props.userIdentity}
            avatarOptions={this.props.options}
            createdMessage={this.props.createdTime}
            forceHide={this.props.forceHideIdentity}
            ref={(ref) => {
              // @ts-ignore
              this.avatarRef.current = ref;
              if (!this.avatarRef.current) {
                return;
              }
            }}
          />
        </div>

        <div className="comments">
          <div className={classnames("badges")}>
            {!!this.props.new && (
              <div className="new">
                <Icon icon={faCertificate} />
                <span>new</span>
              </div>
            )}
          </div>
          <span className="highlight" ref={this.containerRef} />
          <div>
            {this.props.comments.map((comment, index) => (
              <MemoizedComment
                id={comment.id}
                key={`comment_${comment.id}`}
                ref={this.getSaveRefAtIndex(index)}
                initialText={comment.text}
                userIdentity={this.props.userIdentity}
                secretIdentity={this.props.secretIdentity}
                onExtraAction={
                  this.props.onExtraAction &&
                  index == this.props.comments.length - 1
                    ? this.props.onExtraAction
                    : undefined
                }
                createdTime={this.props.createdTime}
                options={this.props.options}
              />
            ))}
          </div>
        </div>
        <style jsx>{`
          .badges {
            display: flex;
            justify-content: flex-end;
            padding-right: 25px;
            position: absolute;
            top: 1px;
            left: 0;
            right: 0;
            z-index: 3;
            transform: translateY(-50%);
          }
          .badges .new {
            background-image: linear-gradient(
              135deg,
              ${Theme.DEFAULT_ACCENT_COLOR} 0%,
              ${Theme.DEFAULT_ACCENT_COLOR} 10px,
              rgba(255, 255, 255, 0.3) 15px,
              rgba(255, 255, 255, 0.3) 18px,
              ${Theme.DEFAULT_ACCENT_COLOR} 23px,
              ${Theme.DEFAULT_ACCENT_COLOR} 100%
            );
            background-color: ${Theme.DEFAULT_ACCENT_COLOR};
            background-size: 200% 200%;
            position: relative;
            overflow: hidden;
            font-size: 1.3rem;
            padding: 2px 4px;
            border-radius: 15px;
            line-height: 1.3rem;
            color: white;
            background-position-x: 80%;
            animation: TransitioningBackground 10s ease-out normal infinite;
            border: 1px solid rgb(255 0 0 / 80%);
          }

          @keyframes TransitioningBackground {
            0% {
              background-position-x: 250%;
            }
            12% {
              background-position-x: 80%;
            }
            100% {
              background-position-x: 80%;
            }
          }
          .badges .new span {
            margin: 0 2px;
            margin-bottom: 4px;
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
          .header {
            cursor: pointer;
            position: ${hasMotionEffect ? "sticky" : "relative"};
            top: ${hasMotionEffect ? `${Theme.HEADER_HEIGHT_PX + 2}px` : "0"};
            margin-right: 3px;
          }
          .editor.chainable {
            margin-bottom: 15px;
          }
          .highlight {
            box-shadow: 0px 0px 5px 3px var(--comment-container-shadow);
            transition: box-shadow 0.5s ease-out;
            background-color: transparent;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 6px;
            border-radius: ${Theme.BORDER_RADIUS_REGULAR};
          }
          .comments {
            flex-grow: 1;
            position: relative;
          }
        `}</style>
      </div>
    );
  }
}

export interface CommentChainProps {
  comments: { id: string; text: string }[];
  secretIdentity: SecretIdentityType;
  userIdentity?: {
    avatar: string;
    name: string;
  };
  forceHideIdentity?: boolean;
  createdTime: string;
  new?: boolean;
  options?: CommentProps["options"];
  onExtraAction?: () => void;
  disableMotionEffect?: boolean;
  ref?: React.Ref<CommentHandler>;
}

export default CommentChain;
