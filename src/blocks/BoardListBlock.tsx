import BoardIcon from "board/BoardIcon";
import DropdownMenu from "common/DropdownListMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkWithAction } from "types";
import React from "react";
import { extractCompounds } from "utils/compound-utils";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Empty: React.FC<unknown> = ({ children }) => <p>{children}</p>;

const Item = ({
  slug,
  avatar,
  color,
  description,
  _selected,
  _onSelected,
  options,
}: ItemProps) => (
  <>
    <div className="item-summary-container" style={{ border: "2px solid red" }}>
      <div className="rias-board-icon">
        <BoardIcon avatar={avatar} color={color} large />
      </div>
      <button
        onClick={() => _onSelected?.(slug)}
        className="slug-container"
        style={{ border: "3px solid green" }}
      >
        <span className="slug">!{slug}</span>
      </button>
      {options.length !== 0 && (
        <DropdownMenu
          options={options}
          zIndex={200}
          label="board list options"
          buttonClassName="insanity"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </DropdownMenu>
      )}
    </div>
    {_selected && (
      <p className="item-details" style={{ border: "2px solid blueviolet" }}>
        {description}
      </p>
    )}
    <style jsx>{`
      * {
        box-sizing: border-box;
        text-align: center;
      }
      :global(.insanity) {
        background-color: red !important;
        min-width: 55px;
        min-height: 100%;
      }
      .item-details {
        grid-column: -1 / 1;
        border-radius: 12px;
        background-color: #dddd;
        height: 10rem;
        justify-self: stretch;
        align-self: stretch;
      }
      .item-summary-container {
        display: flex;
        justify-content: space-between;
        justify-self: stretch;
        align-self: center;
      }
      .rias-board-icon {
        flex: initial;
      }

      .slug-container {
        flex-grow: 1;
      }

       {
        /*       
      .item-container {
        display: flex;
        justify-content: stretch;
        align-items: stretch;
        border-radius: 12px;
        background-color: rgba(0, 255, 255, 0.366);
      }
      .board-list-options {
        padding: 0 1rem;
      }
      .board-list-options:hover {
        cursor: pointer;
      }
      .board-icon {
      }
      .options-button {
        flex: "initial";
      }
      .slug-container {
        max-width: calc(100% - 40px);
        position: relative;
        flex-grow: 1;
        display: flex;
        justify-content: stretch;
        align-items: stretch;
      }
      .slug {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-grow: 1;
      } */
      }
    `}</style>
  </>
);

const BoardListBlock: BoardListBlockCompound = (props: BoardListBlockProps) => {
  const items = extractCompounds(props.children, Item);
  const empty = extractCompounds(props.children, Empty);

  return (
    <>
      {props.title && <h2>{props.title}</h2>}
      {items.length === 0 && empty}

      {items.length !== 0 && (
        <div
          className="list-container"
          style={{ border: "2px solid chocolate" }}
        >
          {items.map((item) => {
            const ItemWithFunction = React.cloneElement(item, {
              ...item.props,
              _selected: item.props.slug === props.selectedBoardSlug,
              _onSelected: () => props.onSelectBoard(item.props.slug),
              options: props.options,
            });
            return ItemWithFunction;
          })}
          <style jsx>{`
            .list-container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 16px;
              background-color: #cccc;
              grid-auto-flow: dense;
              max-width: 1200px;
              margin: 0 auto;
              gap: 1rem;
            }
          `}</style>
        </div>
      )}
    </>
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
  description?: string;
  _onSelected?: (slug: string) => void;
  _selected?: boolean;
  options: { name: string; link: LinkWithAction }[];
}

export interface BoardListBlockProps {
  icon?: string;
  title?: string;
  selectedBoardSlug?: string | null;
  onSelectBoard: (slug: string) => void;
  children?: React.ReactNode;
  options: { name: string; link: LinkWithAction }[];
}

export default BoardListBlock;
