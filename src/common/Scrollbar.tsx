import React from "react";
import debug from "debug";

const log = debug("bobaui:scrollbar-log");

export interface ScrollbarProps {
  children: React.ReactNode;
  height?: string;
  onReachEnd?: () => void;
}

const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const scrollableNodeRef = React.createRef<HTMLDivElement>();
  const intersectionObserverRef = React.useRef<HTMLDivElement>(null);

  // TODO: this is a useful performance improvement to avoid repainting of the
  // scrollable area over and over again. However, it also causes issues with
  // position fixed elements not being redrawn (and thus not being "fixed").
  // Investigate and reactivate.
  // React.useEffect(() => {
  //   if (scrollableNodeRef.current) {
  //     scrollableNodeRef.current.style.transform = "translateZ(0)";
  //     scrollableNodeRef.current.style.willChange = "transform";
  //   }
  // }, [scrollableNodeRef.current]);

  const { onReachEnd } = props;
  React.useEffect(() => {
    if (intersectionObserverRef.current && onReachEnd) {
      const observer = new IntersectionObserver(
        (entry) => {
          log(`Reaching end of scrollable area.`);
          log(entry);
          if (entry[0]?.isIntersecting) {
            log(`Found intersecting entry.`);
            onReachEnd?.();
          } else {
            log(`Intersecting entry not found.`);
          }
        },
        {
          root: scrollableNodeRef.current,
        }
      );
      observer.observe(intersectionObserverRef.current);
      return () => observer.disconnect();
    }
    return undefined;
  }, [onReachEnd, scrollableNodeRef]);

  return (
    <div
      style={{
        maxHeight: props.height || "100%",
        width: "100%",
        overflowX: "hidden",
      }}
      ref={scrollableNodeRef}
    >
      {props.children}
      {props.onReachEnd && (
        <div
          ref={intersectionObserverRef}
          className="intersection-observer-ref"
        />
      )}
      <style jsx>{`
        .intersection-observer-ref {
          height: 1px;
        }
      `}</style>
    </div>
  ) as React.ReactElement;
};

export default Scrollbar;
