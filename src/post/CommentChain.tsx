import React from "react";
import Comment, { EditorRef } from "./Comment";
import classnames from "classnames";
import DefaultTheme from "../theme/default";

const CommentChain: React.FC<CommentChainProps> = (props) => {
  const editorRefs = React.useRef(new Map<number, EditorRef>());
  return (
    <div className="comment-chain">
      {props.comments.map((comment, index) => (
        <div className={classnames("comment-container")}>
          <Comment
            id={comment.id}
            key={`comment_${comment.id}`}
            ref={(ref: EditorRef) => editorRefs.current.set(index, ref)}
            initialText={comment.text}
            userIdentity={props.userIdentity}
            secretIdentity={props.secretIdentity}
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
  secretIdentity?: {
    avatar: string;
    name: string;
  };
  userIdentity: {
    avatar: string;
    name: string;
  };
}

export default CommentChain;
