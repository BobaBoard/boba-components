import React from "react";
import SimpleBar from "simplebar-react";

export interface ScrollbarProps {
  children: JSX.Element;
  ref?: React.RefObject<any>;
}

const Scrollbar: React.ComponentType<ScrollbarProps> = React.forwardRef(
  (props, ref) => {
    return (
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        {props.children}
      </SimpleBar>
    ) as JSX.Element;
  }
);

export default Scrollbar;
