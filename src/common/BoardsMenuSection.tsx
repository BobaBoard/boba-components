import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LinkWithAction } from "types";

import BoardMenuItem from "../board/BoardMenuItem";

const BoardsMenuSection: React.FC<BoardsMenuSectionProps> = ({
  boards,
  title,
  icon,
  emptyTitle,
  emptyDescription,
}) => {
  return (
    <>
      <div className="boardSection">
        <div className="boardSection-title">
          <div className="icon">
            {typeof icon == "string" ? (
              <img src={icon} alt={`${emptyTitle} icon`} />
            ) : (
              <FontAwesomeIcon icon={icon} />
            )}
          </div>
          {title}
        </div>
        {boards && boards.length ? (
          boards.map((board, index) => (
            <div className="boardItem" key={`board-item-${index}`}>
              <BoardMenuItem
                avatar={board.avatar}
                color={board.color}
                slug={board.slug}
                updates={board.updates}
                link={board.link}
              />
            </div>
          ))
        ) : (
          <div className="boardSection-empty">
            <p className="emtpy-title">{emptyTitle}</p>
            <p className="empty-desc">{emptyDescription}</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .boardSection-title {
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          line-height: 15px;
          letter-spacing: 1.5px;
          margin-bottom: 15px;
          text-transform: uppercase;
          display: flex;
        }
        .boardSection-title .icon {
          margin-right: 8px;
        }
        .boardSection {
          padding: 12px 10px;
        }
        .boardItem {
          margin-bottom: 10px;
        }
        .boardSection-empty {
          color: #fff;
          font-size: 14px;
          opacity: 0.5;
          text-align: center;
        }
        .boardSection-empty p {
          margin: 0;
          padding: 0;
          line-height: 120%;
        }
        .boardSection-empty .emtpy-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
};

export default BoardsMenuSection;

export interface BoardsMenuSectionProps {
  boards?: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
    updates?: number | boolean;
    muted?: boolean;
    link: LinkWithAction;
  }[];
  title: string;
  icon: string | IconDefinition;
  emptyTitle?: string;
  emptyDescription?: string;
}
