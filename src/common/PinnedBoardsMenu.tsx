import React from "react";
import { LinkWithAction } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

import BoardIcon from "../board/BoardIcon";

const PinnedBoardsMenu: React.FC<PinnedBoardsMenuProps> = ({ boards }) => {
  return (
    <>
      <div className="board-pinned">
        <div className="pin-icon">
          <FontAwesomeIcon icon={faThumbtack} />
        </div>
        {boards?.map((board, index) => (
          <div className="single-board" key={`single-board-${index}`}>
            <a
              onClick={(e) => {
                board.link?.onClick?.();
                if (board.link?.onClick) {
                  e.preventDefault();
                }
              }}
              href={board.link?.href}
            >
              <BoardIcon
                avatar={board.avatar}
                color={board.color}
                link={board.link}
                updates={board.updates}
                large
              />
            </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        .board-pinned {
          background: #131518;
          width: 65px;
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          scrollbar-width: none;
        }
        .board-pinned::-webkit-scrollbar {
          display: none;
        }
        .pin-icon {
          display: block;
          margin-top: 12px;
          color: white;
          text-align: center;
        }
        .pin-icon :global(svg) {
          height: 15px;
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
