import React from "react";
import classnames from "classnames";
import { hex2rgba } from "../utils";

import HighlightedText from "../common/HighlightedText";

const DEFAULT_COLOR = "#000000";

export enum DisplayStyle {
  REGULAR,
  COMPACT,
  MINI,
}

const Slug: React.FC<{
  name: string;
  visible: boolean;
  color: string;
  displayStyle: DisplayStyle;
}> = ({ name, visible, color, displayStyle }) => {
  return (
    <div
      className={classnames("slug-container", {
        hidden: !visible,
        compact: displayStyle == DisplayStyle.COMPACT,
        regular: displayStyle == DisplayStyle.REGULAR,
        mini: displayStyle == DisplayStyle.MINI,
      })}
    >
      {displayStyle == DisplayStyle.REGULAR ? (
        <HighlightedText highlightColor={color}>
          <span>!{name}</span>
        </HighlightedText>
      ) : (
        <span>!{name}</span>
      )}
      <style jsx>{`
        .slug-container {
          height: 100%;
          color: white;
          font-size: 50px;
          box-sizing: border-box;
          max-width: 350px;
          text-align: center;
          cursor: pointer;
        }
        .slug-container.compact,
        .slug-container.mini {
          top: 0;
          width: 100%;
          position: absolute;
          border: 3px ${color} solid;
          background-color: ${hex2rgba(color, 0.2)};
          border-radius: 15px;
        }
        .slug-container.hidden {
          display: none;
        }
        .slug-container.regular {
          margin-bottom: -15px;
          font-size: 30px;
        }
        .slug-container.mini span {
          display: none;
        }
        .slug-container.regular span:hover {
          filter: invert(100%);
        }
        .slug-container.regular span {
          font-weight: bold;
          border-radius: 15px;
          padding: 5px 15px;
        }
        .slug-container.compact span {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
        }
      `}</style>
    </div>
  );
};

const Description: React.FC<{
  description: string;
  visible: boolean;
  color: string;
  displayStyle: DisplayStyle;
}> = ({ description, visible, color, displayStyle }) => {
  return (
    <div
      className={classnames("description-container", {
        compact: displayStyle == DisplayStyle.COMPACT,
        regular: displayStyle == DisplayStyle.REGULAR,
        mini: displayStyle == DisplayStyle.MINI,
        hidden: !visible,
      })}
    >
      <span>{description}</span>
      <style jsx>{`
        .description-container {
          height: 100%;
          color: white;
          font-size: 30px;
          position: relative;
          display: block;
          box-sizing: border-box;
          max-width: 350px;
          text-align: left;
        }
        .description-container.hidden {
          display: none;
        }
        .description-container.compact {
          cursor: pointer;
          top: 0;
          width: 100%;
          position: absolute;
          border: 3px ${color} solid;
          text-align: center;
          background-color: ${hex2rgba(color, 0.3)};
          border-radius: 15px;
        }
        .description-container.regular {
          font-size: 20px;
        }
        .description-container.regular span {
          background-color: #2f2f30;
          color: ${color};
          border-radius: 15px;
          padding: 15px;
          padding-top: 25px;
          display: block;
          margin-top: 0px;
          font-size: 18px;
        }
        .description-container.mini span {
          display: none;
        }
        .description-container.compact span {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          width: 100%;
          padding: 25px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

const BoardPreview: React.FC<BoardPreviewProps> = ({
  slug,
  avatar,
  displayStyle,
  description,
  onClick,
  children,
  color,
  updates,
  backgroundColor,
}) => {
  const [showDescription, setShowDescription] = React.useState(false);
  const chosenColor = color || DEFAULT_COLOR;
  displayStyle = displayStyle || DisplayStyle.REGULAR;
  return (
    <div
      className={classnames("container", {
        compact: displayStyle == DisplayStyle.COMPACT,
        regular: displayStyle == DisplayStyle.REGULAR,
        mini: displayStyle == DisplayStyle.MINI,
      })}
      onMouseEnter={() => {
        setShowDescription(true);
      }}
      onMouseLeave={() => {
        setShowDescription(false);
      }}
    >
      <div className="board-header">
        <div
          className={classnames("board-image", {
            compact: displayStyle == DisplayStyle.COMPACT,
            regular: displayStyle == DisplayStyle.REGULAR,
            mini: displayStyle == DisplayStyle.MINI,
          })}
          onClick={onClick}
        >
          {updates && <div className="updates">{updates}</div>}
        </div>
        <Slug
          name={slug}
          visible={!showDescription || displayStyle == DisplayStyle.REGULAR}
          displayStyle={displayStyle}
          color={chosenColor}
        />
        <Description
          description={description}
          visible={showDescription || displayStyle == DisplayStyle.REGULAR}
          displayStyle={displayStyle}
          color={chosenColor}
        />
      </div>
      <div className={classnames("preview-footer", { hidden: !children })}>
        {children}
      </div>
      <style jsx>{`
        .container {
          display: inline-block;
          min-width: 250px;
          max-width: 350px;
        }
        .container.compact,
        .container.mini {
          cursor: pointer;
        }
        .container.compact {
          min-width: 200px;
        }
        .container.mini {
          min-width: 0;
        }
        .board-header{
          position: relative;
        }
        .container.mini .board-header {
          height: 65px;
          width: calc((16/9) * 65px);
        }
        .board-header::before {
          display: block;
          content: "";
          width: 100%;
          padding-top: calc((9 / 16) * 100%);
          position:absolute;
        }
        .tooltip-content {
          padding: 15px;
          position: relative;
          z-index: 15;
        }
        .board-image {
            position: relative;
            background: url("${avatar}");
            background-size: cover;
            background-position: center;
            height: 150px;
            border-radius: 15px;
            border: 3px ${chosenColor} solid;
            box-sizing: border-box;
            border-radius: 15px;
        }
        .board-image.mini {
          height: 65px;
          width: calc((16/9) * 65px);
        }
        .board-image.regular {
            margin-bottom: 15px;
        }
        .preview-footer {
            display: flex;
            justify-content: space-evenly;
            margin-top: 5px;
            max-width: 350px;
        }
        .preview-footer.hidden {
          display: none;
        }
        .updates {
          color: white;
          font-size: 15px;
          background-color: ${chosenColor};
          z-index: 10;
          border-radius: 50%;
          /* display: inline-block; */
          /* padding: 100%; */
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          position: absolute;
          bottom: -10px;
          right: -10px;
          border: 5px solid ${backgroundColor || "#2f2f30"};
        }
        .board-image.mini .updates {
          width: 25px;
          height: 25px;
          line-height: 25px;
          border-width: 3px;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
};

export interface BoardPreviewProps {
  slug: string;
  avatar: string;
  description: string;
  displayStyle?: DisplayStyle;
  color?: string;
  backgroundColor?: string;
  onClick?: () => void;
  updates?: number;
}

export default BoardPreview;
