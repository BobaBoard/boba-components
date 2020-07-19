import React from "react";
import SimpleBar from "simplebar-react";
import debug from "debug";

const log = debug("bobaui:scrollbar-log");

export interface ScrollbarProps {
  children: JSX.Element;
  ref?: React.RefObject<any>;
  height?: string;
  onReachEnd?: () => void;
}

const Scrollbar = React.forwardRef<SimpleBar, ScrollbarProps>((props, ref) => {
  const scrollableNodeRef = React.createRef<HTMLDivElement>();
  const intersectionObserverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (intersectionObserverRef.current && props.onReachEnd) {
      const observer = new IntersectionObserver(
        (entry) => {
          log(`Reaching end of scrollable area.`);
          log(entry);
          if (entry[0]?.isIntersecting) {
            log(`Found intersecting entry.`);
            props.onReachEnd?.();
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
    return () => {};
  }, [
    intersectionObserverRef.current,
    scrollableNodeRef.current,
    props.onReachEnd,
  ]);

  return (
    <SimpleBar
      style={{ maxHeight: props.height || "100%", width: "100%" }}
      ref={ref}
      scrollableNodeProps={{ ref: scrollableNodeRef }}
    >
      {props.children}
      <div
        ref={intersectionObserverRef}
        className="intersection-observer-ref"
      />
      <style jsx>{`
        .intersection-observer-ref {
          height: 1px;
        }
      `}</style>
    </SimpleBar>
  ) as JSX.Element;
});

export default Scrollbar;
