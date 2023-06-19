import React from "react";

interface CheckboxProps {
  name: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = (props) => (
    <label className="switch">
      <input
        type="checkbox"
        id={props.name}
        name={props.name}
        checked={props.value}
        onChange={(e) => {
          props.onValueChange(e.currentTarget.checked);
        }}
      />
      <div className="switch-control"></div>

      <style jsx>{`
        input {
          opacity: 0;
          display: none;
          z-index: -1;
        }

        .switch-control {
          height: 26px;
          width: 50px;
          border-radius: 13px;
          position: relative;
          background-color: rgba(255, 255, 255, 0.2);
          transition: background-color 0.1s ease-out;
        }

        .switch-control:hover {
          background-color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }

        .switch-control::before {
          content: "";
          background: white;
          position: absolute;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
          top: 3px;
          left: 3px;
          transition: left 0.1s ease-out;
        }

        input:checked ~ .switch-control {
          background-color: red;
        }

        input:checked ~ .switch-control:hover {
          background-color: red; /*  but a shade darker */
        }

        input:checked ~ .switch-control::before {
          left: calc(100% - 20px - 3px);
        }
      `}</style>
    </label>
  );

export default Checkbox;
