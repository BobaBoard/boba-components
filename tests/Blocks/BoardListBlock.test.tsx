import "@testing-library/jest-dom/extend-expect";

import * as boardListBlockStories from "stories/Blocks/BoardListBlock.stories";

import { render, screen } from "@testing-library/react";
import React from "react";

import { action } from "@storybook/addon-actions";
import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { IconProps } from "common/Icon";

jest.mock("@storybook/addon-actions");

const { Simple, Empty, WithOptions } = composeStories(boardListBlockStories);

// 1) clicking on a board name opens the corresponding board drawer

describe("when a board name is clicked", () => {
	render(<Simple />);
	it("shows a detailed description of it", async () => {
		const boardToClick = Simple.args!.boards![2];
		const boardLink = screen.getByRole("button", {
			name: `!${boardToClick.slug}`,
		});

		expect(screen.queryByText(boardToClick.description)).not.toBeInTheDocument();

		await userEvent.click(boardLink);
	
		expect(screen.getByText(boardToClick.description)).toBeInTheDocument();
	});
});
// 2) clicking on a board icon triggers the right action
describe("when a board list is displayed", () => {
	// render(<Simple />);
	// expect(Simple.args!.children!).not.toBeNil();
	// describe("when a board name is clicked", () => {
	// 	it("just works", () => {
	// 		console.log({ screen });
	// 		expect(screen);
	// 	});
	/* 		console.log(
			screen.getByRole("button", {
				hidden: true,
				name: /!gore/i,
			})
		);

		console.log(screen.getAllByRole("button", { hidden: true }));

		console.log(screen.getByRole("button", { hidden: true }));
		const boardLinks = screen.getByRole("link", { hidden: true }); */
	/* 		for (const boardLink of boardLinks) {
			beforeEach(async () => {
				await userEvent.click(boardLink);
			});
			it("takes you to the board", () => {
				expect(boardLink).toHaveAttribute("href", "#slug");
			});
		} */
	// });
});

/*
describe("Board menu items link to boards", () => {
	render(<Simple />);
	
	const boardLinks = screen.getAllByRole("link");
	
	beforeEach(async () => {

	});
	it("displays the infobox", () => {
		expect(action("#slug")).toHaveBeenCalled();
	});
}); */

/* describe("Board menu items link to boards", () => {
	render(<Empty />);

	const boardLinks = screen.getAllByRole("link");

	beforeEach(async () => {
		for (const boardLink of boardLinks) {
			await userEvent.click(boardLink);
			expect(boardLink).toHaveAttribute("href", "#slug");
		}
	});
	it("displays the infobox", () => {
		expect(action("#slug")).toHaveBeenCalled();
	});
}); */

describe("when a board icon is clicked", () => {
	it("takes you to the board", () => {});
});

// 3) clicking on the "go to board" button triggers the right action

describe("when a 'go to board' link is clicked", () => {
	it("takes you to the board", () => {});
});

// 4) clicking on the "mute/unmute button" triggers the right action

describe("when a board mute/unmute button is clicked", () => {
	it("the board is muted/unmuted", () => {});
});

// 5) clicking on the "pin/unpin button" triggers the right action

describe("when a board pin/unpin button is clicked", () => {
	it("the board is pinned/unpinned", () => {});
});
