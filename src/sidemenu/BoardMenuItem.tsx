import React from "react";

import BoardIcon from "../board/BoardIcon";
import classnames from "classnames";
import { LinkWithAction } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import css from "styled-jsx/css";
import ActionLink from "../buttons/ActionLink";
import DefaultTheme from "../theme/default";

const { className: containerClassname, styles: containerStyles } = css.resolve`
  .board-menu-item {
    display: flex;
    background: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
    border-radius: 15px;
    position: relative;
    text-decoration: none;
    align-items: center;
  }
`;

const BoardMenuItem: React.FC<BoardMenuItemProps> = (props) => {
  const {
    avatar,
    color,
    updates,
    muted,
    slug,
    link,
    outdated,
    current,
  } = props;
  return (
    <ActionLink
      link={link}
      className={classnames(containerClassname, "board-menu-item", {
        "has-updates": !!updates,
        muted: !!muted,
        outdated: !!outdated,
      })}
    >
      <div className="icon">
        <BoardIcon
          avatar={avatar}
          color={color}
          updates={updates}
          muted={muted}
          outdated={outdated}
          small
        />
      </div>
      <div
        className={classnames("slug-container", {
          "has-updates": !!updates,
          muted: !!muted,
          outdated: !!outdated,
        })}
      >
        <span className="slug">!{slug}</span>
        <span className={classnames("current", { hidden: !current })}>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </span>
      </div>
      {containerStyles}
      <style jsx>{`
        .slug-container {
          max-width: calc(100% - 60px);
          padding-left: 5px;
          display: inline-block;
          position: relative;
          display: flex;
          flex-grow: 1;
        }
        .slug {
          color: #969696;
          font-size: var(--font-size-large);
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex-grow: 1;
        }
        .muted .slug {
          text-decoration: line-through;
        }
        .has-updates .slug {
          color: #fff;
        }
        .outdated .slug {
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
    </ActionLink>
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
  loading?: false;
}
