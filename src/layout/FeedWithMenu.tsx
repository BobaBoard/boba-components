import React from "react";

import classnames from "classnames";
import Scrollbar from "../common/Scrollbar";

import Theme from "../theme/default";
import { useBackdrop } from "../utils";
import { ResizeObserver as Polyfill } from "@juggle/resize-observer";
require("intersection-observer");

import debug from "debug";

const log = debug("bobaui:feed-with-menu-log");

export interface FeedWithMenuProps {
  sidebarContent: JSX.Element;
  feedContent: JSX.Element;
  showSidebar?: boolean;
  forceHideSidebar?: boolean;
  onCloseSidebar?: () => void;
  accentColor?: string;
  onReachEnd?: () => void;
}

// const maybePreventScrollOverflow = (
//   event: React.WheelEvent,
//   wrapper: HTMLDivElement
// ) => {
//   if (
//     event.deltaY > 0 &&
//     wrapper.scrollTop == wrapper.scrollHeight - wrapper.offsetHeight
//   ) {
//     event.preventDefault();
//   }
// };

// const preventEvent = (ref: HTMLDivElement) => {
//   return (e: TouchEvent) => {
//     let found = e.composedPath().filter((tgt) => tgt == ref);
//     if (found.length == 0) {
//       e.preventDefault();
//       e.stopImmediatePropagation();
//     }
//   };
// };

const FeedWithMenu: React.FC<FeedWithMenuProps> = ({
  sidebarContent,
  feedContent,
  showSidebar,
  onCloseSidebar,
  onReachEnd,
  forceHideSidebar,
}) => {
  const scrollableContentRef = React.createRef<any>();
  const intersectionObserverRef = React.useRef<HTMLDivElement>(null);
  const [canOpenSidebar, setCanOpenSidebar] = React.useState(
    typeof window != "undefined" &&
      matchMedia("only screen and (max-width: 850px)").matches
  );
  const { setOpen: setBackdropOpen } = useBackdrop({
    onClick: () => {
      onCloseSidebar?.();
    },
  });

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
  // const scrollableMenuRef = React.useCallback<any>((node: HTMLDivElement) => {
  //   if (node) {
  //     setTouchEventHandler(() => preventEvent(node));
  //   }
  // }, []);
  // const [touchEventHandler, setTouchEventHandler] = React.useState<any>(null);

  // React.useEffect(() => {
  //   if (showSidebar && touchEventHandler) {
  //     scrollableContentRef.current.addEventListener(
  //       "touchmove",
  //       touchEventHandler,
  //       {
  //         capture: false,
  //         passive: false,
  //       }
  //     );
  //   } else if (touchEventHandler) {
  //     scrollableContentRef.current.removeEventListener(
  //       "touchmove",
  //       touchEventHandler,
  //       {
  //         capture: false,
  //         passive: false,
  //       }
  //     );
  //   }
  // }, [showSidebar, touchEventHandler]);

  /**
   * End of horrible section.
   */

  // Change overflow of content when sidebar is open
  React.useEffect(() => {
    const shouldShowSidebar = !!(canOpenSidebar && showSidebar);
    log(`${shouldShowSidebar ? "Opening" : "Closing"} sidebar`);
    log(`Can open: ${canOpenSidebar}`);

    if (showSidebar && !shouldShowSidebar) {
      // Parent is asking the sidebar to be displayed, but the sidebar
      // cannot be. Tell it to close it.
      onCloseSidebar?.();
    }

    if (!scrollableContentRef.current) {
      return;
    }

    log(`Changing overflow of content`);
    document.body.style.overflow = shouldShowSidebar ? "hidden" : "";
    scrollableContentRef.current.style.overflow = shouldShowSidebar
      ? "hidden"
      : "";
    setBackdropOpen(shouldShowSidebar);
  }, [showSidebar, canOpenSidebar]);

  // Make sure sidebar is only actually opened when the media query
  // for deatched sidebar triggers correctly
  React.useEffect(() => {
    const ResizeObserver = window.ResizeObserver || Polyfill;
    const resizeObserver = new ResizeObserver(() => {
      // Note: in functional components this isn't rerendered if it
      // matches the previous value
      // See: https://stackoverflow.com/questions/52624612/does-react-re-render-the-component-if-it-receives-the-same-value-in-state
      setCanOpenSidebar(
        matchMedia("only screen and (max-width: 850px)").matches
      );
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Call reach end method when bottom of content is reached
  React.useEffect(() => {
    if (intersectionObserverRef.current && onReachEnd) {
      const observer = new IntersectionObserver((entry) => {
        log(`Reaching end of scrollable area.`);
        log(entry);
        if (entry[0]?.isIntersecting) {
          log(`Found intersecting entry.`);
          onReachEnd?.();
        } else {
          log(`Intersecting entry not found.`);
        }
      });
      observer.observe(intersectionObserverRef.current);
      return () => observer.disconnect();
    }
    return () => {};
  }, [intersectionObserverRef.current, onReachEnd]);

  return (
    <>
      <div className="content" ref={scrollableContentRef}>
        <div
          className={classnames("sidebar", {
            visible: showSidebar,
            "force-hide": forceHideSidebar,
          })}
          // onClick={(e) => {
          //   e.stopPropagation();
          // }}
          // ref={scrollableMenuRef}
        >
          {showSidebar ? (
            <Scrollbar>
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
        <div className="main">
          {feedContent}
          <div
            ref={intersectionObserverRef}
            className="intersection-observer-ref"
          />
        </div>
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
            position: relative;
          }
          .sidebar.force-hide {
            display: none;
          }
          .sidebar {
            margin-top: -1px;
            width: 350px;
            background-color: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
            flex-shrink: 0;
            height: auto;
          }
          .sidebar-content-wrapper {
            overscroll-behavior: contain;
          }
          .intersection-observer-ref {
            height: 1px;
          }

          @media only screen and (max-width: 950px) {
            .content {
              background-image: none;
            }
            .sidebar {
              border-radius: ${Theme.BORDER_RADIUS_LARGE}
                ${Theme.BORDER_RADIUS_LARGE} 0px 0px;
              width: 95%;
              position: fixed;
              left: 50%;
              transform: translate(-50%, 20%);
              overflow: hidden;
              transition: opacity 0.2s ease-out, transform 0.2s ease-out;
              z-index: 51;
              opacity: 0;
              background: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
              height: 0;
            }
            .sidebar.visible {
              height: calc(100vh - 70px);
              display: block;
              opacity: 1;
              transform: translate(-50%, 0%);
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
