import DropdownMenu from "common/DropdownListMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkWithAction } from "types";
import React from "react";
import classnames from "classnames";
import { extractCompounds } from "utils/compound-utils";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Empty: React.FC<unknown> = ({ children }) => <p>{children}</p>;

const Item = ({
  slug,
  description,
  _selected,
  _onSelected,
  options,
}: ItemProps) => (
  <>
    <button className="slug-container" onClick={() => _onSelected?.(slug)}>
      !{slug}
    </button>
    {options.length !== 0 && (
      <DropdownMenu options={options} zIndex={200} label="board list options">
        <div className={classnames("board-filter-options")}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
      </DropdownMenu>
    )}
    {_selected && <p className="item-details">{description}</p>}
    <style jsx>{`
      .board-filter-options {
        padding: 0 1rem;
      }
      .board-filter-options:hover {
        cursor: pointer;
      }
    `}</style>
  </>
);

const BoardListBlock: BoardListBlockCompound = (props: BoardListBlockProps) => {
  const items = extractCompounds(props.children, Item);
  const empty = extractCompounds(props.children, Empty);

  return (
    <>
      <h2>{props.title}</h2>
      {items.length === 0 && empty}
      {items.map((item) => {
        const ItemWithFunction = React.cloneElement(item, {
          ...item.props,
          _selected: item.props.slug === props.selectedBoardSlug,
          _onSelected: () => props.onSelectBoard(item.props.slug),
          options: props.options,
        });

        return ItemWithFunction;
      })}
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
