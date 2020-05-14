import React from "react";

import Button from "../common/Button";
import DeafultTheme from "../theme/default";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

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
    <div className="footer">
      <div className="notes">
        <Button tooltip="15 contributions (5 direct)">
          <>
            <span className="note-count">
              15
              <FontAwesomeIcon icon={faPlusSquare} />
            </span>
            <span className="note-breakdown">
              [
              <span className="note-count">
                5<FontAwesomeIcon icon={faAngleDoubleDown} />
              </span>
              ]
            </span>
          </>
        </Button>

        <Button>
          <span className="note-count">
            6
            <FontAwesomeIcon icon={faComment} />
          </span>
        </Button>
      </div>
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
      </div>

      <style jsx>{`
        .notes .note-count {
          color: ${DeafultTheme.LAYOUT_BOARD_BACKGROUND_COLOR};
          font-size: large;
          font-weight: bold;
        }
        .notes .note-breakdown {
          opacity: 0.5;
          margin-right: 5px;
          font-size: revert;
        }
        .notes .note-breakdown > span :global(svg) {
          height: 13px;
          padding: 1px 0px;
        }
        .notes > span :global(svg) {
          height: 15px;
          padding: 1px 0px;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          position: relative;
          align-items: center;
        }
        .footer-actions > :global(div:not(:first-child)) > :global(button) {
          margin-left: 10px;
        }
        .footer-actions > :global(button) > :global(span) {
          margin: 0 auto;
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
