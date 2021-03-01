import React from "react";

import classnames from "classnames";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "../theme/default";

export interface CardProps {
  footer?: React.ReactNode;
  header?: React.ReactNode;
  height?: number;
  backgroundColor?: string;
}

interface CompoundComponents {
  Footer: React.FC<{ children: React.ReactNode }>;
  Header: React.FC<{ children: React.ReactNode }>;
}

const Footer: CompoundComponents["Footer"] = (props) => {
  return <>{props.children}</>;
};

const Header: CompoundComponents["Header"] = (props) => {
  return <>{props.children}</>;
};

const extractFooter = (
  children: React.ReactNode
): typeof Footer | undefined => {
  return React.Children.toArray(children).find(
    (node) => React.isValidElement(node) && node.type == Footer
  ) as typeof Footer;
};

const extractHeader = (
  children: React.ReactNode
): typeof Header | undefined => {
  return React.Children.toArray(children).find(
    (node) => React.isValidElement(node) && node.type == Header
  ) as typeof Header;
};

const Card: React.FC<CardProps> & CompoundComponents = ({
  children,
  height,
  backgroundColor,
}) => {
  const [isExpanded, setExpanded] = React.useState(!height);
  const footer = extractFooter(children);
  const header = extractHeader(children);
  const rest = React.Children.toArray(children).filter(
    (child) =>
      !React.isValidElement(child) ||
      (child.type != Footer && child.type != Header)
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
