import React from "react";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import DropdownMenu from "../common/DropdownListMenu";

export interface BoardSelectorProps {
  availableBoards: {
    slug: string;
    avatar: string;
    color: string;
  }[];
  selectedBoard: string;
  onBoardSelected: (slug: string) => void;
}
const BoardSelector: React.FC<BoardSelectorProps> = (props) => {
  return (
    <DropdownMenu
      options={props.availableBoards?.map((board) => ({
        name: `!${board.slug}`,
        icon: board.avatar,
        color: board.color,
        link: {
          onClick: () => props.onBoardSelected?.(board.slug),
        },
      }))}
      zIndex={200}
    >
      <div className="board-selector">
        <span
          className="symbol"
          style={{
            backgroundImage: `url(${
              props.availableBoards?.find(
                (board) => props.selectedBoard == board.slug
              )?.avatar
            })`,
            borderColor: props.availableBoards?.find(
              (board) => props.selectedBoard == board.slug
            )?.color,
          }}
        />
        <span className="name">!{props.selectedBoard}</span>
        <div className={classnames("dropdown")}>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>{" "}
        <style jsx>{`
          .board-selector {
            padding-right: 5px;
            border-radius: 5px;
            font-size: smaller;
            position: relative;
            border-radius: 15px;
            background-color: #2e2e30;
            border: 2px solid #2e2e30;
            color: white;
            display: flex;
            align-items: center;
            width: 130px;
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
      </div>
    </DropdownMenu>
  );
};

export default BoardSelector;
