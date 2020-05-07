import React from "react";
//import { linkTo } from "@storybook/addon-links";
import BoardPreview from "../src/BoardPreview";
import Tag from "../src/Tag";

import goreBackground from "./images/gore.png";

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
  <BoardPreview
    slug="gore"
    avatar={`/${goreBackground}`}
    description="Love me some bruised bois (and more)."
    onClick={() => console.log("go!")}
    compact
  ></BoardPreview>
);

BoardPreviewCompact.story = {
  name: "compact",
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
      compact
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
        compact
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
        compact
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
        compact
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
