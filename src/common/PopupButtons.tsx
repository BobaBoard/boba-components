import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { LinkWithAction } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionLink from "./ActionLink";
import css from "styled-jsx/css";
import DefaultTheme from "../theme/default";
import classnames from "classnames";
import ReactDOM from "react-dom";
import { lightenColor } from "../utils";

export interface PopupButtonsProps {
  options?: ({
    name: string;
    icon?: IconDefinition | string;
    color?: string;
  } & { link: LinkWithAction })[];
  onCloseRequest: () => void;
  show?: boolean;
  centerTop: string;
  centerLeft: string;
  defaultColor?: string;
}

const BUTTONS_SIZE = 35;
const BUTTONS_OFFSET = 55;
const DEG_OFFSET = 40;

const getButtonStyle = (color?: string) => {
  const backgroundColor = color || DefaultTheme.DEFAULT_ACCENT_COLOR;
  return css.resolve`
    .icon {
      display: block;
      width: ${BUTTONS_SIZE}px;
      height: ${BUTTONS_SIZE}px;
      background-color: ${backgroundColor};
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      position: relative;
      display: block;
      color: ${DefaultTheme.LAYOUT_BOARD_BACKGROUND_COLOR};
      transform: translate(-50%, -50%);
    }
    .icon:hover {
      background-color: ${lightenColor(backgroundColor, 0.1)};
    }
  `;
};

const PopupButton: React.FC<NonNullable<PopupButtonsProps["options"]>[0]> = (
  option
) => {
  const { className: buttonClass, styles: buttonStyles } = getButtonStyle(
    option.color
  );

  return (
    <ActionLink link={option.link} className={`icon ${buttonClass}`}>
      <FontAwesomeIcon
        // @ts-ignore
        icon={option.icon}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "block",
        }}
      />
      {buttonStyles}
    </ActionLink>
  );
};
const PopupButtons: React.FC<PopupButtonsProps> = (props) => {
  const options = (
    <>
      {props.options?.map((option, index) => {
        const angle = ((-90 + index * 45 + DEG_OFFSET) * Math.PI) / 180;
        const offsetX = Math.cos(angle) * BUTTONS_OFFSET;
        const offsetY = Math.sin(angle) * BUTTONS_OFFSET;
        return (
          <div
            key={option.name}
            className={classnames("option", {
              show: !!props.show,
            })}
            style={{
              animationDelay: `${0.1 * index}s`,
              transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
          >
            <PopupButton
              {...option}
              color={option.color || props.defaultColor}
            />
          </div>
        );
      })}
      <style jsx>{`
        .option {
          display: none;
          opacity: 0;
        }
        .option.show {
          display: block;
          animation-name: enterStaggered;
          animation-duration: 0.2s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          position: absolute;
          top: ${props.centerTop};
          left: ${props.centerLeft};
          animation-timing-function: ease-in;
        }
        @keyframes enterStaggered {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
  const { show, onCloseRequest } = props;
  React.useEffect(() => {
    const listener = () => {
      onCloseRequest();
    };
    if (show) {
      document.addEventListener("click", listener);
    }

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [show, onCloseRequest]);

  return ReactDOM.createPortal(
    <div className="options-container">
      <div className="center" />
      {options}
      <style jsx>{`
        .options-container {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 100;
        }
        .center {
           {
            /* width: 5px;
          height: 5px;
          background-color: red; */
          }
          position: absolute;
          top: ${props.centerTop};
          left: ${props.centerLeft};
        }
      `}</style>
    </div>,
    document.body
  );
};

export default PopupButtons;
