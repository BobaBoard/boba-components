import React from "react";
import Modal from "./Modal";
import Button, { ButtonStyle } from "./Button";
import classnames from "classnames";

const ModalWithButtons: React.FC<ModalWithButtonsProps> = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
      onRequestClose={props.onCloseModal}
    >
      <div className="content">
        <div className={classnames("content-container")}>{props.children}</div>
        <div className="buttons">
          {props.secondaryText && (
            <div>
              <Button
                onClick={() => {
                  props.onCloseModal();
                }}
                theme={ButtonStyle.DARK}
                color={props.color}
              >
                {props.secondaryText}
              </Button>
            </div>
          )}
          <div>
            <Button
              disabled={!!props.primaryDisabled}
              theme={ButtonStyle.DARK}
              color={props.color}
              onClick={() => {
                props.onSubmit();
              }}
            >
              {props.primaryText}
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .content {
          position: relative;
          margin: 20px auto;
          padding: 25px;
          max-width: 500px;
          border-radius: 25px;
          background-color: #131518;
        }
        .content-container {
          margin: 0 auto;
          margin-bottom: 15px;
          width: 100%;
          color: white;
        }
        .buttons {
          display: flex;
          justify-content: flex-end;
        }
        .buttons > div {
          margin-left: 15px;
        }
      `}</style>
    </Modal>
  );
};

export interface ModalWithButtonsProps {
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmit: () => void;
  color?: string;
  primaryText: string;
  primaryDisabled?: boolean;
  secondaryText?: string;
  shouldCloseOnOverlayClick?: boolean;
}

export default ModalWithButtons;
