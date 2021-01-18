import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Comment from "../src/post/Comment";
import CommentEditor from "../src/post/CommentEditor";
import CommentChain from "../src/post/CommentChain";
import CommentChainEditor from "../src/post/CommentChainEditor";
import Button from "../src/common/Button";

import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";
import oncelerAvatar from "./images/oncie.jpg";
import reindeerEars from "./images/reindeer-ears.png";
import wreath from "./images/wreath.png";
import {
  faBellSlash,
  faMapPin,
  faPaintBrush,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { action } from "@storybook/addon-actions";
import { ImageUploaderContext } from "../src/index";

export default {
  title: "Comments",
  component: Comment,
};

export const Editable = () => (
  <ImageUploaderContext.Provider
    value={{
      onImageUploadRequest: async (url) => {
        action("imageUpload")(url);
        return Promise.resolve(`uploaded: ${url}`);
      },
    }}
  >
    <div style={{}}>
      <CommentEditor
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onSubmit={(text) => console.log(text)}
        onCancel={() => console.log("click!")}
        additionalIdentities={[
          { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
          { id: "id2", name: "Mega Mod", avatar: `/${oncelerAvatar}` },
        ]}
      />
    </div>

    <div style={{ width: "250px" }}>
      <CommentEditor
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onSubmit={(text) => console.log(text)}
        onCancel={() => console.log("click!")}
        additionalIdentities={[
          { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
          { id: "id2", name: "Mega Mod", avatar: `/${oncelerAvatar}` },
        ]}
      />
    </div>
  </ImageUploaderContext.Provider>
);

Editable.story = {
  name: "editable",
};

export const NonEditable = () => (
  <>
    <div style={{}}>
      <Comment
        id="comment"
        initialText={
          '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      />
    </div>

    <div style={{ width: "250px" }}>
      <Comment
        id="comment"
        initialText={
          '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      />
    </div>
  </>
);

NonEditable.story = {
  name: "non editable",
};

export const LoadingState = () => {
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      <div style={{}}>
        <CommentEditor
          initialText={'[{ "insert": "Text text text" }]'}
          secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
          userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
          onSubmit={(text) => console.log(text)}
          onCancel={() => console.log("click!")}
          loading={loading}
        />
      </div>

      <div style={{ width: "250px" }}>
        <CommentEditor
          initialText={'[{ "insert": "Text text text" }]'}
          secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
          userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
          onSubmit={(text) => console.log(text)}
          onCancel={() => console.log("click!")}
          loading={loading}
        />
      </div>
      <Button onClick={() => setLoading(!loading)}>Change Load State</Button>
    </>
  );
};

LoadingState.story = {
  name: "loading",
};

export const Highlight = () => {
  const commentRef = React.createRef<any>();
  return (
    <>
      <div style={{}}>
        <Comment
          ref={commentRef}
          id="comment"
          initialText={
            '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]'
          }
          secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
          userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => commentRef.current.highlight("red")}>
          Highlight!
        </Button>
      </div>
    </>
  );
};

Highlight.story = {
  name: "highlight",
};

export const CommentChainEditorStory = () => {
  return (
    <ImageUploaderContext.Provider
      value={{
        onImageUploadRequest: async (url) => {
          action("imageUpload")(url);
          return Promise.resolve(`uploaded: ${url}`);
        },
      }}
    >
      <CommentChainEditor
        onSubmit={(submit) => {
          submit.texts.then(action("submit"));
        }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onCancel={() => {}}
        additionalIdentities={[
          { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
          { id: "id2", name: "Mega Mod", avatar: `/${oncelerAvatar}` },
        ]}
      />
    </ImageUploaderContext.Provider>
  );
};

CommentChainEditorStory.story = {
  name: "chained (editable)",
};

export const CommentChainStory = () => {
  const commentRef = React.createRef<any>();
  return (
    <>
      <CommentChain
        ref={commentRef}
        comments={[
          {
            id: "1",
            text:
              '[{"insert": "I mean, sure, but you know what also is great?"}]',
          },
          {
            id: "1",
            text: '[{"insert": "Deze nuts."}]',
          },
          {
            id: "1",
            text: '[{"insert": "Wait is that how you type it?"}]',
          },
        ]}
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      />
      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => commentRef.current.highlight("red")}>
          Highlight!
        </Button>
      </div>
    </>
  );
};
CommentChainStory.story = {
  name: "chained",
};

export const CommentChainAccessoryStory = () => {
  const [currentAccessory, setCurrentAccessory] = React.useState<
    string | undefined
  >(reindeerEars);
  return (
    <>
      <CommentChain
        comments={[
          {
            id: "1",
            text:
              '[{"insert": "I mean, sure, but you know what also is great?"}]',
          },
          {
            id: "1",
            text: '[{"insert": "Deze nuts."}]',
          },
          {
            id: "1",
            text: '[{"insert": "Wait is that how you type it?"}]',
          },
        ]}
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        accessory={currentAccessory}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setCurrentAccessory(undefined)}>None</button>
        <button onClick={() => setCurrentAccessory(reindeerEars)}>
          Reindeer
        </button>
        <button onClick={() => setCurrentAccessory(wreath)}>Wreath</button>
      </div>
    </>
  );
};
CommentChainAccessoryStory.story = {
  name: "accessory",
};

export const ExtraActionStory = () => {
  return (
    <>
      <CommentChain
        comments={[
          {
            id: "1",
            text:
              '[{"insert": "I mean, sure, but you know what also is great?"}]',
          },
          {
            id: "1",
            text: '[{"insert": "Deze nuts."}]',
          },
          {
            id: "1",
            text: '[{"insert": "Wait is that how you type it?"}]',
          },
        ]}
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onExtraAction={() => {}}
      />
      <Comment
        id="comment"
        initialText={
          '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onExtraAction={() => {}}
      />
    </>
  );
};
ExtraActionStory.story = {
  name: "extra action",
};

export const WithOptionsStory = () => {
  return (
    <>
      <CommentChain
        comments={[
          {
            id: "1",
            text:
              '[{"insert": "I mean, sure, but you know what also is great?"}]',
          },
          {
            id: "1",
            text: '[{"insert": "Deze nuts."}]',
          },
          {
            id: "1",
            text: '[{"insert": "Wait is that how you type it?"}]',
          },
        ]}
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        createdTime="69 days ago."
        onExtraAction={() => {}}
        options={[
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
        ]}
      />
    </>
  );
};
WithOptionsStory.story = {
  name: "with options",
};

export const CommentImageStory = () => {
  const commentRef = React.createRef<any>();
  return (
    <>
      <CommentChain
        ref={commentRef}
        comments={[
          {
            id: "1",
            text:
              '[{"insert": "I mean, sure, but you know what also is great?"}]',
          },
          {
            id: "1",
            text:
              '[{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}]',
          },
          {
            id: "1",
            text:
              '[{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"insert": "Wait is that how you type it?"}]',
          },
        ]}
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      />
      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => commentRef.current.highlight("red")}>
          Highlight!
        </Button>
      </div>
    </>
  );
};
CommentImageStory.story = {
  name: "image",
};
