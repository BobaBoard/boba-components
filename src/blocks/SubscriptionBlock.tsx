import { LinkWithAction, SecretIdentityType } from "types";

import ActionLink from "buttons/ActionLink";
import DefaultTheme from "theme/default";
import PostQuote from "post/PostQuote";
import React from "react";
import css from "styled-jsx/css";

export interface SubscriptionBlockProps {
  title: string;
  showOlderLink: LinkWithAction;
  lastUpdatedTime: string;
  lastUpdatedTimeLink: LinkWithAction;
  post: string;
  secretIdentity: SecretIdentityType;
  // The max height the quote within block can occupy before its
  // content is shrunk to fix.
  maxHeightPx?: number;
}

const { className: linkClassName, styles: linkStyles } = css.resolve`
  a,
  button {
    text-decoration: underline;
    color: ${DefaultTheme.DEFAULT_ACCENT_COLOR};
  }
`;

const SubscriptionBlock = ({
  title,
  showOlderLink,
  lastUpdatedTime,
  lastUpdatedTimeLink,
  post,
  secretIdentity,
  maxHeightPx,
}: SubscriptionBlockProps) => (
    <div className="subscription-block">
      <h2>{title}</h2>
      <div className="last">
        <div className="updates">
          [
          <ActionLink className={linkClassName} link={lastUpdatedTimeLink}>
            Last Updated: {lastUpdatedTime}
          </ActionLink>
          ] — [
          <ActionLink className={linkClassName} link={showOlderLink}>
            Older logs
          </ActionLink>
          ]
        </div>
        <PostQuote
          createdTime={lastUpdatedTime}
          createdTimeLink={lastUpdatedTimeLink}
          text={post}
          secretIdentity={secretIdentity}
          maxHeightPx={maxHeightPx}
        />
      </div>
      <style jsx>{`
        h2 {
          color: white;
          margin-bottom: 10px;
        }
        .updates {
          font-size: var(--font-size-small);
          margin-bottom: 10px;
          color: white;
          text-align: center;
        }
        .subscription-block {
          padding: 6px;
        }
        .subscription-block .last {
          background-color: #1c1c1c;
          padding: 15px;
          border-radius: 25px;
          position: relative;
          font-size: small;
          margin-bottom: 5px;
        }
      `}</style>
      {linkStyles}
    </div>
  );

export default SubscriptionBlock;
