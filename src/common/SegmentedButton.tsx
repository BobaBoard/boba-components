import React from "react";
import {
  Button,
  ButtonStyle,
  // @ts-ignore
} from "@bobaboard/ui-components";
import classnames from "classnames";

const SegmentedButton: React.FC<SegmentedButtonProps> = (props) => {
  return (
    <div className={classnames("segmented-button", {})}>
      {props.options.map((option) => (
        <div className="button" key={"" + option.id}>
          <Button
            theme={
              props.selected == option.id ? ButtonStyle.LIGHT : ButtonStyle.DARK
            }
            onClick={option.onClick}
            updates={option.updates}
          >
            {option.label}
          </Button>
        </div>
      ))}
      <style jsx>{`
        .segmented-button {
          display: flex;
          justify-content: space-evenly;
        }
      `}</style>
    </div>
  );
};

export interface SegmentedButtonProps {
  options: {
    id: string;
    label: string;
    updates?: number;
    onClick: () => void;
  }[];
  selected: string;
}

export default SegmentedButton;