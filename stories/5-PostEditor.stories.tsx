import React from "react";
//import { linkTo } from "@storybook/addon-links";
import PostEditor, { setTumblrEmbedFetcher } from "../src/post/PostEditor";
import Modal from "../src/common/Modal";
import Button from "../src/common/Button";

import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";
import { action } from "@storybook/addon-actions";

export default {
  title: "Post Editor",
  component: PostEditor,
};

setTumblrEmbedFetcher((url: string) => {
  console.log(`""Fetching"" from ${url}`);
  return Promise.resolve({
    url:
      "https://turquoisemagpie.tumblr.com/post/618042321716510720/eternity-stuck-in-white-noise-can-drive-you-a",
    href:
      "https://embed.tumblr.com/embed/post/2_D8XbYRWYBtQD0A9Pfw-w/618042321716510720",
    did: "22a0a2f8b7a33dc50bbf5f49fb53f92b181a88aa",
  });
});

export const EditableWithFooter = () => (
  <PostEditor
    secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
    userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
    onSubmit={action("submit")}
    onCancel={action("cancel")}
    onImageUploadRequest={async () => {
      action("imageUpload")();
      return "";
    }}
    centered
    minimizable
  />
);

EditableWithFooter.story = {
  name: "editable",
};

export const EditableWithMultipleIdentities = () => (
  <PostEditor
    secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
    userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
    additionalIdentities={[
      { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
      { id: "id2", name: "Mega Mod", avatar: `/${tuxedoAvatar}` },
    ]}
    onSubmit={async (p) => {
      const args = await p;
      action("submit")(args);
    }}
    onCancel={action("cancel")}
    onImageUploadRequest={async () => {
      action("imageUpload")();
      return Promise.resolve("");
    }}
    centered
  />
);

EditableWithMultipleIdentities.story = {
  name: "multiple identities",
};

export const EditableWithViewSelect = () => (
  <PostEditor
    secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
    userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
    additionalIdentities={[
      { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
      { id: "id2", name: "Mega Mod", avatar: `/${tuxedoAvatar}` },
    ]}
    onSubmit={async (p) => {
      const args = await p;
      action("submit")(args);
    }}
    onCancel={action("cancel")}
    onImageUploadRequest={async () => {
      action("imageUpload")();
      return Promise.resolve("");
    }}
    viewOptions={[
      { name: "Thread" },
      { name: "Gallery" },
      { name: "Timeline" },
    ]}
    centered
  />
);

EditableWithViewSelect.story = {
  name: "view select",
};

export const SmallestViewport = () => (
  <div style={{ maxWidth: "345px" }}>
    <PostEditor
      secretIdentity={{
        name: "Tuxedo Mask, the one, the only, the legend.",
        avatar: `/${tuxedoAvatar}`,
      }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      additionalIdentities={[
        { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
        { id: "id2", name: "Mega Mod", avatar: `/${tuxedoAvatar}` },
      ]}
      onSubmit={async (p) => {
        const args = await p;
        action("submit")(args);
      }}
      onCancel={action("cancel")}
      onImageUploadRequest={async () => {
        action("imageUpload")();
        return Promise.resolve("");
      }}
      viewOptions={[
        { name: "Thread" },
        { name: "Gallery" },
        { name: "Timeline" },
      ]}
      centered
    />
  </div>
);

SmallestViewport.story = {
  name: "small viewport",
};

export const EditableInModal = () => (
  <Modal isOpen={true}>
    <PostEditor
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      additionalIdentities={[
        { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
        { id: "id2", name: "Mega Mod", avatar: `/${tuxedoAvatar}` },
      ]}
      onSubmit={action("submit")}
      onCancel={action("cancel")}
      onImageUploadRequest={async () => {
        action("imageUpload")();
        return "";
      }}
      centered
    />
  </Modal>
);

EditableInModal.story = {
  name: "editable with modal",
};

export const LongEditableInModal = () => (
  <Modal isOpen={true}>
    <PostEditor
      initialText={
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      }
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onSubmit={action("submit")}
      onCancel={action("cancel")}
      onImageUploadRequest={async () => {
        action("imageUpload")();
        return "";
      }}
      centered
    />
  </Modal>
);

LongEditableInModal.story = {
  name: "long editable with modal",
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
        onSubmit={action("submit")}
        onCancel={action("cancel")}
        onImageUploadRequest={async () => {
          action("imageUpload")();
          return "";
        }}
        loading={loading}
        centered
      />
      <Button onClick={() => setLoading(!loading)}>Change Load State</Button>
    </div>
  );
};

Loading.story = {
  name: "loading state",
};

export const Focus = () => {
  const postRef = React.createRef<any>();
  return (
    <div>
      <PostEditor
        initialText={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onSubmit={action("submit")}
        onCancel={action("cancel")}
        onImageUploadRequest={async () => {
          action("imageUpload")();
          return "";
        }}
        ref={postRef}
        centered
      />
      <Button onClick={() => postRef.current.focus()}>Focus!</Button>
    </div>
  );
};

Focus.story = {
  name: "focus state",
};
