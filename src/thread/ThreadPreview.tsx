import React from "react";

const HiddenThread: React.FC<HiddenThreadProps> = ({ 
    threadId, 
    boardId, 
    threadHidden, 
    setHideCallback 
}) => {
  return (
    <div className="post hidden" key={threadId}>
      This thread was hidden{" "}
      <a
        href="#"
        onClick={(e) => {
          setHideCallback({
            threadId: threadId,
            boardId: boardId,
            hide: threadHidden,
          });
          e.preventDefault();
        }}
      >
        [unhide]
      </a>
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
  threadHidden: boolean;
  setHideCallback: ({ threadId,
                      boardId,
                      hide, } : 
                    { threadId: string, 
                      boardId: string, 
                      hide: boolean }) => void;
}

export default HiddenThread;
