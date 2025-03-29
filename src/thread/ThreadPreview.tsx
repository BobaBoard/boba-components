import ActionLink from "buttons/ActionLink";
import Button from "buttons/Button";
import PostPreamble from "post/PostPreamble";
import { PostProps } from "post/Post";
import React from "react";

const HiddenThread: React.FC<HiddenThreadProps> = ({
  hidden,
  onThreadHidden,
  children: post
}) => {
  // We memoize this so it will only re-render if onThreadHidden or
  // hidden change
  const link = React.useMemo(
    () => ({
      onClick: () => onThreadHidden(!hidden),
    }),
    [onThreadHidden, hidden]
  );

  return (
    <div className="post hidden">
      <PostPreamble {...post.props} />
      <div className="container">
        <div className="header">
          <span>
            {hidden ? "This thread was hidden" : "Showing hidden thread"}
          </span>
          <Button onClick={link.onClick}>
            {hidden ? "Reveal Thread" : "Don't Show"}
          </Button>
        </div>
        {!hidden && React.cloneElement(post, {
          ...post.props,
          tags: {
            ...post.props.tags,
            // Do not display content warnings shown in preamble again.
            contentWarnings: []
          },
        })}
      </div>
      <style jsx>{`
        .post.hidden {
          margin: 0 auto;
          max-width: 500px;
          width: calc(100% - 40px);
          background-color: whitesmoke;
          padding: 20px;
          border: 1px dashed black;
          border-radius: 15px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 10px;
        }

        .container {
          background: gray;
          border-radius: 15px;
          width: 100%;
          position: relative;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export interface HiddenThreadProps {
  hidden: boolean;
  onThreadHidden: (hide: boolean) => void;
  children: React.ReactElement<PostProps>;
}

export default HiddenThread;
