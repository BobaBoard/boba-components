import React from "react";
//import { linkTo } from "@storybook/addon-links";
import PostEditor from "../src/post/PostEditor";
import Modal from "../src/common/Modal";
import Button from "../src/common/Button";

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

export const EditableInModal = () => (
  <Modal isOpen={true}>
    <PostEditor
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onSubmit={(text) => console.log(text)}
      onCancel={() => console.log("click!")}
    />
  </Modal>
);

EditableInModal.story = {
  name: "editable with modal",
};

export const Loading = () => {
  const [loading, setLoading] = React.useState(true);
  return (
    <div>
      <PostEditor
        initialText={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onSubmit={(text) => console.log(text)}
        onCancel={() => console.log("click!")}
        loading={loading}
      />
      <Button onClick={() => setLoading(!loading)}>Change Load State</Button>
    </div>
  );
};

Loading.story = {
  name: "loading state",
};
