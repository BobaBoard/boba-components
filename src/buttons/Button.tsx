import Icon, { IconProps } from "common/Icon";

import DefaultTheme from "theme/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

export enum ButtonStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
  TRANSPARENT = "TRANSPARENT",
}

export const getThemeColor = (style: ButtonStyle | undefined) => {
  switch (style) {
    case ButtonStyle.TRANSPARENT:
      return "transparent";
    case ButtonStyle.DARK:
      return DefaultTheme.BUTTON_BACKGROUND_COLOR_DARK;
    default:
    case ButtonStyle.LIGHT:
      return DefaultTheme.BUTTON_BACKGROUND_COLOR_LIGHT;
  }
};

export const getReverseThemeColor = (style: ButtonStyle | undefined) => {
  switch (style) {
    case ButtonStyle.TRANSPARENT:
      return "#1c1c1c";
    case ButtonStyle.DARK:
      return DefaultTheme.BUTTON_ACCENT_COLOR_DARK;
    default:
    case ButtonStyle.LIGHT:
      return DefaultTheme.BUTTON_ACCENT_COLOR_LIGHT;
  }
};

const { className: iconClassName, styles: iconStyles } = css.resolve`
  .icon {
    display: inline-block;
    margin-right: 5px;
  }
  .image {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .compact.image {
    margin-left: 0px;
    margin-right: 0px;
  }
  .compact.icon {
    margin-right: 0px;
  }
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon,
  children,
  compact,
  color,
  theme,
  disabled,
  full,
  center,
  updates,
  label,
}) => {
  const THEME_COLOR = getThemeColor(theme);
  const REVERSE_THEME_COLOR = getReverseThemeColor(theme);
  const transparent = ButtonStyle.TRANSPARENT === theme;
  return (
    <>
      <div
        className={classnames("button", {
          compact,
          full,
          center,
          disabled,
          "with-image": typeof icon === "string",
        })}
      >
        {updates && (
          <div className="updates">
            {updates === true ? (
              <FontAwesomeIcon icon={faCertificate} />
            ) : updates === Infinity ? (
              "∞"
            ) : (
              updates
            )}
          </div>
        )}
        <button onClick={onClick} disabled={disabled} aria-label={label}>
          {icon && (
            <Icon
              icon={icon}
              className={classnames(iconClassName, { compact })}
            />
          )}
          {/* if the button is compact then don't display the text, unless there's no icon or image.*/}
          {(!compact || !icon) && <div className="content">{children}</div>}
        </button>
      </div>
      {iconStyles}
      <style jsx>{`
        .button {
          display: inline-block;
          position: relative;
          font-size: 13px;
          line-height: 115%;
        }
        .button.disabled {
          opacity: 50%;
        }
        .button button {
          border-radius: 25px;
          background-image: none;
          border: 2px solid ${color || REVERSE_THEME_COLOR};
          color: ${color || REVERSE_THEME_COLOR};
          background-color: ${THEME_COLOR};
          padding: 8px 12px;
          display: flex;
          align-items: center;
        }
        .button.with-image button {
          padding: 5px 12px;
        }
        .button:not(.disabled) button:hover {
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${color || THEME_COLOR};
          color: ${color || (transparent ? "white" : THEME_COLOR)};
          cursor: pointer;
        }
        .button:not(.disabled) button:active:focus {
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${color || THEME_COLOR};
          color: ${color || (transparent ? "white" : THEME_COLOR)};
        }
        .button:not(.disabled) button:hover .icon {
          color: ${color || (transparent ? "white" : THEME_COLOR)};
        }
        .button.disabled button:hover {
          background-image: none;
          background-color: ${THEME_COLOR};
          border-color: ${color || REVERSE_THEME_COLOR};
        }
        .button button:focus {
          outline: none;
        }
        .button button:focus-visible {
          outline: none;
          box-shadow: blue 0px 0px 0px 3px;
        }

        .disabled .updates {
          opacity: 0.8;
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
        .compact button {
          min-width: 25px;
          max-width: 60px;
        }
        .compact button .content {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .full {
          width: 100%;
        }
        .center {
          justify-content: center;
        }
        .full button {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default React.memo(Button);

export interface ButtonProps {
  children: string | React.ReactNode;
  icon?: IconProps["icon"];
  compact?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  theme?: ButtonStyle;
  updates?: number | boolean;
  label?: string;
  full?: boolean;
  center?: boolean;
}
