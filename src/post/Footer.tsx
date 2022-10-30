import Button, { ButtonStyle } from "buttons/Button";
import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import ActionLink from "buttons/ActionLink";
import Icon from "common/Icon";
import { LinkWithAction } from "types";
import React from "react";
import Theme from "theme/default";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { lightenColor } from "utils";
import useDimensions from "react-cool-dimensions";

const COMPACT_FOOTER_TRIGGER_SIZE = 450;
const LIGHTER_BACKGROUND = lightenColor(Theme.BUTTON_BACKGROUND_COLOR_DARK, 5);
const { className: buttonClassName, styles: buttonStyle } = css.resolve`
  a.notes-link,
  button.notes-link,
  span.notes-link {
    margin-right: 5px;
    padding: 7px 12px;
    color: ${Theme.BUTTON_ACCENT_COLOR_LIGHT};
    border-radius: ${Theme.BORDER_RADIUS_LARGE};
    border-width: 2px;
    border-style: solid;
    border-color: ${Theme.BUTTON_ACCENT_COLOR_LIGHT};
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
  }
  a.notes-link:hover,
  button.notes-link:hover {
    color: ${Theme.BUTTON_ACCENT_COLOR_DARK};
    background-color: ${Theme.BUTTON_ACCENT_COLOR_LIGHT};
  }
`;

const UpdatesIndicator = ({
  newContributions,
  newComments,
}: {
  newContributions: number | undefined;
  newComments: number | undefined;
}) => {
  return (
    <div className="notes-update" aria-label="post updates indicator">
      {!!newContributions && (
        <span
          className="contributions-update"
          aria-label={`${newContributions} new contributions`}
        >
          +{newContributions > 99 ? "∞" : newContributions}
          <Icon icon={faPlusSquare} />
        </span>
      )}
      {!!newComments && (
        <span
          className="comments-update"
          aria-label={`${newComments} new comments`}
        >
          +{newComments > 99 ? "∞" : newComments}
          <Icon icon={faComment} />
        </span>
      )}
      <style jsx>{`
        .notes-update {
          background-color: ${Theme.BUTTON_BACKGROUND_COLOR_DARK};
          border-radius: 25px;
          color: ${Theme.BUTTON_ACCENT_COLOR_DARK};
          padding: 2px 5px;
          position: absolute;
          right: -5%;
          top: -30%;
          font-size: var(--font-size-small);
          display: flex;
        }
        .notes-update :global(svg) {
          height: 12px;
          display: inline-block;
          padding-right: 2px;
          padding-left: 2px;
        }
      `}</style>
    </div>
  );
};

const NotesDisplay: React.FC<{
  link?: LinkWithAction;
  totalContributions: number | undefined;
  directContributions: number | undefined;
  totalComments: number | undefined;
  newContributions: number | undefined;
  newComments: number | undefined;
  compact: boolean;
}> = ({
  totalContributions = 0,
  directContributions = 0,
  totalComments = 0,
  newContributions = 0,
  newComments = 0,
  link,
  compact,
}) => {
  const hasUpdates = !!(newContributions || newComments);
  return (
    <div className={classnames("notes", { compact })}>
      {hasUpdates && (
        <UpdatesIndicator
          newComments={newComments}
          newContributions={newContributions}
        />
      )}
      <ActionLink
        link={link}
        className={`notes-link ${buttonClassName}`}
        aria-label="post notes"
      >
        <span
          className="note-count contributions"
          aria-label={`${totalContributions} total contributions`}
        >
          {totalContributions}
          <Icon icon={faPlusSquare} />
        </span>
        <span className="threads-breakdown">
          [
          <span
            className="note-count"
            aria-label={`${directContributions} direct threads`}
          >
            {directContributions}
            <Icon icon={faCodeBranch} />
          </span>
          ]
        </span>
        <span
          className="note-count comments"
          aria-label={`${totalComments} total comments`}
        >
          {totalComments}
          <Icon icon={faComment} />
        </span>
      </ActionLink>
      <style jsx>{`
        .notes {
          display: flex;
          position: relative;
        }
        .notes.compact {
          max-width: 65%;
        }
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
          font-weight: bold;
          position: relative;
        }
        .threads-breakdown {
          color: ${LIGHTER_BACKGROUND};
          font-weight: normal;
        }
      `}</style>
      {buttonStyle}
    </div>
  );
};

const Footer: React.FC<FooterProps> = ({
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
      <NotesDisplay
        link={notesLink}
        directContributions={directContributions}
        totalContributions={totalContributions}
        totalComments={totalComments}
        newComments={newComments}
        newContributions={newContributions}
        compact={currentBreakpoint == "compact"}
      />
      {answerable && (
        <div className={classnames("footer-actions")}>
          <Button
            onClick={onContribution}
            icon={faPlusSquare}
            compact={currentBreakpoint == "compact"}
            theme={ButtonStyle.TRANSPARENT}
            disabled={!allowsContribution}
            label="contribute"
          >
            Contribute
          </Button>
          <Button
            onClick={onComment}
            icon={faComment}
            compact={currentBreakpoint == "compact"}
            theme={ButtonStyle.TRANSPARENT}
            disabled={!allowsComment}
            label="comment"
          >
            Comment
          </Button>
        </div>
      )}
      <style jsx>{`
        .footer {
          display: flex;
          justify-content: space-between;
          position: relative;
          align-items: center;
        }
        .footer-actions {
          display: flex;
          gap: 5px;
        }
      `}</style>
    </div>
  );
};
export default Footer;

export interface FooterProps {
  onComment?: () => void;
  onContribution?: () => void;
  allowsComment?: boolean;
  allowsContribution?: boolean;
  totalContributions?: number;
  directContributions?: number;
  newContributions?: number;
  totalComments?: number;
  newComments?: number;
  notesLink?: LinkWithAction;
}
