import BoardPreview, { DisplayStyle } from "board/BoardPreview";

import BoardsDisplay from "board/BoardsDisplay";
import React from "react";
import Tag from "tags/Tag";
import { action } from "@storybook/addon-actions";
import anime from "stories/images/anime.png";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import goreBackground from "stories/images/gore.png";
import meta from "stories/images/meta.png";
import villains from "stories/images/villains.png";

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
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
        },
        {
          slug: "anime",
          avatar: "/" + anime,
          description: "We put the weeb in dweeb.",
          color: "#24d282",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
          updates: 2,
        },
        {
          slug: "crack",
          avatar: "/" + crack,
          description: "What's crackalackin",
          color: "#f9e066",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
          updates: 3,
        },
        {
          slug: "fic-club",
          avatar: "/" + book,
          description: "Come enjoy all the fics!",
          color: "#7724d2",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
          updates: 5,
          outdated: true,
        },
        {
          slug: "meta",
          avatar: "/" + meta,
          description: "In My TiMeS wE CaLlEd It WaNk",
          color: "#f9e066",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
        },
        {
          slug: "villain-thirst",
          avatar: "/" + villains,
          description: "Love to love 'em.",
          color: "#e22b4b",
          link: {
            href: "#href",
            onClick: action("hrefClick"),
          },
        },
      ]}
      boardsDisplayStyle={DisplayStyle.MINI}
    />
  </div>
);
BoardsDisplayStory.story = {
  name: "boards display",
};
