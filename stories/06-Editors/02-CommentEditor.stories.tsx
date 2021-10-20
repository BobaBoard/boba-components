import CommentChainEditor, {
  CommentChainEditorProps,
} from "../../src/post/CommentChainEditor";
import { Meta, Story } from "@storybook/react";

import { ImageUploaderContext } from "../../src/index";
import React from "react";
import { action } from "@storybook/addon-actions";
import crown from "../images/crown.png";
import mamoruAvatar from "../images/mamoru.png";
import oncelerAvatar from "../images/oncie.jpg";
import reindeerEars from "../images/reindeer-ears.png";
import tuxedoAvatar from "../images/tuxedo-mask.jpg";

export default {
  title: "Editors / Comment Editor",
  component: CommentChainEditor,
  decorators: [
    (Story) => (
      <div className="story">
        <ImageUploaderContext.Provider
          value={{
            onImageUploadRequest: async (url) => {
              action("imageUpload")(url);
              return Promise.resolve(`uploaded: ${url}`);
            },
          }}
        >
          <div
            style={{ width: "100%", maxWidth: "550px" }}
            data-testid="large-container"
          >
            {Story()}
          </div>
          <div
            style={{ width: "100%", maxWidth: "250px" }}
            data-testid="small-container"
          >
            {Story()}
          </div>
        </ImageUploaderContext.Provider>
        <style jsx>{`
          .story {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 25px;
          }
          div + div {
            margin-top: 25px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const CommentChainEditorTemplate: Story<CommentChainEditorProps> = (args) => (
  <CommentChainEditor {...args} />
);
export const Base = CommentChainEditorTemplate.bind({});
Base.args = {
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
  onSubmit: (text) => console.log(text),
  onCancel: () => console.log("click!"),
};

export const WithLoadingState = CommentChainEditorTemplate.bind({});
WithLoadingState.args = {
  ...Base.args,
  loading: true,
};

export const WithIdentitySelector = CommentChainEditorTemplate.bind({});
WithIdentitySelector.args = {
  ...Base.args,
  additionalIdentities: [
    { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
    {
      id: "id2",
      name: "Mega Mod",
      avatar: `/${oncelerAvatar}`,
      color: "red",
      accessory: crown,
    },
  ],
};

export const WithAccessorySelector = CommentChainEditorTemplate.bind({});
WithAccessorySelector.args = {
  ...WithIdentitySelector.args,
  accessories: [
    {
      id: "ac1",
      name: "Reindeer",
      accessory: reindeerEars,
    },
    {
      id: "ac2",
      name: "Crown",
      accessory: crown,
    },
  ],
};
