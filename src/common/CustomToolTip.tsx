import React from "react";

import LibraryPopover, {
  PopoverProps as LibraryPopoverProps,
  ArrowContainer,
} from "react-tiny-popover";
import Theme from "../theme/default";


interface PopoverProps extends LibraryPopoverProps {
  background?: string;
  zoom?: number;
  delay?: number;
  padding?: number;
  accentColor?: string;
  targetRect?: any;
}

const CustomPopover: React.FC<PopoverProps> = (props) => {
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
        position={props.position || 'bottom'}
        padding={props.padding || 10}
        onClickOutside={(e) => {
          props.onClickOutside?.(e);
        }}
        content={({ position, targetRect, popoverRect }) => {
          return (            
            <>
              <div className="popover-content">{props.content}</div>            
            </>
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
          border-radius: ${Theme.BORDER_RADIUS_REGULAR};
          zoom: ${props.zoom || 1};
          z-index: 15;
          position: relative;
          color: white;
          border: 2px solid
            ${props.accentColor || Theme.POPOVER_DEFAULT_BACKGROUND};
        }
      `}</style>
    </>
  );
};

export default CustomPopover;