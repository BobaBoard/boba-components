import React from "react";
import Reaction from "../src/common/Reaction";

import oncieReaction from "./images/oncie-reaction.png";

export default {
  title: "Reactions Preview",
  component: Reaction,
};

export const ReactionStory = () => {
  const [tags, setTags] = React.useState(["tag1", "tag2"]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <Reaction image={oncieReaction} count={1} />
    </div>
  );
};

ReactionStory.story = {
  name: "reaction",
};
