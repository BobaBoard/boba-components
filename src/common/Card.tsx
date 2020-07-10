import React from "react";

import classnames from "classnames";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../theme/default";

export interface CardProps {
  footer?: JSX.Element;
  header?: JSX.Element;
  height?: number;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  footer,
  header,
  height,
  backgroundColor,
}) => {
  const [isExpanded, setExpanded] = React.useState(!height);
  return (
    <>
      <div
        className={classnames("card", {
          "with-footer": !!footer,
          "with-header": !!header,
          expanded: isExpanded,
        })}
      >
        {<div className="header">{header}</div>}
        <div className="content">
          {children}
          {height && (
            <div
              className="expand-overlay"
              onClick={() => {
                setExpanded(!isExpanded);
              }}
            >
              <FontAwesomeIcon
                icon={isExpanded ? faAngleDoubleUp : faAngleDoubleDown}
              />
            </div>
          )}
        </div>

        {<div className="footer">{footer}</div>}
      </div>
      <style jsx>{`
        /* Dynamic styles */
        .card {
          background-color: ${backgroundColor || "white"};
        }
      `}</style>
      <style jsx>{`
        .content {
          max-height: ${height + "px" || "unset"};
          position: relative;
          overflow: hidden;
        }
        .card.expanded .content {
          max-height: unset;
          overflow: visible;
        }
        .expand-overlay {
          position: absolute;
          height: 40px;
          left: 0;
          right: 0;
          background: linear-gradient(
            rgba(255, 255, 255, 0.001) 10%,
            #ffffff 30%,
            #ffffff
          );
          bottom: 0;
          cursor: pointer;
          text-align: center;
        }
        .expand-overlay > :global(svg) {
          position: absolute;
          bottom: 0;
        }
        .card {
          padding: 15px 10px;
          border-radius: ${Theme.BORDER_RADIUS_REGULAR};
          width: 100%;
        }
        .card.with-header {
          padding-top: 0px;
          padding-left: 0px;
          padding-right: 0px;
        }

        .card.with-header .content,
        .card.with-footer .content {
          padding-left: 10px;
          padding-right: 10px;
        }

        .card.with-footer {
          padding-bottom: 0px;
          padding-left: 0px;
          padding-right: 0px;
        }
      `}</style>
    </>
  );
};

export default Card;
