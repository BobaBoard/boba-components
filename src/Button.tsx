import "@trendmicro/react-buttons/dist/react-buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import classnames from "classnames";

import React from "react";
// @ts-ignore
import { Button as LibraryButton } from "@trendmicro/react-buttons";

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon,
  children,
  compact,
}) => {
  return (
    <div className={classnames("button", { compact })}>
      <LibraryButton onClick={onClick}>
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
        .icon {
          display: inline-block;
          margin-right: 5px;
        }
        .compact > :global(button) {
          min-width: 25px;
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
}
