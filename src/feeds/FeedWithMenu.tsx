import { ResizeObserver as Polyfill } from "@juggle/resize-observer";
import React from "react";
import Scrollbar from "../common/Scrollbar";
import Theme from "../theme/default";
import classnames from "classnames";
import debounce from "debounce";
import debug from "debug";
import noop from "noop-ts";
import { useBackdrop } from "../utils";

require("intersection-observer");

const log = debug("bobaui:feed-with-menu-log");

export interface FeedWithMenuProps {
  showSidebar?: boolean;
  forceHideSidebar?: boolean;
  reachToBottom?: boolean;
  onCloseSidebar?: () => void;
  accentColor?: string;
  onReachEnd?: (more?: (more: boolean) => void) => void;
}

interface CompoundComponents {
  Sidebar: React.FC<{ children: React.ReactNode }>;
  FeedContent: React.FC<{ children: React.ReactNode }>;
}

const Sidebar: CompoundComponents["Sidebar"] = (props) => {
  return <>{props.children}</>;
};

const FeedContent: CompoundComponents["FeedContent"] = (props) => {
  return <>{props.children}</>;
};

const extractFeedContent = (
  children: React.ReactNode
): typeof FeedContent | undefined => {
  return React.Children.toArray(children).find(
    (node) => React.isValidElement(node) && node.type == FeedContent
  ) as typeof FeedContent;
};

const extractSidebar = (
  children: React.ReactNode
): typeof Sidebar | undefined => {
  return React.Children.toArray(children).find(
    (node) => React.isValidElement(node) && node.type == Sidebar
  ) as typeof Sidebar;
};

const FeedWithMenu: React.FC<FeedWithMenuProps> & CompoundComponents = ({
  children,
  showSidebar,
  onCloseSidebar,
  onReachEnd,
  reachToBottom,
  forceHideSidebar,
}) => {
  const scrollableContentRef = React.useRef<HTMLDivElement>(null);
  const intersectionObserverRef = React.useRef<HTMLDivElement>(null);
  const hasReachedBottom = React.useRef<boolean>(false);
  const [canOpenSidebar, setCanOpenSidebar] = React.useState(
    typeof window != "undefined" &&
      matchMedia("only screen and (max-width: 850px)").matches
  );
  const { setOpen: setBackdropOpen } = useBackdrop({
    id: "feed-with-menu",
    zIndex: 50,
    onClick: () => {
      onCloseSidebar?.();
    },
  });

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
  }, [
    showSidebar,
    canOpenSidebar,
    onCloseSidebar,
    setBackdropOpen,
    scrollableContentRef,
  ]);

  // Make sure sidebar is only actually opened when the media query
  // for deatched sidebar triggers correctly
  React.useEffect(() => {
    const ResizeObserver = window.ResizeObserver || Polyfill;
    const resizeObserver = new ResizeObserver(() => {
      // Note: in functional components this isn't rerendered if it
      // matches the previous value
      // See: https://stackoverflow.com/questions/52624612/does-react-re-render-the-component-if-it-receives-the-same-value-in-state
      setCanOpenSidebar(
        matchMedia(
          `only screen and (max-width: ${Theme.MOBILE_WIDTH_TRIGGER_PX}px)`
        ).matches
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
      // Add a disconnection spy so that "loading to bottom" efforts
      // can be abandoned if the useEffect hook has been refreshed.
      let hasDisconnected = false;
      const debouncedReachEnd = debounce(onReachEnd, 200, true);
      const observer = new IntersectionObserver((entry) => {
        log(`Reaching end of scrollable area.`);
        log(entry);
        if (entry[0]?.isIntersecting) {
          log(`Found intersecting entry.`);
          if (!reachToBottom || hasReachedBottom.current) {
            debouncedReachEnd(noop);
            return;
          }
          // If the feed asks to attempt loading to bottom, we trigger
          // the onReachEnd callback until the intersection observer "spy"
          // is below the fold of the viewport.
          const attemptLoadingToBottom = () => {
            const isAtEnd =
              (intersectionObserverRef.current?.getBoundingClientRect().top ||
                1) > (entry[0].rootBounds?.bottom || 0);
            if (isAtEnd) {
              // We have reached the fold! Let's signal that, and stop loading
              // more.
              hasReachedBottom.current = true;
              return;
            }
            // Since "loading more" usually implies setting some state,
            // and we need to wait for the state to be updated to check whether the
            // intersection "spy" has reached below the fold, we pass a promise
            // "resolve" method that we wait on to decide whether we should
            // attempt loading more.
            new Promise((resolve) => {
              onReachEnd(resolve);
            }).then((hasMore) => {
              if (reachToBottom && !hasDisconnected && hasMore) {
                attemptLoadingToBottom();
              }
            });
          };
          attemptLoadingToBottom();
        } else {
          log(`Intersecting entry not found.`);
        }
      });
      observer.observe(intersectionObserverRef.current);
      return () => {
        observer.disconnect();
        hasDisconnected = true;
      };
    }
    return undefined;
  }, [onReachEnd, reachToBottom]);

  const sidebarContent = extractSidebar(children);
  const feedContent = extractFeedContent(children);
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
              <div className="sidebar-content-wrapper">{sidebarContent}</div>
            </Scrollbar>
          ) : (
            sidebarContent
          )}
        </div>
        <main>
          {feedContent}
          <div
            ref={intersectionObserverRef}
            className="intersection-observer-ref"
          />
        </main>
      </div>
      <style jsx>
        {`
          .content {
            width: 100%;
            display: flex;
            min-height: calc(100vh - ${Theme.HEADER_HEIGHT_PX}px);
            background-image: var(--feed-background-image);
          }
          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            padding: 0 20px;
            position: relative;
            overflow: auto;
          }
          .sidebar.force-hide {
            display: none;
          }
          .sidebar {
            margin-top: -1px;
            width: ${Theme.SIDEBAR_WIDTH_PX}px;
            background-color: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
            flex-shrink: 0;
            height: auto;
            background-image: var(--sidebar-background-image);
          }
          .sidebar-content-wrapper {
            overscroll-behavior: contain;
          }
          .intersection-observer-ref {
            height: 1px;
            position: absolute;
            bottom: 500px;
          }

          @media only screen and (max-width: ${Theme.MOBILE_WIDTH_TRIGGER_PX}px) {
            .sidebar {
              border-radius: ${Theme.BORDER_RADIUS_LARGE}
                ${Theme.BORDER_RADIUS_LARGE} 0px 0px;
              width: min(95%, 450px);
              position: fixed;
              left: 50%;
              transform: translate(-50%, 20%);
              overflow: hidden;
              transition: opacity 0.2s ease-out, transform 0.2s ease-out;
              z-index: 51;
              opacity: 0;
              background: ${Theme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
              height: 0;
              background-image: var(--sidebar-background-image);
            }
            .sidebar.visible {
              height: calc(100vh - ${Theme.HEADER_HEIGHT_PX}px);
              display: block;
              opacity: 1;
              transform: translate(-50%, 0%);
            }
            main {
              width: calc(100% - 12px);
              padding: 0 6px;
            }
          }
        `}
      </style>
    </>
  );
};
FeedWithMenu.FeedContent = FeedContent;
FeedWithMenu.Sidebar = Sidebar;
export default FeedWithMenu;
