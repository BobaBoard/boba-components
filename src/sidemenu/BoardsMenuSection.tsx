import BoardMenuItem from "./BoardMenuItem";
import { BoardType } from "../types";
import DefaultTheme from "../theme/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import LoadingPlaceholder from "../common/LoadingPlaceholder";
import React from "react";
import classnames from "classnames";

const BoardsMenuSection: React.FC<BoardsMenuSectionProps> = (props) => {
  const { boards, title, icon, currentBoardSlug } = props as BoardsSectionProps;
  const { emptyTitle, emptyDescription } = props as EmptySectionProps;
  const { loading, placeholdersCount, accentColor } =
    props as LoadingSectionProps;
  const isEmpty = !loading && (!boards || boards.length == 0);
  return (
    <section>
      <div className="title">
        <div className="icon">
          {typeof icon == "string" ? (
            <img src={icon} alt={`${emptyTitle} icon`} />
          ) : (
            <FontAwesomeIcon icon={icon} />
          )}
        </div>
        {title}
      </div>
      <div className="display">
        <div
          className={classnames("board-items", {
            visible: !loading && boards && boards?.length > 0,
          })}
          key="items-section"
        >
          {boards?.map((board, index) => (
            <div className="boardItem" key={`board-item-${index}`}>
              <BoardMenuItem
                avatar={board.avatar}
                color={board.color}
                slug={board.slug}
                updates={board.updates}
                link={board.link}
                muted={board.muted}
                outdated={board.outdated}
                current={board.slug === currentBoardSlug}
              />
            </div>
          ))}
        </div>
        <div
          aria-busy="true"
          className={classnames("board-items", {
            visible: loading,
            hidden: isEmpty,
          })}
          key="loading-items-section"
        >
          {Array.from({ length: placeholdersCount || 0 }).map((_, index) => (
            <div
              className="boardItem"
              aria-label="board is loading"
              key={`board-item-${index}`}
            >
              <LoadingPlaceholder
                key={index}
                accentColor={accentColor || DefaultTheme.DEFAULT_ACCENT_COLOR}
                height="35px"
              />
            </div>
          ))}
        </div>
        <div
          className={classnames("empty", {
            visible: isEmpty,
          })}
          key="empty-section"
        >
          <p className="emtpy-title">{emptyTitle}</p>
          <p className="empty-desc">{emptyDescription}</p>
        </div>
      </div>
      <style jsx>{`
        .title {
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          line-height: 15px;
          letter-spacing: 1.5px;
          margin-bottom: 15px;
          text-transform: uppercase;
          display: flex;
        }
        .title .icon {
          margin-right: 8px;
        }
        section {
          padding: 12px 10px;
        }
        .boardItem {
          margin-bottom: 10px;
        }
        .empty {
          color: #fff;
          font-size: 14px;
          opacity: 0.5;
          text-align: center;
          flex-grow: 1;
          display: none;
        }
        .empty.visible {
          display: block;
        }
        .empty p {
          margin: 0;
          padding: 0;
          line-height: 120%;
        }
        .empty .emtpy-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .board-items {
          display: none;
          flex-grow: 1;
          max-width: 100%;
        }
        .board-items.visible {
          display: block;
        }
        .board-items.hidden {
          display: none;
          max-width: 0px;
        }
        .display {
          display: flex;
        }
      `}</style>
    </section>
  );
};

export default BoardsMenuSection;

export type BoardsMenuSectionProps =
  | BoardsSectionProps
  | EmptySectionProps
  | LoadingSectionProps;

export interface BaseSectionProps {
  title: string;
  icon: string | IconProp;
}
export interface BoardsSectionProps extends BaseSectionProps {
  boards: BoardType[];
  currentBoardSlug?: string | null;
}
export interface EmptySectionProps extends BaseSectionProps {
  emptyTitle: string;
  emptyDescription: string;
}
export interface LoadingSectionProps extends BaseSectionProps {
  loading: boolean;
  placeholdersCount: number;
  accentColor: string;
}
