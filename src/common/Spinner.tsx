import React from "react";
import Theme from "../theme/default";
// @ts-ignore
import Loader from "react-loader-spinner";

const Spinner: React.FC<{
  color?: string;
  size?: number;
}> = (props) => {
  return (
    <Loader
      type="ThreeDots"
      color={props.color || Theme.DEFAULT_ACCENT_COLOR}
      height={props.size || 100}
      width={props.size || 100}
    />
  );
};
export default Spinner;
