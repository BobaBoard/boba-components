import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { LinkWithAction } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionLink from "./ActionLink";
import css from "styled-jsx/css";
import DefaultTheme from "../theme/default";
import classnames from "classnames";
import ReactDOM from "react-dom";

interface PopupButtonsProps {
  options?: ({
    name: string;
    icon?: IconDefinition | string;
    color?: string;
  } & { link: LinkWithAction })[];
  show?: boolean;
  centerTop: string;
  centerLeft: string;
}

const getButtonStyle = (color?: string) => {
  return css.resolve`
    .icon {
      display: block;
      width: 40px;
      height: 40px;
      background-color: ${color || DefaultTheme.DEFAULT_ACCENT_COLOR};
      border-radius: 50%;
      position: relative;
      display: block;
      color: ${DefaultTheme.LAYOUT_BOARD_BACKGROUND_COLOR};
      transform: translate(-50%, -50%);
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

const BUTTONS_OFFSET = 60;
const PopupButtons: React.FC<PopupButtonsProps> = (props) => {
  const options = (
    <>
      {props.options?.map((option, index) => {
        const angle = ((-90 + index * 45) * Math.PI) / 180;
        const offsetX = Math.cos(angle) * BUTTONS_OFFSET;
        const offsetY = Math.sin(angle) * BUTTONS_OFFSET;
        return (
          <div
            key={option.name}
            className={classnames("option", {
              show: !!props.show,
            })}
            style={{
              animationDelay: `${0.15 * index}s`,
              transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
          >
            <PopupButton {...option} />
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
          animation-duration: 0.3s;
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
  return ReactDOM.createPortal(
    <div className="options-container">
      <div className="center" />
      {options}
      <style jsx>{`
        .options-container {
          position: relative;
        }
        .center {
          width: 5px;
          height: 5px;
          background-color: red;
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
