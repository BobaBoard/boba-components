import {
  CreateBaseCompound,
  GetProps,
  extractCompound,
  extractRest,
} from "utils/compound-utils";
import React, { AriaAttributes } from "react";

import DefaultTheme from "theme/default";
import classnames from "classnames";
import css from "styled-jsx/css";
import { useExpand } from "utils/useExpand";

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

const clickerStyles = css.resolve`
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

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
      const contentRef = React.useRef<HTMLDivElement>(null);
      const footer = extractCompound(children, Footer);
      const header = extractCompound(children, Header);
      const content = extractCompound(children, Content);
      // This is here for e.g. jsx styles
      const rest = extractRest(children, [Footer, Header, Content]);

      const currentBackground =
        backgroundColor || DefaultTheme.POST_BACKGROUND_COLOR;

      const clicker = useExpand(contentRef, {
        compactHeight: height,
        backgroundColor: currentBackground,
        className: clickerStyles.className,
      });

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
        <div className={classnames("card", className)} ref={cardRef}>
          <header
            className={header?.props.className}
            aria-label={header?.props["aria-label"]}
          >
            {header}
          </header>
          <section
            className={content?.props.className}
            aria-label={content?.props["aria-label"]}
            ref={contentRef}
          >
            {content}
            {clicker}
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
              background-color: ${currentBackground.toString()};
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
              position: relative;
            }
            .card.expanded section {
              max-height: unset;
              overflow: visible;
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
