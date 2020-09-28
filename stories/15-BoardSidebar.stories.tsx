import React from "react";

import BoardSidebar from "../src/board/BoardSidebar";
import TextSection from "../src/board/TextSection";
import CategoryFilterSection from "../src/board/CategoryFilterSection";
import BoardDescription from "../src/board/BoardDescription";
import EditableBoardDescription from "../src/board/EditableBoardDescription";
import Button from "../src/common/Button";

import goreBackground from "./images/gore.png";

import { action } from "@storybook/addon-actions";

export const BoardSidebarPreview = () => {
  const [color, setColor] = React.useState("#f96680");
  return (
    <div style={{ maxWidth: "500px" }}>
      <BoardSidebar
        board={{
          slug: "gore",
          avatarUrl: `/${goreBackground}`,
          tagline: "Love me some bruised bois (and more).",
          accentColor: color,
          boardWideTags: [
            { name: "gore", color: "#f96680" },
            { name: "guro", color: "#e22b4b" },
            { name: "nsfw", color: "#27caba" },
            { name: "dead dove", color: "#f9e066" },
          ],
          canonicalTags: [
            { name: "request", color: "#27caba" },
            { name: "blood", color: "#f96680" },
            { name: "knifeplay", color: "#93b3b0" },
            { name: "aesthetic", color: "#24d282" },
            { name: "impalement", color: "#27caba" },
            { name: "skullfuck", color: "#e22b4b" },
            { name: "hanging", color: "#f9e066" },
            { name: "torture", color: "#f96680" },
            { name: "necrophilia", color: "#93b3b0" },
            { name: "shota", color: "#e22b4b" },
            { name: "fanfiction", color: "#27caba" },
            { name: "rec", color: "#f9e066" },
            { name: "doujinshi", color: "#f96680" },
            { name: "untagged", color: "#93b3b0" },
          ],
          contentRulesTags: [
            { name: "shota", allowed: true },
            { name: "nsfw", allowed: true },
            { name: "noncon", allowed: true },
            { name: "IRL", allowed: false },
            { name: "RP", allowed: false },
          ],
          otherRules: (
            <div>
              <ul>
                <li>
                  Shota <strong>must</strong> be tagged.
                </li>
                <li>
                  Requests go in the appropriate tag. If the same request has
                  been made less than a month ago, it will be deleted by the
                  mods.
                </li>
                <li>
                  Mods might add any TWs tag as they see fit. If you need help,
                  add #untagged and a mod will take care of it.
                </li>
              </ul>
            </div>
          ),
        }}
      />
      <Button onClick={() => setColor("#f96680")}>Pink</Button>
      <Button onClick={() => setColor("#24d282")}>Green</Button>
      <Button onClick={() => setColor("#27caba")}>Blue</Button>
    </div>
  );
};

BoardSidebarPreview.story = {
  name: "sidebar",
};

const TextSectionTemplate = (args: any) => <TextSection {...args} />;
export const DescriptionSection = TextSectionTemplate.bind({});
DescriptionSection.args = {
  title: "Rules",
  description: '[{"insert":"A description\\n"}]',
  editable: false,
};

export const EditableDescription = TextSectionTemplate.bind({});
EditableDescription.args = {
  title: "Rules",
  description: '[{"insert":"A description\\n"}]',
  editable: true,
  onTitleChange: action("title"),
  onDescriptionChange: action("description"),
};

const CategoryFilterSectionTemplate = (args: any) => (
  <CategoryFilterSection {...args} />
);
export const FiltersSection = CategoryFilterSectionTemplate.bind({});
FiltersSection.args = {
  title: "Rules",
  categories: [
    { name: "cat1", active: true },
    { name: "cat2", active: true },
  ],
  editable: false,
  onCategoryStateChange: action("categories"),
};
export const EditableFiltersSection = CategoryFilterSectionTemplate.bind({});
EditableFiltersSection.args = {
  title: "Rules",
  categories: [
    { name: "cat1", active: true },
    { name: "cat2", active: true },
  ],
  editable: true,
  onCategoryStateChange: action("categories"),
};

const BoardDescriptionTemplate = BoardDescription.bind({});
export const BoardDescriptionStory = BoardDescriptionTemplate.bind({});
BoardDescriptionStory.args = {
  descriptions: [
    {
      id: 1,
      index: 1,
      title: "Gore Categories",
      description: null,
      type: "category_filter",
      categories: ["sangue!!!!", "acido muriatico!!!!"],
    },
    {
      id: 5,
      index: 2,
      title: "Gore Categories2",
      description: null,
      type: "category_filter",
      categories: ["set1", "set2"],
    },
    {
      id: 2,
      index: 3,
      title: "a test",
      description: '[{"insert": "pls help"}]',
      type: "text",
      categories: [null],
    },
  ],
  onCategoryStateChange: action("categories"),
};

const EditableBoardDescriptionTemplate = EditableBoardDescription.bind({});
export const EditableBoardDescriptionStory = EditableBoardDescriptionTemplate.bind(
  {}
);
EditableBoardDescriptionStory.args = {
  descriptions: [
    {
      id: 1,
      index: 1,
      title: "Gore Categories",
      description: null,
      type: "category_filter",
      categories: ["sangue!!!!", "acido muriatico!!!!"],
    },
    {
      id: 5,
      index: 2,
      title: "Gore Categories2",
      description: null,
      type: "category_filter",
      categories: ["set1", "set2"],
    },
    {
      id: 2,
      index: 3,
      title: "a test",
      description: '[{"insert": "pls help"}]',
      type: "text",
      categories: [null],
    },
  ],
  onCancel: action("cancel"),
  onSave: action("save"),
};

export default {
  title: "Board Sidebar Preview",
  component: TextSection,
};
