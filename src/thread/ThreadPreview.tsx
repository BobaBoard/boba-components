import React from "react";

import ActionLink from "buttons/ActionLink";
import { LinkWithAction } from "types";

const HiddenThread: React.FC<HiddenThreadProps> = ({ 
    threadId, 
    boardId, 
    hide, 
    onThreadHidden
}) => {
  let link = { 
    href: "#",
    onClick: () => onThreadHidden({threadId: threadId, boardId: boardId, hide: hide}), 
  }

  return (
    <div className="post hidden" key={threadId}>
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
  threadId: string;
  boardId: string;
  hide: boolean;
  onThreadHidden: ({ threadId,
                     boardId,
                     hide, } : 
                   { threadId: string, 
                     boardId: string, 
                     hide: boolean }) => void;
}

export default HiddenThread;
