import {
  StoryContext,
  StoryFnReactReturnType,
} from "@storybook/react/dist/ts3.9/client/preview/types";

import React from "react";
import reindeerEars from "../images/reindeer-ears.png";
import scarf from "../images/scarf.png";
import snow from "../images/snow.gif";
import wreath from "../images/wreath.png";

export const WRAP_COMPACT_DECORATOR = (Story: () => StoryFnReactReturnType) => {
  return (
    <div className="story">
      {Story()}
      <style jsx>{`
        .story {
          max-width: 250px;
        }
      `}</style>
    </div>
  );
};

export const WITH_ACCESSORIES_DECORATOR = (
  Story: () => StoryFnReactReturnType,
  storyArgs: StoryContext
) => {
  const [currentAccessory, setCurrentAccessory] = React.useState<
    string | undefined
  >(reindeerEars);
  storyArgs.args.secretIdentity = {
    ...storyArgs.args.secretIdentity,
    accessory: currentAccessory,
  };
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
        <button onClick={() => setCurrentAccessory(undefined)}>None</button>
        <button onClick={() => setCurrentAccessory(reindeerEars)}>
          Reindeer
        </button>
        <button onClick={() => setCurrentAccessory(wreath)}>Wreath</button>
        <button onClick={() => setCurrentAccessory(scarf)}>Scarf</button>
        <button onClick={() => setCurrentAccessory(snow)}>Snow</button>
      </div>
    </div>
  );
};
