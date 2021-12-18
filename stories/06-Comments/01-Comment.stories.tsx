import CommentChain, { CommentChainProps } from "../../src/post/CommentChain";
import {
  EDITOR_TEXT_VALUES,
  EditorControlsType,
  editorArgTypes,
  getInitialText,
} from "../utils/editor-controls";
import { Meta, Story } from "@storybook/react";

import React from "react";
import { action } from "@storybook/addon-actions";
import mamoruAvatar from "../images/mamoru.png";
import tuxedoAvatar from "../images/tuxedo-mask.jpg";

export default {
  title: "Comment/Comment",
  component: CommentChain,
  argTypes: {
    ...editorArgTypes,
  },
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 25px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const CommentTemplate: Story<CommentChainProps> = (args) => {
  return <CommentChain {...args} ref={undefined} />;
};

const WRAP_COMPACT = (Story: any) => {
  return (
    <div className="story">
      {Story()}
      <style jsx>{`
        .story {
          max-width: 250px;
        }
      `}</style>
    </div>
  );
};
export const TextComment = CommentTemplate.bind({});
TextComment.args = {
  comments: [
    {
      id: "first_comment",
      text:
        '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]',
    },
  ],
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
};

export const CompactTextComment = CommentTemplate.bind({});
CompactTextComment.args = TextComment.args;
CompactTextComment.decorators = [WRAP_COMPACT];

export const ImageComment = CommentTemplate.bind({});
ImageComment.args = {
  comments: [
    {
      id: "first_comment",
      text:
        '[{"insert":{"block-image":{"src":"https://media.tenor.com/images/2d4aeafd88c82922635b972e454c07d3/tenor.gif","spoilers":false,"width":320,"height":176}}},{"insert":""}]',
    },
  ],
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
};

export const CompactImageComment = CommentTemplate.bind({});
CompactImageComment.args = ImageComment.args;
CompactImageComment.decorators = [WRAP_COMPACT];

export const ImageWithAction = CommentTemplate.bind({});
ImageWithAction.args = {
  ...ImageComment.args,
  onExtraAction: () => action("click")(),
};

export const CompactImageWithAction = CommentTemplate.bind({});
CompactImageWithAction.args = ImageWithAction.args;
CompactImageWithAction.decorators = [WRAP_COMPACT];
