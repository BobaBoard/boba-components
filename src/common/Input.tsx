import React, {useEffect} from "react";

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
  onTextChange: (text: string) => void;
  theme?: InputStyle;
  color?: string;
  password?: boolean;
  helperText?:string;
  max ? :number;
  type?: string; 
}

const Input: React.FC<InputProps> = (props) => {
  
  const [focused, setFocused] = React.useState(false);

  const THEME_COLOR = props.theme == InputStyle.DARK ? "#1c1c1c" : "#fff";

  const REVERSE_THEME_COLOR =
  props.theme == InputStyle.DARK ? "#fff" : "#1c1c1c";
  const onChangeHandler = (event: any) => {
    if(props.max && props.max > 0) {
      if(props.value.length < props.max) {
        props.onTextChange(event.target.value);
        return;
      } else {
        let val = event.target.value.slice(0, props.max);
        props.onTextChange(val);
      }
    } else {
      props.onTextChange(event.target.value);
    }    
  }



    return (
    <div
      className={classnames("input", {
        error: !!props.errorMessage,
        focused,
        empty: props.value.length == 0,
        disabled: props.disabled,
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
        {(props.type != 'textarea' && <input
          className={classnames("input-field", {
            error: !!props.errorMessage,
            focused,            
          })}
          name={props.label}
          id={props.id}
          type={props.password ? "password" : "text"}
          value={props.value}
          placeholder={props.label}
          onChange={(e) =>
            !props.disabled && onChangeHandler(e)
          }
          onFocus={(e) => !props.disabled && setFocused(true)}
          onBlur={() => !props.disabled && setFocused(false)}
          disabled={props.disabled}
        />)}

        {props.type=='textarea' && <textarea
          className={classnames("input-field textarea", {
            error: !!props.errorMessage,
            focused,            
          })}
          name={props.label}
          id={props.id}
          
          value={props.value}
          placeholder={props.label}
          onChange={(e) =>
            !props.disabled && onChangeHandler(e)
          }
          onFocus={(e) => !props.disabled && setFocused(true)}
          onBlur={() => !props.disabled && setFocused(false)}
          disabled={props.disabled}
        />}
      </label>
      {
        props.errorMessage 
        ?  <div className="error--text">{props.errorMessage}</div>  
        : props.helperText ? <div className="helper--text">{props.helperText}</div> : ""
      }
      {
        props.max && (
        <div className="counter">{props.value.length + "/" +props.max}</div>
        )
      }
      
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
          opacity: 1;
          color: ${props.color || 'white'};
          padding-left: 2px;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;

        }
        .input .helper--text {
          font-size: 14px;
          color: #3db790;
          margin-top:10px;
        }
        .input .error--text {
          font-size: 14px;
          color: #ff0000;
          margin-top:10px;
        }

        .counter {
          position: absolute;
          right: 0;
          bottom: 0;
          color: white;
        }

        .input.empty .label {
          visibility: hidden;
          opacity: 0;
          transition-property: opacity;
          transition-duration: 0.8s;
          transition-timing-function: easeInSine;
        }

        .input-field {
          font-size: 16px;
          border-radius: 8px;
          padding: 10px;
          color: white;
          background-color: #2f2f30;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ffffff4d;
        }
        .input-field.textarea {
          min-height: 100px;
        }
        .input-field.error {
          border: 1px solid red;
        }

        .input-field:focus {
          outline: none;
          border: 1px solid #ffffff66;
          box-shadow: 0 0 3px #ffffff1a;
        }


        .input-field.error:focus {
          outline: none;
          border: 1px solid #ff000066;
          box-shadow:0 0 3px #ff00001a;
        }
      `}</style>
    </div>
  );
};

export default Input;
