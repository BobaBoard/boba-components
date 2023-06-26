import {
  ButtonStyle,
  getReverseThemeColor,
  getThemeColor,
} from "buttons/Button";

import ActionLink from "buttons/ActionLink";
import Color from "color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkWithAction } from "types";
import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

const getOptionsStyle = (settings: {
  color: string;
  reverseColor: string;
  transparent: boolean;
}) => css.resolve`
  .option {
    display: inline-block;
    text-align: center;
    position: relative;
    flex: 1;
  }
  .updates {
    background-color: ${settings.color};
    border: 2px solid ${settings.reverseColor};
    color: ${settings.transparent ? "black" : settings.reverseColor};
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
  .option-link {
    border-radius: 25px;
    padding: 8px 12px;
    background-image: none;
    color: ${settings.color};
    background-color: ${settings.reverseColor};
    border: 2px solid ${settings.reverseColor};
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
    background-color: ${Color(settings.color).alpha(0.5)};
  }
  .selected {
    border: 2px solid ${settings.reverseColor};
    color: ${settings.reverseColor};
    background-color: ${settings.color};
  }
  .selected:hover {
    background-color: ${settings.color};
  }
`;

const SegmentedButtonOption: React.FC<SegmentedButtonOptionProps> = (props) => {
  const THEME_COLOR = getThemeColor(props.theme);
  const REVERSE_THEME_COLOR = getReverseThemeColor(props.theme);
  const { className: optionsClass, styles: optionsStyles } = getOptionsStyle({
    color: props.color || THEME_COLOR,
    reverseColor: REVERSE_THEME_COLOR,
    transparent: ButtonStyle.TRANSPARENT === props.theme,
  });
  return (
    <div className={classnames("option", optionsClass)}>
      {props.updates && (
        <div className={classnames("updates", optionsClass)}>
          {props.updates === true ? ( // Special case to display faCertificate
            <FontAwesomeIcon icon={faCertificate} />
          ) : props.updates === Infinity ? (
            "∞"
          ) : (
            props.updates
          )}
        </div>
      )}
      <ActionLink
        link={props.link}
        className={classnames(
          "option-link",
          { selected: props.isSelected },
          optionsClass
        )}
        allowDefault={!!props.link.href && !props.link.onClick}
      >
        {props.label}
      </ActionLink>
      {optionsStyles}
    </div>
  );
};

interface SegmentedButtonOptionProps {
  id: string;
  label: string;
  link: LinkWithAction;
  isSelected: boolean;
  updates?: number | boolean;
  theme?: ButtonStyle;
  color?: string;
}

const SegmentedButton: React.FC<SegmentedButtonProps> = (props) => {
  const THEME_COLOR = getThemeColor(props.theme);
  const REVERSE_THEME_COLOR = getReverseThemeColor(props.theme);
  return (
    <div className={classnames("segmented-button", {})}>
      {props.options.map((option) => (
        <SegmentedButtonOption
          id={option.id}
          label={option.label}
          link={option.link}
          isSelected={option.id === props.selected}
          updates={option.updates}
          theme={props.theme}
          color={props.color}
          key={`${option.id}`}
        />
      ))}
      <style jsx>{`
        .segmented-button {
          border-radius: 25px;
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${props.color || THEME_COLOR};
          display: flex;
          font-size: var(--font-size-regular);
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
    link: LinkWithAction;
  }[];
  selected: string;
  theme?: ButtonStyle;
  color?: string;
}

export default SegmentedButton;
