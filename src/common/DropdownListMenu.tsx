import React from "react";
import classnames from "classnames";
import Tooltip from "./Tooltip";
import Theme from "../theme/default";
import { LinkWithAction } from "types";

export enum DropdownStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface DropdownProps {
  children: JSX.Element;
  options?: {
    name: string;
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
  const hoverColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT
      : themeColor;
  const hoverBackgroundColor =
    DropdownStyle.DARK == props.style
      ? Theme.LAYOUT_SIDEMENU_BACKGROUND_COLOR
      : reverseThemeColor;
  const accentColor = props.accentColor || reverseThemeColor;
  return (
    <>
      <Tooltip
        isOpen={isOpen}
        position="bottom"
        content={
          <div className={"menu"}>
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
                {option.name}
              </a>
            ))}
          </div>
        }
        zIndex={props.zIndex}
        onClickOutside={() => setOpen(false)}
        background={themeColor}
        padding={0}
        accentColor={accentColor}
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
          min-width: 200px;
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
          padding: 15px 20px;
          border-bottom: 2px solid ${accentColor};
          display: block;
          color: ${reverseThemeColor};
          text-decoration: none;
        }
        .option:first-child {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .option:last-child {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          border-bottom: 0px solid ${accentColor};
        }
        .option:hover {
          color: ${hoverColor};
          background-color: ${hoverBackgroundColor};
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default DropdownMenu;
