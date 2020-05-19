import React from "react";
//import { linkTo } from "@storybook/addon-links";
import BoardPreview, { DisplayStyle } from "../src/board/BoardPreview";
import Tag from "../src/common/Tag";

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
    displayStyle={DisplayStyle.COMPACT}
  ></BoardPreview>
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
  <div style={{ display: "flex", justifyContent: "space-evenly" }}>
    <BoardPreview
      slug="gore"
      avatar={`/${goreBackground}`}
      description="Love me some bruised bois (and more)."
      onClick={() => console.log("go!")}
      updates={5}
      backgroundColor="#333"
    />
    <BoardPreview
      slug="gore"
      avatar={`/${goreBackground}`}
      description="Love me some bruised bois (and more)."
      onClick={() => console.log("go!")}
      displayStyle={DisplayStyle.COMPACT}
      updates={5}
      backgroundColor="#333"
    />
    <BoardPreview
      slug="gore"
      avatar={`/${goreBackground}`}
      description="Love me some bruised bois (and more)."
      onClick={() => console.log("go!")}
      displayStyle={DisplayStyle.MINI}
      updates={5}
      backgroundColor="#333"
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
