import React from "react";
import Post, { PostProps } from "../../src/post/Post";
import PostQuote from "../../src/post/PostQuote";

import tuxedoAvatar from "../images/tuxedo-mask.jpg";
import mamoruAvatar from "../images/mamoru.png";

import oncieReaction from "../images/oncie-reaction.png";
import sportacusReaction from "../images/sportacus-reaction.png";
import luigiReaction from "../images/luigi-reaction.png";
import junkoReaction from "../images/junko-reaction.png";
import reindeerEars from "../images/reindeer-ears.png";
import scarf from "../images/scarf.png";
import snow from "../images/snow.gif";
import crown from "../images/crown.png";
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
> = (args) => <Post {...args} text={getInitialTextString(args.text)} />;

export const NonEditable = PostTemplate.bind({});
NonEditable.args = {
  createdTime: "2019/05/14 at 7:34pm",
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
  onNewContribution: () => action("newContribution"),
  onNewComment: () => action("newComment"),
  onNotesClick: () => console.log("click"),
  createdTimeLink: {
    onClick: action("createdTime"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  notesLink: {
    onClick: action("notesLink"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
};

export const UpdatedPost = PostTemplate.bind({});
UpdatedPost.args = {
  ...NonEditable.args,
  totalContributions: 15,
  directContributions: 3,
  totalComments: 5,
  newComments: 3,
  newContributions: 5,
};

export const AnswerablePost = PostTemplate.bind({});
AnswerablePost.args = {
  ...UpdatedPost.args,
  answerable: true,
};

export const TaggedPost = PostTemplate.bind({});
TaggedPost.args = {
  ...AnswerablePost.args,
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

export const ReactablePost = PostTemplate.bind({});
ReactablePost.args = {
  ...TaggedPost.args,
  reactable: true,
  reactions: [
    { image: oncieReaction, count: 3 },
    { image: sportacusReaction, count: 6 },
    { image: luigiReaction, count: 11 },
    { image: junkoReaction, count: 20 },
  ],
  tags: {
    ...TaggedPost.args.tags,
    contentWarnings: ["this has just one warning!"],
  },
};

export const ActionPost = PostTemplate.bind({});
ActionPost.args = {
  ...TaggedPost.args,
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

export const HighlightPost = () => {
  const postRef = React.createRef<any>();
  return (
    <div>
      <Post {...TaggedPost.args} ref={postRef} />
      <div style={{ marginTop: "20px" }}>
        <Button
          onClick={() => {
            action("highlight")(postRef.current);
            postRef.current.highlight("red");
          }}
        >
          Highlight!
        </Button>
      </div>
    </div>
  );
};

export const BoardPost = PostTemplate.bind({});
BoardPost.args = {
  ...ActionPost.args,
  board: {
    slug: "!gore",
    accentColor: "purple",
  },
};

export const Badges = PostTemplate.bind({});
Badges.args = {
  ...BoardPost.args,
  newPost: true,
  op: true,
};

export const SwitchIdentityPost = () => {
  const [identityHidden, setIdentityHidden] = React.useState(false);
  return (
    <div>
      <button onClick={() => setIdentityHidden(!identityHidden)}>
        {identityHidden ? "Show" : "Hide"} identity
      </button>
      <Post
        {...BoardPost.args}
        secretIdentity={{
          ...BoardPost.args.secretIdentity,
          color: "#f30cb5",
          accessory: crown,
        }}
        forceHideIdentity={identityHidden}
      />
    </div>
  );
};

export const AccessoryPost = () => {
  const [currentAccessory, setCurrentAccessory] = React.useState<
    string | undefined
  >(reindeerEars);
  return (
    <div>
      <button onClick={() => setCurrentAccessory(undefined)}>None</button>
      <button onClick={() => setCurrentAccessory(reindeerEars)}>
        Reindeer
      </button>
      <button onClick={() => setCurrentAccessory(wreath)}>Wreath</button>
      <button onClick={() => setCurrentAccessory(scarf)}>Scarf</button>
      <button onClick={() => setCurrentAccessory(snow)}>Snow</button>
      <Post
        {...BoardPost.args}
        secretIdentity={{
          name:
            "Tuxedo Mask askldjaksldjaskld askdjaskldjaskldjas daskjdaklsdjaklsdj askdjaskldjaklsdjaskld askdj kasjdaklsdjaklsdjaskldjslk",
          avatar: `/${tuxedoAvatar}`,
          accessory: currentAccessory,
        }}
      />
    </div>
  );
};

export const PostQuoteStory = () => {
  return (
    <div style={{ width: "300px" }}>
      <PostQuote
        createdTime="yesterday"
        createdTimeLink={{
          href: "#test-link",
          onClick: action("clickity-click"),
        }}
        text={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
          accessory: crown,
          color: "#f30cb5",
        }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      />
    </div>
  );
};
