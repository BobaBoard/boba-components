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
  const [innerIsOpen, setInnerIsOpen] = React.useState(props.isOpen);
  const [openTimeout, setOpenTimeout] = React.useState<
    NodeJS.Timeout | undefined
  >(undefined);
  React.useEffect(() => {
    if (openTimeout) {
      clearTimeout(openTimeout);
      setOpenTimeout(undefined);
    }
    if (props.isOpen) {
      const timeout = setTimeout(() => setInnerIsOpen(true), props.delay || 0);
      setOpenTimeout(timeout);
    } else {
      setInnerIsOpen(false);
    }
    return () => {
      if (openTimeout) {
        clearTimeout(openTimeout);
      }
    };
  }, [props.isOpen]);
  return (
    <>
      <LibraryPopover
        isOpen={innerIsOpen}
        position={props.position}
        padding={props.padding || 10}
        onClickOutside={(e) => {
          props.onClickOutside?.(e);
        }}
        containerStyle={{
          zIndex: props.zIndex?.toString() || DEFAULT_ZINDEX.toString(),
        }}
        content={({ position, targetRect, popoverRect }) => {
          return (
            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={props.accentColor || Theme.POPOVER_DEFAULT_BACKGROUND}
              style={{
                position: "relative",
                zIndex: props.zIndex || DEFAULT_ZINDEX,
              }}
            >
              {innerIsOpen ? (
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
      <div className="backdrop" />
      <style jsx>{`
        .backdrop {
          position: fixed;
          background-color: ${Theme.MODAL_BACKGROUND_COLOR};
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          display: none;
        }
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
        }
        @media only screen and (max-width: 575px) {
          .popover-content {
            width: 95%;
            position: fixed;
            left: 50%;
            bottom: 0%;
            transform: translate(-50%, 0%);
          }
          .backdrop {
            display: ${innerIsOpen ? 'block' : 'none'}
          }
        }
      `}</style>
    </>
  );
};

export default Popover;
