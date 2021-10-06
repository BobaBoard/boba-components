import React from "react";

import classnames from "classnames";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultTheme from "../theme/default";
import Color from "color";
import { CreateBaseCompound, extractCompound } from "../utils/compound-utils";

export interface CardProps {
  height?: number;
  backgroundColor?: string;
}

interface CompoundComponents {
  Footer: React.FC<{ children: React.ReactNode }>;
  Header: React.FC<{ children: React.ReactNode }>;
}

const Footer = CreateBaseCompound("Footer");
const Header = CreateBaseCompound("Header");

const Card: React.FC<CardProps> & CompoundComponents = ({
  children,
  height,
  backgroundColor,
}) => {
  const [isExpanded, setExpanded] = React.useState(!height);
  const footer = extractCompound(children, Footer);
  const header = extractCompound(children, Header);
  const rest = React.Children.toArray(children).filter(
    (child) =>
      !React.isValidElement(child) ||
      (child.type != Footer && child.type != Header)
  );

  const processedColor = Color(
    backgroundColor || DefaultTheme.POST_BACKGROUND_COLOR
  );
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
          {rest}
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
          background-color: ${processedColor.toString()};
        }
        .expand-overlay {
          background: linear-gradient(
            ${processedColor.alpha(0.0001).toString()} 10%,
            ${processedColor.toString()} 30%,
            ${processedColor.toString()}
          );
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
          border-radius: ${DefaultTheme.BORDER_RADIUS_REGULAR};
          width: 100%;
        }
        .card.with-header {
          padding-top: 0px;
          padding-left: 0px;
          padding-right: 0px;
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

Card.Footer = Footer;
Card.Header = Header;
export default Card;
