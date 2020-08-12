import React from "react";
import classnames from "classnames";
import { hex2rgba } from "../utils";
import fitty from "fitty";

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
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    // @ts-ignore
    fitty(ref.current, {
      maxSize: 80,
    });
  }, [ref.current]);

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
        <span ref={ref}>!{name}</span>
      )}
      <style jsx>{`
        .slug-container {
          height: 100%;
          color: white;
          font-size: 50px;
          box-sizing: border-box;
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
          pointer-events: none;
        }
        .slug-container.hidden {
          display: none;
        }
        .slug-container.regular {
          margin-bottom: -15px;
          font-size: 30px;
        }
        .slug-container.mini span {
          display: none !important;
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
          text-overflow: ellipsis;
          width: 100%;
          overflow: hidden;
          padding: 5px;
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
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current || displayStyle == DisplayStyle.REGULAR) {
      return;
    }
    // @ts-ignore
    fitty(ref.current, {
      maxSize: 80,
    });
  }, [ref.current]);
  return (
    <div
      className={classnames("description-container", {
        compact: displayStyle == DisplayStyle.COMPACT,
        regular: displayStyle == DisplayStyle.REGULAR,
        mini: displayStyle == DisplayStyle.MINI,
        hidden: !visible,
      })}
      ref={ref}
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
          text-align: left;
        }
        .description-container.hidden {
          display: none !important;
        }
        .description-container.compact {
          cursor: pointer;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          position: absolute;
          border: 3px ${color} solid;
          text-align: center;
          background-color: ${hex2rgba(color, 0.3)};
          border-radius: 15px;
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 5px;
          pointer-events: none;
        }
        .description-container.regular {
          font-size: 20px;
          white-space: normal !important;
        }
        .description-container.regular span {
          background-color: #2f2f30;
          color: white;
          border-radius: 15px;
          padding: 15px;
          padding-top: 25px;
          display: block;
          margin-top: 0px;
          font-size: 18px;
        }
        .description-container.mini {
          display: none !important;
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
  href,
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
        >
          <a
            onClick={React.useCallback(
              (e) => {
                onClick?.();
                e.preventDefault();
              },
              [onClick]
            )}
            href={href}
          />
          {updates && <div className="updates">{updates}</div>}
        </div>
        {displayStyle != DisplayStyle.MINI && (
          <Slug
            name={slug}
            visible={!showDescription || displayStyle == DisplayStyle.REGULAR}
            displayStyle={displayStyle}
            color={chosenColor}
          />
        )}
        {displayStyle != DisplayStyle.MINI && (
          <Description
            description={description}
            visible={showDescription || displayStyle == DisplayStyle.REGULAR}
            displayStyle={displayStyle}
            color={chosenColor}
          />
        )}
      </div>
      <div className={classnames("preview-footer", { hidden: !children })}>
        {children}
      </div>
      <style jsx>{`
        /* dynamic styles */
        .board-image {
          background: url("${avatar}");
          border: 3px ${chosenColor} solid;
          background-size: cover;
          background-position: center;
        }
        .updates {
          background-color: ${chosenColor};
          border: 5px solid ${backgroundColor || "#2f2f30"};
        }
        `}</style>
      <style jsx>{`
        .container {
        }
        .container.compact,
        .container.mini {
          cursor: pointer;
        }
        .container.regular {
        }
        .container.compact {
        }
        .container.mini {
        }
        .board-header {
          position: relative;
        }
        .container.mini .board-header {
        }

        .board-image {
          display: block;
          position: relative;
          border-radius: 15px;
          box-sizing: border-box;
          border-radius: 15px;
          padding-bottom: calc((9 / 16) * 100%);
        }
        .board-image.compact {
        }
        .board-image.regular {
          margin-bottom: 15px;
        }
        .board-image > a {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
        .preview-footer {
          display: flex;
          justify-content: space-evenly;
          margin-top: 5px;
        }
        .preview-footer.hidden {
          display: none;
        }
        .updates {
          color: white;
          font-size: 15px;
          z-index: 5;
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
  href?: string;
  updates?: number | boolean;
}

export default BoardPreview;
