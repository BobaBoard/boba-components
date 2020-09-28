import React from "react";
//import { linkTo } from "@storybook/addon-links";
import ToastContainer, { toast } from "../src/common/Toast";

export default {
  title: "Toast Preview",
  component: ToastContainer,
};

export const SimpleButton = () => {
  React.useEffect(() => {
    toast.success("🦄 Wow so easy!", {
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
    });
    toast.error("🦄 Wow so easy!", {
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
    });
    toast.warning("🦄 Wow so easy!", {
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
    });
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

SimpleButton.story = {
  name: "simple",
};
