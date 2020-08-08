import React from "react";
import Comment, { CommentHandler } from "./Comment";
import classnames from "classnames";

const CommentChain: React.FC<CommentChainProps> = (props) => {
  const handlerRefs = React.useRef(new Map<number, CommentHandler>());

  React.useEffect(() => {
    props.comments.forEach((comment, index) => {
      const commentRef = handlerRefs.current.get(index);
      if (!commentRef?.editorRef.current) {
        return;
      }
      if (index != 0) {
        commentRef.editorRef.current.style.borderTopLeftRadius = "0px";
        commentRef.editorRef.current.style.borderTopRightRadius = "0px";
        commentRef.editorRef.current.style.borderTop = "1px dotted white";
      }
      if (index < handlerRefs.current.size - 1) {
        commentRef.editorRef.current.style.borderBottomLeftRadius = "0px";
        commentRef.editorRef.current.style.borderBottomRightRadius = "0px";
        commentRef.editorRef.current.style.borderBottom = "none";
      }
    });
  }, [props.comments]);

  return (
    <div className="comment-chain">
      {props.comments.map((comment, index) => (
        <div className={classnames("comment-container")}>
          <Comment
            id={comment.id}
            key={`comment_${comment.id}`}
            ref={(ref: CommentHandler) => handlerRefs.current.set(index, ref)}
            initialText={comment.text}
            userIdentity={props.userIdentity}
            secretIdentity={props.secretIdentity}
            paddingTop={"0"}
          />
        </div>
      ))}
      <style jsx>{`
        .comment-chain {
          position: relative;
        }
        .comment-container {
          opacity: 0.7;
        }
        .comment-container.focused {
          opacity: 1;
        }
        .editor.chainable {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export interface CommentChainProps {
  comments: { id: string; text: string }[];
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity: {
    avatar: string;
    name: string;
  };
}

export default CommentChain;
