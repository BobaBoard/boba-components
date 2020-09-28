import React from "react";
import classnames from "classnames";
import Tooltip from "./CustomToolTip";
import Theme from "../theme/default";
import { LinkWithAction } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
export enum DropdownStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface DropdownProps {
  children: JSX.Element;
  position: "left" | "right" | "top" | "bottom";
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
        position={props.position || "right"}
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
                {option.icon && <span className="icon"><FontAwesomeIcon icon={option.icon} /> </span>}
                <span className="option-title">{option.name}</span>

              </a>
            ))}
          </div>
        }
        // zIndex={props.zIndex}
        onClickOutside={() => setOpen(false)}
        background={themeColor}
        padding={0}
        accentColor={accentColor}
      >
        <span className="dropdown--content" onClick={() => setOpen(!isOpen)}>
            <div className="dropdown--title">{props.children}</div> 
            <FontAwesomeIcon icon={faCaretDown} />
        </span>
        
      </Tooltip>
      <style jsx>{`

      .dropdown--title {
        margin-right: 9px;
        display: inline;

      }

      .option-title {
        padding: 12px;
        padding-left: 6px;
        font-size: 18px;
      }
      .icon {
        padding: 12px;
        padding-right:6px;
        font-size: 18px;
      }
      
        .dropdown--content {
          display: inline-block;
            border: 1px solid gray;
            padding: .41em 1em;
            border-radius: 8px;
            background: white;
            color: black;
            margin-right: 8px;
        }


        .menu {
          min-width: 250px;
          color: ${reverseThemeColor};
          padding: 5px;
        }
        .option {
            font: Inter
          font-size: 16px;
          padding: 8px;
        //   border-bottom: 2px solid ${accentColor};
          display: block;
          color: ${reverseThemeColor};
          text-decoration: none;
        }

        .menu a:hover{
          background: #E5E5E5;
          color: black;
        }
        .option:first-child {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .option:last-child {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
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
