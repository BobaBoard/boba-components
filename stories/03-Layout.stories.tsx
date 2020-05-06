import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Layout from "../src/Layout";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Layout Preview",
  component: Layout,
};

export const SimpleButton = () => {
  return <Layout />;
};

SimpleButton.story = {
  name: "simple",
};
