import React from "react";
import Tags from "../src/post/Tags";

export default {
  title: "Tags Preview",
  component: Tags,
};

export const EditableTags = () => {
  const [tags, setTags] = React.useState([
    "tag1",
    "tag2",
    "tag1234561789",
    "tag1234561789x2",
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <Tags
        tags={tags}
        onTagsChange={(tags) => setTags(tags)}
        editable
        onSubmit={() => console.log("submit!!")}
      />
    </div>
  );
};

EditableTags.story = {
  name: "editable",
};

export const DisplayTags = () => {
  const [tags, setTags] = React.useState([
    "tag1",
    "tag2",
    "a long tag",
    "a very very very very very long tag with many words",
    "a tag with many words that is actually more than one single line long used to check words splitting",
    "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <Tags tags={tags} onTagsChange={(tags) => setTags(tags)} />
    </div>
  );
};

DisplayTags.story = {
  name: "non editable",
};
