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
  helper?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  errorMessage?: string;
  onTextChange: (text: string) => void;
  theme?: InputStyle;
  color?: string;
  password?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const [focused, setFocused] = React.useState(false);
  const { errorMessage, helper, maxLength, value } = props;

  return (
    <div
      className={classnames("input", {
        error: !!errorMessage,
        helper: !errorMessage && !!helper,
        focused,
        disabled: props.disabled,
      })}
    >
      <div className="label">{props.label}</div>
      <input
        className={classnames("input-field", {
          focused,
        })}
        name={props.label}
        id={props.id}
        type={props.password ? "password" : "text"}
        value={value}
        placeholder={props.placeholder}
        onChange={(e) => !props.disabled && props.onTextChange(e.target.value)}
        onFocus={(e) => !props.disabled && setFocused(true)}
        onBlur={() => !props.disabled && setFocused(false)}
        disabled={props.disabled}
      />
      {}
      <div></div>
      {(!!helper || !!errorMessage || !!maxLength) && (
        <div className="input__bottom">
          <span className="input__bottom-text">
            {!!errorMessage ? errorMessage : helper || ""}
          </span>
          <span className="input__bottom-limit">
            {!!maxLength ? `${value.length}/${maxLength}` : ""}
          </span>
        </div>
      )}
      <style jsx>{`
        .input {
          display: inline-block;
          position: relative;
          width: 100%;
        }
        .input.disabled {
          opacity: 0.8;
        }
        .input .label {
          color: #fff;
          font-size: 16px;
          padding-bottom: 10px;
        }
        .error .input-field {
          border: 1px solid rgba(214, 19, 19, 0.4);
        }
        .input-field {
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-size: 16px;
          padding: 12px;
          background-color: #2f2f30;
          width: 100%;
          box-sizing: border-box;
        }
        .input-field:focus {
          outline: none;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-sizing: border-box;
          box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.1);
        }
        .error .input-field:focus {
          box-shadow: 0px 0px 0px 3px rgba(214, 19, 19, 0.2);
        }
        .input__bottom {
          color: #bfbfbf;
          display: flex;
          font-size: 14px;
          justify-content: space-between;
          padding-top: 10px;
        }
        .input.error .input__bottom-text {
          color: #d61313;
        }
      `}</style>
    </div>
  );
};

export default Input;
