import React from "react";
import LibraryModal from "react-modal";
import Theme from "../theme/default";
import Div100vh from "react-div-100vh";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
  },
  overlay: {
    backgroundColor: Theme.MODAL_BACKGROUND_COLOR,
    zIndex: 100,
  },
};

// TODO: figure this out
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

const Modal: React.FC<LibraryModal.Props> = (props) => {
  return (
    <div>
      <LibraryModal
        isOpen={props.isOpen}
        onAfterOpen={() => {
          document.body.style.overflow = "hidden";
          // TODO: this is bad and horrible (we should not use query selctor)
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
          // TODO: this is bad and horrible (we should not use query selctor)
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
      >
        <Div100vh style={{ overflowY: "scroll", height: "100rvh" }}>
          <div className="content">{props.children}</div>
        </Div100vh>
      </LibraryModal>

      <style jsx>{`
        .content {
          margin-top: 3vh;
          margin-bottom: 3vh;
        }
      `}</style>
    </div>
  );
};

export default Modal;
