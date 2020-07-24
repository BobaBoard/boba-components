import "@trendmicro/react-buttons/dist/react-buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

import React from "react";
// @ts-ignore
import { Button as LibraryButton } from "@trendmicro/react-buttons";
import Tooltip from "./Tooltip";

export enum ButtonStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
  TRANSPARENT = "TRANSPARENT",
}

const getThemeColor = (style: ButtonStyle | undefined) => {
  switch (style) {
    case ButtonStyle.TRANSPARENT:
      return "transparent";
    case ButtonStyle.DARK:
      return "#1c1c1c";
    default:
    case ButtonStyle.LIGHT:
      return "#fff";
  }
};

const getReverseThemeColor = (style: ButtonStyle | undefined) => {
  switch (style) {
    case ButtonStyle.TRANSPARENT:
      return "#1c1c1c";
    case ButtonStyle.DARK:
      return "#fff";
    default:
    case ButtonStyle.LIGHT:
      return "#1c1c1c";
  }
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon,
  children,
  compact,
  color,
  theme,
  disabled,
  tooltip,
  updates,
  imageUrl,
}) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const THEME_COLOR = getThemeColor(theme);
  const REVERSE_THEME_COLOR = getReverseThemeColor(theme);
  const transparent = ButtonStyle.TRANSPARENT == theme;
  return (
    <>
      <Tooltip content={<div>{tooltip}</div>} isOpen={tooltipOpen} delay={1000}>
        <div
          className={classnames("button", { compact }, { disabled })}
          onMouseEnter={() => tooltip && setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
        >
          {updates && (
            <div className="updates">
              {updates === true ? (
                <FontAwesomeIcon icon={faCertificate} />
              ) : updates == Infinity ? (
                "∞"
              ) : (
                updates
              )}
            </div>
          )}
          <LibraryButton btnStyle="flat" onClick={onClick} disabled={disabled}>
            {icon && (
              <div className="icon">
                <FontAwesomeIcon icon={icon} />
              </div>
            )}
            {imageUrl && <img className="image" src={imageUrl} />}
            {/* if the button is compact then don't display the text, unless there's no icon or image.*/}
            {(!compact || (!icon && !imageUrl)) && children}
          </LibraryButton>
        </div>
      </Tooltip>
      <style jsx>{`
        .button {
          display: inline-block;
          position: relative;
        }
        .button > :global(button) {
          border-radius: 25px;
          background-image: none;
          border: 2px solid ${color || REVERSE_THEME_COLOR};
          color: ${color || REVERSE_THEME_COLOR};
          background-color: ${THEME_COLOR};
        }
        .button:not(.disabled) > :global(button):hover {
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${color || THEME_COLOR};
          color: ${color || (transparent ? "white" : THEME_COLOR)};
        }
        .button:not(.disabled) > :global(button):active:focus {
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${color || THEME_COLOR};
          color: ${color || (transparent ? "white" : THEME_COLOR)};
        }
        .button:not(.disabled) > :global(button):hover .icon {
          color: ${color || (transparent ? "white" : THEME_COLOR)};
        }
        .button.disabled > :global(button:hover) {
          background-image: none;
          background-color: ${THEME_COLOR};
          border-color: ${color || REVERSE_THEME_COLOR};
        }
        .disabled .updates {
          opacity: 0.8;
        }
        .icon {
          display: inline-block;
          margin-right: 5px;
        }
        .image {
          margin-right: 5px;
          vertical-align: middle;
          width: 20px;
          height: auto;
          margin-top: -3px;
          margin-left: -3px;
          border-radius: 50%;
        }
        .compact .image {
          margin-left: 0px;
          margin-right: 0px;
        }
        .updates {
          background-color: ${color || REVERSE_THEME_COLOR};
          position: absolute;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          right: -5px;
          top: -5px;
          text-align: center;
          color: ${transparent ? "white" : THEME_COLOR};
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
        }
        .compact > :global(button) {
          min-width: 25px;
          max-width: 60px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .compact .icon {
          margin-right: 0px;
          color: ${color || REVERSE_THEME_COLOR};
        }
      `}</style>
    </>
  );
};

export default Button;

export interface ButtonProps {
  children: string | JSX.Element;
  tooltip?: string | JSX.Element;
  icon?: IconDefinition;
  imageUrl?: string;
  compact?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  theme?: ButtonStyle;
  updates?: number | boolean;
}
