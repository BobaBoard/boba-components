import React from "react";

import Button from "../common/Button";
import classNames from "classnames";
import { faCross, faCheck } from "@fortawesome/free-solid-svg-icons";

const EditorFooter: React.FC<FooterProps> = ({
  onCancel,
  onSubmit,
  submittable,
  cancellable,
}) => {
  return (
    <>
      <div className={classNames("footer-actions", "footer-edit-actions")}>
        <Button
          icon={faCross}
          onClick={onCancel}
          disabled={cancellable === false}
        >
          Cancel
        </Button>
        <Button
          icon={faCheck}
          onClick={onSubmit}
          disabled={submittable === false}
        >
          Post
        </Button>
      </div>

      <style jsx>{`
        .footer-actions {
          display: flex;
          justify-content: flex-end;
          position: relative;
        }
        .footer-actions :global(button) {
          margin-left: 10px;
          min-width: 25%;
        }
        .footer-actions :global(button) > :global(span) {
          margin: 0 auto;
        }
        @media screen and (max-width: 500px) {
        }
      `}</style>
    </>
  );
};

export default EditorFooter;

interface FooterProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  submittable?: boolean;
  cancellable?: boolean;
}
