import React from "react";

import BoardIcon from "./BoardIcon";
import classnames from "classnames";
import { LinkWithAction } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import css from "styled-jsx/css";
import Color from "color";

const { className: containerClassname, styles: containerStyles } = css.resolve`
  .board-menu-item {
    display: block;
    background: #2e2e30;
    border-radius: 15px;
    height: 35px;
    position: relative;
    text-decoration: none;
  }
`;

const BoardMenuItem: React.FC<
  LoadingBoardMenuItemProps | BoardMenuItemProps
> = (props) => {
  const onClick = React.useCallback(
    (e) => {
      props.link?.onClick?.();
      if (props.link?.onClick) {
        e.preventDefault();
      }
    },
    [props.link]
  );

  if (props.loading) {
    const color = Color(props.accentColor).desaturate(0.4).hex() || "#bd4faf";
    return (
      <div className={`${containerClassname} board-menu-item`}>
        {containerStyles}
        <style jsx>{`
          .board-menu-item {
            background: linear-gradient(-90deg, ${color}, #2e2e30);
            background-size: 400% 400%;
            animation: GradientBackground 3s ease-out infinite;
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
    <a
      onClick={onClick}
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
      {containerStyles}
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
