import React from "react";
import classnames from "classnames";
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
    onClick: () => void;
  }[];
  style?: DropdownStyle;
  accentColor?: string;
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
            {props.options.map((option, index) => (
              <div
                key={option.name}
                className={classnames("option")}
                onClick={() => {
                  option.onClick();
                  setOpen(false);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        }
        onClickOutside={() => setOpen(false)}
        background={themeColor}
        padding={0}
        accentColor={accentColor}
      >
        <span onClick={() => setOpen(!isOpen)}>{props.children}</span>
      </Tooltip>
      <style jsx>{`
        .menu {
          min-width: 200px;
          color: ${reverseThemeColor};
        }
        .option {
          padding: 15px 20px;
          border-bottom: 2px solid ${accentColor};
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
        .option:first-child:hover {
        }
      `}</style>
    </>
  );
};

export default DropdownMenu;
