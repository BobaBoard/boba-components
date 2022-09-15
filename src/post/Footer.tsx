import Button, { ButtonStyle } from "../buttons/Button";
import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import ActionLink from "../buttons/ActionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkWithAction } from "types";
import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import useDimensions from "react-cool-dimensions";

const COMPACT_FOOTER_TRIGGER_SIZE = 450;

const { className: buttonClassName, styles: buttonStyle } = css.resolve`
  a.notes-link,
  button.notes-link,
  span.notes-link {
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
    display: flex;
  }
`;

const NotesDisplay: React.FC<{
  link?: LinkWithAction;
  totalContributions: number;
  directContributions: number;
  totalComments: number;
}> = ({ totalContributions, directContributions, totalComments, link }) => {
  return (
    <ActionLink link={link} className={`notes-link ${buttonClassName}`}>
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
      <style jsx>{`
        span {
          display: flex;
          align-items: center;
          line-height: calc(var(--font-size-large) - 0.1rem);
        }
        span :global(svg) {
          height: 15px;
          padding: 1px 0px;
        }
        .note-count {
          font-size: var(--font-size-large);
          font-weight: bold;
          vertical-align: middle;
        }
        .note-breakdown {
          opacity: 0.4;
          margin-right: 5px;
          font-size: var(--font-size-large);
          font-weight: normal;
        }
      `}</style>
      {buttonStyle}
    </ActionLink>
  );
};

const Footer: React.FC<FooterProps> = ({
  compact,
  onContribution,
  onComment,
  totalContributions,
  directContributions,
  newContributions,
  totalComments,
  newComments,
  allowsComment,
  allowsContribution,
  notesLink,
}) => {
  const { ref, currentBreakpoint } = useDimensions<HTMLDivElement>({
    breakpoints: { compact: 0, regular: COMPACT_FOOTER_TRIGGER_SIZE },
    updateOnBreakpointChange: true,
  });
  const answerable = allowsComment || allowsContribution;
  return (
    <div className="footer" ref={ref}>
      <div
        className={classnames("notes", {
          "with-updates": newContributions || newComments,
        })}
      >
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
          <NotesDisplay
            link={notesLink}
            directContributions={directContributions || 0}
            totalContributions={totalContributions || 0}
            totalComments={totalComments || 0}
          />
        </div>
      </div>
      <div
        className={classnames("footer-actions", {
          compact,
        })}
      >
        {answerable && (
          <>
            <Button
              onClick={onContribution}
              icon={faPlusSquare}
              compact={currentBreakpoint == "compact"}
              theme={ButtonStyle.TRANSPARENT}
              disabled={!allowsContribution}
            >
              Contribute
            </Button>
            <Button
              onClick={onComment}
              icon={faComment}
              compact={currentBreakpoint == "compact"}
              theme={ButtonStyle.TRANSPARENT}
              disabled={!allowsComment}
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
        .notes.with-updates {
          margin-top: 5px;
        }
        .notes-update {
          background-color: rgb(28, 28, 28);
          border-radius: 25px;
          color: white;
          padding: 3px 5px;
          position: absolute;
          right: 0;
          top: 0;
          transform: translate(20%, -50%);
          font-size: var(--font-size-small);
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
        .notes-button {
          color: black;
          text-decoration: none;
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

export interface FooterProps {
  onComment?: () => void;
  onContribution?: () => void;
  compact?: boolean;
  allowsComment?: boolean;
  allowsContribution?: boolean;
  totalContributions?: number;
  directContributions?: number;
  newContributions?: number;
  totalComments?: number;
  newComments?: number;
  notesLink?: LinkWithAction;
}
