import React from "react";

import LibraryPopover, {
  PopoverProps as LibraryPopoverProps,
  ArrowContainer,
} from "react-tiny-popover";
import Theme from "../theme/default";

interface PopoverProps extends LibraryPopoverProps {
  background?: string;
  zIndex?: number;
  delay?: number;
  padding?: number;
  accentColor?: string;
  border?: {
    radius: string;
    width: string;
  };
}

const DEFAULT_ZINDEX = 15;
const Popover: React.FC<PopoverProps> = (props) => {
  return (
    <>
      <LibraryPopover
        isOpen={props.isOpen}
        position={props.position}
        padding={props.padding || 10}
        windowBorderPadding={10}
        onClickOutside={(e) => {
          props.onClickOutside?.(e);
        }}
        containerStyle={{
          zIndex: props.zIndex?.toString() || DEFAULT_ZINDEX.toString(),
        }}
        content={({ position, targetRect, popoverRect }) => {
          return (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={props.accentColor || Theme.POPOVER_DEFAULT_BACKGROUND}
              style={{
                position: "relative",
                zIndex: props.zIndex || DEFAULT_ZINDEX,
              }}
            >
              {props.isOpen ? (
                <div className="popover-content">{props.content}</div>
              ) : (
                <div />
              )}
            </ArrowContainer>
          );
        }}
        transitionDuration={0.2}
      >
        {props.children}
      </LibraryPopover>
      <style jsx>{`
        .popover-content {
          background-color: ${props.background ||
          Theme.POPOVER_DEFAULT_BACKGROUND};
          padding: ${typeof props.padding === "undefined"
            ? 10
            : props.padding}px;
          border-radius: ${props.border && props.border.radius
            ? props.border.radius
            : Theme.BORDER_RADIUS_REGULAR};
          z-index: ${props.zIndex || DEFAULT_ZINDEX};
          position: relative;
          color: white;
          border: ${props.border && props.border.width
              ? props.border.width
              : "2px"}
            solid ${props.accentColor || Theme.POPOVER_DEFAULT_BACKGROUND};
          overflow: hidden;
        }
        @media only screen and (max-width: 575px) {
          .popover-content {
            padding: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Popover;
