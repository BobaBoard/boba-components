import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BoardType } from "types";

import BoardIcon from "../board/BoardIcon";
import DefaultTheme from "../theme/default";

const PinnedBoardsMenu: React.FC<PinnedBoardsMenuProps> = ({
  boards,
  currentBoardSlug,
}) => {
  return (
    <>
      <div className="thumbtack">
        <FontAwesomeIcon icon={faThumbtack} />
      </div>
      <div className="board-pinned">
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
                muted={board.muted}
                updates={board.updates}
                outdated={board.outdated}
                current={board.slug === currentBoardSlug}
                large
              />
            </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        .board-pinned {
          background: ${DefaultTheme.PINNED_BAR_BACKGROUND};
          width: ${DefaultTheme.PINNED_BAR_WIDTH_PX}px;
          height: 100%;
          scrollbar-width: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .board-pinned::-webkit-scrollbar {
          display: none;
        }
        .thumbtack {
          text-align: center;
          padding-top: 15px;
        }
        .pin-icon {
          display: block;
          margin-top: 12px;
          color: ${DefaultTheme.PINNED_BAR_TEXT_COLOR};
          text-align: center;
        }
        .pin-icon :global(svg) {
          height: 15px;
        }
        .single-board {
          padding: 15px 7px 0;
        }
        .single-board:last-child {
          padding-bottom: 15px;
        }

        @media only screen and (max-width: 600px) {
          .board-pinned {
            height: 100vh;
          }
        }
      `}</style>
    </>
  );
};

export default PinnedBoardsMenu;

export interface PinnedBoardsMenuProps {
  boards?: BoardType[];
  currentBoardSlug?: string | null;
}
