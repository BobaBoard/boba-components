import {
  EDITOR_TEXT_VALUES,
  getInitialTextString,
} from "../utils/editor-controls";
import { EditorContext, ImageUploaderContext } from "src/index";
import { Meta, Story } from "@storybook/react";
import PostEditor, {
  PostEditorHandler,
  PostEditorProps,
} from "post/PostEditor";
import {
  faCodeBranch,
  faFilm,
  faPortrait,
} from "@fortawesome/free-solid-svg-icons";

import { BoardDataType } from "types";
import Button from "buttons/Button";
import Modal from "common/Modal";
import React from "react";
import { action } from "@storybook/addon-actions";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import crown from "stories/images/crown.png";
import goreBackground from "stories/images/gore.png";
import kinkmeme from "stories/images/kink-meme.png";
import mamoruAvatar from "stories/images/mamoru.png";
import oncelerAvatar from "stories/images/oncie.jpg";
import oncelerBoard from "stories/images/onceler-board.png";
import reindeerEars from "stories/images/reindeer-ears.png";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";

export default {
  title: "Editors / Post Editor",
  component: PostEditor,
  decorators: [
    (Story, ctx) => {
      const args = ctx.args as PostEditorProps;
      const [selectedBoard, setSelectedBoard] = React.useState(
        args.selectedBoard
      );
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
            {Story({
              args: {
                ...args,
                onSelectBoard: args.onSelectBoard
                  ? (boardSlug: BoardDataType) => {
                      ctx.initialArgs.onSelectBoard?.(boardSlug);
                      setSelectedBoard(boardSlug);
                    }
                  : undefined,
                selectedBoard,
              },
            })}
          </ImageUploaderContext.Provider>
        </EditorContext.Provider>
      );
    },
  ],
} as Meta<PostEditorProps>;

const embedFetchers = {
  getOEmbedFromUrl: (url: string) => {
    const LOAD_DELAY = 1000;
    const promise = new Promise((resolve, reject) => {
      fetch(`https://embeds.bobaboard.com/iframely?uri=${url}`)
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

const RECENT_BOARDS = [
  {
    slug: "gore",
    avatar: `/${goreBackground}`,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "oncie-den",
    avatar: `/${oncelerBoard}`,
    description: "Party like it's 2012",
    color: "#27caba",
    updates: 10,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "fic-club",
    avatar: `/${book}`,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "kink-memes",
    avatar: `/${kinkmeme}`,
    description: "No limits. No shame.",
    color: "#000000",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "areallylongcrackyslug",
    avatar: `/${crack}`,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
];

const PostEditorTemplate: Story<PostEditorProps> = (args) => (
  <PostEditor {...args} />
);
export const Base = PostEditorTemplate.bind({});
Base.args = {
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
  onCancel: action("cancel"),
  onSubmit: (promise) => {
    promise.then(action("submit"));
  },
  suggestedCategories: [
    "dank memes",
    "hot yaois",
    "pls.... help....",
    "off topic",
  ],
  availableBoards: RECENT_BOARDS,
  selectedBoard: RECENT_BOARDS[0],
  onSelectBoard: action("select-board"),
};

export const WithAdditionalIdentities = PostEditorTemplate.bind({});
WithAdditionalIdentities.args = {
  ...Base.args,
  additionalIdentities: [
    { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
    {
      id: "id2",
      name: "Mega Mod",
      avatar: `/${oncelerAvatar}`,
      color: "red",
      accessory: crown,
    },
  ],
};

export const WithSelectView = PostEditorTemplate.bind({});
WithSelectView.args = {
  ...WithAdditionalIdentities.args,
  viewOptions: [
    {
      icon: faCodeBranch,
      name: "Thread",
    },
    {
      icon: faPortrait,
      name: "Gallery",
    },
    {
      icon: faFilm,
      name: "Timeline",
    },
  ],
};

export const WithAccessories = PostEditorTemplate.bind({});
WithAccessories.args = {
  ...WithSelectView.args,
  accessories: [
    {
      id: "ac1",
      name: "Reindeer",
      accessory: reindeerEars,
    },
    {
      id: "ac2",
      name: "Crown",
      accessory: crown,
    },
  ],
};

export const SmallestSupportedViewport = PostEditorTemplate.bind({});
SmallestSupportedViewport.args = {
  ...WithAccessories.args,
};
SmallestSupportedViewport.decorators = [
  (Story) => (
    <div style={{ maxWidth: "345px" }}>
      <Story />
    </div>
  ),
];

export const WithinModal = PostEditorTemplate.bind({});
WithinModal.args = {
  ...WithAccessories.args,
};
WithinModal.decorators = [
  (Story) => {
    const [isMinimized, setMinimize] = React.useState(false);
    return (
      <Modal
        isOpen={true}
        minimizable
        isMinimized={isMinimized}
        onMinimize={() => setMinimize((minimize) => !minimize)}
        onRequestClose={action("closemodal")}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "15px",
          }}
        >
          <Story />
        </div>
      </Modal>
    );
  },
];

export const LongWithinModal = PostEditorTemplate.bind({});
LongWithinModal.args = {
  ...WithAccessories.args,
  initialText:
    '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]',
};
LongWithinModal.decorators = WithinModal.decorators;

export const Loading = PostEditorTemplate.bind({});
Loading.args = {
  ...WithAccessories.args,
  initialText: getInitialTextString(EDITOR_TEXT_VALUES.LONG_WORD),
  loading: true,
};
Loading.decorators = [
  (Story, storyArgs) => {
    const [loading, setLoading] = React.useState(true);
    storyArgs.args.loading = loading;
    return (
      <div style={{ marginLeft: "20px" }}>
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
          <Button onClick={() => setLoading(!loading)}>
            Change Load State
          </Button>
        </div>
      </div>
    );
  },
];

export const TestFocus = PostEditorTemplate.bind({});
TestFocus.args = WithAccessories.args;
TestFocus.decorators = [
  (Story) => {
    const postRef = React.createRef<PostEditorHandler>();
    return (
      <div style={{ marginLeft: "20px" }}>
        <Story postRef={postRef} />
        <div style={{ marginTop: "20px" }}>
          <Button
            onClick={() => {
              action("focus")(postRef.current);
              postRef.current?.focus();
            }}
          >
            Focus! (TODO: bugged)
          </Button>
        </div>
      </div>
    );
  },
];

export const EditTagsOnly = PostEditorTemplate.bind({});
EditTagsOnly.args = {
  ...WithAccessories.args,
  initialText: getInitialTextString(EDITOR_TEXT_VALUES.LONG_WORD),
  editableSections: {
    tags: true,
  },
};

export const WithCategoriesSuggestions = PostEditorTemplate.bind({});
EditTagsOnly.args = {
  ...WithAccessories.args,
  initialText: getInitialTextString(EDITOR_TEXT_VALUES.LONG_WORD),
  suggestedCategories: ["category 1", "category 2", "category 3"],
};
