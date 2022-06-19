import "@testing-library/jest-dom/extend-expect";

// Import the stories you're going to test against
import * as stories from "stories/22-UIBlocks/01-RulesBlock.stories.tsx";

import { render, screen, waitFor, within } from "@testing-library/react";

import React from "react";
// import component?
import RulesBlock from "../../src/blocks/RulesBlock";
// Import the prop types for the component
import { RulesBlockProps } from "../../src/blocks/RulesBlock";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { mocked } from "jest-mock";
import userEvent from "@testing-library/user-event";

// Set up jest to mock actions
jest.mock("@storybook/addon-actions");

// Set up each story you want to run tests on
const { Single, Multiple } = composeStories(stories);

// the describe() function lets us create groups of tests within our file.
// You generally want to group all the tests for a given story into a describe().

describe("Multiple", () => {
  test("All the rules are being rendered", async () => {
    render(<Multiple />);

    const rules = screen.getAllByRole("group");
    const sortedRules = [...Multiple.args.rules].sort(
      (a, b) => a.index - b.index
    );

    expect(rules).toHaveLength(Multiple.args.rules.length);

    rules.sort().forEach((rule, i) => {
      expect(rule).toHaveTextContent(
        `${sortedRules[i].title}${sortedRules[i].description}`
      );
    });
    // TODO: figure out how to test the elements separtely
    //  rules.forEach((rule, i) => {
    //     expect(rule.getByRole("button")).toHaveTextContent(Multiple.args.rules[i].title);
    //     expect(rule.getByText(Multiple.args.rules[i].description)).toBeInTheDocument();
    //  });
  });
});

describe("Single", () => {
  test("A single rule is being rendered", async () => {
    render(<Single />);

    expect(screen.getAllByRole("group")).toHaveLength(Single.args.rules.length);
    expect(screen.queryByRole("heading")).toHaveTextContent(Single.args.title);
  });
});

describe("Empty", () => {
  test("Doesn't render items when there are no rules", async () => {
    render(<RulesBlock title="No Rules, Go Wild" seeAllLink="" rules={[]} />);

    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });
});
