import Comment, { CommentHandler, CommentProps } from "post/Comment";
import { Meta, Story } from "@storybook/react";
import {
  WITH_ACCESSORIES_DECORATOR,
  WRAP_COMPACT_DECORATOR,
} from "../utils/decorators";
import {
  faBellSlash,
  faMapPin,
  faPaintBrush,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { action } from "@storybook/addon-actions";
import { editorArgTypes } from "../utils/editor-controls";
import mamoruAvatar from "stories/images/mamoru.png";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";

export default {
  title: "Comment/Chained Comments",
  component: Comment,
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
  return <Comment {...args} ref={args.ref || undefined} />;
};

export const ChainComment = CommentTemplate.bind({});
ChainComment.args = {
  comments: [
    {
      id: "48d487fc-078c-45c7-b24a-e118f069a8a6",
      text: `[{"insert":"I shall not stand for "},
              {"attributes":{"link":"https://www.reddit.com/r/shittymoviedetails/comments/dkzq56/in_the_hunchback_of_notre_dame_judge_claude/"},"insert":"this slander"},
              {"insert":"!\\n"}]`,
    },
    {
      id: "689c6467-4dfd-4434-8bca-a8f1b04bc1e8",
      text: '[{"insert": "I\'m just a man of simple taste. I see half an ankle and go:"}]',
    },
    {
      id: "91648c92-d86b-4e31-86c8-5f0e3b7a04a7",
      text: '[{"insert":{"block-image":{"src":"https://media.tenor.com/images/2d4aeafd88c82922635b972e454c07d3/tenor.gif","spoilers":false,"width":320,"height":176}}},{"insert":""}]',
    },
  ],
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
  createdTime: "At some point.",
};

export const CompactChainComment = CommentTemplate.bind({});
CompactChainComment.args = ChainComment.args;
CompactChainComment.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactChainCommentWithAction = CommentTemplate.bind({});
CompactChainCommentWithAction.args = {
  ...CompactChainComment.args,
  onExtraAction: {
    onClick: action("click"),
    label: "onExtraAction trigger",
  },
};
CompactChainCommentWithAction.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactChainCommentWithBadges = CommentTemplate.bind({});
CompactChainCommentWithBadges.args = {
  ...CompactChainCommentWithAction.args,
  op: true,
  new: true,
};
CompactChainCommentWithBadges.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactChainCommentWithHiddenIdentity = CommentTemplate.bind({});
CompactChainCommentWithHiddenIdentity.args = {
  ...CompactChainCommentWithBadges.args,
  forceHideIdentity: true,
};
CompactChainCommentWithHiddenIdentity.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactChainCommentWithOptions = CommentTemplate.bind({});
CompactChainCommentWithOptions.args = {
  ...CompactChainCommentWithBadges.args,
  options: [
    {
      name: "Pin board",
      icon: faMapPin,
      link: {
        onClick: action("noHrefClick"),
      },
    },
    {
      name: "Mute board",
      icon: faVolumeMute,
      link: {
        onClick: action("noHrefClick"),
      },
    },
    {
      name: "Dismiss notifications",
      icon: faBellSlash,
      link: {
        onClick: action("noHrefClick"),
      },
    },
    {
      name: "Customize Summary",
      icon: faPaintBrush,
      link: {
        onClick: action("noHrefClick"),
      },
    },
  ],
};
CompactChainCommentWithOptions.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactChainCommentWithHighlight = CommentTemplate.bind({});
CompactChainCommentWithHighlight.args = {
  ...CompactChainCommentWithBadges.args,
};
CompactChainCommentWithHighlight.decorators = [
  WRAP_COMPACT_DECORATOR,
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

export const CompactChainCommentWithAccessories = CommentTemplate.bind({});
CompactChainCommentWithAccessories.args = {
  ...CompactChainCommentWithBadges.args,
};
CompactChainCommentWithAccessories.decorators = [
  WRAP_COMPACT_DECORATOR,
  WITH_ACCESSORIES_DECORATOR,
];
