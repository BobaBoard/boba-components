import React from "react";
import { LinkWithAction } from "types";

import BoardIcon from "../board/BoardIcon";
import PinIcon from "../images/pin.svg";

const PinnedBoardsMenu: React.FC<PinnedBoardsMenuProps> = ({ boards }) => {
  return (
    <>
      <div className="board-pinned">
        <img className="pin-icon" src={PinIcon} alt="pin" />
        {boards?.map((board, index) => (
          <div
            className="single-board"
            key={`single-board-${index}`}
            onClick={board.link?.onClick}
          >
            <BoardIcon
              avatar={board.avatar}
              color={board.color}
              href={board.link?.href}
              updates={board.updates}
              large
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .board-pinned {
          background: #131518;
          width: 65px;
          height: 100%;
          position: absolute;
          top: 0;
        }
        .pin-icon {
          display: block;
          margin: auto;
          padding-top: 12px;
        }
        .single-board {
          padding: 15px 7px 0;
        }
      `}</style>
    </>
  );
};

export default PinnedBoardsMenu;

export interface PinnedBoardsMenuProps {
  boards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number;
    muted?: boolean;
    link: LinkWithAction;
  }[];
}
