import React from "react";
import classnames from "classnames";

const Slug: React.FC<{ name: string; visible: boolean }> = ({
  name,
  visible,
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
      <span>/{name}/</span>
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
          border: 3px black solid;
          background-color: rgba(0, 0, 0, 0.3);
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
          background-color: rgba(0, 0, 0, 0.6);
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
}> = ({ description, visible, compact }) => {
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
          border: 3px black solid;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
        }
        .description-container.regular {
          font-size: 30px;
        }
        .description-container.regular span {
          background-color: rgba(0, 0, 0, 0.3);
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
}) => {
  const [showDescription, setShowDescription] = React.useState(false);
  return (
    <div
      className="container"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <div
        className={classnames("board-header", { compact, regular: !compact })}
        onClick={onClick}
      ></div>
      <Slug
        name={slug}
        visible={!showDescription || !compact}
        compact={compact}
      />
      <Description
        description={description}
        visible={showDescription || !compact}
        compact={compact}
      />
      <div className={classnames("preview-footer", { hidden: !children })}>
        {children}
      </div>
      <style jsx>{`
        .container {
          position: relative;
          display: inline-block;
          border-radius: 15px;
        }
        .container.compact {
          cursor: pointer;
        }
        .board-header {
            cursor: pointer;
            position: relative;
            background: url("${avatar}");
            background-size: cover;
            background-position: 0px -100px;
            height: 150px;
            width: 350px;
            border-radius: 15px;
            border: 3px black solid;
            box-sizing: border-box;
        }
        .board-header.regular {
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
  onClick: () => void;
}

export default BoardPreview;
