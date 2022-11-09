//import { linkTo } from "@storybook/addon-links";
import ToastContainer, { toast } from "common/Toast";

import React from "react";

export default {
  title: "Toast/Toast",
  component: ToastContainer,
};

export const SimpleButton = () => {
  const [successId, setSuccessId] =
    React.useState<string | number | undefined>(undefined);
  const [errorId, setErrorId] =
    React.useState<string | number | undefined>(undefined);
  const [warningId, setWarningId] =
    React.useState<string | number | undefined>(undefined);
  React.useEffect(() => {
    setSuccessId(
      toast.success("🦄 Wow so easy!", {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
      })
    );
    setWarningId(
      toast.warning("🦄 Wow so easy!", {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
      })
    );
    setErrorId(
      toast.error("🦄 Wow so easy!", {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
      })
    );
  }, []);
  return (
    <div>
      <ToastContainer />
      <div
        style={{
          position: "fixed",
          bottom: "50px",
        }}
      >
        <button
          onClick={() => {
            if (successId) {
              toast.dismiss(successId);
              setSuccessId(undefined);
            } else {
              setSuccessId(
                toast.success("🦄 Wow so easy!", {
                  autoClose: false,
                  hideProgressBar: true,
                  closeOnClick: false,
                })
              );
            }
          }}
        >
          Toggle success
        </button>
        <button
          onClick={() => {
            if (warningId) {
              toast.dismiss(warningId);
              setWarningId(undefined);
            } else {
              setWarningId(
                toast.warning("🦄 Wow so easy!", {
                  autoClose: false,
                  hideProgressBar: true,
                  closeOnClick: false,
                })
              );
            }
          }}
        >
          Toggle warning
        </button>
        <button
          onClick={() => {
            if (errorId) {
              toast.dismiss(errorId);
              setErrorId(undefined);
            } else {
              setErrorId(
                toast.error("🦄 Wow so easy!", {
                  autoClose: false,
                  hideProgressBar: true,
                  closeOnClick: false,
                })
              );
            }
          }}
        >
          Toggle error
        </button>
      </div>
    </div>
  );
};

SimpleButton.story = {
  name: "simple",
};
