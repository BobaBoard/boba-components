import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Theme from "../theme/default";
import classNames from "classnames";

export interface FloatingActionButtonProps {
  accentColor?: string;
  spin?: boolean;
  actions: {
    icon: IconDefinition;
    tooltip: string;
    action: () => void;
  }[];
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = (props) => {
  return (
    <div className={classNames("fab-container")}>
      <button className="fab-clickable-area" onClick={props.actions[0].action}>
        <div className="fab">
          <div className="icon">
            <FontAwesomeIcon icon={props.actions[0].icon} spin={props.spin} />
          </div>
        </div>
      </button>
      <style jsx>{`
        .fab-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 6;
        }
        .fab-clickable-area {
          position: fixed;
          right: 15px;
          bottom: 15px;
          padding: 5px;
          border: 0;
          background-color: transparent;
        }
        .fab {
          border: 0;
          margin: 0;
          padding: 0;
          background-color: ${props.accentColor || Theme.DEFAULT_ACCENT_COLOR};
          color: white;
          text-align: center;
          width: 56px;
          height: 56px;
          font-size: 16px;
          border-radius: 50%;
          transition: all 0.1s ease-in-out;
          box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%),
            0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 20%);
        }
        .fab-clickable-area:hover .fab {
          box-shadow: 0 4px 5px 0 rgb(0 0 0 / 20%),
            0 1px 10px 0 rgb(0 0 0 / 18%), 0 2px 4px -1px rgb(0 0 0 / 28%);
          transform: scale(1.048);
        }
        .fab-clickable-area:hover {
          cursor: pointer;
        }
        .fab-clickable-area:focus {
          outline: none;
        }
        .fab-clickable-area:focus-visible {
          outline: auto;
        }
        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        @media only screen and (max-width: 460px) {
          .fab {
            width: 35px;
            height: 35px;
            font-size: 13px;
          }
          .fab-clickable-area {
            padding: 10px;
            right: 10px;
            bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingActionButton;
