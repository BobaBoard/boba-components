import "@trendmicro/react-buttons/dist/react-buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import classnames from "classnames";

import React from "react";
// @ts-ignore
import { Button as LibraryButton } from "@trendmicro/react-buttons";
import Tooltip from "./Tooltip";

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
  disabled,
  tooltip,
}) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const THEME_COLOR = theme == ButtonStyle.DARK ? "#1c1c1c" : "#fff";
  const REVERSE_THEME_COLOR = theme == ButtonStyle.DARK ? "#fff" : "#1c1c1c";
  return (
    <>
      <Tooltip content={<div>{tooltip}</div>} isOpen={tooltipOpen} delay={1000}>
        <div
          className={classnames("button", { compact })}
          onMouseEnter={() => tooltip && setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
        >
          <LibraryButton btnStyle="flat" onClick={onClick} disabled={disabled}>
            {icon && (
              <div className="icon">
                <FontAwesomeIcon icon={icon} />
              </div>
            )}
            {!compact && children}
          </LibraryButton>
        </div>
      </Tooltip>
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
    </>
  );
};

export default Button;

export interface ButtonProps {
  children: string | JSX.Element;
  tooltip?: string | JSX.Element;
  icon?: IconDefinition;
  compact?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  primary?: boolean;
  color?: string;
  theme?: ButtonStyle;
}
