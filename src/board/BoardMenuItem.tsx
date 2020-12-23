import React from "react";

import BoardIcon from "./BoardIcon";
import classnames from "classnames";
import { LinkWithAction } from "types";

const BoardMenuItem: React.FC<BoardMenuItemProps> = ({
  avatar,
  color,
  updates,
  muted,
  slug,
  link,
  outdated,
}) => {
  return (
    <a
      onClick={React.useCallback(
        (e) => {
          link.onClick?.();
          if (link.onClick) {
            e.preventDefault();
          }
        },
        [link]
      )}
      href={link.href}
      className={classnames("board-menu-item", {
        "has-updates": !!updates,
        muted: !!muted,
      })}
    >
      <div className="board-menu-item-icon">
        <BoardIcon
          avatar={avatar}
          color={color}
          updates={updates}
          muted={muted}
          outdated={outdated}
          small
        />
      </div>
      <span className="board-menu-item-slug">!{slug}</span>
      <style jsx>{`
        .board-menu-item {
          display: block;
          background: #2e2e30;
          border-radius: 15px;
          height: 35px;
          position: relative;
          text-decoration: none;
        }
        .board-menu-item-icon {
          position: absolute;
        }
        .board-menu-item-slug {
          color: #bfbfbf;
          font-size: 18px;
          font-weight: bold;
          line-height: 35px;
          padding-left: 45px;
          max-width: calc(100% - 65px);
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          white-space: nowrap;
        }
        .muted .board-menu-item-slug {
          text-decoration: line-through;
        }
        .board-menu-item.has-updates .board-menu-item-slug {
          color: #fff;
        }
      `}</style>
    </a>
  );
};

export default BoardMenuItem;

export interface BoardMenuItemProps {
  avatar: string;
  color: string;
  updates?: number | boolean;
  slug: string;
  link: LinkWithAction;
  muted?: boolean;
  outdated?: boolean;
}
