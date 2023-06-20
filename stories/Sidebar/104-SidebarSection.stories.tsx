import * as TagsFilterStories from "./101-TagsSection.stories";
import * as TextSectionStories from "./102-TextSection.stories";

import { Meta, Story } from "@storybook/react";
import SidebarSection, { SidebarSectionProps } from "sidebar/SidebarSection";
import TagsFilterSection, {
  DisplayTagsFilterSectionProps,
  TagsFilterSectionProps,
} from "sidebar/TagsFilterSection";
import TextSection, { TextSectionProps } from "sidebar/TextSection";

import DefaultTheme from "theme/default";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Sidebar/Sidebar Section",
  component: SidebarSection,
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            max-width: 500px;
            background-color: ${DefaultTheme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
            padding: 10px;
          }
          .story > :global(div) {
            margin: 10px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const TagsFilterSidebarSectionTemplate: Story<{
  sidebarSectionProps: Omit<SidebarSectionProps, "children">;
  tagsFilterProps: TagsFilterSectionProps;
}> = ({ sidebarSectionProps, tagsFilterProps }) => (
    <SidebarSection {...sidebarSectionProps}>
      <TagsFilterSection {...tagsFilterProps} />
    </SidebarSection>
  );

export const TagsFilterRegular = TagsFilterSidebarSectionTemplate.bind({});
TagsFilterRegular.args = {
  sidebarSectionProps: {
    id: "id1",
    index: 1,
    title: "A tags filter section",
  },
  tagsFilterProps: TagsFilterStories.Regular.args as TagsFilterSectionProps,
};

export const TagsFilterInactive = TagsFilterSidebarSectionTemplate.bind({});
TagsFilterInactive.args = {
  sidebarSectionProps: {
    id: "id1",
    index: 1,
    title: "A tags filter section",
  },
  tagsFilterProps: {
    ...(TagsFilterStories.Inactive.args as DisplayTagsFilterSectionProps),
    onClearFilterRequests: (...args) => action("clearFilter")(args),
  },
};

export const TagsFilterEditable = TagsFilterSidebarSectionTemplate.bind({});
TagsFilterEditable.args = {
  ...TagsFilterRegular.args,
  sidebarSectionProps: {
    ...TagsFilterRegular.args.sidebarSectionProps!,
    editable: true,
    onChangeTitle: (...args) => action("changeTitle")(args),
    onChangeData: (...args) => action("changeData")(args),
    onDeleteSection: (...args) => action("deleteSection")(args),
  },
};

const TextSidebarSectionTemplate: Story<{
  sidebarSectionProps: Omit<SidebarSectionProps, "children">;
  textSectionProps: TextSectionProps;
}> = ({ sidebarSectionProps, textSectionProps }) => (
    <SidebarSection {...sidebarSectionProps}>
      <TextSection {...textSectionProps} />
    </SidebarSection>
  );

export const TextRegular = TextSidebarSectionTemplate.bind({});
TextRegular.args = {
  sidebarSectionProps: {
    id: "id1",
    index: 1,
    title: "A text section",
  },
  textSectionProps: TextSectionStories.Regular.args as TextSectionProps,
};

export const TextEditable = TextSidebarSectionTemplate.bind({});
TextEditable.args = {
  ...TextRegular.args,
  sidebarSectionProps: {
    ...TextRegular.args!.sidebarSectionProps!,
    editable: true,
    onChangeTitle: (...args) => action("changeTitle")(args),
    onChangeData: (...args) => action("changeData")(args),
    onDeleteSection: (...args) => action("deleteSection")(args),
  },
};
