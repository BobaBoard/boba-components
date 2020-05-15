import React from "react";

import classnames from "classnames";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum CardSizes {
  REGULAR,
  WIDE,
}

export interface CardProps {
  footer?: JSX.Element;
  header?: JSX.Element;
  size?: CardSizes;
  height?: number;
}

const getMaxWidth = (size?: CardSizes) => {
  switch (size) {
    case CardSizes.WIDE:
      return 850;
    case CardSizes.REGULAR:
    default:
      return 550;
  }
};

const Card: React.FC<CardProps> = ({
  children,
  footer,
  header,
  size,
  height,
}) => {
  const [isExpanded, setExpanded] = React.useState(false);
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
          {height && !isExpanded && (
            <div
              className="expand-overlay"
              onClick={() => {
                setExpanded(true);
              }}
            >
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </div>
          )}
        </div>

        {<div className="footer">{footer}</div>}
      </div>
      <style jsx>{`
        .content {
          max-height: ${height + "px" || "unset"};
          overflow: hidden;
          position: relative;
        }
        .card.expanded .content {
          max-height: unset;
        }
        .expand-overlay {
          position: absolute;
          height: 40px;
          width: 100%;
          background: linear-gradient(transparent 10%, #ffffff 30%, #ffffff);
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
          border-radius: 15px;
          background-color: white;
          max-width: ${getMaxWidth(size)}px;
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
