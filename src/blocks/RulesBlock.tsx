import ActionLink from "buttons/ActionLink";
import { LinkWithAction } from "types";
import React from "react";
import css from "styled-jsx/css";

const { className: linkClassName, styles: linkStyles } = css.resolve`
  a,
  button {
    text-decoration: none;
    color: #f96680;
  }
`;

const RulesBlockHeader: React.FC<{
  title: string;
  seeAllLink: LinkWithAction;
  headerLinkLabel: string;
}> = ({ seeAllLink, title, headerLinkLabel }) => (
  <div className="rules-header">
    <h2>{title}</h2>
    <ActionLink className={linkClassName} link={seeAllLink}>
      {headerLinkLabel}
    </ActionLink>
    <style jsx>{`
      .rules-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px;
        height: 1.2em;
      }
    `}</style>
    {linkStyles}
  </div>
);

const RuleDisplay: React.FC<{ rule: Rule }> = ({ rule }) => (
  <li>
    <details>
      <summary>{rule.title}</summary>
      {rule.description}
    </details>
    <style jsx>{`
      details {
        cursor: pointer;
        border: 2px solid #1c1c1c;
        border-radius: 15px;
        padding: 0.5em 0.5em 0;
        background-color: #1c1c1c;
        color: white;
        margin: 6px;
      }

      summary {
        font-weight: bold;
        margin: -0.5em -0.5em 0;
        padding: 0.5em;
        background-color: #1c1c1c;
        border-radius: 15px;
      }

      details[open] {
        padding: 0.5em;
        border: 2px solid #1c1c1c;
        background-color: #2f2f30;
      }

      details[open] summary {
        background-color: #1c1c1c;
        border: unset;
        margin-bottom: 0.5em;
        border-radius: 12px 12px 0px 0px;
      }
    `}</style>
  </li>
);

const RulesList: React.FC<{ rules: Rule[] }> = ({ rules }) => (
  <ul>
    {[...rules]
      .sort((first, second) => first.index - second.index)
      .map((rule) => (
        <RuleDisplay rule={rule} key={rule.title} />
      ))}
    <style jsx>{`
      ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
      }
    `}</style>
  </ul>
);

const RulesBlock: React.FC<RulesBlockProps> = ({
  title,
  seeAllLink,
  rules,
  headerLinkLabel,
}) => (
  <>
    <RulesBlockHeader
      seeAllLink={seeAllLink}
      title={title}
      headerLinkLabel={headerLinkLabel}
    />
    <RulesList rules={rules} />
  </>
);

export interface RulesBlockProps {
  title: string;
  seeAllLink: LinkWithAction;
  rules: Rule[];
  headerLinkLabel: string;
}

export interface Rule {
  title: string;
  description: string;
  index: number;
}

export default RulesBlock;
