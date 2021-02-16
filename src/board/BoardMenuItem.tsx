import React from "react";

import BoardIcon from "./BoardIcon";
import classnames from "classnames";
import { LinkWithAction } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faMapMarkedAlt,
  faMapMarker,
  faMapMarkerAlt,
  faMapPin,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const BoardMenuItem: React.FC<BoardMenuItemProps> = ({
  avatar,
  color,
  updates,
  muted,
  slug,
  link,
  outdated,
  current,
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
        outdated: !!outdated,
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
      <div className="board-menu-item-slug-container">
        <span className="board-menu-item-slug">!{slug}</span>
        <span className={classnames("current", { hidden: !current })}>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </span>
      </div>
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
        .board-menu-item-slug-container {
          max-width: calc(100% - 60px);
          padding-left: 45px;
          line-height: 35px;
          display: inline-block;
          position: relative;
          display: flex;
        }
        .board-menu-item-slug {
          color: #969696;
          font-size: 18px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex-grow: 1;
        }
        .muted .board-menu-item-slug {
          text-decoration: line-through;
        }
        .board-menu-item.has-updates .board-menu-item-slug {
          color: #fff;
        }
        .board-menu-item.outdated .board-menu-item-slug {
          color: #c7c7c7;
        }
        .current {
          color: #ff0f4b;
          margin-left: 5px;
        }
        .hidden {
          display: none;
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
  current?: boolean;
}
