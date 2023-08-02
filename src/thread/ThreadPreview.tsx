import ActionLink from "buttons/ActionLink";
import React from "react";

const HiddenThread: React.FC<HiddenThreadProps> = ({
  hidden,
  onThreadHidden,
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
      This thread was hidden{" "}
      <ActionLink link={link} allowDefault={false}>
        [unhide]
      </ActionLink>
      <style jsx>{`
        .post.hidden {
          margin: 0 auto;
          max-width: 500px;
          width: calc(100% - 40px);
          background-color: gray;
          padding: 20px;
          border: 1px dashed black;
          border-radius: 15px;
        }
      `}</style>
    </div>
  );
};

export interface HiddenThreadProps {
  hidden: boolean;
  onThreadHidden: (hide: boolean) => void;
}

export default HiddenThread;
