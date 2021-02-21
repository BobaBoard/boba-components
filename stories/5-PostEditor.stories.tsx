import React from "react";
//import { linkTo } from "@storybook/addon-links";
import PostEditor from "../src/post/PostEditor";
import { ImageUploaderContext, EditorContext } from "../src/index";
import Modal from "../src/common/Modal";
import Button from "../src/common/Button";

import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";
import oncelerAvatar from "./images/oncie.jpg";
import { action } from "@storybook/addon-actions";

import goreBackground from "./images/gore.png";
import crack from "./images/crack.png";
import oncelerBoard from "./images/onceler-board.png";
import book from "./images/book.png";
import kinkmeme from "./images/kink-meme.png";

export default {
  title: "Post Editor",
  component: PostEditor,
};

const embedFetchers = {
  getTumblrEmbedFromUrl: (url: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url:
            "https://turquoisemagpie.tumblr.com/post/618042321716510720/eternity-stuck-in-white-noise-can-drive-you-a",
          href:
            "https://embed.tumblr.com/embed/post/2_D8XbYRWYBtQD0A9Pfw-w/618042321716510720",
          did: "22a0a2f8b7a33dc50bbf5f49fb53f92b181a88aa",
        });
      }, 2000);
    });
  },
  getOEmbedFromUrl: (url: string) => {
    const LOAD_DELAY = 1000;
    const promise = new Promise((resolve, reject) => {
      fetch(`http://localhost:8061/iframely?uri=${url}`)
        .then((response) => {
          setTimeout(() => {
            resolve(response.json());
          }, LOAD_DELAY);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
};

const withContextProviders = (component: React.ReactNode): React.ReactNode => {
  return (
    <EditorContext.Provider value={{ fetchers: embedFetchers }}>
      <ImageUploaderContext.Provider
        value={{
          onImageUploadRequest: async (url) => {
            action("imageUpload")(url);
            return Promise.resolve(`uploaded: ${url}`);
          },
        }}
      >
        {component}
      </ImageUploaderContext.Provider>
    </EditorContext.Provider>
  );
};

const RECENT_BOARDS = [
  {
    slug: "gore",
    avatar: "/" + goreBackground,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "oncie-den",
    avatar: "/" + oncelerBoard,
    description: "Party like it's 2012",
    color: "#27caba",
    updates: 10,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "fic-club",
    avatar: "/" + book,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "kink-memes",
    avatar: "/" + kinkmeme,
    description: "No limits. No shame.",
    color: "#000000",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "areallylongcrackyslug",
    avatar: "/" + crack,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
];

export const EditableWithFooter = () =>
  withContextProviders(
    <PostEditor
      secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      onCancel={action("cancel")}
      onSubmit={(promise) => {
        promise.then(action("submit"));
      }}
      centered
      minimizable
      suggestedCategories={[
        "dank memes",
        "hot yaois",
        "pls.... help....",
        "off topic",
      ]}
      availableBoards={RECENT_BOARDS}
      initialBoard="gore"
    />
  );

EditableWithFooter.story = {
  name: "editable",
};

export const EditableWithMultipleIdentities = () =>
  withContextProviders(
    <PostEditor
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      additionalIdentities={[
        { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
        { id: "id2", name: "Mega Mod", avatar: `/${tuxedoAvatar}` },
      ]}
      onCancel={action("cancel")}
      onSubmit={(promise) => {
        promise.then(action("submit"));
      }}
      centered
      availableBoards={RECENT_BOARDS}
      initialBoard="gore"
    />
  );

EditableWithMultipleIdentities.story = {
  name: "multiple identities",
};

export const EditableWithViewSelect = () =>
  withContextProviders(
    <PostEditor
      userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      additionalIdentities={[
        { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
        { id: "id2", name: "Mega Mod", avatar: `/${tuxedoAvatar}` },
      ]}
      onCancel={action("cancel")}
      onSubmit={(promise) => {
        promise.then(action("submit"));
      }}
      viewOptions={[
        { name: "Thread" },
        { name: "Gallery" },
        { name: "Timeline" },
      ]}
      centered
      availableBoards={RECENT_BOARDS}
      initialBoard="gore"
    />
  );

EditableWithViewSelect.story = {
  name: "view select",
};

export const SmallestViewport = () =>
  withContextProviders(
    <div style={{ maxWidth: "345px" }}>
      <PostEditor
        secretIdentity={{
          name: "Tuxedo Mask, the one, the only, the legend.",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        additionalIdentities={[
          { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
          { id: "id2", name: "Mega Mod", avatar: `/${oncelerAvatar}` },
        ]}
        onCancel={action("cancel")}
        onSubmit={(promise) => {
          promise.then(action("submit"));
        }}
        viewOptions={[
          { name: "Thread" },
          { name: "Gallery" },
          { name: "Timeline" },
        ]}
        centered
        availableBoards={RECENT_BOARDS}
        initialBoard="gore"
      />
    </div>
  );

SmallestViewport.story = {
  name: "small viewport",
};

export const EditableInModal = () =>
  withContextProviders(
    <Modal isOpen={true}>
      <PostEditor
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        additionalIdentities={[
          { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
          { id: "id2", name: "Mega Mod", avatar: `/${oncelerAvatar}` },
        ]}
        onCancel={action("cancel")}
        onSubmit={(promise) => {
          promise.then(action("submit"));
        }}
        centered
        availableBoards={RECENT_BOARDS}
        initialBoard="gore"
      />
    </Modal>
  );

EditableInModal.story = {
  name: "editable with modal",
};

export const LongEditableInModal = () =>
  withContextProviders(
    <Modal isOpen={true}>
      <PostEditor
        initialText={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onCancel={action("cancel")}
        onSubmit={(promise) => {
          promise.then(action("submit"));
        }}
        centered
        availableBoards={RECENT_BOARDS}
        initialBoard="gore"
      />
    </Modal>
  );

LongEditableInModal.story = {
  name: "long editable with modal",
};

export const Loading = () => {
  const [loading, setLoading] = React.useState(true);
  return withContextProviders(
    <div>
      <PostEditor
        initialText={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onCancel={action("cancel")}
        onSubmit={(promise) => {
          promise.then(action("submit"));
        }}
        loading={loading}
        centered
        availableBoards={RECENT_BOARDS}
        initialBoard="gore"
      />
      <Button onClick={() => setLoading(!loading)}>Change Load State</Button>
    </div>
  );
};

Loading.story = {
  name: "loading state",
};

export const Focus = () => {
  const postRef = React.createRef<any>();
  return withContextProviders(
    <div>
      <PostEditor
        initialText={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onCancel={action("cancel")}
        onSubmit={(promise) => {
          promise.then(action("submit"));
        }}
        ref={postRef}
        centered
        availableBoards={RECENT_BOARDS}
        initialBoard="gore"
      />
      <Button onClick={() => postRef.current.focus()}>Focus!</Button>
    </div>
  );
};

Focus.story = {
  name: "focus state",
};

export const TagsEditOnly = () => {
  return withContextProviders(
    <div>
      <PostEditor
        initialText={
          '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onCancel={action("cancel")}
        onSubmit={(promise) => {
          promise.then(action("submit"));
        }}
        centered
        editableSections={{
          tags: true,
        }}
        initialTags={{
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
        }}
        availableBoards={RECENT_BOARDS}
        initialBoard="gore"
      />
    </div>
  );
};

TagsEditOnly.story = {
  name: "tags edit only",
};
