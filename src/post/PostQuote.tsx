import React from "react";
// @ts-ignore
import Editor from "@bobaboard/boba-editor";
import noop from "noop-ts";
import Theme from "../theme/default";
import Avatar from "./Avatar";

const PostQuote: React.FC<PostQuoteProps> = (props) => {
  return (
    <div className="quote">
      <div className="quote-editor">
        <Editor
          initialText={JSON.parse(props.text)}
          editable={false}
          onSubmit={noop}
          onTextChange={noop}
        />
        <div className="avatar-container">
          <Avatar
            secretIdentity={props.secretIdentity}
            userIdentity={props.userIdentity}
            backgroundColor={props.backgroundColor}
          />
        </div>
        <div className="creation-time">published: {props.createdTime}</div>
      </div>
      <style jsx>{`
        .quote {
          --text-color: white;
        }
        .quote :global(h1) {
          padding: 0 5px;
          font-size: 25px !important;
        }
        .quote :global(p) {
          padding: 0 5px;
          font-size: 15px !important;
        }
        .quote :global(.block-image-class) {
          margin: 5px 0;
        }
        .quote-editor {
          background-color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
          border: 2px solid ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
          padding: 5px 0px;
          border-radius: 15px;
          position: relative;
          margin-right: 20px;
          margin-bottom: 15px;
        }
        .avatar-container {
          bottom: 0;
          right: 0;
          transform: translate(40%, 40%);
          width: 50px;
          height: 50px;
          position: absolute;
        }
        .creation-time {
          position: absolute;
          bottom: 0;
          right: 30px;
          color: rgba(255, 255, 255, 0.5);
          transform: translateY(120%);
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export interface PostQuoteProps {
  createdTime: string;
  text: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  backgroundColor?: string;
}

export default PostQuote;
