import BoardSidebar, {
  BoardSidebarProps,
  SidebarSectionProps,
} from "../../src/sidebar/BoardSidebar";
import { Meta, Story } from "@storybook/react";
import TagsFilterSection, {
  TagsFilterSectionProps,
} from "../../src/sidebar/TagsFilterSection";
import TextSection, { TextSectionProps } from "../../src/sidebar/TextSection";

import DefaultTheme from "../../src/theme/default";
import React from "react";
import { Regular as TagsRegular } from "./01-TagsSection.stories";
import { Regular as TextRegular } from "./02-TextSection.stories";
import { action } from "@storybook/addon-actions";
import goreBackground from "../images/gore.png";

export default {
  title: "Sidebar/Board Sidebar",
  component: BoardSidebar,
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

const BoardSidebarTemplate: Story<
  BoardSidebarProps & {
    sidebarSections: SidebarSectionProps[];
  }
> = ({ sidebarSections, ...args }) => (
  <BoardSidebar {...args}>
    {sidebarSections.map(({ children, ...props }) => (
      <BoardSidebar.SidebarSection key={props.id} {...props}>
        {children}
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
    {
      name: "opt1",
      link: { onClick: () => action("boardOption1")() },
    },
    {
      name: "opt2",
      link: { onClick: () => action("boardOption2")() },
    },
  ],
  sidebarSections: [
    {
      id: "board_content_notices",
      title: "Board content notices",
      children: (
        <TagsFilterSection {...(TagsRegular.args as TagsFilterSectionProps)} />
      ),
    },
    {
      id: "rules",
      title: "Rules",
      children: <TextSection {...(TextRegular.args as TextSectionProps)} />,
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
