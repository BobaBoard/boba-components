import React from "react";
//import { linkTo } from "@storybook/addon-links";
import BoardPreview, { DisplayStyle } from "../src/board/BoardPreview";
import BoardsDisplay from "../src/board/BoardsDisplay";
import Tag from "../src/common/Tag";

import goreBackground from "./images/gore.png";
import anime from "./images/anime.png";
import crack from "./images/crack.png";
import meta from "./images/meta.png";
import book from "./images/book.png";
import villains from "./images/villains.png";
export default {
  title: "Board Preview",
  component: BoardPreview,
};

export const BoardPreviewSimple = () => (
  <BoardPreview
    slug="gore"
    avatar={`/${goreBackground}`}
    description="Love me some bruised bois (and more)."
    onClick={() => console.log("go!")}
  ></BoardPreview>
);

BoardPreviewSimple.story = {
  name: "simple",
};

export const BoardPreviewCompact = () => (
  <div style={{ width: "500px" }}>
    <div>
      <BoardPreview
        slug="gore"
        avatar={`/${goreBackground}`}
        description="Love me some bruised bois (and more)."
        onClick={() => console.log("go!")}
        displayStyle={DisplayStyle.COMPACT}
      ></BoardPreview>
    </div>
    <div>
      <BoardPreview
        slug="thisisalongslug"
        avatar={`/${goreBackground}`}
        description="haveyoueverseen a description this long? oh shit boy here we come. Hey whaddup!"
        onClick={() => console.log("go!")}
        displayStyle={DisplayStyle.COMPACT}
      ></BoardPreview>
    </div>
  </div>
);

BoardPreviewCompact.story = {
  name: "compact",
};

export const BoardPreviewMini = () => (
  <BoardPreview
    slug="gore"
    avatar={`/${goreBackground}`}
    description="Love me some bruised bois (and more)."
    onClick={() => console.log("go!")}
    displayStyle={DisplayStyle.MINI}
  ></BoardPreview>
);

BoardPreviewMini.story = {
  name: "mini",
};

export const BoardPreviewWithUpdates = () => (
  <div style={{ width: "500px" }}>
    <BoardPreview
      slug="gore"
      avatar={`/${goreBackground}`}
      description="Love me some bruised bois (and more)."
      onClick={() => console.log("go!")}
      updates={5}
      backgroundColor="#333"
      color="#ff0f4b"
      href="#thisIsATest"
    />
    <BoardPreview
      slug="gore"
      avatar={`/${goreBackground}`}
      description="Love me some bruised bois (and more)."
      onClick={() => console.log("go!")}
      displayStyle={DisplayStyle.COMPACT}
      updates={5}
      color="#ff0f4b"
      href="#thisIsATest"
    />
    <BoardPreview
      slug="gore"
      avatar={`/${goreBackground}`}
      description="Love me some bruised bois (and more)."
      onClick={() => console.log("go!")}
      displayStyle={DisplayStyle.MINI}
      updates={5}
      color="#ff0f4b"
      href="#thisIsATest"
    />
  </div>
);

BoardPreviewWithUpdates.story = {
  name: "with updates",
};

export const BoardPreviewWithTags = () => (
  <div
    style={{
      display: "flex",
      alignItems: "end",
      justifyContent: "space-evenly",
    }}
  >
    <BoardPreview
      slug="gore"
      avatar={`/${goreBackground}`}
      description="Love me some bruised bois (and more)."
      onClick={() => console.log("go!")}
    >
      <Tag name="blood" color="#f96680" />
      <Tag name="knifeplay" color="#93b3b0" />
      <Tag name="aesthetic" color="#24d282" />
    </BoardPreview>

    <BoardPreview
      slug="gore"
      avatar={`/${goreBackground}`}
      description="Love me some bruised bois (and more)."
      onClick={() => console.log("go!")}
      displayStyle={DisplayStyle.COMPACT}
    >
      <Tag name="blood" color="#f96680" />
      <Tag name="knifeplay" color="#93b3b0" />
      <Tag name="aesthetic" color="#24d282" />
    </BoardPreview>
  </div>
);

BoardPreviewWithTags.story = {
  name: "with tags",
};

export const BoardPreviewWithColors = () => (
  <div>
    <div>
      <BoardPreview
        slug="gore"
        avatar={`/${goreBackground}`}
        description="Love me some bruised bois (and more)."
        onClick={() => console.log("go!")}
      >
        <Tag name="blood" color="#f96680" />
        <Tag name="knifeplay" color="#93b3b0" />
        <Tag name="aesthetic" color="#24d282" />
      </BoardPreview>

      <BoardPreview
        slug="gore"
        avatar={`/${goreBackground}`}
        description="Love me some bruised bois (and more)."
        onClick={() => console.log("go!")}
        displayStyle={DisplayStyle.COMPACT}
      >
        <Tag name="blood" color="#f96680" />
        <Tag name="knifeplay" color="#93b3b0" />
        <Tag name="aesthetic" color="#24d282" />
      </BoardPreview>
    </div>
    <div>
      <BoardPreview
        slug="gore"
        avatar={`/${goreBackground}`}
        description="Love me some bruised bois (and more)."
        onClick={() => console.log("go!")}
        color="#f96680"
      >
        <Tag name="blood" color="#f96680" />
        <Tag name="knifeplay" color="#93b3b0" />
        <Tag name="aesthetic" color="#24d282" />
      </BoardPreview>

      <BoardPreview
        slug="gore"
        avatar={`/${goreBackground}`}
        description="Love me some bruised bois (and more)."
        onClick={() => console.log("go!")}
        displayStyle={DisplayStyle.COMPACT}
        color="#f96680"
      >
        <Tag name="blood" color="#f96680" />
        <Tag name="knifeplay" color="#93b3b0" />
        <Tag name="aesthetic" color="#24d282" />
      </BoardPreview>
    </div>
    <div>
      <BoardPreview
        slug="gore"
        avatar={`/${goreBackground}`}
        description="Love me some bruised bois (and more)."
        onClick={() => console.log("go!")}
        color="#24d282"
      >
        <Tag name="blood" color="#f96680" />
        <Tag name="knifeplay" color="#93b3b0" />
        <Tag name="aesthetic" color="#24d282" />
      </BoardPreview>

      <BoardPreview
        slug="gore"
        avatar={`/${goreBackground}`}
        description="Love me some bruised bois (and more)."
        onClick={() => console.log("go!")}
        displayStyle={DisplayStyle.COMPACT}
        color="#24d282"
      >
        <Tag name="blood" color="#f96680" />
        <Tag name="knifeplay" color="#93b3b0" />
        <Tag name="aesthetic" color="#24d282" />
      </BoardPreview>
    </div>
    <style jsx>{`
      div > div {
        display: flex;
        align-items: end;
        justify-content: space-evenly;
        margin: 50px 0;
      }
    `}</style>
  </div>
);

BoardPreviewWithColors.story = {
  name: "with colors",
};

export const BoardsDisplayStory = () => (
  <div style={{ width: "500px" }}>
    <BoardsDisplay
      title="Boards"
      boards={[
        {
          slug: "gore",
          avatar: "/" + goreBackground,
          description: "Love me some bruised bois (and more).",
          color: "#f96680",
        },
        {
          slug: "anime",
          avatar: "/" + anime,
          description: "We put the weeb in dweeb.",
          color: "#24d282",
          updates: 2,
        },
        {
          slug: "crack",
          avatar: "/" + crack,
          description: "What's crackalackin",
          color: "#f9e066",
          updates: 3,
        },
        {
          slug: "fic-club",
          avatar: "/" + book,
          description: "Come enjoy all the fics!",
          color: "#7724d2",
          updates: 5,
        },
        {
          slug: "meta",
          avatar: "/" + meta,
          description: "In My TiMeS wE CaLlEd It WaNk",
          color: "#f9e066",
        },
        {
          slug: "villain-thirst",
          avatar: "/" + villains,
          description: "Love to love 'em.",
          color: "#e22b4b",
        },
      ]}
      boardsDisplayStyle={DisplayStyle.MINI}
      onBoardClick={(slug) => console.log(slug)}
      getBoardHref={(slug) => `#${slug}`}
    />
  </div>
);
BoardsDisplayStory.story = {
  name: "boards display",
};
