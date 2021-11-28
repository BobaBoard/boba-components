import BoardSidebar, {
  BoardSidebarProps,
} from "../../src/sidebar/BoardSidebar";
import { Meta, Story } from "@storybook/react";
import TagsFilterSection, {
  TagsFilterSectionProps,
} from "../../src/sidebar/TagsFilterSection";
import TextSection, { TextSectionProps } from "../../src/sidebar/TextSection";

import DefaultTheme from "../../src/theme/default";
import React from "react";
import { SidebarSectionProps } from "../../src/sidebar/SidebarSection";
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
      id: "rules",
      index: 2,
      title: "Rules",
      children: <TextSection {...(TextRegular.args as TextSectionProps)} />,
    },
    {
      id: "board_content_notices",
      index: 1,
      title: "Board content notices",
      children: (
        <TagsFilterSection {...(TagsRegular.args as TagsFilterSectionProps)} />
      ),
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
  onCancelEditing: (...args) => action("cancel")(args),
  onUpdateMetadata: (...args) => action("save")(args),
};
