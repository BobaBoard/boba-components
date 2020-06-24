import React from "react";
import TagsInput from "../src/post/TagsInput";

export default {
  title: "Tags Preview",
  component: TagsInput,
};

export const SimpleButton = () => {
  const [tags, setTags] = React.useState(["tag1", "tag2"]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <TagsInput tags={tags} onTagsChange={(tags) => setTags(tags)} />
    </div>
  );
};

SimpleButton.story = {
  name: "simple",
};
