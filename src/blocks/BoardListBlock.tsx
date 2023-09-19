import React from "react";
import { extractCompounds } from "utils/compound-utils";

// Create all the subcomponents
const Empty = (props: EmptyProps) => <p>{props.placeholder}</p>;
const Item = (props: ItemProps) => {
  const handleClick = () => {
    window.alert(`${props.slug}`);
    props.setSelectedBoardSlug(`${props.slug}`);
  };
  return <p onClick={handleClick}>{props.slug}</p>;
};
const Details = (props: DetailsProps) => (
  <>
    <p>{props.selectedBoardSlug}</p>
    <p>{props.description}</p>
  </>
);

// Create the Layout components
const BoardListBlock: BoardListBlockCompound = (props: BoardListBlockProps) => {
  const items = extractCompounds(props.children, Item);
  const details = extractCompounds(props.children, Details);

  const [selectedBoardSlug, setSelectedBoardSlug] = React.useState("None");

  return (
    <>
      <h2>{props.title}</h2>
      {!items.length && <BoardListBlock.Empty placeholder="tis nothing here" />}
      {items}
      {details}
    </>
  );
};

type BoardListBlockCompound = React.FC<BoardListBlockProps> & {
  Empty: React.FC<EmptyProps>;
  Item: React.FC<ItemProps>;
  Details: React.FC<DetailsProps>;
};

export interface EmptyProps {
  placeholder: string;
}

export interface ItemProps {
  slug: string;
  selectedBoardSlug: string;
  setSelectedBoardSlug: React.Dispatch<React.SetStateAction<string>>;
}

export interface DetailsProps {
  slug: string;
  description: string;
  selectedBoardSlug: string;
}

export interface BoardListBlockProps {
  icon: string;
  title: string;
  selectedBoardSlug: string;
  children: React.ReactNode[];
}

// Add the subcomponents as the same-named property of the
// compound.
BoardListBlock.Empty = Empty;
BoardListBlock.Item = Item;
BoardListBlock.Details = Details;

export default BoardListBlock;
