import React, { PureComponent, createRef } from "react";
import { AvatarProps } from "./Avatar";
import Comment, { CommentHandler, CommentProps } from "./Comment";
import Header, { HeaderStyle } from "./Header";

const MemoizedComment = React.memo(Comment);
class CommentChain extends PureComponent<CommentChainProps> {
  editorRef = createRef<HTMLDivElement>();
  handlerRefs = new Map<number, CommentHandler>();
  headerRef = createRef<HTMLDivElement>();
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
  }

  render() {
    return (
      <div className="comment-chain" ref={this.editorRef}>
        <div className="header">
          <Header
            size={HeaderStyle.COMPACT}
            secretIdentity={this.props.secretIdentity}
            userIdentity={this.props.userIdentity}
            avatarOptions={this.props.options}
            accessory={this.props.accessory}
            createdMessage={this.props.createdTime}
            ref={this.headerRef}
          />
        </div>
        <div className="comments">
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
              createdTime={this.props.createdTime}
              options={this.props.options}
              accessory={this.props.accessory}
            />
          ))}
        </div>
        <style jsx>{`
          .comment-chain {
            padding-top: 15px;
            position: relative;
            align-items: start;
            display: flex;
            --comment-container-stacked-radius: 0;
            max-width: 550px;
            width: 100%;
          }
          .header {
            margin-right: 4px;
            cursor: pointer;
            position: sticky;
            top: 5px;
          }
          .editor.chainable {
            margin-bottom: 15px;
          }
          .comments {
            flex-grow: 1;
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
  createdTime: string;
  muted?: boolean;
  options?: CommentProps["options"];
  accessory?: AvatarProps["accessory"];
  onExtraAction?: () => void;
  ref?: React.Ref<CommentHandler>;
}

export default CommentChain;

// export default React.forwardRef<CommentHandler, CommentChainProps>(
//   (props, ref) => <CommentChain {...props} innerRef={ref} />
// );
