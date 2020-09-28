import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Card from "../src/common/Card";
import Header, { HeaderStyle } from "../src/post/Header";
import Footer from "../src/post/Footer";
import EditorFooter from "../src/post/EditorFooter";
import Post from "../src/post/Post";
import PostQuote from "../src/post/PostQuote";
// @ts-ignore
import Editor from "@bobaboard/boba-editor";

import oncelerAvatar from "./images/oncie.jpg";
import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";

import oncieReaction from "./images/oncie-reaction.png";
import sportacusReaction from "./images/sportacus-reaction.png";
import luigiReaction from "./images/luigi-reaction.png";
import junkoReaction from "./images/junko-reaction.png";
import Button from "../src/common/Button";
import { action } from "@storybook/addon-actions";

export default {
  title: "Post Preview",
  component: Card,
};

export const CardSimple = () => (
  <div className="test-centering">
    <div className="container">
      <Card>
        <Editor
          editable={false}
          initialText={JSON.parse(
            '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
          )}
          onTextChange={() => {
            console.log("changed!");
          }}
          focus={true}
          onIsEmptyChange={() => {
            console.log("empty!");
          }}
          onSubmit={() => {
            // This is for cmd + enter pressed while in the editor
            console.log("submit!");
          }}
        />
      </Card>
    </div>
    <div className="container large">
      <Card>
        <Editor
          editable={false}
          initialText={JSON.parse(
            '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
          )}
          onTextChange={() => {
            console.log("changed!");
          }}
          focus={true}
          onIsEmptyChange={() => {
            console.log("empty!");
          }}
          onSubmit={() => {
            // This is for cmd + enter pressed while in the editor
            console.log("submit!");
          }}
        />
      </Card>
    </div>
    <div className="container">
      <Card>
        <Editor
          editable={false}
          initialText={JSON.parse(
            '[{"insert":"This card has little content."}]'
          )}
          onTextChange={() => {
            console.log("changed!");
          }}
          focus={true}
          onIsEmptyChange={() => {
            console.log("empty!");
          }}
          onSubmit={() => {
            // This is for cmd + enter pressed while in the editor
            console.log("submit!");
          }}
        />
      </Card>
    </div>
    <div className="container">
      <Card>
        <Editor
          editable={false}
          initialText={JSON.parse(
            '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]'
          )}
          onTextChange={() => {
            console.log("changed!");
          }}
          focus={true}
          onIsEmptyChange={() => {
            console.log("empty!");
          }}
          onSubmit={() => {
            // This is for cmd + enter pressed while in the editor
            console.log("submit!");
          }}
        />
      </Card>
    </div>
    <div className="container">
      <Card height={300}>
        <Editor
          editable={false}
          initialText={JSON.parse(
            '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
          )}
          onTextChange={() => {
            console.log("changed!");
          }}
          focus={true}
          onIsEmptyChange={() => {
            console.log("empty!");
          }}
          onSubmit={() => {
            // This is for cmd + enter pressed while in the editor
            console.log("submit!");
          }}
        />
      </Card>
    </div>
    <style jsx>
      {`
        .test-centering {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .container {
          max-width: 450px;
          margin-bottom: 10px;
          width: 100%;
        }
        .container.large {
          max-width: 800px;
        }
      `}
    </style>
  </div>
);

CardSimple.story = {
  name: "content card",
};

const FooterTemplate = (args: any) => (
  <>
    <div style={{ maxWidth: "500px" }}>
      <Footer {...args} />
    </div>
    <div style={{ maxWidth: "250px" }}>
      <Footer {...args} />
    </div>
  </>
);

// To show this story by itself, add export in front of const
const AnswerableFooter = FooterTemplate.bind({});
AnswerableFooter.args = {
  answerable: true,
};

const FooterWithNotes = FooterTemplate.bind({});
FooterWithNotes.args = {
  answerable: true,
  totalContributions: 5,
  directContributions: 2,
  totalComments: 4,
};

const FooterWithUpdates = FooterTemplate.bind({});
FooterWithUpdates.args = {
  ...FooterWithNotes.args,
  newContributions: 1,
  newComments: 3,
};

const FooterWithHighCount = FooterTemplate.bind({});
FooterWithHighCount.args = {
  answerable: true,
  totalContributions: 305,
  directContributions: 200,
  totalComments: 690,
  newContributions: 122,
  newComments: 300,
};

const NonAnswerableFooter = FooterTemplate.bind({});
NonAnswerableFooter.args = {
  ...FooterWithUpdates.args,
  answerable: false,
};

const FooterWithoutHref = FooterTemplate.bind({});
FooterWithoutHref.args = {
  ...FooterWithUpdates.args,
  notesLink: {
    onClick: action("withoutHref"),
  },
};

const FooterWithHref = FooterTemplate.bind({});
FooterWithHref.args = {
  ...FooterWithUpdates.args,
  answerable: false,
  notesLink: {
    onClick: action("withHref"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
};

export const FooterStory = (args: any) => (
  <div>
    <h2>Empty</h2>
    <AnswerableFooter {...AnswerableFooter.args} />
    <h2>No Updates</h2>
    <FooterWithNotes {...FooterWithNotes.args} />
    <h2>With Updates</h2>
    <FooterWithUpdates {...FooterWithUpdates.args} />
    <h2>With High Counts</h2>
    <FooterWithHighCount {...FooterWithHighCount.args} />
    <h2>Non Answerable</h2>
    <NonAnswerableFooter {...NonAnswerableFooter.args} />
    <h2>Click With Href</h2>
    <FooterWithHref {...FooterWithHref.args} />
    <h2>Click Without Href</h2>
    <FooterWithoutHref {...FooterWithoutHref.args} />
    <style jsx>
      {`
        h2 {
          color: white;
        }
        div {
          margin-top: 25px;
        }
        div > :global(div) {
          margin-top: 15px;
          background-color: pink;
        }
      `}
    </style>
  </div>
);

FooterStory.story = {
  name: "footer",
};

export const EditorFooterStory = () => (
  <div>
    <h2>Editor Footer</h2>
    <div style={{ maxWidth: "250px", backgroundColor: "turquoise" }}>
      <EditorFooter />
      <EditorFooter submittable={false} />
      <EditorFooter cancellable={false} />
    </div>
  </div>
);
EditorFooterStory.story = {
  name: "editor footer",
};

const HeaderTemplate = (args: any) => <Header {...args} />;

// To show this story by itself, add export in front of const
const RegularHeader = HeaderTemplate.bind({});
RegularHeader.args = {
  secretIdentity: {
    name: "Good Onceler",
    avatar: `/${oncelerAvatar}`,
  },
  createdMessage: "posted on: 2019/06/19 at 4:20pm",
  createdMessageLink: {
    onClick: action("withHref"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  size: HeaderStyle.REGULAR,
};

const CompactHeader = HeaderTemplate.bind({});
CompactHeader.args = {
  ...RegularHeader.args,
  size: HeaderStyle.COMPACT,
};

const WithUserIdentity = HeaderTemplate.bind({});
WithUserIdentity.args = {
  ...RegularHeader.args,
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
};

const WithUserIdentityCompact = HeaderTemplate.bind({});
WithUserIdentityCompact.args = {
  ...WithUserIdentity.args,
  size: HeaderStyle.COMPACT,
};

const WithUserIdentityForceHide = HeaderTemplate.bind({});
WithUserIdentityForceHide.args = {
  ...WithUserIdentity.args,
  forceHide: true,
};
const WithUserIdentityForceHideCompact = HeaderTemplate.bind({});
WithUserIdentityForceHideCompact.args = {
  ...WithUserIdentityCompact.args,
  forceHide: true,
};

export const HeaderStory = () => (
  <div>
    <RegularHeader {...RegularHeader.args} />
    <CompactHeader {...CompactHeader.args} />
    <WithUserIdentity {...WithUserIdentity.args} />
    <WithUserIdentityCompact {...WithUserIdentityCompact.args} />
    <WithUserIdentityForceHide {...WithUserIdentityForceHide.args} />
    <WithUserIdentityForceHideCompact
      {...WithUserIdentityForceHideCompact.args}
    />
    {/*These will probably need to be deleted at some point*/}
    <RegularHeader {...RegularHeader.args} newPost />
    <RegularHeader {...RegularHeader.args} newComments />
    <RegularHeader {...RegularHeader.args} newComments newContributions />

    <div style={{ width: "200px", backgroundColor: "green" }}>
      <WithUserIdentity {...WithUserIdentity.args} />
    </div>
    <div style={{ width: "200px", backgroundColor: "yellow" }}>
      <WithUserIdentity
        {...WithUserIdentity.args}
        newComments
        newContributions
      />
    </div>
    <style jsx>
      {`
        div {
          max-width: 500px;
          margin-top: 25px;
          background-color: white;
        }
        div > :global(div) {
          margin-top: 15px;
        }
      `}
    </style>
  </div>
);

HeaderStory.story = {
  name: "header",
};

const PostTemplate = (args: any) => <Post {...args} />;
export const NonEditable = PostTemplate.bind({});
NonEditable.story = {
  name: "non-editable post",
};

NonEditable.args = {
  createdTime: "2019/05/14 at 7:34pm",
  text:
    '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]',
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
UpdatedPost.story = {
  name: "updated post",
};
UpdatedPost.args = {
  ...NonEditable.args,
  totalContributions: 15,
  directContributions: 3,
  totalComments: 5,
  newComments: 3,
  newContributions: 5,
};

export const AnswerablePost = PostTemplate.bind({});
AnswerablePost.story = {
  name: "answerable post",
};
AnswerablePost.args = {
  ...UpdatedPost.args,
  answerable: true,
};

export const TaggedPost = PostTemplate.bind({});
TaggedPost.story = {
  name: "tagged post",
};
TaggedPost.args = {
  ...AnswerablePost.args,
  tags: {
    indexTags: ["indexable"],
    categoryTags: ["category"],
    contentWarnings: ["bad content"],
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
ReactablePost.story = {
  name: "reactable post",
};
ReactablePost.args = {
  ...TaggedPost.args,
  reactable: true,
  reactions: [
    { image: oncieReaction, count: 3 },
    { image: sportacusReaction, count: 6 },
    { image: luigiReaction, count: 11 },
    { image: junkoReaction, count: 20 },
  ],
};

export const ActionPost = PostTemplate.bind({});
ActionPost.story = {
  name: "actionable post",
};
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

HighlightPost.story = {
  name: "highlight post",
};

export const PostQuoteStory = () => {
  return (
    <div style={{ width: "300px" }}>
      <PostQuote
        createdTime="yesterday"
        text={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      />
    </div>
  );
};
PostQuoteStory.story = {
  name: "quote",
};
