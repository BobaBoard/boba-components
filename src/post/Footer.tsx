import React from "react";

import Button, { ButtonStyle } from "../common/Button";
import classNames from "classnames";
import useComponentSize from "@rehooks/component-size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { LinkWithAction } from "types";

const COMPACT_FOOTER_TRIGGER_SIZE = 450;

const Footer: React.FC<FooterProps> = ({
  compact,
  onContribution,
  onComment,
  totalContributions,
  directContributions,
  newContributions,
  totalComments,
  newComments,
  answerable,
  notesLink,
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
        {(!!newContributions || !!newComments) && (
          <div className="notes-update">
            {!!newContributions && (
              <span className="contributions-update">
                {newContributions > 99 ? "∞" : newContributions}
                <FontAwesomeIcon icon={faPlusSquare} />
              </span>
            )}
            {!!newComments && (
              <span className="comments-update">
                {newComments > 99 ? "∞" : newComments}
                <FontAwesomeIcon icon={faComment} />
              </span>
            )}
          </div>
        )}
        <div className="notes-button">
          <a
            href={notesLink?.href}
            onClick={(e) => {
              if (!notesLink?.onClick) {
                return;
              }
              e.preventDefault();
              notesLink.onClick();
            }}
          >
            <span className="note-count contributions">
              {totalContributions || 0}
              <FontAwesomeIcon icon={faPlusSquare} />
            </span>
            <span className="note-breakdown">
              [
              <span className="note-count">
                {directContributions || 0}
                <FontAwesomeIcon icon={faCodeBranch} />
              </span>
              ]
            </span>
            <span className="note-count comments">
              {totalComments || 0}
              <FontAwesomeIcon icon={faComment} />
            </span>
          </a>
        </div>
      </div>
      <div
        className={classNames("footer-actions", {
          compact,
        })}
      >
        {answerable && (
          <>
            <Button
              onClick={onContribution}
              icon={faPlusSquare}
              compact={compactFooter}
              theme={ButtonStyle.TRANSPARENT}
            >
              Contribute
            </Button>

            <Button
              onClick={onComment}
              icon={faComment}
              compact={compactFooter}
              theme={ButtonStyle.TRANSPARENT}
            >
              Comment
            </Button>
          </>
        )}
      </div>

      <style jsx>{`
        .notes {
          position: relative;
          min-width: 0;
        }
        .notes .note-count {
          font-size: large;
          font-weight: bold;
          vertical-align: middle;
        }
        .notes .note-breakdown {
          opacity: 0.4;
          margin-right: 5px;
          font-size: large;
          font-weight: normal;
        }
        .notes-button {
          margin-right: 5px;
          padding: 5px 12px;
          color: rgb(28, 28, 28);
          border-radius: 25px;
          border-width: 2px;
          border-style: solid;
          border-color: rgb(28, 28, 28);
          user-select: none;
          white-space: nowrap;
          overflow: hidden;
        }
        .notes-update {
          background-color: rgb(28, 28, 28);
          border-radius: 25px;
          color: white;
          padding: 3px 5px;
          position: absolute;
          right: 0;
          top: -1px;
          transform: translate(20%, -50%);
          font-size: smaller;
        }
        .notes-update :global(svg) {
          height: 12px;
          display: inline-block;
          padding-right: 2px;
        }
        .note-count.comments {
          margin-left: 5%;
          padding-right: 4px;
        }
        .notes-button a {
          color: black;
          text-decoration: none;
        }
        .notes-button:hover {
          cursor: pointer;
        }
        .notes-button span :global(svg) {
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
export default Footer;

interface FooterProps {
  onComment?: () => void;
  onContribution?: () => void;
  compact?: boolean;
  answerable?: boolean;
  totalContributions?: number;
  directContributions?: number;
  newContributions?: number;
  totalComments?: number;
  newComments?: number;
  notesLink?: LinkWithAction;
}
