import { StoryContext, StoryFn } from "@storybook/react";

import React from "react";
import reindeerEars from "stories/images/reindeer-ears.png";
import scarf from "stories/images/scarf.png";
import snow from "stories/images/snow.gif";
import wreath from "stories/images/wreath.png";

export const WRAP_COMPACT_DECORATOR = (
  Story: StoryFn,
  storyArgs: StoryContext
) => (
  <div className="story">
    <Story args={storyArgs} />
    <style jsx>{`
      .story {
        max-width: 250px;
      }
    `}</style>
  </div>
);

export const WITH_ACCESSORIES_DECORATOR = (
  Story: StoryFn,
  storyArgs: StoryContext
) => {
  const [currentAccessory, setCurrentAccessory] = React.useState<
    string | undefined
  >(reindeerEars);
  storyArgs.args.secretIdentity = {
    ...(storyArgs.args.secretIdentity ?? {}),
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
