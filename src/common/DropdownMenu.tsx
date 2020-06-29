import React from "react";
import classnames from "classnames";
import Tooltip from "./Tooltip";
import Button from "./Button";
import Theme from "../theme/default";

export interface DropdownProps {
  options: {
    name: string;
    onClick: () => void;
  }[];
}
const DropdownMenu: React.FC<DropdownProps> = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <Tooltip
        isOpen={isOpen}
        position="bottom"
        content={
          <div className={"menu"}>
            {props.options.map((option, index) => (
              <div
                className={classnames("option")}
                onClick={() => {
                  option.onClick();
                  setOpen(false);
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        }
        onClickOutside={() => setOpen(false)}
        background="white"
        padding={0}
      >
        <span>
          <Button onClick={() => setOpen(!isOpen)}>Contribute</Button>
        </span>
      </Tooltip>
      <style jsx>{`
        .menu {
          width: 300px;
          color: black;
        }
        .option {
          padding: 15px 20px;
          border-bottom: 2px solid black;
        }
        .option:first-child {
          border-radius: 10px 10px 0px 0px;
        }
        .option:last-child {
          border-radius: 0px 0px 10px 10px;
        }
        .option:hover {
          color: white;
          background-color: black;
          cursor: pointer;
        }
        .option:first-child:hover {
        }
      `}</style>
    </>
  );
};

export default DropdownMenu;
