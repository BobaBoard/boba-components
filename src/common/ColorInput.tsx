import React from "react";
import { ChromePicker } from "react-color";
import Tooltip from "./Tooltip";

const ColorInput: React.FC<ColorInputProps> = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div>
      <Tooltip
        isOpen={isOpen}
        position="bottom"
        content={
          <div className="color-picker">
            <ChromePicker
              disableAlpha
              color={props.currentColor}
              onChange={(color) => props.onColorChange(color.hex)}
            />
          </div>
        }
        onClickOutside={() => setOpen(false)}
        padding={0}
        accentColor={props.currentColor}
      >
        <div className="color-selector" onClick={() => setOpen(!isOpen)}>
          <div className={"color-code"}>{props.currentColor.substring(1)}</div>
          <div
            className={"color-sample"}
            style={{ backgroundColor: props.currentColor }}
          ></div>
        </div>
      </Tooltip>
      <style jsx>{`
        .color-selector {
          background-color: #2f2f30;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          position: relative;
          display: flex;
          max-width: 300px;
          justify-content: space-between;
        }
        .color-sample {
          align-self: stretch;
          width: 35px;
          border-radius: 0px 8px 8px 0px;
          border: 3px white solid;
        }
        .color-code {
          padding: 10px;
        }
        .color-code::before {
          content: "#";
          color: white;
          font-size: large;
          padding-right: 5px;
        }
        .color-picker {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export interface ColorInputProps {
  currentColor: string;
  onColorChange: (newColor: string) => void;
}

export default ColorInput;
