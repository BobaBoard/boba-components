import React from "react";
import Tags from "../src/post/Tags";
import CategoryFilter from "../src/common/CategoryFilter";
import { TagsType, TagType } from "../src/types";
import { action } from "@storybook/addon-actions";

export default {
  title: "Tags Preview",
  component: Tags,
};

export const EditableTags = () => {
  const [tags, setTags] = React.useState<TagsType[]>([
    {
      name: "this is an indexable tag",
      color: "#19a4e6",
      indexable: true,
      type: TagType.INDEXABLE,
    },
    {
      name: "another one",
      color: "#ce769c",
      indexable: true,
      type: TagType.INDEXABLE,
    },
    { name: "tag1", type: TagType.WHISPER },
    { name: "tag2", type: TagType.WHISPER },
    { name: "tag1234561789", type: TagType.WHISPER },
    { name: "tag1234561789x2", type: TagType.WHISPER },
  ]);
  return (
    <div
      style={{ width: "500px", backgroundColor: "white", marginTop: "300px" }}
    >
      <Tags
        tags={tags}
        onTagsAdd={(tag) => setTags([...tags, tag])}
        onTagsDelete={(tag) => {
          setTags(tags.filter((currentTag) => currentTag != tag));
        }}
        suggestedCategories={[
          "sexy trains",
          "dank memes",
          "hot yaoiz",
          "off topic",
          "best fanfictions",
        ]}
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
  const [tags, setTags] = React.useState<TagsType[]>([
    {
      name: "this is an indexable tag",
      color: "#19a4e6",
      indexable: true,
      type: TagType.INDEXABLE,
    },
    {
      name: "another one",
      color: "#ce769c",
      indexable: true,
      type: TagType.INDEXABLE,
    },
    { name: "tag1", type: TagType.WHISPER },
    { name: "tag2", type: TagType.WHISPER },
    { name: "a long tag", type: TagType.WHISPER },
    {
      name: "a very very very very very long tag with many words",
      type: TagType.WHISPER,
    },
    { name: "short again!", type: TagType.WHISPER },
    {
      name:
        "a tag with many words that is actually more than one single line long used to check words splitting",
      type: TagType.WHISPER,
    },
    { name: "short again x 2!", type: TagType.WHISPER },
    {
      name:
        "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
      type: TagType.WHISPER,
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

export const TagsWithOptions = () => {
  const [tags, setTags] = React.useState<TagsType[]>([
    {
      name: "this is an indexable tag",
      color: "#19a4e6",
      indexable: true,
      type: TagType.INDEXABLE,
    },
    {
      name: "another one",
      color: "#ce769c",
      indexable: true,
      type: TagType.INDEXABLE,
    },
    { name: "tag1", category: true, type: TagType.CATEGORY },
    { name: "tag2", category: true, type: TagType.CATEGORY },
    { name: "a long tag", contentWarning: true, type: TagType.CONTENT_WARNING },
    {
      name: "a very very very very very long tag with many words",
      contentWarning: true,
      type: TagType.CONTENT_WARNING,
    },
    { name: "short again!", type: TagType.WHISPER },
    {
      name:
        "a tag with many words that is actually more than one single line long used to check words splitting",
      type: TagType.WHISPER,
    },
    { name: "short again x 2!", type: TagType.WHISPER },
    {
      name:
        "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
      type: TagType.WHISPER,
    },
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <Tags
        tags={tags}
        getOptionsForTag={(tag: TagsType) => {
          let options = [
            { name: "Option 1", link: { onClick: action("option!") } },
          ];
          switch (tag.type) {
            case TagType.CATEGORY:
              return [
                ...options,
                {
                  name: "Category Option",
                  link: { onClick: action("category!") },
                },
              ];
            case TagType.INDEXABLE:
              return [
                ...options,
                {
                  name: "Indexable Option",
                  link: { onClick: action("indexable!") },
                },
              ];
            case TagType.CONTENT_WARNING:
              return [
                ...options,
                {
                  name: "warning Option",
                  link: { onClick: action("warning!") },
                },
              ];
            default:
              return options;
          }
        }}
      />
    </div>
  );
};

TagsWithOptions.story = {
  name: "options",
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
