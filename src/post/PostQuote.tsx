import { LinkWithAction, SecretIdentityType } from "types";

import ActionLink from "buttons/ActionLink";
import Avatar from "./Avatar";
import Editor from "@bobaboard/boba-editor";
import React from "react";
import Theme from "theme/default";
import css from "styled-jsx/css";
import { useExpand } from "utils/useExpand";

const parseText = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    // Ignore errors. The problem is coming from the passed text.
    return [];
  }
};

const linkStyles = css.resolve`
  a {
    color: rgba(255, 255, 255, 0.5);
  }
  a:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const clickerStyles = css.resolve`
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const PostQuote: React.FC<PostQuoteProps> = (props) => {
  const container = React.useRef<HTMLDivElement>(null);
  // TODO: make use epand do nothing with a null height, so we can avoid
  // conditional rendering within here.
  const clicker = useExpand(container, {
    compactHeight: props.maxHeightPx || 350,
    backgroundColor: Theme.LAYOUT_BOARD_BACKGROUND_COLOR,
    className: clickerStyles.className,
  });
  const [parsedText, setParsedText] = React.useState(parseText(props.text));

  React.useEffect(() => {
    setParsedText(parseText(props.text));
  }, [props.text]);

  return (
    <article>
      <div className="quote" ref={props.maxHeightPx ? container : null}>
        <Editor initialText={parsedText} editable={false} />
        {clicker}
      </div>
      <div className="avatar-container">
        <Avatar
          secretIdentity={props.secretIdentity}
          userIdentity={props.userIdentity}
          forceHide={props.forceHideIdentity}
        />
      </div>
      <div className="creation-time">
        <ActionLink
          link={props.createdTimeLink}
          className={linkStyles.className}
        >
          published: {props.createdTime}
        </ActionLink>
      </div>
      {linkStyles.styles}
      {clickerStyles.styles}
      <style jsx>{`
        article {
          background-color: ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
          border: 2px solid ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
          padding: 5px 0px;
          border-radius: 15px;
          position: relative;
          margin-bottom: 15px;
          --text-color: white;
        }
        .quote[data-shrinkable]:not([data-shrunk]) {
          padding-bottom: 10px;
        }
        .avatar-container {
          bottom: 0;
          right: 0;
          transform: translate(40%, 40%);
          width: 50px;
          height: 50px;
          position: absolute;
          z-index: 2;
        }
        .creation-time {
          position: absolute;
          bottom: 0;
          right: 30px;
          color: rgba(255, 255, 255, 0.5);
          transform: translateY(120%);
          font-size: 12px;
          z-index: 2;
        }
      `}</style>
    </article>
  );
};

export interface PostQuoteProps {
  createdTime: string;
  createdTimeLink?: LinkWithAction;
  text: string;
  secretIdentity: SecretIdentityType;
  userIdentity?: {
    avatar: string;
    name: string;
  };
  forceHideIdentity?: boolean;
  // The max height this post quote can occupy before its
  // content is shrunk to fix.
  maxHeightPx?: number;
}

export default PostQuote;
