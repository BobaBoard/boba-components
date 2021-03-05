import React, { useState } from "react";
import { ButtonStyle, getThemeColor, getReverseThemeColor } from "./Button";
import ActionLink from "./ActionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import Color from "color";
import classnames from "classnames";

const SegmentedButton: React.FC<SegmentedButtonProps> = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const THEME_COLOR = getThemeColor(props.theme);
  const REVERSE_THEME_COLOR = getReverseThemeColor(props.theme);
  const transparent = ButtonStyle.TRANSPARENT == props.theme;
  return (
    <div className={classnames("segmented-button", {})}>
      {props.options.map((option) => (
        <div
          className={classnames(
            "segmented-button-option",
            selected == option.id ? "selected" : {}
          )}
          key={"" + option.id}
        >
          {option.updates && (
            <div className="updates">
              {option.updates === true ? (
                <FontAwesomeIcon icon={faCertificate} />
              ) : option.updates == Infinity ? (
                "∞"
              ) : (
                option.updates
              )}
            </div>
          )}
          <ActionLink
            link={{
              onClick: () => {
                setSelected(option.id);
                if (option.onClick) {
                  option.onClick();
                }
              },
              href: option.href,
            }}
            className="segmented-button-link"
            allowDefault={!!option.href && !option.onClick}
          >
            {option.label}
          </ActionLink>
        </div>
      ))}
      <style jsx>{`
        .segmented-button {
          border-radius: 25px;
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${props.color || THEME_COLOR};
          display: flex;
        }
        .segmented-button-option {
          display: inline-block;
          position: relative;
          flex: 1;
        }
        .segmented-button-option > :global(button),
        .segmented-button-option > :global(a) {
          border-radius: 25px;
          padding: 8px 12px;
          background-image: none;
          color: ${props.color || THEME_COLOR};
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${REVERSE_THEME_COLOR};
          transition: all 0.2s linear 0s;
          box-sizing: border-box;
          display: inline-block;
          width: 100%;
        }
        .segmented-button-option > :global(button):focus,
        .segmented-button-option > :global(a):focus {
          outline: none;
        }
        .segmented-button-option:not(.selected):hover > :global(button),
        .segmented-button-option:not(.selected):hover > :global(a) {
          background-color: ${Color(props.color || THEME_COLOR).alpha(0.5)};
          cursor: pointer;
        }
        .segmented-button-option.selected:hover > :global(button),
        .segmented-button-option.selected:hover > :global(a) {
          cursor: pointer;
        }
        .selected > :global(button),
        .selected > :global(a) {
          border: 2px solid ${REVERSE_THEME_COLOR};
          color: ${REVERSE_THEME_COLOR};
          background-color: ${props.color || THEME_COLOR};
        }
        .updates {
          background-color: ${props.color || THEME_COLOR};
          border: 2px solid ${REVERSE_THEME_COLOR};
          color: ${transparent ? "black" : REVERSE_THEME_COLOR};
          position: absolute;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          right: -5px;
          top: -5px;
          text-align: center;
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          z-index: 2;
          transition: all 0.2s linear 0s;
        }
      `}</style>
    </div>
  );
};

export interface SegmentedButtonProps {
  options: {
    id: string;
    label: string;
    updates?: number | boolean;
    onClick?: () => void;
    href?: string;
  }[];
  selected: string;
  theme?: ButtonStyle;
  color?: string;
}

export default SegmentedButton;
