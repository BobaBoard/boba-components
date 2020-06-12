import React from "react";
import SimpleBar from "simplebar-react";

export interface ScrollbarProps {
  children: JSX.Element;
  ref?: React.RefObject<any>;
  height?: string;
}

const Scrollbar = React.forwardRef<SimpleBar, ScrollbarProps>((props, ref) => {
  return (
    <SimpleBar
      style={{ maxHeight: props.height || "100%", width: "100%" }}
      ref={ref}
    >
      {props.children}
    </SimpleBar>
  ) as JSX.Element;
});

export default Scrollbar;
