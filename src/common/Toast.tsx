import React from "react";

import {
  ToastContainer as ToastLib,
  toast as toastLibFunction,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ToastContainerProps {}

const Toast = (props: ToastContainerProps) => {
  return (
    <>
      <ToastLib
        position="top-center"
        autoClose={2200}
        newestOnTop={false}
        rtl={false}
        draggable
      />
      <style jsx>{`
        :global(.Toastify__toast-container) {
        }
        :global(.Toastify__toast) {
          border-radius: 25px;
          padding: 15px;
        }
        :global(.Toastify__close-button) {
          align-self: center;
        }
      `}</style>
    </>
  );
};

export default Toast;
export const toast = toastLibFunction;
