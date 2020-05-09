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
          background-color: ${theme == ButtonStyle.LIGHT ? "#1c1c1c" : "#fff"};
          border: 2px solid ${color || "#fff"};
          color: ${color || "#fff"};
        }
        .compact > :global(button):active:focus {
          background-color: ${theme == ButtonStyle.LIGHT ? "#1c1c1c" : "#fff"};
          border: 2px solid ${color || "#fff"};
          color: ${color || "#fff"};
        }
        .compact > :global(button) {
          min-width: 25px;
          color: ${color || "#fff"};
          background-color: ${theme == ButtonStyle.DARK ? "#1c1c1c" : "#fff"};
          border: 2px solid ${color || "#fff"};
          background-image: none;
        }
        .compact .icon {
          margin-right: 0px;
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
