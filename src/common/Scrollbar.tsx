import React from "react";
import SimpleBar from "simplebar-react";

export interface ScrollbarProps {
  children: JSX.Element;
  ref?: React.RefObject<any>;
  height?: string;
  onReachEnd?: () => void;
}

const THRESHOLD = 250;
const Scrollbar = React.forwardRef<SimpleBar, ScrollbarProps>((props, ref) => {
  const scrollableNodeRef = React.createRef<HTMLDivElement>();
  const timeout = React.useRef<any>();

  React.useEffect(() => {
    const checkIfEnd = () => {
      if (scrollableNodeRef?.current && props.onReachEnd) {
        const target = scrollableNodeRef.current;
        const maxScroll = target.scrollHeight;
        const currentScroll = target.scrollTop + target.clientHeight;
        if (maxScroll - currentScroll < THRESHOLD) {
          props?.onReachEnd?.();
        }
      }
      timeout.current = setTimeout(checkIfEnd, 300);
    };
    checkIfEnd();
    return () => {
      clearTimeout(timeout.current);
    };
  }, [scrollableNodeRef]);

  return (
    <SimpleBar
      style={{ maxHeight: props.height || "100%", width: "100%" }}
      ref={ref}
      scrollableNodeProps={{ ref: scrollableNodeRef }}
    >
      {props.children}
    </SimpleBar>
  ) as JSX.Element;
});

export default Scrollbar;
