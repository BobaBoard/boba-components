import React from "react";
//import { linkTo } from "@storybook/addon-links";
import PostEditor from "../src/post/PostEditor";

import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";

export default {
  title: "Post Editor",
  component: PostEditor,
};

export const EditableWithFooter = () => (
  <PostEditor
    secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
    userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
    onSubmit={(text) => console.log(text)}
    onCancel={() => console.log("click!")}
  />
);

EditableWithFooter.story = {
  name: "editable",
};
