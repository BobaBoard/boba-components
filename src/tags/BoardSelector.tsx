import { BoardDataType } from "types";
import DropdownMenu from "common/DropdownListMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export interface BoardSelectorProps {
  availableBoards: BoardDataType[];
  selectedBoard: BoardDataType;
  onBoardSelected: (slug: BoardDataType) => void;
}

const { styles: buttonStyles, className: buttonClassName } = css.resolve`
  width: 100%;
  flex-shrink: 1;
`;

const BoardSelector: React.FC<BoardSelectorProps> = (props) => {
  const [filter, setFilter] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <DropdownMenu
      options={props.availableBoards
        ?.filter(
          (board) =>
            filter === "" ||
            board.slug.toLowerCase().includes(filter.toLowerCase())
        )
        .map((board) => ({
          name: `!${board.slug}`,
          icon: board.avatar,
          color: board.color,
          link: {
            onClick: () => {
              setFilter("");
              props.onBoardSelected?.(board);
            },
          },
        }))}
      onOpen={() => {
        inputRef.current?.focus();
      }}
      zIndex={200}
      buttonClassName={buttonClassName}
    >
      <DropdownMenu.Header>
        <div className="filter">
          <input
            placeholder="Filter boards"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            ref={inputRef}
          />
          <style jsx>{`
            .filter {
              padding: 5px;
              position: relative;
              border-bottom: 1px solid #131518;
              display: flex;
              width: 100%;
              justify-content: space-between;
              box-sizing: border-box;
            }
            .filter input {
              color: #2e2e30;
              font-size: var(--font-size-regular);
              line-height: 16px;
              padding: 3px 10px;
              width: 100%;
              border: 1px solid transparent;
            }
            .filter input:focus {
              outline: none;
              border: 1px rgba(255, 255, 255, 0.8) solid;
            }
          `}</style>
        </div>
      </DropdownMenu.Header>
      <div className="board-selector">
        <span
          className="symbol"
          style={{
            backgroundImage: `url(${
              props.availableBoards?.find(
                (board) => props.selectedBoard.slug === board.slug
              )?.avatar
            })`,
            borderColor: props.availableBoards?.find(
              (board) => props.selectedBoard.slug === board.slug
            )?.color,
          }}
        />
        <span className="name">!{props.selectedBoard.slug}</span>
        <div className={classnames("dropdown")}>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        <style jsx>{`
          .board-selector {
            padding-right: 5px;
            border-radius: 5px;
            font-size: var(--font-size-small);
            position: relative;
            border-radius: 15px;
            background-color: #2e2e30;
            border: 2px solid #2e2e30;
            color: white;
            display: flex;
            align-items: center;
          }
          .symbol {
            height: 18px;
            width: 18px;
            border-radius: 50%;
            display: inline-block;
            text-align: center;
            line-height: 20px;
            margin-right: 5px;
            border: 2px solid red;
            background-position: center;
            background-size: cover;
            flex-shrink: 0;
          }
          .name {
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .dropdown {
            background-color: transparent;
            border: 0;
            color: white;
            padding-left: 5px;
            flex-shrink: 0;
          }
        `}</style>
        {buttonStyles}
      </div>
    </DropdownMenu>
  );
};

export default BoardSelector;
