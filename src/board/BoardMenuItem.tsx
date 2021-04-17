import React from "react";

import BoardIcon from "./BoardIcon";
import classnames from "classnames";
import { LinkWithAction } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import css from "styled-jsx/css";
import Color from "color";
import ActionLink from "../common/ActionLink";
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

const BoardMenuItem: React.FC<
  LoadingBoardMenuItemProps | BoardMenuItemProps
> = (props) => {
  if (props.loading) {
    const color = Color(props.accentColor).darken(0.4).hex() || "#bd4faf";
    return (
      <div className={`${containerClassname} board-menu-item`}>
        {containerStyles}
        <style jsx>{`
          .board-menu-item {
            background: linear-gradient(-90deg, ${color}, #2e2e30);
            background-size: 400% 400%;
            animation: GradientBackground 3s ease-out infinite;
            height: 35px;
          }
          @keyframes GradientBackground {
            0% {
              background-position: 30% 50%;
            }

            50% {
              background-position: 80% 50%;
            }

            100% {
              background-position: 30% 50%;
            }
          }
        `}</style>
      </div>
    );
  }

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
        }
        .slug {
          color: #969696;
          font-size: 18px;
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

export interface LoadingBoardMenuItemProps {
  loading: true;
  accentColor?: string;
  readonly link?: undefined;
}

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
