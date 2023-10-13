import BoardPreview, { DisplayStyle } from "board/BoardPreview";
import DropdownMenu, { DropdownStyle } from "common/DropdownListMenu";
import {
  faClock,
  faEllipsisV,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import BoardIcon from "board/BoardIcon";
import CircleButton from "buttons/CircleButton";
import DefaultTheme from "theme/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HighlightedText from "common/HighlightedText";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { LinkWithAction } from "types";
import React from "react";
import classnames from "classnames";
import { extractCompounds } from "utils/compound-utils";
import fitty from "fitty";
import { hex2rgba } from "utils";

const Slug: React.FC<{
  name: string;
  visible: boolean;
  color: string;
  displayStyle: DisplayStyle;
}> = ({ name, visible, color, displayStyle }) => {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    fitty(ref.current, {
      maxSize: 70,
    });
  }, [ref]);

  return (
    <div
      className={classnames("slug-container", {
        hidden: !visible,
        compact: displayStyle === DisplayStyle.COMPACT,
        regular: displayStyle === DisplayStyle.REGULAR,
        mini: displayStyle === DisplayStyle.MINI,
      })}
    >
      {displayStyle === DisplayStyle.REGULAR ? (
        <HighlightedText highlightColor={color}>
          <span className="slug">!{name}</span>
        </HighlightedText>
      ) : (
        <span ref={ref}>!{name}</span>
      )}
      <style jsx>{`
        .slug-container {
          height: 100%;
          color: white;
          font-size: 50px;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
          margin: 0 auto;
        }
        .slug {
          max-width: 100%;
          text-overflow: ellipsis;
          display: inline-block;
          overflow: hidden;
          box-sizing: border-box;
        }
        .slug-container.compact,
        .slug-container.mini {
          top: 0;
          width: 100%;
          position: absolute;
          border: 3px ${color} solid;
          background-color: ${hex2rgba(color, 0.2)};
          border-radius: 15px;
          pointer-events: none;
        }
        .slug-container.hidden {
          display: none;
        }
        .slug-container.regular {
          margin-bottom: -15px;
          font-size: 30px;
          max-width: 90%;
        }
        .slug-container.mini span {
          display: none !important;
        }
        .slug-container.regular span:hover {
          filter: invert(100%);
        }
        .slug-container.regular span {
          font-weight: bold;
          border-radius: 15px;
          padding: 5px 15px;
        }
        .slug-container.compact span {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          text-overflow: ellipsis;
          width: 100%;
          overflow: hidden;
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

const Empty: React.FC<unknown> = ({ children }) => <p>{children}</p>;

const Item = ({
  slug,
  avatar,
  color,
  description,
  _selected,
  _onSelected,
  options,
  updates,
  muted,
  outdated,
}: ItemProps) => (
  <>
    <div className="item-summary-container">
      <div className="rias-board-icon">
        <BoardIcon
          avatar={avatar}
          color={color}
          updates={updates}
          muted={muted}
          outdated={outdated}
          large
        />
      </div>
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
        <BoardPreview
          slug={slug}
          avatar={avatar}
          description={description}
          color={color}
          muted={muted}
          displayStyle={DisplayStyle.MINI}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <HighlightedText highlightColor={color}>
            <span className="slug">!{slug}</span>
          </HighlightedText>
          <div className="description">{description}</div>
          <div className="footer">
            <div className="controls">
              <CircleButton icon={{ icon: faHome }} />
              <CircleButton icon={{ icon: faClock }} />
            </div>
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
      .image {
        grid-area: image;
      }
      .footer {
        grid-area: footer;
      }
      .description {
        grid-area: description;
      }

      .slugsy {
        grid-area: slugsy;
        height: min-content;
      }

      .slugsy * {
        height: min-content;
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
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr;
        padding: 20px 10px;
        grid-template-areas: "image slugsy" "image description" "image footer";
      }
      .item-summary-container {
        display: flex;
        justify-content: space-between;
        justify-self: stretch;
        align-self: center;
        border-radius: 15px;
        background-color: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
      }
      .rias-board-icon {
        flex: initial;
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
            const ItemWithFunction = React.cloneElement(item, {
              ...item.props,
              _selected: item.props.slug === props.selectedBoardSlug,
              _onSelected: () => props.onSelectBoard(item.props.slug),
              options: props.options,
            });
            return ItemWithFunction;
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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
}

export interface BoardListBlockProps {
  icon: string | IconProp;
  title?: string;
  selectedBoardSlug?: string | null;
  onSelectBoard: (slug: string) => void;
  children?: React.ReactNode;
  options: { name: string; link: LinkWithAction }[];
}

export default BoardListBlock;
