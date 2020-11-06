import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { LinkWithAction } from "types";
import { useBackdrop } from "../utils";

import Tooltip from "./Tooltip";
import Theme from "../theme/default";
import ReactDOM from "react-dom";
import Color from "color";

export enum DropdownStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface DropdownProps {
  children: JSX.Element;
  // If Options are empty, children is simply returned.
  options?: {
    name: string;
    icon?: IconDefinition;
    link: LinkWithAction;
  }[];
  style?: DropdownStyle;
  accentColor?: string;
  zIndex?: number;
}

const isSmallScreen = () => {
  return typeof matchMedia === "undefined"
    ? false
    : matchMedia("only screen and (max-width: 575px)").matches;
};

const DropdownContent: React.FC<
  DropdownProps & {
    isOpen: boolean;
    onCloseRequest: () => void;
  }
> = (props) => {
  const themeColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_DARK
      : Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT;
  const reverseThemeColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT
      : Theme.DROPDOWN_BACKGROUND_COLOR_DARK;
  const hoverBackgroundColor =
    DropdownStyle.DARK == props.style
      ? Color(themeColor).lighten(0.85).hex()
      : Color(themeColor).darken(0.15).hex();
  return (
    <div className={classnames("menu")}>
      {props.options?.map((option) => (
        <a
          key={option.name}
          className={classnames("option")}
          onClick={(e) => {
            option.link.onClick?.();
            e.preventDefault();
            props.onCloseRequest();
          }}
          href={option.link.href}
        >
          {!!option.icon && (
            <span className="popover-icon">
              <FontAwesomeIcon icon={option.icon} />
            </span>
          )}
          {option.name}
        </a>
      ))}
      <style jsx>{`
        .menu {
          min-width: 250px;
          color: ${reverseThemeColor};
          text-align: left;
        }
        .option {
          border-radius: 5px;
          padding: 8px;
          display: block;
          color: ${reverseThemeColor};
          text-decoration: none;
          white-space: nowrap;
        }
        .option:hover {
          background-color: ${hoverBackgroundColor};
          cursor: pointer;
        }
        .popover-icon {
          margin-right: 12px;
          width: 16px;
          height: 22px;
          display: inline-block;
          text-align: center;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0%);
          }
        }
        @media only screen and (max-width: 575px) {
          .menu {
            background-color: ${themeColor};
            border-radius: 5px 5px 0px 0px;
            padding: 5px;
            width: 95%;
            position: fixed;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 0%);
            animation-name: slideUp;
            animation-duration: 0.2s;
            border: 1px solid ${reverseThemeColor};
            z-index: 102;
          }
          .popover-icon {
            margin-right: 12px;
          }
          .option {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

const DropdownMenu: React.FC<DropdownProps> = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const { setOpen: setBackdropOpen } = useBackdrop({
    id: "dropdown",
    zIndex: 101,
    onClick: () => {
      setOpen(false);
    },
  });

  React.useEffect(() => {
    if (isOpen && isSmallScreen()) {
      setBackdropOpen(true);
    } else {
      setBackdropOpen(false);
    }
  }, [isOpen]);

  if (!props.options) {
    return props.children;
  }

  const themeColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_DARK
      : Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT;

  return (
    <>
      <Tooltip
        isOpen={isOpen && !isSmallScreen()}
        position="bottom"
        content={
          <DropdownContent
            {...props}
            isOpen={isOpen}
            onCloseRequest={() => setOpen(false)}
          />
        }
        zIndex={props.zIndex}
        onClickOutside={() => setOpen(false)}
        background={themeColor}
        padding={5}
        border={{ width: "2px", radius: "5px" }}
      >
        <button
          className={classnames("wrapper", { "with-options": props.options })}
          tabIndex={0}
          onClick={() => setOpen(!isOpen)}
        >
          {props.children}
        </button>
      </Tooltip>
      {isSmallScreen() &&
        ReactDOM.createPortal(
          <div className={classnames("portal-content", { visible: isOpen })}>
            <DropdownContent
              {...props}
              isOpen={isOpen}
              onCloseRequest={() => setOpen(false)}
            />
          </div>,
          document.body
        )}
      <style jsx>{`
        .portal-content {
          display: none;
        }
        .portal-content.visible {
          display: block;
        }
        .wrapper {
          background: none;
          border: none;
          padding: 0;
          text-align: inherit;
        }
        .wrapper:focus {
          outline: none;
        }
        .wrapper.with-options:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default DropdownMenu;
