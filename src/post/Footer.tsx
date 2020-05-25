import React from "react";

import Button from "../common/Button";
import classNames from "classnames";
import pluralize from "pluralize";
import useComponentSize from "@rehooks/component-size";
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
  cancellable,
}) => {
  return (
    <>
      <div
        className={classNames("footer-actions", "footer-edit-actions", {
          compact,
        })}
      >
        <Button onClick={onCancel} disabled={cancellable === false}>
          Cancel
        </Button>
        <Button onClick={onSubmit} primary disabled={submittable === false}>
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

const COMPACT_FOOTER_TRIGGER_SIZE = 450;

// Footer for posts in "view" mode.
const DisplayFooter: React.FC<FooterProps> = ({
  compact,
  onContribution,
  onComment,
  totalContributions,
  directContributions,
  newContributions,
  totalComments,
  newComments,
}) => {
  let [compactFooter, setCompactFooter] = React.useState(false);
  let ref = React.useRef<HTMLDivElement>(null);
  // @ts-ignore
  let { width, height } = useComponentSize(ref);
  React.useEffect(() => {
    setCompactFooter(width < COMPACT_FOOTER_TRIGGER_SIZE);
  }, [width]);
  return (
    <div className="footer" ref={ref}>
      <div className="notes">
        <span className="notes-button">
          <Button
            tooltip={`${totalContributions || 0} ${pluralize(
              "contribution",
              totalContributions
            )} (${directContributions || 0} direct)`}
            updates={newContributions}
            compact={compactFooter}
          >
            <>
              <span className="note-count">
                {totalContributions || 0}
                <FontAwesomeIcon icon={faPlusSquare} />
              </span>
              {!compactFooter && (
                <span className="note-breakdown">
                  [
                  <span className="note-count">
                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                    {directContributions || 0}
                  </span>
                  ]
                </span>
              )}
            </>
          </Button>
        </span>
        <span className="notes-button comments">
          <Button updates={newComments} compact={compactFooter}>
            <span className="note-count">
              {totalComments || 0}
              <FontAwesomeIcon icon={faComment} />
            </span>
          </Button>
        </span>
      </div>
      <div
        className={classNames("footer-actions", {
          compact,
        })}
      >
        <Button
          onClick={onContribution}
          icon={faPlusSquare}
          compact={compactFooter}
        >
          Contribute
        </Button>

        <Button onClick={onComment} icon={faComment} compact={compactFooter}>
          Comment
        </Button>
      </div>

      <style jsx>{`
        .notes .note-count {
          font-size: large;
          font-weight: bold;
        }
        .notes .note-breakdown {
          opacity: 0.4;
          margin-right: 5px;
          font-size: large;
          font-weight: normal;
        }
        .notes-button {
          margin-right: 5px;
        }
        .notes .note-breakdown span :global(svg) {
          height: 13px;
          padding: 1px 0px;
        }
        .notes span :global(svg) {
          height: 15px;
          padding: 1px 0px;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          position: relative;
          align-items: center;
        }
        .footer-actions {
          display: flex;
          flex-wrap: no-wrap;
        }
        .footer-actions > :global(div:not(:first-child)) > :global(button) {
          margin-left: 5px;
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
  cancellable?: boolean;
  totalContributions?: number;
  directContributions?: number;
  newContributions?: number;
  totalComments?: number;
  newComments?: number;
}
