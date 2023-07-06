import React from "react";
import Theme from "theme/default";
import { ThreeDots } from "react-loader-spinner";

const Spinner: React.FC<{
  color?: string;
  size?: number;
  className?: string;
}> = (props) => (
    <ThreeDots
      color={props.color || Theme.DEFAULT_ACCENT_COLOR}
      height={props.size || 100}
      width={props.size || 100}
      wrapperClass={props.className}
    />
  );
export default Spinner;
