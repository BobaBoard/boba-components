import React from "react";

import Theme from "../theme/default";
import { CommentHandler } from "./Comment";

const STEM_WIDTH_PX = 5;

const CompactThreadIndent: React.FC<CompactThreadIndentProps> = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [startPointCoordinates, setStartPointCoordinates] = React.useState<{
    top: number;
    left: number;
  }>();
  const [innerLevelBounds, setInnerLevelBounds] = React.useState<
    {
      top: number;
      left: number;
    }[]
  >();

  React.useLayoutEffect(() => {
    if (props.startsFromViewport && containerRef.current) {
      setStartPointCoordinates({
        top:
          props.startsFromViewport.top -
          containerRef.current.getBoundingClientRect().top,
        left:
          props.startsFromViewport.left -
          containerRef.current.getBoundingClientRect().left,
      });
    }
  }, [containerRef.current, props.startsFromViewport]);

  React.useEffect(() => {
    if (!containerRef.current || !startPointCoordinates) {
      return;
    }
    containerRef.current.dataset.level = `${props.level}`;
    containerRef.current.dataset.containerTop = `${
      containerRef.current.getBoundingClientRect().top
    }`;
    containerRef.current.dataset.containerLeft = `${
      containerRef.current.getBoundingClientRect().left
    }`;
    containerRef.current.dataset.top = `${startPointCoordinates.top}`;
    containerRef.current.dataset.left = `${startPointCoordinates.left}`;
    const innerBounds: {
      top: number;
      left: number;
    }[] = [];
    containerRef.current
      .querySelectorAll(".thread-container")
      .forEach((line: HTMLDivElement) => {
        if (line.dataset.level !== "" + (props.level + 1)) {
          return;
        }
        const dataset = line.dataset as {
          containerTop: string;
          top: string;
          containerLeft: string;
          left: string;
        };
        innerBounds.push({
          top:
            parseInt(dataset.containerTop) -
            (containerRef.current?.getBoundingClientRect().top || 0) +
            parseInt(dataset.top),
          left:
            parseInt(dataset.containerLeft) -
            (containerRef.current?.getBoundingClientRect().left || 0) +
            parseInt(dataset.left),
        });
      });
    setInnerLevelBounds(innerBounds);
  }, [containerRef.current, startPointCoordinates]);

  return (
    <div className="thread-container" ref={containerRef}>
      {startPointCoordinates && (
        <>
          <div
            className="thread-line"
            style={{
              top: startPointCoordinates.top + 1,
              left: startPointCoordinates.left,
              height: innerLevelBounds?.length
                ? innerLevelBounds[innerLevelBounds.length - 1].top -
                  startPointCoordinates.top -
                  7
                : "auto",
              display: props.hideLine ? "none" : "block",
            }}
          />

          {innerLevelBounds &&
            innerLevelBounds.map((bound) => {
              return (
                <div
                  className="thread-line-inner"
                  style={{
                    top: bound.top - 6,
                    left: startPointCoordinates.left,
                    width: bound.left,
                    height: 3,
                    display: props.hideLine ? "none" : "block",
                  }}
                />
              );
            })}
        </>
      )}
      {props.children}
      <style jsx>{`
        .thread-container {
          position: relative;
          margin-left: ${props.level == 0 ? 0 : 12}px;
        }
        .thread-line {
          position: absolute;
          bottom: 0;
          width: ${STEM_WIDTH_PX}px;
          border-top-left-radius: 3px;
          border-top: 1px dotted
            ${Theme.INDENT_COLORS[props.level % Theme.INDENT_COLORS.length]};
          border-left: 1px dotted
            ${Theme.INDENT_COLORS[props.level % Theme.INDENT_COLORS.length]};
        }
        .thread-line-inner {
          border-bottom-left-radius: 15px;
          position: absolute;
          border-left: 1px dotted
            ${Theme.INDENT_COLORS[props.level % Theme.INDENT_COLORS.length]};
          border-bottom: 1px dotted
            ${Theme.INDENT_COLORS[props.level % Theme.INDENT_COLORS.length]};
        }
      `}</style>
    </div>
  );
};

export interface CompactThreadIndentProps {
  level: number;
  startsFromViewport?: null | {
    top: number;
    left: number;
  };
  hideLine?: boolean;
  children: JSX.Element | (string | JSX.Element)[];
}

export const useIndent = () => {
  const handlerRef = React.useRef<CommentHandler>(null);
  const [headerBounds, setHeaderBounds] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  React.useEffect(() => {
    const boundingHeader = handlerRef.current?.headerRef?.current?.getBoundingClientRect();
    if (boundingHeader) {
      setHeaderBounds({
        top: boundingHeader.top + boundingHeader.height / 2,
        left: boundingHeader.left - STEM_WIDTH_PX,
      });
    }
  }, [handlerRef.current?.headerRef?.current?.getBoundingClientRect()?.width]);

  return { handler: handlerRef, bounds: headerBounds };
};

export default CompactThreadIndent;
