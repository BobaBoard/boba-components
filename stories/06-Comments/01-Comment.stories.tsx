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
import mamoruAvatar from "../images/mamoru.png";
import tuxedoAvatar from "../images/tuxedo-mask.jpg";

export default {
  title: "Comment/Single Comment",
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
CompactTextComment.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactTextWithAction = CommentTemplate.bind({});
CompactTextWithAction.args = {
  ...CompactTextComment.args,
  onExtraAction: {
    onClick: () => action("click")(),
    label: "onExtraAction trigger",
  },
};
CompactTextWithAction.decorators = [WRAP_COMPACT_DECORATOR];

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
CompactImageComment.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactImageCommentWithAction = CommentTemplate.bind({});
CompactImageCommentWithAction.args = {
  ...ImageComment.args,
  onExtraAction: {
    onClick: () => action("click")(),
    label: "onExtraAction trigger",
  },
};
CompactImageCommentWithAction.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactImageCommentWithBadges = CommentTemplate.bind({});
CompactImageCommentWithBadges.args = {
  ...CompactImageCommentWithAction.args,
  op: true,
  new: true,
};
CompactImageCommentWithAction.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactImageCommentWithHiddenIdentity = CommentTemplate.bind({});
CompactImageCommentWithHiddenIdentity.args = {
  ...CompactImageCommentWithBadges.args,
  forceHideIdentity: true,
};
CompactImageCommentWithHiddenIdentity.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactImageCommentWithOptions = CommentTemplate.bind({});
CompactImageCommentWithOptions.args = {
  ...CompactImageCommentWithBadges.args,
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
CompactImageCommentWithOptions.decorators = [WRAP_COMPACT_DECORATOR];

export const CompactImageCommentWithHighlight = CommentTemplate.bind({});
CompactImageCommentWithHighlight.args = {
  ...CompactImageCommentWithAction.args,
};
CompactImageCommentWithHighlight.decorators = [
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

export const CompactImageCommentWithAccessories = CommentTemplate.bind({});
CompactImageCommentWithAccessories.args = {
  ...CompactImageCommentWithBadges.args,
};
CompactImageCommentWithAccessories.decorators = [
  WRAP_COMPACT_DECORATOR,
  WITH_ACCESSORIES_DECORATOR,
];
