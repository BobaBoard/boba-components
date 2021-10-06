import React from "react";
import Post, { PostHandler, PostProps } from "../../src/post/Post";

import tuxedoAvatar from "../images/tuxedo-mask.jpg";
import mamoruAvatar from "../images/mamoru.png";

import oncieReaction from "../images/oncie-reaction.png";
import sportacusReaction from "../images/sportacus-reaction.png";
import luigiReaction from "../images/luigi-reaction.png";
import junkoReaction from "../images/junko-reaction.png";
import reindeerEars from "../images/reindeer-ears.png";
import scarf from "../images/scarf.png";
import snow from "../images/snow.gif";
import wreath from "../images/wreath.png";
import Button from "../../src/buttons/Button";
import { action } from "@storybook/addon-actions";
import {
  editorArgTypes,
  EditorControlsType,
  EDITOR_TEXT_VALUES,
  getInitialTextString,
} from "../utils/editor-controls";
import { Meta, Story } from "@storybook/react";

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
WithDropdownAction.args = {
  ...Tagged.args,
  secretIdentity: {
    name:
      "Tuxedo Mask askldjaksldjaskld askdjaskldjaskldjas daskjdaklsdjaklsdj askdjaskldjaklsdjaskld askdj kasjdaklsdjaklsdjaskldjslk",
    avatar: `/${tuxedoAvatar}`,
  },
};

export const WithAccessories = PostTemplate.bind({});
WithAccessories.args = Tagged.args;
WithAccessories.decorators = [
  (Story, stuff) => {
    const [currentAccessory, setCurrentAccessory] = React.useState<
      string | undefined
    >(reindeerEars);
    stuff.args.secretIdentity = {
      ...stuff.args.secretIdentity,
      accessory: currentAccessory,
    };
    return (
      <div style={{ marginLeft: "20px" }}>
        {/* @ts-ignore */}
        <Story />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={() => setCurrentAccessory(undefined)}>None</button>
          <button onClick={() => setCurrentAccessory(reindeerEars)}>
            Reindeer
          </button>
          <button onClick={() => setCurrentAccessory(wreath)}>Wreath</button>
          <button onClick={() => setCurrentAccessory(scarf)}>Scarf</button>
          <button onClick={() => setCurrentAccessory(snow)}>Snow</button>
        </div>
      </div>
    );
  },
];
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
