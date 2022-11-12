import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import Button from "buttons/Button";
import DefaultTheme from "theme/default";
import Div100vh from "react-div-100vh";
import LibraryModal from "react-modal";
import React from "react";
import Theme from "theme/default";
import { useHotkeys } from "react-hotkeys-hook";

const customStyles = {
  content: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: "0px",
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
  },
};

// TODO: figure this out
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

const Modal: React.FC<ModalProps> = (props) => {
  useHotkeys(
    "esc",
    (e) => {
      if (!props.isOpen) {
        return;
      }
      props.onRequestClose?.();
      e.preventDefault();
    },
    { keydown: true, enableOnContentEditable: true },
    [props.onRequestClose, props.isOpen]
  );

  return (
    <div>
      <LibraryModal
        isOpen={props.isOpen}
        onAfterOpen={() => {
          document.body.style.overflow = "hidden";
          // TODO: this is bad and horrible (we should not use query selector)
          const layoutNode = document.querySelector(
            ".layout"
          ) as HTMLDivElement;
          if (layoutNode) {
            layoutNode.style.overflow = "hidden";
          }
          props.onAfterOpen?.();
        }}
        onAfterClose={() => {
          document.body.style.overflow = "";
          // TODO: this is bad and horrible (we should not use query selector)
          const layoutNode = document.querySelector(
            ".layout"
          ) as HTMLDivElement;
          if (layoutNode) {
            layoutNode.style.overflow = "";
          }
        }}
        onRequestClose={props.onRequestClose}
        shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
        style={customStyles}
        overlayClassName={
          props.isMinimized ? "minimized-modal-overlay" : "modal-overlay"
        }
      >
        <Div100vh style={{ height: "100dvh" }}>
          <div className="content">
            {props.minimizable && (
              <div className="button-wrapper">
                <div className="minimize-button">
                  <Button
                    icon={props.isMinimized ? faArrowUp : faArrowDown}
                    onClick={props.onMinimize}
                  >
                    {props.isMinimized ? "Restore" : "Minimize"}
                  </Button>
                </div>
              </div>
            )}
            {props.children}
          </div>
        </Div100vh>
      </LibraryModal>

      <style jsx>{`
        .content {
          margin-top: 3vh;
          margin-bottom: 3vh;
          padding-top: ${props.minimizable ? 0 : 15}px;
        }
        :global(.modal-overlay) {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${Theme.MODAL_BACKGROUND_COLOR};
          z-index: 100;
        }
        :global(.minimized-modal-overlay) {
          position: fixed;
          top: 80vh;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${Theme.MODAL_BACKGROUND_COLOR};
          z-index: 100;
        }
        .button-wrapper {
          display: flex;
          justify-content: center;
          padding: 0px 15px 3px;
        }
        .minimize-button {
          display: flex;
          width: 100%;
          max-width: ${DefaultTheme.POST_WIDTH_PX}px;
          justify-content: end;
        }
      `}</style>
    </div>
  );
};

export default Modal;

export interface ModalProps extends LibraryModal.Props {
  isMinimized?: boolean;
  minimizable?: boolean;
  onMinimize?: () => void;
  onRequestClose?: () => void;
}
