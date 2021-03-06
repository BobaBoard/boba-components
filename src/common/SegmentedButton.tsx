import React, { useState } from "react";
import { ButtonStyle, getThemeColor, getReverseThemeColor } from "./Button";
import ActionLink from "./ActionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import Color from "color";
import classnames from "classnames";
import css from "styled-jsx/css";

const getLinkStyle = (color: string, reverseColor: string) => css.resolve`
  .option-link {
    border-radius: 25px;
    padding: 8px 12px;
    background-image: none;
    color: ${color};
    background-color: ${reverseColor};
    border: 2px solid ${reverseColor};
    transition: all 0.2s linear 0s;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
  }
  .option-link:focus {
    outline: none;
  }
  .option-link:hover {
    cursor: pointer;
    background-color: ${Color(color).alpha(0.5)};
  }
`;

const getSelectedLinkStyle = (color: string, reverseColor: string) => css.resolve`
  .option-link {
    border: 2px solid ${reverseColor};
    color: ${reverseColor};
    background-color: ${color};
  }
  .option-link:hover {
    background-color: ${color};
  }
`;

const SegmentedButton: React.FC<SegmentedButtonProps> = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const THEME_COLOR = getThemeColor(props.theme);
  const REVERSE_THEME_COLOR = getReverseThemeColor(props.theme);
  const transparent = ButtonStyle.TRANSPARENT == props.theme;
  const { className: linkClass, styles: linkStyles } = getLinkStyle(
    props.color || THEME_COLOR, REVERSE_THEME_COLOR
  );
  const { className: selectedLinkClass, styles: selectedLinkStyles } = getSelectedLinkStyle(
    props.color || THEME_COLOR, REVERSE_THEME_COLOR
  );
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
            className={`option-link ${linkClass} ${selected == option.id ? selectedLinkClass : ''}`}
            allowDefault={!!option.href && !option.onClick}
          >
            {option.label}
            {linkStyles}
            {selected == option.id && selectedLinkStyles}
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
          text-align: center;
          position: relative;
          flex: 1;
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
