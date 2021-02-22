import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import DefaultTheme from "../theme/default";
import { lightenColor } from "../utils";

interface CollapsedPlaceholderProps {
  onUncollapseClick: () => void;
  accentColor?: string;
}

const CollapsedPlaceholder: React.FC<CollapsedPlaceholderProps> = (props) => {
  const stemHoverColor = lightenColor(
    props.accentColor || DefaultTheme.INDENT_COLORS[0],
    0.07
  );
  return (
    <div className="collapsed-placeholder">
      <div className="icon" onClick={props.onUncollapseClick}>
        <FontAwesomeIcon icon={faAngleUp} />
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      <div className="text">{props.children}</div>
      <button className="view-all" onClick={props.onUncollapseClick}>
        View All
      </button>
      <style jsx>{`
        .collapsed-placeholder {
          background-color: #464646;
          border-radius: 15px;
          display: flex;
          padding: 10px 15px;
          align-items: center;
        }
        .icon {
          padding-right: 10px;
          color: #e8e8e8;
          position: relative;
        }
        .icon:hover {
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
        .view-all:hover {
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
