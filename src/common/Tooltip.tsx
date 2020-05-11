import React from "react";

import LibraryPopover, {
  PopoverProps as LibraryPopoverProps,
  ArrowContainer,
} from "react-tiny-popover";
import Theme from "../theme/default";

interface PopoverProps extends LibraryPopoverProps {
  background?: string;
  zoom?: number;
}

const Popover: React.FC<PopoverProps> = (props) => {
  return (
    <>
      <LibraryPopover
        isOpen={props.isOpen}
        position={props.position}
        padding={props.padding || 10}
        onClickOutside={() => props.onClickOutside}
        content={({ position, targetRect, popoverRect }) => {
          return (
            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={props.background || Theme.POPOVER_DEFAULT_BACKGROUND}
              arrowSize={10}
            >
              <div className="popover-content">{props.content}</div>
            </ArrowContainer>
          );
        }}
      >
        {props.children}
      </LibraryPopover>
      <style jsx>{`
        .popover-content {
          background-color: ${props.background ||
          Theme.POPOVER_DEFAULT_BACKGROUND};
          padding: 10px;
          border-radius: 15px;
          zoom: ${props.zoom || 1};
          z-index: 15;
          position: relative;
        }
      `}</style>
    </>
  );
};

export default Popover;
