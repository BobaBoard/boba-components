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
      <input
        id={props.id}
        name={props.label}
        type={props.password ? "password" : "text"}
        value={value}
        placeholder={props.placeholder}
        onChange={(e) => !props.disabled && props.onTextChange(e.target.value)}
        disabled={props.disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.onEnter?.(e);
          }
        }}
        ref={(input) => {
          // Whenever the input changes, set a custom validity error message if
          // there is a current error.
          input?.setCustomValidity(errorMessage || "");
          inputRef.current = input;
        }}
      />
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
        input:focus {
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
      `}</style>
    </div>
  );
};

export default Input;
