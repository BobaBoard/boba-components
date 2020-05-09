import "@trendmicro/react-buttons/dist/react-buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import classnames from "classnames";

import React from "react";
// @ts-ignore
import { Button as LibraryButton } from "@trendmicro/react-buttons";

export enum ButtonStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon,
  children,
  compact,
  color,
  theme,
}) => {
  const THEME_COLOR = theme == ButtonStyle.DARK ? "#1c1c1c" : "#fff";
  const REVERSE_THEME_COLOR = theme == ButtonStyle.DARK ? "#fff" : "#1c1c1c";
  return (
    <div className={classnames("button", { compact })}>
      <LibraryButton btnStyle="flat" onClick={onClick}>
        {icon && (
          <div className="icon">
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        {!compact && children}
      </LibraryButton>
      <style jsx>{`
        .button {
          display: inline-block;
        }
        .button > :global(button) {
          border-radius: 25px;
        }
        .icon {
          display: inline-block;
          margin-right: 5px;
        }

        .compact > :global(button):hover {
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${color || THEME_COLOR};
          color: ${color || THEME_COLOR};
        }
        .compact > :global(button):active:focus {
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${color || THEME_COLOR};
          color: ${color || THEME_COLOR};
        }
        .compact > :global(button):hover .icon {
          color: ${color || THEME_COLOR};
        }
        .compact > :global(button) {
          min-width: 25px;
          color: ${color || "#fff"};
          background-color: ${THEME_COLOR};
          border: 2px solid ${color || REVERSE_THEME_COLOR};
          background-image: none;
        }
        .compact .icon {
          margin-right: 0px;
          color: ${color || REVERSE_THEME_COLOR};
        }
      `}</style>
    </div>
  );
};

export default Button;

export interface ButtonProps {
  children: string;
  icon?: IconDefinition;
  compact?: boolean;
  tooltip?: string;
  onClick?: () => void;
  disabled?: boolean;
  primary?: boolean;
  color?: string;
  theme?: ButtonStyle;
}
