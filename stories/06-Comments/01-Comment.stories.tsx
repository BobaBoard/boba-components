import { Meta, Story } from "@storybook/react";
import NewComment, {
  CommentHandler,
  CommentProps,
} from "../../src/post/NewComment";

import React from "react";
import { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";
import { action } from "@storybook/addon-actions";
import { editorArgTypes } from "../utils/editor-controls";
import mamoruAvatar from "../images/mamoru.png";
import tuxedoAvatar from "../images/tuxedo-mask.jpg";

export default {
  title: "Comment/Comment",
  component: NewComment,
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

const CommentTemplate: Story<CommentProps> = (args) => {
  return <NewComment {...args} ref={args.ref || undefined} />;
};

const WRAP_COMPACT = (Story: () => StoryFnReactReturnType) => {
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

export const CompactTextWithAction = CommentTemplate.bind({});
CompactTextWithAction.args = {
  ...CompactTextComment.args,
  onExtraAction: () => action("click")(),
};
CompactTextWithAction.decorators = [WRAP_COMPACT];

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
  createdTime: "At some point.",
};

export const CompactImageComment = CommentTemplate.bind({});
CompactImageComment.args = ImageComment.args;
CompactImageComment.decorators = [WRAP_COMPACT];

export const CompactImageCommentWithAction = CommentTemplate.bind({});
CompactImageCommentWithAction.args = {
  ...ImageComment.args,
  onExtraAction: () => action("click")(),
};
CompactImageCommentWithAction.decorators = [WRAP_COMPACT];

export const ChainComment = CommentTemplate.bind({});
ChainComment.args = {
  comments: [
    {
      id: "689c6467-4dfd-4434-8bca-a8f1b04bc1e8",
      text:
        '[{"insert": "I\'m a man of simple taste. I see half an ankle and go:"}]',
    },
    {
      id: "91648c92-d86b-4e31-86c8-5f0e3b7a04a7",
      text:
        '[{"insert":{"block-image":{"src":"https://media.tenor.com/images/2d4aeafd88c82922635b972e454c07d3/tenor.gif","spoilers":false,"width":320,"height":176}}},{"insert":""}]',
    },
  ],
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
  createdTime: "At some point.",
};

export const CompactChainComment = CommentTemplate.bind({});
CompactChainComment.args = ChainComment.args;
CompactChainComment.decorators = [WRAP_COMPACT];

export const CompactChainCommentWithAction = CommentTemplate.bind({});
CompactChainCommentWithAction.args = {
  ...CompactChainComment.args,
  onExtraAction: () => action("click")(),
};
CompactChainCommentWithAction.decorators = [WRAP_COMPACT];

export const CompactChainCommentWithBadges = CommentTemplate.bind({});
CompactChainCommentWithBadges.args = {
  ...CompactChainCommentWithAction.args,
  op: true,
  new: true,
};
CompactChainCommentWithBadges.decorators = [WRAP_COMPACT];

export const CompactChainCommentWithHighlight = CommentTemplate.bind({});
CompactChainCommentWithHighlight.args = {
  ...CompactChainCommentWithBadges.args,
};
CompactChainCommentWithHighlight.decorators = [
  WRAP_COMPACT,
  (Story, storyArgs) => {
    const commentRef = React.createRef<CommentHandler>();
    storyArgs.args.ref = commentRef;
    return (
      <div className="story">
        {Story()}
        <button onClick={() => commentRef.current?.highlight("red")}>
          Highlight
        </button>
        <style jsx>{`
          .story {
            max-width: 250px;
          }
        `}</style>
      </div>
    );
  },
];
