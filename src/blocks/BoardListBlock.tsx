import React from "react";
import { extractCompounds } from "utils/compound-utils";

const Empty: React.FC<unknown> = ({ children }) => <p>{children}</p>;

const Item = ({ slug, description, _selected, _onSelected }: ItemProps) => (
  <>
    <p onClick={() => _onSelected?.(slug)}>!{slug}</p>
    {_selected && <p>{description}</p>}
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
        });

        return ItemWithFunction;
      })}
    </>
  );
};

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
}

export interface BoardListBlockProps {
  icon?: string;
  title?: string;
  selectedBoardSlug?: string;
  onSelectBoard: (slug: string) => void;
  children?: React.ReactNode;
}

BoardListBlock.Empty = Empty;
BoardListBlock.Item = Item;

export default BoardListBlock;
