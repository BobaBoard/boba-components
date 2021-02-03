import React from "react";
import Editor from "@bobaboard/boba-editor";
import Theme from "../theme/default";
import Avatar from "./Avatar";

const parseText = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    // Ignore errors. The problem is coming from the passed text.
    return [];
  }
};

const PostQuote: React.FC<PostQuoteProps> = (props) => {
  const [parsedText, setParsedText] = React.useState(parseText(props.text));

  React.useEffect(() => {
    setParsedText(parseText(props.text));
  }, [props.text]);

  return (
    <div className="quote">
      <div className="quote-editor">
        <Editor initialText={parsedText} editable={false} />
        <div className="avatar-container">
          <Avatar
            secretIdentity={props.secretIdentity}
            userIdentity={props.userIdentity}
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
}

export default PostQuote;
