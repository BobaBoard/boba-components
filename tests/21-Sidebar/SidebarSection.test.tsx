import "@testing-library/jest-dom/extend-expect";

import * as sectionStories from "stories/21-Sidebar/04-SidebarSection.stories";

import SidebarSection, {
  SidebarSectionProps,
  getSectionData,
} from "sidebar/SidebarSection";
import TagsFilterSection, {
  TagsFilterSectionProps,
} from "sidebar/TagsFilterSection";
import TextSection, { TextSectionProps } from "sidebar/TextSection";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { DescriptionType } from "types";
import React from "react";
import { TagMatcher } from "../utils/matchers";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import { mocked } from "jest-mock";
import { suppressConsoleErrors } from "../utils/testUtils";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

// TODO: get rid of this error.
suppressConsoleErrors(["Warning: validateDOMNesting(...)"]);

const {
  TagsFilterRegular,
  TagsFilterInactive,
  TagsFilterEditable,
  TextRegular,
  TextEditable,
} = composeStories(sectionStories);

describe("Tags Filter", () => {
  describe("Regular", () => {
    test("Renders title", () => {
      render(<TagsFilterRegular />);

      // TODO: fill this
    });

    test("Renders content notices", () => {
      render(<TagsFilterRegular />);

      const tagsDisplayText =
        TagsFilterRegular.args!.tagsFilterProps!.tags!.map(
          (tag) => `cn:${tag.name}`
        );
      tagsDisplayText.forEach((tagText) => {
        expect(screen.getByText(TagMatcher(tagText))).toBeInTheDocument();
      });
    });

    test("Does not render edit buttons", () => {
      render(<TagsFilterRegular />);

      // TODO: fill this
    });
  });

  describe("Inactive", () => {
    test("Renders clear filter", () => {
      render(<TagsFilterInactive />);

      // TODO: fill this
    });

    test("Activates clear filter option", () => {
      render(<TagsFilterInactive />);

      // TODO: fill this
    });

    test("Triggers clear filters action", () => {
      render(<TagsFilterInactive />);

      // TODO: fill this
    });
  });

  describe("Editable", () => {
    test("Renders content notices", () => {
      render(<TagsFilterEditable />);

      const tagsDisplayText =
        TagsFilterEditable.args!.tagsFilterProps!.tags!.map(
          (tag) => `cn:${tag.name}`
        );
      tagsDisplayText.forEach((tagText) => {
        expect(screen.getByText(TagMatcher(tagText))).toBeInTheDocument();
      });
    });

    test("Triggers title change action", () => {
      render(<TagsFilterEditable />);

      // TODO: fill this
    });

    test("Triggers change data action on tag add", () => {
      render(<TagsFilterEditable />);

      // TODO: fill this
    });

    test("Triggers change data action on tag delete", () => {
      render(<TagsFilterEditable />);

      // TODO: fill this
    });

    test("Triggers delete section action", () => {
      render(<TagsFilterEditable />);

      // TODO: fill this
    });
  });
});

describe("Text Section", () => {
  describe("Regular", () => {
    test("Renders title", () => {
      render(<TextRegular />);

      // TODO: fill this
    });

    test("Renders text", () => {
      render(<TextRegular />);

      // TODO: fill this
    });

    test("Does not render edit buttons", () => {
      render(<TextRegular />);

      // TODO: fill this
    });
  });

  describe("Editable", () => {
    test("Triggers title change action", () => {
      // TODO: fill this
    });

    test("Triggers change data action when text changed", () => {
      render(<TextEditable />);

      // TODO: fill this
    });

    test("Triggers delete section action", () => {
      render(<TextEditable />);

      // TODO: fill this
    });
  });
});

describe("Utilities", () => {
  test("Correctly extracts text section data", () => {
    const sidebarProps = TextRegular.args!
      .sidebarSectionProps as SidebarSectionProps;
    const textProps = TextRegular.args!.textSectionProps as TextSectionProps;
    const section = (
      <SidebarSection {...sidebarProps}>
        <TextSection {...textProps} />
      </SidebarSection>
    );
    expect(getSectionData(section)).toEqual<DescriptionType>({
      id: sidebarProps.id,
      index: sidebarProps.index,
      title: sidebarProps.title,
      description: textProps.description,
      type: "text",
    });
  });

  test("Correctly extracts tag filter section data", () => {
    const sidebarProps = TagsFilterRegular.args!
      .sidebarSectionProps as SidebarSectionProps;
    const tagsFilterProps = TagsFilterRegular.args!
      .tagsFilterProps as TagsFilterSectionProps;
    const section = (
      <SidebarSection {...sidebarProps}>
        <TagsFilterSection {...tagsFilterProps} />
      </SidebarSection>
    );
    expect(getSectionData(section)).toEqual<DescriptionType>({
      id: sidebarProps.id,
      index: sidebarProps.index,
      title: sidebarProps.title,
      categories: tagsFilterProps.tags.map((tag) => tag.name),
      type: "category_filter",
    });
  });
});
