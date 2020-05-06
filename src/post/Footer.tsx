import React from "react";

import Button from "../Button";
import classNames from "classnames";

import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

export const modes = {
  VIEW: "VIEW",
  CREATE: "CREATE",
};

// Footer for posts in "create" mode.
const EditFooter: React.FC<FooterProps> = ({
  compact,
  onCancel,
  onSubmit,
  submittable,
}) => {
  return (
    <>
      <div
        className={classNames("footer-actions", "footer-edit-actions", {
          compact,
        })}
      >
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit} primary disabled={!submittable}>
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

// Footer for posts in "view" mode.
const DisplayFooter: React.FC<FooterProps> = ({
  compact,
  onContribution,
  onComment,
  answerable,
}) => {
  return (
    <div
      className={classNames("footer-actions", {
        compact,
      })}
    >
      <Button
        onClick={onContribution}
        icon={faPlusSquare}
        disabled={!answerable}
      >
        Contribute
      </Button>

      <Button onClick={onComment} icon={faComment} disabled={!answerable}>
        Comment
      </Button>

      <style jsx>{`
        .footer-actions {
          display: flex;
          justify-content: flex-end;
          position: relative;
        }
        .footer-actions > :global(div:not(:first-child)) > :global(button) {
          margin-left: 10px;
        }
        .footer-actions > :global(button) > :global(span) {
          margin: 0 auto;
        }
        .compact .text {
          display: none;
        }
        .compact.footer-actions :global(button) > :global(span) {
          margin: 0 auto;
          width: 24px;
        }
        .compact.footer-actions
          :global(button)
          > :global(span)
          > :global(span) {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div className="footer">
      {props.mode == modes.CREATE ? (
        <EditFooter {...props} />
      ) : (
        <DisplayFooter {...props} />
      )}
    </div>
  );
};

export default Footer;

interface FooterProps {
  mode?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  onComment?: () => void;
  onContribution?: () => void;
  compact?: boolean;
  editable?: boolean;
  submittable?: boolean;
  answerable?: boolean;
}
