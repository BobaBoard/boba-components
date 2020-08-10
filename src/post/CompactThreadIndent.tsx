import React from "react";

import Theme from "../theme/default";
import { CommentHandler } from "index";

const CompactThreadIndent: React.FC<CompactThreadIndentProps> = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [startPointCoordinates, setStartPointCoordinates] = React.useState<{
    top: number;
    left: number;
  }>();

  React.useLayoutEffect(() => {
    console.log(props.startsFromViewport);
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

  return (
    <div className="thread-container" ref={containerRef}>
      {startPointCoordinates && (
        <div
          className="thread-line"
          style={{
            top: startPointCoordinates.top,
            left: startPointCoordinates.left,
          }}
        />
      )}
      {props.children}
      <style jsx>{`
        .thread-container {
          position: relative;
          margin-left: ${props.level == 0 ? 0 : 25}px;
        }
        .thread-line {
          position: absolute;
          bottom: 0;
          border-left: 1px dotted
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
        left: boundingHeader.left + boundingHeader.width / 2,
      });
    }
  }, [handlerRef.current?.headerRef?.current?.getBoundingClientRect()?.width]);

  return { handler: handlerRef, bounds: headerBounds };
};

export default CompactThreadIndent;
