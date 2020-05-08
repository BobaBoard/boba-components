import React from "react";
import classnames from "classnames";

const DEFAULT_COLOR = "#000000";

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const Slug: React.FC<{ name: string; visible: boolean; color: string }> = ({
  name,
  visible,
  color,
  compact,
}) => {
  return (
    <div
      className={classnames("slug-container", {
        hidden: !visible,
        compact,
        regular: !compact,
      })}
    >
      <span>!{name}</span>
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
        .slug-container.compact {
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
          margin-bottom: 15px;
          font-size: 30px;
        }
        .slug-container.regular span:hover {
          filter: invert(100%);
        }
        .slug-container.regular span {
          background-color: ${hex2rgba(color, 0.6)};
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
  compact: boolean;
  color: string;
}> = ({ description, visible, compact, color }) => {
  return (
    <div
      className={classnames("description-container", {
        compact,
        regular: !compact,
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
          font-size: 30px;
        }
        .description-container.regular span {
          background-color: ${hex2rgba(color, 0.3)};
          border-radius: 15px;
          padding: 25px;
          display: block;
          margin-top: 0px;
          margin: 15px;
          font-size: 20px;
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
  compact,
  description,
  onClick,
  children,
  color,
}) => {
  const [showDescription, setShowDescription] = React.useState(false);
  const chosenColor = color || DEFAULT_COLOR;
  return (
    <div
      className="container"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <div className="board-header">
        <div
          className={classnames("board-image", { compact, regular: !compact })}
          onClick={onClick}
        ></div>
        <Slug
          name={slug}
          visible={!showDescription || !compact}
          compact={compact}
          color={chosenColor}
        />
        <Description
          description={description}
          visible={showDescription || !compact}
          compact={compact}
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
        .container.compact {
          cursor: pointer;
        }
        .board-header{
          position: relative;
        }
        .board-header::before {
          display: block;
          content: "";
          width: 100%;
          padding-top: calc((9 / 16) * 100%);
          position:absolute;
        }
        .board-image {
            cursor: pointer;
            position: relative;
            background: url("${avatar}");
            background-size: cover;
            background-position: 0px -100px;
            height: 150px;
            border-radius: 15px;
            border: 3px ${chosenColor} solid;
            box-sizing: border-box;
            border-radius: 15px;
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
      `}</style>
    </div>
  );
};

export interface BoardPreviewProps {
  slug: string;
  avatar: string;
  description: string;
  compact?: boolean;
  color?: string;
  onClick: () => void;
}

export default BoardPreview;
