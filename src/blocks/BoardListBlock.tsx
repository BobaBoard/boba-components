import {
  faEllipsisV,
  faThumbTack,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import BoardPreview, { DisplayStyle } from "board/BoardPreview";
import DropdownMenu, { DropdownStyle } from "common/DropdownListMenu";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  options,
  updates,
  muted,
  outdated,
  _onPinned,
  _onMuted,
}: ItemProps) => (
  <>
    <div className="item-summary-container">
      <ActionLink link={link}>
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
          "with-options": !!options.length,
        })}
      >
        <span className="slug">!{slug}</span>
      </button>
      {options.length !== 0 && (
        <DropdownMenu
          options={options}
          zIndex={200}
          label="board list options"
          buttonClassName="insanity"
          style={DropdownStyle.DARK}
        >
          <FontAwesomeIcon
            icon={faEllipsisV}
            size="lg"
            color={DefaultTheme.MENU_ITEM_ICON_COLOR}
          />
        </DropdownMenu>
      )}
    </div>
    {_selected && (
      <div className="item-details">
        <div className="img">
          <BoardPreview
            slug={slug}
            avatar={avatar}
            description={description}
            color={color}
            muted={muted}
            displayStyle={DisplayStyle.MINI}
          />
        </div>
        <div className="rest">
          <div className="sluggy">
            <HighlightedText highlightColor={color}>
              <span className="big-slug">!{slug}</span>
            </HighlightedText>
          </div>

          <div className="desc">{description}</div>
          <div className="footer">
            <div className="toggles">
              <CircleButton
                icon={{ icon: faThumbTack }}
                defaultBorderColor={color}
                className="pin"
                link={{ onClick: _onPinned }}
              />
              <CircleButton
                icon={{ icon: muted ? faVolumeMute : faVolumeHigh }}
                defaultBorderColor={color}
                className="mute"
                link={{ onClick: _onMuted }}
              />
            </div>

            <span className="link">
              <ActionLink link={link}>
                Go to Board{" "}
                <FontAwesomeIcon
                  icon={faArrowAltCircleRight}
                  size="lg"
                  color={DefaultTheme.MENU_ITEM_ICON_COLOR}
                />{" "}
              </ActionLink>
            </span>
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
      :global(.insanity) {
        min-width: 45px;
        min-height: 100%;
        border-radius: 0 12px 12px 0;
        background-color: ${DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR};
      }
      .item-details {
        grid-column: -1 / 1;
        border-radius: 12px;
        background-color: ${DefaultTheme.BOARD_FILTER_BACKGROUND};
        color: ${DefaultTheme.MENU_ITEM_ICON_COLOR};
        justify-self: stretch;
        align-self: stretch;
        max-width: 100%;
        padding: 15px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }
      .big-slug {
        color: ${DefaultTheme.PINNED_BAR_TEXT_COLOR};
        font-size: var(--font-size-large);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pin {
        width: 55px;
        max-width: min-content;
      }
      .mute {
        max-width: min-content;
        width: 55px;
      }
      .toggles {
        display: flex;
        justify-content: center;
        gap: 1rem;
      }
      .desc {
        padding: 1rem 1rem 0 1rem;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .rest {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        row-gap: 1rem;
      }
      .rest > * {
        padding: 1rem 1rem 0 1rem;
      }
      .item-summary-container {
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
      }
      .with-options {
        max-width: calc(100% - 60px - 45px);
      }
      .slug {
        color: ${DefaultTheme.PINNED_BAR_TEXT_COLOR};
        font-size: var(--font-size-large);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-grow: 1;
      }
      .muted .slug {
        text-decoration: line-through;
        color: #c7c7c7;
      }
      .has-updates .slug {
        color: #fff;
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
            {typeof props.icon === "string" ? (
              <img src={props.icon} alt="" />
            ) : (
              <FontAwesomeIcon icon={props.icon} />
            )}
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
              options: props.options,
              _onPinned: () => props.onPinBoard(item.props.slug),
              _onMuted: () => props.onMuteBoard(item.props.slug)
            });
            return ItemWithMethods;
          })}
        </div>
      )}
      <style jsx>{`
        * {
          color: white;
        }
        section {
          background-color: ${DefaultTheme.BOARD_MENU_BACKGROUND};
          padding: 24px 20px;
          border-radius: 15px;
        }
        .title {
          color: #fff;
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
  options: { name: string; link: LinkWithAction }[];
  muted?: boolean;
  updates?: number | boolean;
  outdated?: boolean;
  _onLinkedClicked?: () => void;
  _onPinned?: () => void;
  _onMuted?: () => void;
}

export interface BoardListBlockProps {
  icon: string | IconProp;
  title?: string;
  selectedBoardSlug?: string | null;
  onSelectBoard: (slug: string) => void;
  onPinBoard: (slug: string) => void;
  onMuteBoard: (slug: string) => void;
  children?: React.ReactNode;
  options: { name: string; link: LinkWithAction }[];
}

export default BoardListBlock;
