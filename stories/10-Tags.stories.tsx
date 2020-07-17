import React from "react";
import Tags from "../src/post/Tags";

export default {
  title: "Tags Preview",
  component: Tags,
};

export const EditableTags = () => {
  const [tags, setTags] = React.useState([
    { name: "this is an indexable tag", color: "#19a4e6" },
    { name: "another one", color: "#ce769c" },
    { name: "tag1" },
    { name: "tag2" },
    { name: "tag1234561789" },
    { name: "tag1234561789x2" },
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
    { name: "this is an indexable tag", color: "#19a4e6" },
    { name: "another one", color: "#ce769c" },
    { name: "tag1" },
    { name: "tag2" },
    { name: "a long tag" },
    { name: "a very very very very very long tag with many words" },
    {
      name:
        "a tag with many words that is actually more than one single line long used to check words splitting",
    },
    {
      name:
        "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
    },
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
