import React from "react";
import Tags from "../src/post/Tags";
import CategoryFilter from "../src/common/CategoryFilter";

export default {
  title: "Tags Preview",
  component: Tags,
};

export const EditableTags = () => {
  const [tags, setTags] = React.useState([
    { name: "this is an indexable tag", color: "#19a4e6", indexable: true },
    { name: "another one", color: "#ce769c", indexable: true },
    { name: "tag1" },
    { name: "tag2" },
    { name: "tag1234561789" },
    { name: "tag1234561789x2" },
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <Tags
        tags={tags}
        onTagsAdd={(tag) => setTags([...tags, tag])}
        onTagsDelete={(tag) => {
          setTags(tags.filter((currentTag) => currentTag != tag));
        }}
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
    { name: "this is an indexable tag", color: "#19a4e6", indexable: true },
    { name: "another one", color: "#ce769c", indexable: true },
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
      <Tags tags={tags} />
    </div>
  );
};

DisplayTags.story = {
  name: "non editable",
};

export const FilterTags = () => {
  const [tags, setTags] = React.useState([
    { name: "tag1", active: true },
    { name: "tag2", active: false },
    { name: "a long tag", active: false },
    {
      name: "a very very very very very long tag with many words",
      active: false,
    },
    {
      name:
        "a tag with many words that is actually more than one single line long used to check words splitting",
      active: true,
    },
    {
      name:
        "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
      active: false,
    },
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <CategoryFilter
        categories={tags}
        onCategoryStateChange={(name, active) => {
          setTags(
            tags.map((tag) => (tag.name == name ? { name, active } : tag))
          );
        }}
      />
    </div>
  );
};

FilterTags.story = {
  name: "category filter",
};
