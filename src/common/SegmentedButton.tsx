import React, { useState } from "react";
import { ButtonStyle, getThemeColor, getReverseThemeColor } from "./Button";
import ActionLink from "./ActionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import Color from "color";
import classnames from "classnames";
import css from "styled-jsx/css";

const getOptionStyle = () => css.resolve`
  .option {
    display: inline-block;
    text-align: center;
    position: relative;
    flex: 1;
  }
`;

const getUpdatesStyle = (color: string, reverseColor: string, transparent: boolean) => css.resolve`
  .updates {
    background-color: ${color};
    border: 2px solid ${reverseColor};
    color: ${transparent ? "black" : reverseColor};
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
`;

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

const SegmentedButtonOption: React.FC<SegmentedButtonOptionProps> = (props) => {
  return (
    <div
      className={classnames(
        'option',
        props.optionClass,
        props.isSelected ? "selected" : {}
      )}
    >
      {props.updates && (
        <div className={classnames(
          'updates',
          props.updatesClass)}
        >
          {props.updates === true ? (
            <FontAwesomeIcon icon={faCertificate} />
          ) : props.updates == Infinity ? (
            "∞"
          ) : (
            props.updates
          )}
        {props.updatesStyles}
        </div>
      )}
      <ActionLink
        link={{
          onClick: () => {
            props.setSelected(props.id);
            if (props.onClick) {
              props.onClick();
            }
          },
          href: props.href,
        }}
        className={classnames(
          'option-link', props.linkClass,
          props.isSelected ? props.selectedLinkClass : {})}
        allowDefault={!!props.href && !props.onClick}
      >
        {props.label}
        {props.linkStyles}
        {props.isSelected && props.selectedLinkStyles}
      </ActionLink>
      {props.optionStyles}
    </div>
  );
};

interface SegmentedButtonOptionProps {
  isSelected: boolean,
  setSelected: React.Dispatch<React.SetStateAction<string>>,
  linkClass: string,
  linkStyles: string,
  optionClass: string,
  optionStyles: string,
  selectedLinkClass: string,
  selectedLinkStyles: string,
  updatesClass: string,
  updatesStyles: string,
  id: string;
  label: string;
  updates?: number | boolean;
  onClick?: () => void;
  href?: string;
}

const SegmentedButton: React.FC<SegmentedButtonProps> = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const THEME_COLOR = getThemeColor(props.theme);
  const REVERSE_THEME_COLOR = getReverseThemeColor(props.theme);
  const { className: linkClass, styles: linkStyles } = getLinkStyle(
    props.color || THEME_COLOR, REVERSE_THEME_COLOR
  );
  const { className: selectedLinkClass, styles: selectedLinkStyles } = getSelectedLinkStyle(
    props.color || THEME_COLOR, REVERSE_THEME_COLOR
  );
  const { className: optionClass, styles: optionStyles } = getOptionStyle();
  const { className: updatesClass, styles: updatesStyles } = getUpdatesStyle(
    props.color || THEME_COLOR, REVERSE_THEME_COLOR, ButtonStyle.TRANSPARENT == props.theme
  );
  return (
    <div className={classnames("segmented-button", {})}>
      {props.options.map((option) => (
        <SegmentedButtonOption
          isSelected={option.id == selected}
          setSelected={setSelected}
          optionClass={optionClass}
          optionStyles={optionStyles}
          linkClass={linkClass}
          linkStyles={linkStyles}
          selectedLinkClass={selectedLinkClass}
          selectedLinkStyles={selectedLinkStyles}
          updatesClass={updatesClass}
          updatesStyles={updatesStyles}
          id={option.id}
          key={"" + option.id}
          updates={option.updates}
          onClick={option.onClick}
          href={option.href}
          label={option.label}
        />
      ))}
      <style jsx>{`
        .segmented-button {
          border-radius: 25px;
          background-color: ${REVERSE_THEME_COLOR};
          border: 2px solid ${props.color || THEME_COLOR};
          display: flex;
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
