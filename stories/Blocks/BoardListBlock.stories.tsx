import { faAngleRight, faThList } from "@fortawesome/free-solid-svg-icons";
import type { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import BoardListBlock from "blocks/BoardListBlock";
import React from "react";
import anime from "stories/images/anime.png";
import book from "stories/images/book.png";
import crack from "stories/images/crack.png";
import goreBackground from "stories/images/gore.png";
import kinkmeme from "stories/images/kink-meme.png";
import oncelerBoard from "stories/images/onceler-board.png";
import villains from "stories/images/villains.png";
import { expect } from "@storybook/jest";

import { userEvent, waitFor, within } from "@storybook/testing-library";

const meta: Meta<typeof BoardListBlock> = {
	component: BoardListBlock,
};

export default meta;
type Story = StoryObj<typeof BoardListBlock>;

const BOARDS = [
	{
		slug: "gore",
		avatar: `/${goreBackground}`,
		description: "Love me some bruised bois (and more).",
		color: "#f96680",
		link: { href: "#slug", onClick: action("#slug") },
		updates: true,
		pinned: true,
	},
	{
		slug: "oncie-den",
		avatar: `/${oncelerBoard}`,
		description: "Party like it's 2012",
		color: "#27caba",
		link: { href: "#slug", onClick: action("#slug") },
		pinned: false,
		muted: true,
	},
	{
		slug: "a-super-long-slug-because-we-need-to-test-for-overflow",
		avatar: `/${book}`,
		description: "Come enjoy all the fics!",
		color: "#7724d2",
		link: { href: "#slug", onClick: action("#slug") },
		updates: true,
	},
	{
		slug: "kink-memes",
		avatar: `/${kinkmeme}`,
		description: "No limits. No shame.",
		color: "#000000",
		link: { href: "#slug", onClick: action("#slug") },
		updates: true,
		pinned: true,
	},
	{
		slug: "crack",
		avatar: `/${crack}`,
		description: "What's crackalackin",
		color: "#f9e066",
		link: { href: "#slug", onClick: action("#slug") },
		updates: true,
		outdated: true,
	},
	{
		slug: "anime",
		avatar: `/${anime}`,
		description: "We put the weeb in dweeb.",
		color: "#24d282",
		link: { href: "#slug", onClick: action("#slug") },
		muted: true,
	},
	{
		slug: "villain-thirst",
		avatar: `/${villains}`,
		description: "Love to love 'em.",
		color: "#e22b4b",
		link: { href: "#slug", onClick: action("#slug") },
		updates: true,
		outdated: true,
	},
];

export const Simple: Story = {
	render: function Render() {
		const [selectedBoard, setSelectedBoard] = React.useState<string | null>(
			null
		);

		return (
			<div>
				<BoardListBlock
					icon={faAngleRight}
					title="Boards"
					selectedBoardSlug={selectedBoard}
					onSelectBoard={(slug) => {
						action("select-board")(slug);
						setSelectedBoard(slug === selectedBoard ? null : slug);
					}}
					options={[]}
					onPinBoard={function (slug: string): void {
						throw new Error("Function not implemented.");
					}}
					onMuteBoard={function (slug: string): void {
						throw new Error("Function not implemented.");
					}}
				>
					<BoardListBlock.Empty>
						<div>No boards here</div>
					</BoardListBlock.Empty>
					{BOARDS.map((board) => (
						<BoardListBlock.Item
							avatar={board.avatar}
							link={board.link}
							color={board.color}
							slug={board.slug}
							key={board.slug}
							description={board.description}
							options={[]}
							updates={board.updates}
							muted={board.muted}
							outdated={board.outdated}
							pinned={board.pinned}
						/>
					))}
				</BoardListBlock>
			</div>
		);
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const boardIcons = canvas.getAllByLabelText("icon", {
			selector: "a",
			exact: false,
		});

		console.log(this);

		for (const boardIcon of boardIcons) {
			await userEvent.click(boardIcon);
			await waitFor(() => {
				expect(boardIcon).toHaveAttribute("href", "#slug");
				expect(action("#slug")).toHaveBeenCalled();
			});
		}

		/* 		const emailInput = canvas.getByLabelText("email", {
			selector: "input",
		});

		await userEvent.type(emailInput, "example-email@email.com", {
			delay: 100,
		});

		const passwordInput = canvas.getByLabelText("password", {
			selector: "input",
		});

		await userEvent.type(passwordInput, "ExamplePassword", {
			delay: 100,
		});
		// See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
		const submitButton = canvas.getByRole("button");

		await userEvent.click(submitButton); */
	},
};

export const Empty: Story = {
	render: () => (
		<div style={{ width: "500px" }}>
			<BoardListBlock
				title="woo"
				icon=""
				onSelectBoard={() => {
					throw new Error("Function not implemented.");
				}}
				options={[]}
				onPinBoard={function (slug: string): void {
					throw new Error("Function not implemented.");
				}}
				onMuteBoard={function (slug: string): void {
					throw new Error("Function not implemented.");
				}}
			>
				<BoardListBlock.Empty>
					There are no boards to display.
				</BoardListBlock.Empty>
			</BoardListBlock>
		</div>
	),
};

export const WithOptions: Story = {
	render: function Render({ options }) {
		const [selectedBoard, setSelectedBoard] = React.useState<string | null>(
			null
		);

		return (
			<div>
				<BoardListBlock
					icon={faThList}
					title="Boards with Options"
					selectedBoardSlug={selectedBoard}
					onSelectBoard={(slug) => {
						action("select-board")(slug);
						setSelectedBoard(slug === selectedBoard ? null : slug);
					}}
					options={options}
					onPinBoard={function (slug: string): void {
						throw new Error("Function not implemented.");
					}}
					onMuteBoard={function (slug: string): void {
						throw new Error("Function not implemented.");
					}}
				>
					{BOARDS.map((board) => (
						<BoardListBlock.Item
							slug={board.slug}
							avatar={board.avatar}
							link={board.link}
							color={board.color}
							key={board.slug}
							description={board.description}
							options={options}
							updates={board.updates}
							muted={board.muted}
							outdated={board.outdated}
							pinned={board.pinned}
						/>
					))}
				</BoardListBlock>
			</div>
		);
	},
};

WithOptions.args = {
	options: [
		{
			name: "Pin board",
			link: {
				onClick: action("noHrefClick"),
			},
		},
		{
			name: "Mute board",
			link: {
				onClick: action("noHrefClick"),
			},
		},
		{
			name: "Dismiss notifications",
			link: {
				onClick: action("noHrefClick"),
			},
		},
	],
};
