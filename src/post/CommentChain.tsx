import { DropdownProps } from "common/DropdownListMenu";
import React, { PureComponent, createRef, RefObject } from "react";
import Comment, { CommentHandler } from "./Comment";

const MemoizedComment = React.memo(Comment);
class CommentChain extends PureComponent<CommentChainProps> {
  editorRef = createRef<HTMLDivElement>();
  handlerRefs = new Map<number, CommentHandler>();
  headerRef: React.RefObject<HTMLDivElement> | undefined;
  saveRefMethods = new Map<number, (ref: Comment) => void>();

  getSaveRefAtIndex(index: number) {
    if (!this.saveRefMethods.has(index)) {
      this.saveRefMethods.set(index, (ref) => this.handlerRefs.set(index, ref));
    }
    return this.saveRefMethods.get(index);
  }

  highlight = (color: string) => {
    this.handlerRefs.forEach((ref) => ref.highlight(color));
  };

  componentDidMount() {
    this.props.comments.forEach((comment, index) => {
      const commentRef = this.handlerRefs.get(index);
      if (!commentRef?.editorRef?.current) {
        return;
      }
      if (index != 0) {
        commentRef.editorRef.current.style.borderTopLeftRadius = "0px";
        commentRef.editorRef.current.style.borderTopRightRadius = "0px";
        commentRef.editorRef.current.style.borderTop =
          "1px dashed rgba(255, 255, 255, .3)";
      }
      if (index < this.handlerRefs.size - 1) {
        commentRef.editorRef.current.style.borderBottomLeftRadius = "0px";
        commentRef.editorRef.current.style.borderBottomRightRadius = "0px";
        commentRef.editorRef.current.style.borderBottom = "none";
      }
    });
    this.headerRef = this.handlerRefs.get(0)?.headerRef;
  }

  render() {
    return (
      <div className="comment-chain" ref={this.editorRef}>
        {this.props.comments.map((comment, index) => (
          <MemoizedComment
            id={comment.id}
            key={`comment_${comment.id}`}
            ref={this.getSaveRefAtIndex(index)}
            initialText={comment.text}
            userIdentity={this.props.userIdentity}
            secretIdentity={this.props.secretIdentity}
            paddingTop={"0"}
            muted={this.props.muted}
            onExtraAction={
              this.props.onExtraAction &&
              index == this.props.comments.length - 1
                ? this.props.onExtraAction
                : undefined
            }
            options={this.props.options}
          />
        ))}
        <style jsx>{`
          .comment-chain {
            padding-top: 15px;
            position: relative;
            --comment-container-stacked-radius: 0;
          }
          .editor.chainable {
            margin-bottom: 15px;
          }
        `}</style>
      </div>
    );
  }
}

export interface CommentChainProps {
  comments: { id: string; text: string }[];
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  muted?: boolean;
  options?: DropdownProps["options"];
  onExtraAction?: () => void;
  ref?:
    | RefObject<CommentHandler>
    | undefined
    | null
    | ((ref: CommentHandler) => void);
}

export default CommentChain;
