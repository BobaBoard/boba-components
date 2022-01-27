import {
  EDITOR_TEXT_VALUES,
  EditorControlsType,
  editorArgTypes,
  getInitialTextString,
} from "../utils/editor-controls";
import { Meta, Story } from "@storybook/react";
import Post, { PostHandler, PostProps } from "post/Post";
import { faCodeBranch, faLink } from "@fortawesome/free-solid-svg-icons";

import Button from "buttons/Button";
import React from "react";
import { WITH_ACCESSORIES_DECORATOR } from "../utils/decorators";
import { action } from "@storybook/addon-actions";
import junkoReaction from "../images/junko-reaction.png";
import luigiReaction from "../images/luigi-reaction.png";
import mamoruAvatar from "../images/mamoru.png";
import oncieReaction from "../images/oncie-reaction.png";
import sportacusReaction from "../images/sportacus-reaction.png";
import tuxedoAvatar from "../images/tuxedo-mask.jpg";

export default {
  title: "Posts / Post",
  component: Post,
  argTypes: {
    // NOTE: switching text doesn't work because the post doesn't respect text updates
    // TODO: maybe rename this as "initial text"
    text: editorArgTypes.editorText,
  },
  args: {
    text: EDITOR_TEXT_VALUES.WITH_IMAGE,
  },
} as Meta;

const PostTemplate: Story<
  PostProps & { text: EditorControlsType["editorText"] } // Override type of text to be able to use text controls
> = (args, context) => (
  <Post
    {...args}
    text={getInitialTextString(args.text)}
    ref={context?.postRef}
  />
);

export const Base = PostTemplate.bind({});
Base.args = {
  createdTime: "2019/05/14 at 7:34pm",
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
  onNewContribution: () => action("newContribution"),
  onNewComment: () => action("newComment"),
  createdTimeLink: {
    onClick: action("createdTime"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  notesLink: {
    onClick: action("notesLink"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
};

export const Updated = PostTemplate.bind({});
Updated.args = {
  ...Base.args,
  totalContributions: 15,
  directContributions: 3,
  totalComments: 5,
  newComments: 3,
  newContributions: 5,
};

export const Answerable = PostTemplate.bind({});
Answerable.args = {
  ...Updated.args,
  answerable: true,
};

export const Tagged = PostTemplate.bind({});
Tagged.args = {
  ...Answerable.args,
  tags: {
    indexTags: ["indexable"],
    categoryTags: ["category"],
    contentWarnings: [
      "bad content (1)",
      "terrible content (2)",
      "super awful content (3)",
      "just don't look at this content (4)",
    ],
    whisperTags: [
      "tag1",
      "tag2",
      "a long tag",
      "a very very very very very long tag with many words",
      "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
    ],
  },
  answerable: true,
};

export const Reactable = PostTemplate.bind({});
Reactable.args = {
  ...Tagged.args,
  reactable: true,
  reactions: [
    { image: oncieReaction, count: 3 },
    { image: sportacusReaction, count: 6 },
    { image: luigiReaction, count: 11 },
    { image: junkoReaction, count: 20 },
  ],
  tags: {
    indexTags: ["indexable"],
    categoryTags: ["category"],
    whisperTags: [
      "tag1",
      "tag2",
      "a long tag",
      "a very very very very very long tag with many words",
      "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
    ],
    contentWarnings: ["this has just one warning!"],
  },
};

export const WithDropdownAction = PostTemplate.bind({});
WithDropdownAction.args = {
  ...Tagged.args,
  menuOptions: [
    {
      name: "Copy Link",
      icon: faLink,
      link: {
        onClick: action("copy!"),
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    },
  ],
};

export const WithBoard = PostTemplate.bind({});
WithBoard.args = {
  ...WithDropdownAction.args,
  board: {
    slug: "!gore",
    accentColor: "purple",
  },
};

export const WithBadges = PostTemplate.bind({});
WithBadges.args = {
  ...WithBoard.args,
  newPost: true,
  op: true,
};

export const ForceHideIdentity = PostTemplate.bind({});
ForceHideIdentity.args = {
  ...WithBadges.args,
  forceHideIdentity: true,
};

export const WithLongIdentityName = PostTemplate.bind({});
WithLongIdentityName.args = {
  ...WithDropdownAction.args,
  secretIdentity: {
    name:
      "Tuxedo Mask askldjaksldjaskld askdjaskldjaskldjas daskjdaklsdjaklsdj askdjaskldjaklsdjaskld askdj kasjdaklsdjaklsdjaskldjslk",
    avatar: `/${tuxedoAvatar}`,
  },
};

export const WithThreadTypeIcon = PostTemplate.bind({});
WithThreadTypeIcon.args = {
  ...WithLongIdentityName.args,
  createdMessageIcon: faCodeBranch,
};

export const WithAccessories = PostTemplate.bind({});
WithAccessories.args = Tagged.args;
WithAccessories.decorators = [WITH_ACCESSORIES_DECORATOR];

export const TestHighlight = PostTemplate.bind({});
TestHighlight.args = Tagged.args;
TestHighlight.decorators = [
  (Story) => {
    const postRef = React.createRef<PostHandler>();
    return (
      <div style={{ marginLeft: "20px" }}>
        {/* @ts-ignore */}
        <Story postRef={postRef} />
        <div style={{ marginTop: "20px" }}>
          <Button
            onClick={() => {
              action("highlight")(postRef.current);
              postRef.current?.highlight("red");
            }}
          >
            Highlight!
          </Button>
        </div>
      </div>
    );
  },
];
