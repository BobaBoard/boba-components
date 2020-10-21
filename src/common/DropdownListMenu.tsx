import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { LinkWithAction } from "types";

import Tooltip from "./Tooltip";
import Theme from "../theme/default";

export enum DropdownStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface DropdownProps {
  children: JSX.Element;
  options?: {
    name: string;
    icon?: IconDefinition;
    link: LinkWithAction;
  }[];
  style?: DropdownStyle;
  accentColor?: string;
  zIndex?: number;
}
const DropdownMenu: React.FC<DropdownProps> = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  if (!props.options) {
    return props.children;
  }
  const themeColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_DARK
      : Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT;
  const reverseThemeColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT
      : Theme.DROPDOWN_BACKGROUND_COLOR_DARK;
  const hoverBackgroundColor = Theme.DROPDOWN_HOVER_BACKGROUND_COLOR;

  return (
    <>
      <Tooltip
        isOpen={isOpen}
        position="bottom"
        content={
          <div className={classnames("menu", { visible: isOpen })}>
            {props.options.map((option) => (
              <a
                key={option.name}
                className={classnames("option")}
                onClick={(e) => {
                  option.link.onClick();
                  e.preventDefault();
                  setOpen(false);
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
          </div>
        }
        zIndex={props.zIndex}
        onClickOutside={() => setOpen(false)}
        background={themeColor}
        padding={5}
        border={{ width: "0px", radius: "5px" }}
      >
        <button
          className="wrapper"
          tabIndex={0}
          onClick={() => setOpen(!isOpen)}
        >
          {props.children}
        </button>
      </Tooltip>
      <style jsx>{`
        .menu {
          min-width: 250px;
          color: ${reverseThemeColor};
        }
        .wrapper {
          background: none;
          border: none;
          padding: 0;
        }
        .wrapper:focus {
          outline: none;
        }
        .option {
          border-radius: 5px;
          padding: 8px;
          display: block;
          color: ${reverseThemeColor};
          text-decoration: none;
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
            border-radius: 5px;
            padding: 5px;
            width: 95%;
            position: fixed;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 0%);
            animation-name: slideUp;
            animation-duration: 0.2s;
          }
          .popover-icon {
            margin-right: 12px;
          }
          .option {
            padding: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default DropdownMenu;
