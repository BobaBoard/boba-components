import React from "react";

import classnames from "classnames";
import Scrollbar from "../common/Scrollbar";

import Theme from "../theme/default";

import debug from "debug";

const log = debug("bobaui:feed-with-menu-log");

export interface FeedWithMenuProps {
  sidebarContent: JSX.Element;
  feedContent: JSX.Element;
  showSidebar?: boolean;
  onCloseSidebar?: () => void;
  accentColor?: string;
  onReachEnd?: () => void;
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

const FeedWithMenu: React.FC<FeedWithMenuProps> = ({
  sidebarContent,
  feedContent,
  showSidebar,
  onCloseSidebar,
  onReachEnd,
}) => {
  const scrollableNodeRef = React.createRef<any>();
  const scrollableContentRef = React.createRef<any>();
  // const { open: isBackdropOpen, setOpen: setBackdropOpen } = useBackdrop({
  //   onClick: () => {
  //     onCloseSidebar && onCloseSidebar();
  //   },
  // });

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

  React.useEffect(() => {
    log(`${showSidebar ? "Opening" : "Closing"} side`);
    const scrollY = document.body.style.top;
    log(`Current body top position: ${scrollY}`);
    log(`Current body scrollY: ${window.scrollY}`);

    if (!scrollableContentRef.current) {
      return;
    }

    log(`Changing overflow of content`);
    document.body.style.overflow = showSidebar ? "hidden" : "";
    scrollableContentRef.current.style.overflow = showSidebar ? "hidden" : "";
    //setBackdropOpen(!!showSidebar);
    // document.body.style.top = showSideMenu ? `-${window.scrollY}px` : "";
    // if (!showSideMenu) {
    //   window.scrollTo(0, parseInt(scrollY || "0") * -1);
    // }
  }, [showSidebar]);

  /**
   * End of horrible section.
   */

  return (
    <>
      <div className="content" ref={scrollableContentRef}>
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
                className="sidebar-content-wrapper"
                // onWheel={(e) => {
                //   maybePreventScrollOverflow(
                //     e,
                //     // @ts-ignore
                //     scrollableNodeRef.current?.contentWrapperEl
                //   );
                // }}
              >
                {sidebarContent}
              </div>
            </Scrollbar>
          ) : (
            sidebarContent
          )}
        </div>
        <div className="main">{feedContent}</div>
      </div>
      <style jsx>
        {`
          .content {
            width: 100vw;
            display: flex;
            min-height: calc(100vh - 70px);
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
            height: auto;
          }
          .sidebar-content-wrapper {
            overscroll-behavior: contain;
          }

          @media only screen and (max-width: 850px) {
            .content {
              background-image: none;
            }
            .backdrop.visible {
              display: block;
            }
            .sidebar {
              border-radius: ${Theme.BORDER_RADIUS_LARGE}
                ${Theme.BORDER_RADIUS_LARGE} 0px 0px;
              width: 95%;
              position: fixed;
              left: 50%;
              transform: translate(-50%, 20%);
              overflow: hidden;
              transition: all 0.2s ease-out;
              z-index: 51;
              opacity: 0;
              background: blue;
              height: calc(100vh - 50px);
            }
            .sidebar.visible {
              opacity: 1;
              transform: translate(-50%, 0);
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

export default FeedWithMenu;
