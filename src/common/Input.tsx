import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  theme?: InputStyle;
  color?: string;
  password?: boolean;
  hideLabel?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const { errorMessage, helper, maxLength, value } = props;
  const inputRef = React.useRef<HTMLInputElement | null>();

  // If there is an errror message, let's mark the input itself as invalid
  // for accessibility reasons.
  errorMessage && inputRef.current?.setCustomValidity(errorMessage || "");

  const hasHelperText = !!(helper || errorMessage);
  const hasMaxLength = !!maxLength;

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <div
      className={classnames("input", {
        error: !!errorMessage,
        "with-additional-text": hasHelperText || hasMaxLength,
        disabled: props.disabled,
        "hide-label": props.hideLabel,
      })}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <div className="input-wrapper">
        <input
          id={props.id}
          name={props.label}
          type={props.password && !passwordVisible ? "password" : "text"}
          className={classnames({ "password-input": props.password })}
          value={value}
          placeholder={props.placeholder}
          onChange={(event) =>
            !props.disabled && props.onTextChange(event.target.value)
          }
          disabled={props.disabled}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              props.onEnter?.(event);
            }
          }}
          ref={(input) => {
            // Whenever the input changes, set a custom validity error message if
            // there is a current error.
            input?.setCustomValidity(errorMessage || "");
            inputRef.current = input;
          }}
        />
        {props.password && (
          <label className="visibility-toggle">
            <input
              type="checkbox"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </label>
        )}
      </div>
      <div className="additional-info">
        {hasHelperText && (
          <div className="helper-text">
            {errorMessage ? errorMessage : helper || ""}
          </div>
        )}
        {hasMaxLength && (
          <div className="max-length">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      <style jsx>{`
        .input {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        label {
          color: #fff;
          font-size: var(--font-size-regular);
          display: block;
          font-weight: 700;
        }
        .hide-label label {
          display: none;
        }
        input {
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-size: var(--font-size-regular);
          padding: 12px;
          background-color: #2f2f30;
          width: 100%;
          box-sizing: border-box;
        }
        input:focus,
        label:focus-within {
          outline: none;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-sizing: border-box;
          box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.1);
        }
        .additional-info {
          justify-content: space-between;
          display: flex;
          color: #bfbfbf;
          font-size: 14px;
        }
        :not(.with-additional-text) .additional-info {
          display: none;
        }
        // Styles for invalid input
        input:invalid {
          border: 1px solid rgba(214, 19, 19, 0.4);
        }
        input:invalid:focus {
          box-shadow: 0px 0px 0px 3px rgba(214, 19, 19, 0.2);
        }
        .error .additional-info {
          color: #d61313;
        }
        // Styles for disabled input
        .input.disabled label {
          color: #a2a2a2;
        }
        input:disabled {
          background-color: #a2a2a235;
          color: #d2d2d2;
          text-decoration: line-through;
        }
        .password-input {
          padding-right: 50px;
        }
        .input-wrapper {
          position: relative;
        }
        .visibility-toggle {
          cursor: pointer;
          position: absolute;
          right: 0px;
          top: 0px;
          padding: 13px 0px;
          width: 50px;
          height: 100%;
          box-sizing: border-box;
          border-radius: 0 8px 8px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        // hide visibility toggle checkbox in an accesible way
        input[type="checkbox"] {
          position: absolute;
          clip: rect(1px, 1px, 1px, 1px);
          padding: 0;
          border: 0;
          height: 1px;
          width: 1px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Input;
