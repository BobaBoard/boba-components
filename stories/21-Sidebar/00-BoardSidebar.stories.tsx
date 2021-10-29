import BoardSidebar, { BoardSidebarProps } from "../../src/sidebar/BoardSidebar";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";

import DefaultTheme from "../../src/theme/default";
import { Regular } from "./01-TagsSection.stories";
import { TagType } from "../../src/types";
import { Regular as TextRegular } from "./02-TextSection.stories";
import { action } from "@storybook/addon-actions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import goreBackground from "../images/gore.png";
import mamoru from "../images/mamoru.png";

export default {
  title: "Sidebar/Board Sidebar",
  component: BoardSidebar,
  parameters: {
    actions: {
      handles: ["click .option", "click button"],
    },
  },
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            max-width: 500px;
            background-color: ${DefaultTheme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
          }
          .story > :global(div) {
            margin: 10px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const BoardSidebarTemplate: Story<BoardSidebarProps> = (args) => (
  <BoardSidebar {...args}>
    {args.sidebarSections.map((section) => (
      <BoardSidebar.SidebarSection {...section.args}>
        {section.children}
      </BoardSidebar.SidebarSection>
    ))}
  </BoardSidebar>
);

export const RegularBoardSidebar = BoardSidebarTemplate.bind({});
RegularBoardSidebar.args = {
  slug: "gore",
  avatarUrl: `/${goreBackground}`,
  accentColor: "#24d282",
  tagline: "Love me some bruised bois (and more).",
  previewOptions: [
    { name: "opt1", link: { onClick: action("optionOne") } },
    { name: "opt2", link: { onClick: action("option2") } },
  ],
  sidebarSections: [
    { args: { title: "hello" }, children: <Regular {...Regular.args} /> },
    {
      args: { title: "hello" },
      children: <TextRegular {...TextRegular.args} />,
    },
  ],
  muted: false,
  activeCategory: "acido muriatico!!!!",
  onCategoriesStateChange: action("categoryChange"),
};

export const EditableBoardSidebar = BoardSidebarTemplate.bind({});
EditableBoardSidebar.args = {
  ...RegularBoardSidebar.args,
  editing: true,
};

/**
 * descriptions: [
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
      index: 3,
      title: "Gore Categories2",
      description: null,
      type: "category_filter",
      categories: ["set1", "set2"],
    },
    {
      id: 2,
      index: 2,
      title: "A test",
      description:
        '[{"insert":"Hello!\\nThis is a board description. In this description we have:\\nRule 1."},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Rule 2, which is very "},{"attributes":{"bold":true},"insert":"important"},{"insert":"."},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Rule 3, which has "},{"attributes":{"link":"https://www.youtube.com/watch?v=oHg5SJYRHA0"},"insert":"a link"},{"insert":"!"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"Have fun and love each other.\\n"},{"insert":{"block-image":{"src":"https://media.tenor.com/images/fad319336910209546dc6ee1fe6cab5a/tenor.gif","spoilers":false,"width":300,"height":224}}},{"insert":"\\n"}]',
      type: "text",
    },
  ],
 */
