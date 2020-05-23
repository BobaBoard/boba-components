import React from "react";

import Post, { PostSizes } from "../post/Post";
import classnames from "classnames";
import BoardSidebar from "./BoardSidebar";
import Scrollbar from "../common/Scrollbar";

import Theme from "../theme/default";

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
      wide?: boolean;
    };
    newPost?: boolean;
    newComments?: number;
    newContributions?: number;
  }[];
  showSidebar?: boolean;
  boardInfo: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    boardWideTags: {
      name: string;
      color: string;
    }[];
    canonicalTags: {
      name: string;
      color: string;
    }[];
    contentRulesTags: {
      allowed: boolean;
      name: string;
    }[];
    otherRules: JSX.Element;
  };
  onCloseSidebar?: () => void;
  accentColor?: string;
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

const preventEvent = (ref: HTMLDivElement) => {
  return (e: TouchEvent) => {
    let found = e.composedPath().filter((tgt) => tgt == ref);
    if (found.length == 0) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };
};

const BoardFeed: React.FC<BoardFeedProps> = ({
  posts,
  showSidebar,
  onCloseSidebar,
  boardInfo,
  accentColor,
}) => {
  const scrollableNodeRef = React.createRef<any>();
  const scrollableContentRef = React.createRef<any>();

  /**
   * This horrible, horrible section prevents scrolling of the background element
   * on mobile (especially iOS). It works by creating a touch event handler that
   * looks at whether the sidebar is part of the targets of the touch event, and
   * prevents its side effect (scrolling) if it isn't. This way only scroll events
   * that occurr on the sidebar itself will cause the scroll to actually happen,
   * and those with no sidebar involvement will be instead cancelled.
   *
   * This is only applied while the sidebar is explicitly open.
   */
  const scrollableMenuRef = React.useCallback<any>((node: HTMLDivElement) => {
    if (node) {
      setTouchEventHandler(() => preventEvent(node));
    }
  }, []);
  const [touchEventHandler, setTouchEventHandler] = React.useState<any>(null);

  React.useEffect(() => {
    if (showSidebar && touchEventHandler) {
      scrollableContentRef.current.addEventListener(
        "touchmove",
        touchEventHandler,
        {
          capture: false,
          passive: false,
        }
      );
    } else if (touchEventHandler) {
      scrollableContentRef.current.removeEventListener(
        "touchmove",
        touchEventHandler,
        {
          capture: false,
          passive: false,
        }
      );
    }
  }, [showSidebar, touchEventHandler]);
  /**
   * End of horrible section.
   */

  return (
    <>
      <Scrollbar>
        <div className="content" ref={scrollableContentRef}>
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
            ref={scrollableMenuRef}
          >
            {showSidebar ? (
              <Scrollbar ref={scrollableNodeRef}>
                <div
                  onWheel={(e) => {
                    maybePreventScrollOverflow(
                      e,
                      // @ts-ignore
                      scrollableNodeRef.current?.contentWrapperEl
                    );
                  }}
                  style={{ overscrollBehavior: "contain" }}
                >
                  <BoardSidebar board={boardInfo} />
                </div>
              </Scrollbar>
            ) : (
              <BoardSidebar board={boardInfo} />
            )}
          </div>
          <div className="main">
            {posts.map((post, i) => (
              <div className="post">
                <Post
                  key={post.text}
                  createdTime={post.createdTime}
                  text={post.text}
                  secretIdentity={post.secretIdentity}
                  userIdentity={post.userIdentity}
                  onNewContribution={() => console.log("click!")}
                  onNewComment={() => console.log("click!")}
                  size={post.options?.wide ? PostSizes.WIDE : PostSizes.REGULAR}
                  newPost={post.newPost}
                  newComments={post.newComments}
                  newContributions={post.newContributions}
                  collapsed={!!post.newComments && !!post.newContributions}
                />
              </div>
            ))}
          </div>
        </div>
      </Scrollbar>
      <style jsx>
        {`
          .post {
            margin: 20px auto;
            width: 100%;
          }
          .post > :global(div) {
            margin: 0 auto;
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
            background-color: ${Theme.MODAL_BACKGROUND_COLOR};
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
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
