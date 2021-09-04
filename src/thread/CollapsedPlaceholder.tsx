import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import DefaultTheme from "../theme/default";
import { lightenColor } from "../utils";
import ActionLink from "../buttons/ActionLink";
import classnames from "classnames";
import css from "styled-jsx/css";
import { LinkWithAction } from "types";

interface CollapsedPlaceholderProps {
  onUncollapseClick: LinkWithAction;
  onLoadBefore?: LinkWithAction;
  onLoadAfter?: LinkWithAction;
  accentColor?: string;
}

const getLoadMoreStyle = (props: {
  accentColor: string;
  hoverColor: string;
}) => css.resolve`
  .container {
    height: 30px;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
    width: 100%;
  }
  .container.top {
    top: -12px;
  }
  .container.bottom {
    bottom: -12px;
  }
  .button {
    color: white;
    background-color: ${props.accentColor};
    display: block;
    width: fit-content;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    z-index: 3;
    position: absolute;
    text-align: center;
    left: 50%;
  }
  .button:hover {
    background-color: ${props.hoverColor};
    cursor: pointer;
  }
  .bottom .button {
    bottom: 0;
    transform: translateX(-50%);
  }
  .top .button {
    top: 0;
    transform: translateX(-50%);
  }
  .icon {
    color: ${DefaultTheme.LAYOUT_BOARD_BACKGROUND_COLOR};
    position: absolute;
    left: 0;
    width: 24px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const CollapsedPlaceholder: React.FC<CollapsedPlaceholderProps> = (props) => {
  const stemHoverColor = lightenColor(
    props.accentColor || DefaultTheme.INDENT_COLORS[0],
    0.07
  );
  const {
    styles: loadMoreStyle,
    className: loadMoreClassName,
  } = getLoadMoreStyle({
    accentColor: props.accentColor || DefaultTheme.INDENT_COLORS[0],
    hoverColor: stemHoverColor,
  });
  return (
    <div
      className={classnames("collapsed-placeholder-container", {
        "with-before": props.onLoadBefore,
        "with-after": props.onLoadAfter,
      })}
    >
      {props.onLoadBefore && (
        <ActionLink
          className={classnames(loadMoreClassName, "container", "top")}
          link={props.onLoadBefore}
        >
          <span className={classnames(loadMoreClassName, "button")}>
            <FontAwesomeIcon
              className={classnames(loadMoreClassName, "icon")}
              icon={faAngleDown}
            />
          </span>
        </ActionLink>
      )}
      <div
        className={classnames("collapsed-placeholder")}
        onClick={props.onUncollapseClick.onClick}
      >
        <div className="icon">
          <FontAwesomeIcon icon={faAngleUp} />
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <div className="text">{props.children}</div>
        <button className="view-all">View All</button>
      </div>{" "}
      {props.onLoadAfter && (
        <ActionLink
          className={classnames(loadMoreClassName, "container", "bottom")}
          link={props.onLoadAfter}
        >
          <span className={classnames(loadMoreClassName, "button")}>
            <FontAwesomeIcon
              className={classnames(loadMoreClassName, "icon")}
              icon={faAngleUp}
            />
          </span>
        </ActionLink>
      )}
      {loadMoreStyle}
      <style jsx>{`
        .collapsed-placeholder-container {
          position: relative;
        }
        .collapsed-placeholder-container.with-before {
          margin-top: 12px;
        }
        .collapsed-placeholder-container.with-after {
          margin-bottom: 12px;
        }
        .collapsed-placeholder {
          background-color: #464646;
          border-radius: 15px;
          display: flex;
          padding: 10px 15px;
          align-items: center;
          text-align: left;
          padding-top: 12px;
          padding-bottom: 12px;
        }
        .collapsed-placeholder-container.with-before.with-after
          .collapsed-placeholder {
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
              32px circle at top 16px left 50%,
              transparent 50%,
              black 51%
            );
          mask-position: 0px -16px;
          mask-size: 100% 100%;
        }
        .collapsed-placeholder-container.with-before:not(.with-after)
          .collapsed-placeholder {
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
              32px circle at top 0px left 50%,
              transparent 50%,
              black 51%
            );
          mask-size: 100% 100%;
        }
        .collapsed-placeholder-container.with-after:not(.with-before)
          .collapsed-placeholder {
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
              32px circle at bottom 0px left 50%,
              transparent 50%,
              black 51%
            );
          mask-size: 100% 100%;
        }
        .icon {
          padding-right: 10px;
          color: #e8e8e8;
          position: relative;
        }
        .collapsed-placeholder:hover {
          cursor: pointer;
        }
        .icon :global(svg):first-child {
          margin-bottom: 10px;
        }
        .icon :global(svg):last-child {
          position: absolute;
          left: 0;
          top: 0.7em;
        }
        .text {
          color: white;
          flex-grow: 1;
        }
        .view-all {
          flex-shrink: 0;
          font-size: 14px;
          text-decoration: underline;
          color: ${props.accentColor || DefaultTheme.INDENT_COLORS[0]};
          border: 0;
          background-color: transparent;
        }
        .collapsed-placeholder:hover .view-all {
          cursor: pointer;
          color: ${stemHoverColor};
        }
        .view-all:focus {
          outline: none;
        }
        .view-all:focus-visible {
          outline: auto;
        }
      `}</style>
    </div>
  );
};

export default CollapsedPlaceholder;
