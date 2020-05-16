import React from "react";

import Post from "../post/Post";
import classnames from "classnames";
import BoardSidebar from "./BoardSidebar";
import SimpleBar from "simplebar-react";

import Theme from "../theme/default";

import { CardSizes } from "../common/Card";

export interface BoardFeedProps {
  posts: {
    createdTime: string;
    text: string;
    secretIdentity: {
      name: string;
      avatar: string;
    };
    userIdentity?: {
      name: string;
      avatar: string;
    };
    options?: {
      size?: CardSizes;
    };
    newPost?: boolean;
    newComments?: boolean;
    newContributions?: boolean;
  }[];
  showSidebar?: boolean;
  boardInfo: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
  };
  onCloseSidebar?: () => void;
}

const maybePreventScrollOverflow = (
  event: React.WheelEvent,
  wrapper: HTMLDivElement
) => {
  if (
    event.deltaY > 0 &&
    wrapper.scrollTop == wrapper.scrollHeight - wrapper.offsetHeight
  ) {
    event.preventDefault();
  }
};

const BoardFeed: React.FC<BoardFeedProps> = ({
  posts,
  showSidebar,
  onCloseSidebar,
  boardInfo,
}) => {
  const scrollableNodeRef = React.createRef<SimpleBar>();
  return (
    <>
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div className="content">
          <div
            className={classnames("backdrop", {
              visible: showSidebar,
            })}
            onClick={(e) => {
              onCloseSidebar && onCloseSidebar();
              e.stopPropagation();
            }}
          />
          <div
            className={classnames("sidebar", { visible: showSidebar })}
            onClick={(e) => {
              console.log("clack!");
              e.stopPropagation();
            }}
          >
            {showSidebar ? (
              <SimpleBar style={{ maxHeight: "100%" }} ref={scrollableNodeRef}>
                <div
                  onWheel={(e) => {
                    maybePreventScrollOverflow(
                      e,
                      // @ts-ignore
                      scrollableNodeRef.current?.contentWrapperEl
                    );
                  }}
                >
                  <BoardSidebar board={boardInfo} />
                </div>
              </SimpleBar>
            ) : (
              <BoardSidebar board={boardInfo} />
            )}
          </div>
          <div className="main">
            {posts.map((post) => (
              <div className="post">
                <Post
                  createdTime={post.createdTime}
                  text={post.text}
                  secretIdentity={post.secretIdentity}
                  userIdentity={post.userIdentity}
                  onSubmit={() => console.log("click!")}
                  onCancel={() => console.log("click!")}
                  onNewContribution={() => console.log("click!")}
                  onNewComment={() => console.log("click!")}
                  size={post.options?.size}
                  newPost={post.newPost}
                  newComments={post.newComments}
                  newContributions={post.newContributions}
                  collapsed={post.newComments && post.newContributions}
                />
              </div>
            ))}
          </div>
        </div>
      </SimpleBar>
      <style jsx>
        {`
          .post {
            margin: 0 auto;
            margin-top: 25px;
            max-width: 100%;
          }
          .content {
            width: 100vw;
            display: flex;
            background-image: linear-gradient(
              to right,
              ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR} 350px,
              transparent 350px
            );
             {
              /* overflow: hidden;
            overflow-y: auto; */
            }
          }
          .main {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            padding: 0 20px;
          }
          .sidebar {
            width: 350px;
            background-color: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
            flex-shrink: 0;
          }

          .backdrop {
            position: fixed;
            background-color: black;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 0.5;
            z-index: 3;
            display: none;
          }

          @media only screen and (max-width: 850px) {
            .content {
              background-image: none;
            }
            .backdrop.visible {
              display: block;
            }
            .sidebar {
              border-radius: ${Theme.BORDER_RADIUS_REGULAR}
                ${Theme.BORDER_RADIUS_REGULAR} 0px 0px;
              width: 95%;
              position: fixed;
              left: 50%;
              transform: translateX(-50%);
              bottom: 0;
              height: 0;
              overflow: hidden;
              transition-property: height;
              transition-duration: 0.5s;
              transition-timing-function: easeInSine;
              z-index: 5;
            }
            .sidebar.visible {
              height: 85%;
            }
            .main {
              width: calc(100% - 40px);
            }
          }
        `}
      </style>
    </>
  );
};

export default BoardFeed;
