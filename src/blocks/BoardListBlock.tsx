import {
	faEllipsisV,
	faThumbTack,
	faVolumeHigh,
	faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import BoardPreview, { DisplayStyle } from "board/BoardPreview";
import DropdownMenu, { DropdownStyle } from "common/DropdownListMenu";
import Icon, { IconProps } from "common/Icon";

import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import BoardIcon from "board/BoardIcon";
import ActionLink from "buttons/ActionLink";
import CircleButton from "buttons/CircleButton";
import classnames from "classnames";
import HighlightedText from "common/HighlightedText";
import React from "react";
import DefaultTheme from "theme/default";
import { LinkWithAction } from "types";
import { extractCompounds } from "utils/compound-utils";

const Empty: React.FC<unknown> = ({ children }) => <p>{children}</p>;

const Item = ({
	slug,
	avatar,
	color,
	description,
	link,
	_selected,
	_onSelected,
	_options = [],
	updates,
	muted,
	pinned,
	outdated,
	_onPinned,
	_onMuted,
}: ItemProps) => (
	<>
		<div className="item-summary">
			<ActionLink link={link} aria-label={`${slug} icon`}>
				<BoardIcon
					avatar={avatar}
					color={color}
					updates={updates}
					muted={muted}
					outdated={outdated}
					large
				/>
			</ActionLink>
			<button
				onClick={() => _onSelected?.(slug)}
				className={classnames("slug-container", {
					"has-updates": !!updates,
					muted: !!muted,
					outdated: !!outdated,
					"with-options": !!_options.length,
				})}
			>
				<span className="slug">!{slug}</span>
			</button>
			{_options.length !== 0 && (
				<DropdownMenu
					options={_options}
					zIndex={200}
					label="board list options"
					buttonClassName="options-button"
					style={DropdownStyle.DARK}
				>
					<Icon icon={faEllipsisV} color={DefaultTheme.MENU_ITEM_ICON_COLOR} />
				</DropdownMenu>
			)}
		</div>
		{_selected && (
			<div className="item-details">
				<BoardPreview
					slug={slug}
					avatar={avatar}
					description={description}
					color={color}
					muted={muted}
					displayStyle={DisplayStyle.MINI}
				/>
				<div className="board-info">
					<HighlightedText highlightColor={color}>
						<span className="big-slug">!{slug}</span>
					</HighlightedText>
					{description}
					<div className="board-info-footer">
						<div className="toggle-buttons">
							<CircleButton
								defaultBorderColor={color}
								icon={{
									icon: faThumbTack,
									color: pinned ? "white" : "#939393",
								}}
								link={{ onClick: _onPinned }}
								aria-label={pinned ? "Unpin board" : "Pin board"}
							/>
							<CircleButton
								defaultBorderColor={color}
								icon={{
									icon: muted ? faVolumeXmark : faVolumeHigh,
									color: muted ? "red" : "#939393",
								}}
								link={{ onClick: _onMuted }}
								aria-label={muted ? "Unmute board" : "Mute board"}
							/>
						</div>

						<ActionLink link={link} className="board-link">
							Go to Board
							<Icon
								icon={faArrowAltCircleRight}
								color={DefaultTheme.MENU_ITEM_ICON_COLOR}
								className="board-link-icon"
							/>
						</ActionLink>
					</div>
				</div>
			</div>
		)}
		<style jsx>{`
			* {
				box-sizing: border-box;
				text-align: center;
				border: none;
			}
			// TODO: see about switching to css.resolve
			.item-details :global(.board-link-icon) {
				margin: 0 0 0 1rem;
			}
			.item-details :global(.board-link:hover),
			.item-details :global(.board-link:hover) :global(svg) {
				color: white;
			}
			.item-summary :global(.options-button) {
				min-width: 45px;
				min-height: 100%;
				border-radius: 0 12px 12px 0;
				background-color: ${DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR};
			}
			.item-summary :global(.options-button) :global(svg) {
				height: 18px;
			}
			.item-details {
				grid-column: -1 / 1;
				border-radius: 12px;
				background-color: ${DefaultTheme.BOARD_FILTER_BACKGROUND};
				color: ${DefaultTheme.MENU_ITEM_ICON_COLOR};
				justify-self: stretch;
				align-self: stretch;
				max-width: 100%;
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				padding: 2rem 1rem;
				gap: 2rem;
			}
			.toggle-buttons {
				display: flex;
				justify-content: center;
				gap: 1rem;
			}
			.board-info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				gap: 2.5rem;
				padding: 1rem 0;
			}
			.board-info-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0.5rem 1rem;
			}
			.item-summary {
				display: flex;
				justify-content: space-between;
				justify-self: stretch;
				align-self: center;
				border-radius: 15px;
				background-color: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
			}
			.slug-container {
				flex-grow: 1;
				background-color: transparent;
				max-width: calc(100% - 60px);
				padding: 0 5px;
				display: flex;
				flex-grow: 1;
				justify-content: center;
				align-items: center;
				cursor: pointer;
			}
			.with-options {
				max-width: calc(100% - 60px - 45px);
			}
			.slug,
			.big-slug {
				color: ${DefaultTheme.PINNED_BAR_TEXT_COLOR};
				font-size: var(--font-size-large);
				font-weight: 500;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				flex-grow: 1;
			}
			.big-slug {
				white-space: unset;
			}
			.muted .slug {
				text-decoration: line-through;
				color: #c7c7c7;
			}
			.has-updates .slug {
				color: ${DefaultTheme.PINNED_BAR_TEXT_COLOR};
			}
			.outdated .slug {
				color: #c7c7c7;
			}
		`}</style>
	</>
);

const BoardListBlock: BoardListBlockCompound = (props: BoardListBlockProps) => {
	const items = extractCompounds(props.children, Item);
	const empty = extractCompounds(props.children, Empty);

	return (
		<section>
			{props.title && (
				<h2 className="title">
					<span className="icon">
						<Icon icon={props.icon} />
					</span>
					{props.title}
				</h2>
			)}
			{items.length === 0 && empty}

			{items.length !== 0 && (
				<div className="list-container">
					{items.map((item) => {
						const ItemWithMethods = React.cloneElement(item, {
							...item.props,
							_selected: item.props.slug === props.selectedBoardSlug,
							_onSelected: () => props.onSelectBoard(item.props.slug),
							_options: props.options,
							_onPinned: () => props.onPinBoard(item.props.slug),
							_onMuted: () => props.onMuteBoard(item.props.slug),
						});
						return ItemWithMethods;
					})}
				</div>
			)}
			<style jsx>{`
				* {
					color: ${DefaultTheme.PINNED_BAR_TEXT_COLOR};
				}
				section {
					background-color: ${DefaultTheme.BOARD_MENU_BACKGROUND};
					padding: 24px 20px;
					border-radius: 15px;
				}
				.title {
					color: ${DefaultTheme.PINNED_BAR_TEXT_COLOR};
					letter-spacing: 2px;
					font-size: medium;
					text-transform: uppercase;
					margin-bottom: 2rem;
				}
				.title .icon {
					margin-right: 2rem;
				}
				.list-container {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
					gap: 16px;
					background-color: ${DefaultTheme.BOARD_MENU_BACKGROUND};
					grid-auto-flow: dense;
					max-width: 1200px;
					margin: 0 auto;
					gap: 1rem;
				}
			`}</style>
		</section>
	);
};

BoardListBlock.Empty = Empty;
BoardListBlock.Item = Item;

type BoardListBlockCompound = React.FC<BoardListBlockProps> & {
	Empty: React.FC<unknown>;
	Item: React.FC<ItemProps>;
};

export interface EmptyProps {
	children: React.ReactNode;
}
export interface ItemProps {
	slug: string;
	color: string;
	avatar: string;
	link?: LinkWithAction;
	description: string;
	_onSelected?: (slug: string) => void;
	_selected?: boolean;
	muted?: boolean;
	pinned?: boolean;
	updates?: boolean;
	outdated?: boolean;
	// TODO: remove private props from public types
	_options?: BoardListBlockProps["options"];
	_onPinned?: () => void;
	_onMuted?: () => void;
}

export interface BoardListBlockProps {
	icon: IconProps["icon"];
	title: string;
	selectedBoardSlug?: string | null;
	onSelectBoard: (slug: string) => void;
	onPinBoard: (slug: string) => void;
	onMuteBoard: (slug: string) => void;
	children?: React.ReactNode;
	options: { name: string; link: LinkWithAction }[];
}

export default BoardListBlock;
