import React from "react";

import classnames from "classnames";

export enum InputStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface InputProps {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
  errorMessage?: string;
  onTextChange: (string) => void;
  theme?: InputStyle;
  color?: string;
  password?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const [focused, setFocused] = React.useState(false);

  const THEME_COLOR = props.theme == InputStyle.DARK ? "#1c1c1c" : "#fff";
  const REVERSE_THEME_COLOR =
    props.theme == InputStyle.DARK ? "#fff" : "#1c1c1c";
  return (
    <div
      className={classnames("input", {
        error: !!props.errorMessage,
        focused,
        empty: props.value.length == 0,
      })}
    >
      <div className="label">{props.label}</div>
      <label
        htmlFor={props.id}
        className={classnames("label-field", {
          error: !!props.errorMessage,
          focused,
        })}
      >
        <input
          className={classnames("input-field", {
            error: !!props.errorMessage,
            focused,
          })}
          id={props.id}
          type={props.password ? "password" : "text"}
          value={props.value}
          placeholder={props.label}
          onChange={(e) => props.onTextChange(e.target.value)}
          onFocus={() => !props.disabled && setFocused(true)}
          onBlur={() => !props.disabled && setFocused(false)}
        />
      </label>
      <style jsx>{`
        .input {
          display: inline-block;
          position: relative;
        }
        .input .label {
          opacity: 1;
          color: ${props.color || REVERSE_THEME_COLOR};
          padding-left: 18px;
          font-size: small;
          padding-bottom: 2px;
        }
        .input.empty .label {
          visibility: hidden;
          opacity: 0;
          transition-property: opacity;
          transition-duration: 0.8s;
          transition-timing-function: easeInSine;
        }
        .input-field {
          border-radius: 25px;
          padding: 10px 10px;
          border: 2px solid ${props.color || REVERSE_THEME_COLOR};
          color: ${props.color || REVERSE_THEME_COLOR};
          background-color: ${THEME_COLOR};
        }
        .input-field:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Input;
