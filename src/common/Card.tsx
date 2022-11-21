import {
  CreateBaseCompound,
  GetProps,
  extractCompound,
  extractRest,
} from "utils/compound-utils";
import React, { AriaAttributes } from "react";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";

import Color from "color";
import DefaultTheme from "theme/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

export interface CardProps {
  children?: React.ReactNode;
  height?: number;
  className?: string;
  // TODO: remove this background color from here
  backgroundColor?: string;
}

export interface CardHandler {
  highlight: (color: string) => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

interface CompoundComponents {
  Footer: React.FC<
    { children: React.ReactNode; className?: string } & AriaAttributes
  >;
  Header: React.FC<
    { children: React.ReactNode; className?: string } & AriaAttributes
  >;
  Content: React.FC<
    { children: React.ReactNode; className?: string } & AriaAttributes
  >;
}

const Footer =
  CreateBaseCompound<GetProps<CompoundComponents["Footer"]>>("Footer");
const Header =
  CreateBaseCompound<GetProps<CompoundComponents["Header"]>>("Header");
const Content =
  CreateBaseCompound<GetProps<CompoundComponents["Content"]>>("Content");

// Using Object.assign is the easiest way to merge a compound component
// with a component that needs a forwarded ref.
const Card = Object.assign(
  React.forwardRef<CardHandler, CardProps>(
    // We use a function here to avoid the  display name warning
    // for forwarded refs.
    function Card({ children, height, className, backgroundColor }, ref) {
      const cardRef = React.useRef<HTMLDivElement>(null);
      const [isExpanded, setExpanded] = React.useState(!height);
      const footer = extractCompound(children, Footer);
      const header = extractCompound(children, Header);
      const content = extractCompound(children, Content);
      // This is here for e.g. jsx styles
      const rest = extractRest(children, [Footer, Header, Content]);

      const processedColor = Color(
        backgroundColor || DefaultTheme.POST_BACKGROUND_COLOR
      );

      React.useImperativeHandle(ref, () => ({
        highlight: (color: string) => {
          if (!cardRef.current) {
            return;
          }
          cardRef.current.ontransitionend = () => {
            cardRef.current?.style.setProperty("--card-container-shadow", null);
          };
          cardRef.current.style.setProperty("--card-container-shadow", color);
        },
        cardRef,
      }));

      return (
        <div
          className={classnames("card", className, {
            // Only use the expanded class if there is an height defined in the
            // first place
            expanded: height ? isExpanded : undefined,
          })}
          ref={cardRef}
        >
          <header
            className={header?.props.className}
            aria-label={header?.props["aria-label"]}
          >
            {header}
          </header>
          <section
            className={content?.props.className}
            aria-label={content?.props["aria-label"]}
          >
            {content}
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
          </section>
          <footer
            className={footer?.props.className}
            aria-label={footer?.props["aria-label"]}
          >
            {footer}
          </footer>
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
            .card {
              border-radius: ${DefaultTheme.BORDER_RADIUS_REGULAR};
              width: 100%;
              position: relative;
              z-index: 0;
            }
            .card::after {
              content: "";
              top: 0px;
              bottom: 0px;
              left: 0px;
              right: 0px;
              position: absolute;
              z-index: -1;
              width: 100%;
              height: 100%;
              opacity: 0.8;
              border-radius: 15px;
              transition: box-shadow 0.5s ease-out;
              box-shadow: 0px 0px 8px 3px var(--card-container-shadow);
            }
            header {
              padding: 8px 12px 0 8px;
              border-top-left-radius: ${DefaultTheme.BORDER_RADIUS_REGULAR};
              border-top-right-radius: ${DefaultTheme.BORDER_RADIUS_REGULAR};
            }
            footer {
              padding: 0 12px 8px 12px;
            }
            section {
              max-height: ${height + "px" || "unset"};
              position: relative;
            }
            .card.expanded section {
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
          `}</style>
          {rest}
        </div>
      );
    }
  ),
  {
    Footer,
    Header,
    Content,
  }
);

export default Card;
