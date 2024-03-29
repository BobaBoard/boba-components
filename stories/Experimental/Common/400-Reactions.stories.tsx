import React from "react";
import Reaction from "common/Reaction";
import oncieReaction from "stories/images/oncie-reaction.png";

export default {
  title: "Experimental/Reaction",
  component: Reaction,
};

export const ReactionStory = () => {
  const [count, setCount] = React.useState(1);
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "15px" }}>
      <Reaction
        image={oncieReaction}
        count={count}
        onClick={() => setCount(count + 1)}
      />
    </div>
  );
};

ReactionStory.story = {
  name: "reaction",
};
