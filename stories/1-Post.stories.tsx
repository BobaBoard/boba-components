import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Card from "../src/common/Card";
import Header, { HeaderStyle } from "../src/post/Header";
import Footer from "../src/post/Footer";
import EditorFooter from "../src/post/EditorFooter";
import Post from "../src/post/Post";
import PostQuote from "../src/post/PostQuote";
import Editor from "@bobaboard/boba-editor";

import oncelerAvatar from "./images/oncie.jpg";
import greedlerAvatar from "./images/greedler.jpg";
import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";

import oncieReaction from "./images/oncie-reaction.png";
import sportacusReaction from "./images/sportacus-reaction.png";
import luigiReaction from "./images/luigi-reaction.png";
import junkoReaction from "./images/junko-reaction.png";
import Button from "../src/common/Button";

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

export const FooterStory = () => (
  <div>
    <h2>Empty</h2>
    <div style={{ maxWidth: "500px" }}>
      <Footer answerable />
    </div>
    <div style={{ maxWidth: "250px" }}>
      <Footer answerable />
    </div>
    <h2>No Updates</h2>
    <div style={{ maxWidth: "500px" }}>
      <Footer
        answerable
        totalContributions={5}
        directContributions={2}
        totalComments={5}
      />
    </div>
    <div style={{ maxWidth: "250px" }}>
      <Footer
        answerable
        totalContributions={5}
        directContributions={2}
        totalComments={5}
      />
    </div>
    <h2>With Updates</h2>
    <div style={{ maxWidth: "500px" }}>
      <Footer
        answerable
        totalContributions={5}
        directContributions={2}
        newContributions={1}
        newComments={3}
        totalComments={5}
      />
    </div>
    <div style={{ maxWidth: "250px" }}>
      <Footer
        answerable
        totalContributions={5}
        directContributions={2}
        newContributions={1}
        newComments={3}
        totalComments={5}
      />
    </div>
    <h2>With High Counts</h2>
    <div style={{ maxWidth: "500px" }}>
      <Footer
        answerable
        totalContributions={305}
        directContributions={200}
        newContributions={122}
        newComments={300}
        totalComments={690}
      />
    </div>
    <div style={{ maxWidth: "250px" }}>
      <Footer
        answerable
        totalContributions={305}
        directContributions={200}
        newContributions={122}
        newComments={300}
        totalComments={690}
      />
    </div>
    <h2>Non Answerable</h2>
    <div style={{ maxWidth: "500px" }}>
      <Footer
        totalContributions={35}
        directContributions={20}
        newContributions={12}
        newComments={30}
        totalComments={69}
      />
    </div>
    <div style={{ maxWidth: "250px" }}>
      <Footer
        totalContributions={35}
        directContributions={20}
        newContributions={12}
        newComments={30}
        totalComments={69}
      />
    </div>
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

export const HeaderStory = () => (
  <div>
    <Header
      secretIdentity={{
        name: "Good Onceler",
        avatar: `/${oncelerAvatar}`,
      }}
      createdMessage="Posted on: 2019/05/14 at 7:34pm"
      createdMessageHref="#helloImWorking"
      size={HeaderStyle.REGULAR}
    />
    <Header
      secretIdentity={{ name: "Bad Onceler", avatar: `/${greedlerAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      createdMessageHref="#helloImWorking"
      size={HeaderStyle.COMPACT}
    />
    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      createdMessageHref="#helloImWorking"
      size={HeaderStyle.REGULAR}
    />
    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      size={HeaderStyle.REGULAR}
      forceHide
    />
    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      size={HeaderStyle.COMPACT}
    />
    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      size={HeaderStyle.COMPACT}
      forceHide
    />

    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      createdMessageHref="#helloImWorking"
      newPost
    />

    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      newComments
    />

    <Header
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      createdMessage="Posted on: 2019/06/14 at 4:20pm"
      newComments
      newContributions
    />
    <div style={{ width: "200px", backgroundColor: "green" }}>
      <Header
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SuperSexyDaddy69", avatar: `/${mamoruAvatar}` }}
        createdMessage="Posted on: 2019/06/14 at 4:20pm"
        size={HeaderStyle.REGULAR}
      />
    </div>
    <div style={{ width: "200px", backgroundColor: "yellow" }}>
      <Header
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SuperSexyDaddy69", avatar: `/${mamoruAvatar}` }}
        createdMessage="Posted on: 2019/06/14 at 4:20pm"
        size={HeaderStyle.REGULAR}
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
export const NonEditable = () => (
  <Post
    createdTime="2019/05/14 at 7:34pm"
    text={
      '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
    }
    secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
    userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
    onNewContribution={() => console.log("click!")}
    onNewComment={() => console.log("click!")}
    onNotesClick={() => console.log("click")}
    notesUrl={"#"}
  />
);

export const UpdatedPost = () => (
  <>
    <Post
      createdTime="2019/05/14 at 7:34pm"
      text={
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      }
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onNewContribution={() => console.log("click!")}
      onNewComment={() => console.log("click!")}
      onNotesClick={() => console.log("click")}
      notesUrl={"#"}
      totalContributions={15}
      directContributions={3}
      totalComments={5}
      newComments={3}
      newContributions={5}
    />
    <Post
      createdTime="2019/05/14 at 7:34pm"
      text={
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      }
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onNewContribution={() => console.log("click!")}
      onNewComment={() => console.log("click!")}
      onNotesClick={() => console.log("click")}
      notesUrl={"#"}
      totalContributions={0}
      directContributions={0}
      totalComments={0}
      newComments={1}
      newContributions={0}
    />
  </>
);
export const AnswerablePost = () => (
  <>
    <Post
      createdTime="2019/05/14 at 7:34pm"
      text={
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      }
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onNewContribution={() => console.log("click!")}
      onNewComment={() => console.log("click!")}
      onNotesClick={() => console.log("click")}
      notesUrl={"#"}
      totalContributions={15}
      directContributions={3}
      totalComments={5}
      newComments={3}
      newContributions={5}
      answerable={true}
    />
  </>
);

NonEditable.story = {
  name: "non-editable post",
};

UpdatedPost.story = {
  name: "updated post",
};
AnswerablePost.story = {
  name: "answerable",
};

export const TaggedPost = () => (
  <>
    <Post
      createdTime="2019/05/14 at 7:34pm"
      text={
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      }
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onNewContribution={() => console.log("click!")}
      onNewComment={() => console.log("click!")}
      onNotesClick={() => console.log("click")}
      notesUrl={"#"}
      tags={{
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
      }}
      totalContributions={15}
      directContributions={3}
      totalComments={5}
      newComments={3}
      newContributions={5}
      answerable={true}
    />
  </>
);
TaggedPost.story = {
  name: "tagged post",
};

export const ReactionsPost = () => (
  <>
    <Post
      createdTime="2019/05/14 at 7:34pm"
      text={
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      }
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onNewContribution={() => console.log("click!")}
      onNewComment={() => console.log("click!")}
      onNotesClick={() => console.log("click")}
      notesUrl={"#"}
      tags={{
        whisperTags: [
          "tag1",
          "tag2",
          "a long tag",
          "a very very very very very long tag with many words",
          "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
        ],
      }}
      totalContributions={15}
      directContributions={3}
      totalComments={5}
      newComments={3}
      newContributions={5}
      answerable={true}
      reactions={[
        { image: oncieReaction, count: 3 },
        { image: sportacusReaction, count: 6 },
        { image: luigiReaction, count: 11 },
        { image: junkoReaction, count: 20 },
      ]}
      reactable
    />
  </>
);
ReactionsPost.story = {
  name: "post with reactions",
};

export const ActionPost = () => (
  <>
    <Post
      createdTime="2019/05/14 at 7:34pm one fine day with many moons and many suns"
      text={
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      }
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{
        name: "SexyDaddy69SexyDaddy69SexyDaddy69Sexyddz!",
        avatar: `/${mamoruAvatar}`,
      }}
      onNewContribution={() => console.log("click!")}
      onNewComment={() => console.log("click!")}
      onNotesClick={() => console.log("click")}
      notesUrl={"#"}
      tags={{
        whisperTags: [
          "tag1",
          "tag2",
          "a long tag",
          "a very very very very very long tag with many words",
          "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
        ],
      }}
      totalContributions={15}
      directContributions={3}
      totalComments={5}
      newComments={3}
      newContributions={5}
      answerable={true}
      reactions={[
        { image: oncieReaction, count: 3 },
        { image: sportacusReaction, count: 6 },
        { image: luigiReaction, count: 11 },
        { image: junkoReaction, count: 20 },
      ]}
      reactable
      menuOptions={[
        {
          name: "Copy Link",
          onClick: () => {},
        },
      ]}
    />
  </>
);
ActionPost.story = {
  name: "post with actions",
};

export const HighlightPost = () => {
  const postRef = React.createRef<any>();
  return (
    <div>
      <Post
        ref={postRef}
        newPost={true}
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
      />
      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => postRef.current.highlight("red")}>
          Highlight!
        </Button>
      </div>
    </div>
  );
};

HighlightPost.story = {
  name: "highlight post",
};
export const PostReload = () => {
  const [time, setTime] = React.useState(0);
  return (
    <div>
      <Post
        newPost={true}
        createdTime={`2019/05/14 at 7:${time}pm`}
        text={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"youtube-video":"https://www.youtube.com/embed/ROPpn-QcLZM"}},{"insert":"\\n"}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
      />
      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => setTime((time) => time + 1)}>Highlight!</Button>
      </div>
    </div>
  );
};

PostReload.story = {
  name: "increase!",
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
