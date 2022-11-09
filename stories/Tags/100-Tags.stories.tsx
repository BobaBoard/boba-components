import { TagType, TagsType } from "types";
import TagsFilter, { FilteredTagsState } from "tags/TagsFilter";

import BoardSelector from "tags/BoardSelector";
import CategoryFilter from "common/CategoryFilter";
import React from "react";
import Tags from "tags/Tags";
import { action } from "@storybook/addon-actions";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import goreBackground from "stories/images/gore.png";
import kinkmeme from "stories/images/kink-meme.png";
import oncelerBoard from "stories/images/onceler-board.png";

export default {
  title: "Tags/Tags",
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
      name: "a tag with many words that is actually more than one single line long used to check words splitting",
      type: TagType.WHISPER,
    },
    { name: "short again x 2!", type: TagType.WHISPER },
    {
      name: "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
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
    { name: "no options!", category: true, type: TagType.CATEGORY },
    { name: "a long tag", contentWarning: true, type: TagType.CONTENT_WARNING },
    {
      name: "a very very very very very long tag with many words",
      contentWarning: true,
      type: TagType.CONTENT_WARNING,
    },
    { name: "short again!", type: TagType.WHISPER },
    {
      name: "a tag with many words that is actually more than one single line long used to check words splitting",
      type: TagType.WHISPER,
    },
    { name: "short again x 2!", type: TagType.WHISPER },
    {
      name: "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
      type: TagType.WHISPER,
    },
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <Tags
        tags={tags}
        getOptionsForTag={(tag: TagsType) => {
          if (tag.name == "no options!") {
            return;
          }
          const options = [
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
      name: "a tag with many words that is actually more than one single line long used to check words splitting",
      active: true,
    },
    {
      name: "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
      active: false,
    },
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <CategoryFilter
        categories={tags}
        onCategoryStateChangeRequest={(name) => {
          setTags(
            tags.map((tag) =>
              tag.name == name ? { name, active: !tag.active } : tag
            )
          );
        }}
      />
    </div>
  );
};

FilterTags.story = {
  name: "category filter",
};

export const TagsFilterStory = () => {
  const [tags, setTags] = React.useState([
    { name: "tag1", state: FilteredTagsState.ACTIVE },
    { name: "tag2", state: FilteredTagsState.ACTIVE },
    { name: "a long tag", state: FilteredTagsState.ACTIVE },
    {
      name: "a very very very very very long tag with many words",
      state: FilteredTagsState.DISABLED,
    },
    {
      name: "a tag with many words that is actually more than one single line long used to check words splitting",
      state: FilteredTagsState.ACTIVE,
    },
    {
      name: "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
      state: FilteredTagsState.DISABLED,
    },
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <TagsFilter
        tags={tags}
        type={TagType.CONTENT_WARNING}
        onTagStateChangeRequest={(changedTag) =>
          setTags(
            tags.map((tag) => (changedTag.name == tag.name ? changedTag : tag))
          )
        }
      />
    </div>
  );
};

TagsFilterStory.story = {
  name: "non-editable tags filter",
};

export const TagsFilterUncategorizedStory = () => {
  const [tags, setTags] = React.useState([
    { name: "tag1", state: FilteredTagsState.ACTIVE },
    { name: "tag2", state: FilteredTagsState.ACTIVE },
    { name: "a long tag", state: FilteredTagsState.ACTIVE },
    {
      name: "a very very very very very long tag with many words",
      state: FilteredTagsState.DISABLED,
    },
    {
      name: "a tag with many words that is actually more than one single line long used to check words splitting",
      state: FilteredTagsState.ACTIVE,
    },
    {
      name: "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
      state: FilteredTagsState.DISABLED,
    },
  ]);
  const [uncategorizedState, setUncategorizedState] = React.useState(
    FilteredTagsState.DISABLED
  );
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <TagsFilter
        tags={tags}
        type={TagType.CONTENT_WARNING}
        onTagStateChangeRequest={(changedTag) =>
          setTags(
            tags.map((tag) => (changedTag.name == tag.name ? changedTag : tag))
          )
        }
        uncategorized={uncategorizedState}
        onUncategorizedStateChangeRequest={setUncategorizedState}
      />
    </div>
  );
};

TagsFilterUncategorizedStory.story = {
  name: "tags filter (+ uncategorized)",
};

export const EditableTagsFilterStory = () => {
  const [tags, setTags] = React.useState([
    { name: "tag1" },
    { name: "tag2" },
    { name: "a long tag" },
    {
      name: "a very very very very very long tag with many words",
    },
    {
      name: "a tag with many words that is actually more than one single line long used to check words splitting",
    },
    {
      name: "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
    },
  ]);
  return (
    <div style={{ width: "500px", backgroundColor: "white" }}>
      <TagsFilter
        tags={tags}
        type={TagType.CONTENT_WARNING}
        editable
        onTagsChange={setTags}
      />
    </div>
  );
};

EditableTagsFilterStory.story = {
  name: "editable tags filter",
};

const RECENT_BOARDS = [
  {
    slug: "gore",
    avatar: "/" + goreBackground,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "oncie-den",
    avatar: "/" + oncelerBoard,
    description: "Party like it's 2012",
    color: "#27caba",
    updates: 10,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "fic-club",
    avatar: "/" + book,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "kink-memes",
    avatar: "/" + kinkmeme,
    description: "No limits. No shame.",
    color: "#000000",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "crack",
    avatar: "/" + crack,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
];
export const BoardSelectorStory = () => {
  const [selectedBoard, setSelectedBoard] = React.useState("gore");
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "10px" }}>
      <BoardSelector
        availableBoards={RECENT_BOARDS}
        selectedBoard={selectedBoard}
        onBoardSelected={setSelectedBoard}
      />
    </div>
  );
};

BoardSelectorStory.story = {
  name: "boardSelector",
};

export const BoardSelectorLongListStory = () => {
  const [selectedBoard, setSelectedBoard] = React.useState("gore");
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "10px" }}>
      <BoardSelector
        availableBoards={[
          ...RECENT_BOARDS,
          ...RECENT_BOARDS,
          ...RECENT_BOARDS,
          ...RECENT_BOARDS,
          ...RECENT_BOARDS,
          ...RECENT_BOARDS,
        ]}
        selectedBoard={selectedBoard}
        onBoardSelected={setSelectedBoard}
      />
    </div>
  );
};

BoardSelectorLongListStory.story = {
  name: "boardSelector (long list)",
};
