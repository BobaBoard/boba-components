import ActionLink from "../buttons/ActionLink";
import { LinkWithAction } from "../types";
import React from "react";

const RulesBlockHeader = ({seeAllLink, title}) => {
  return (
    <div className="rules-header">
      <h3>{title}</h3>
      <ActionLink
        link={seeAllLink}
        label="See all the rules"
        className="rules-link"
      >
        See All
      </ActionLink>
      <style jsx>{`
        .rules-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px;
          height: 1.2em;
        }
        .rules-link {
          color: #888;
          text-decoration: none;
          height: 1.2em;
          padding: 0px 6px;
        }
      `}</style>
    </div>
  );
};

const RuleDisplay = ({ rule }) => {
  return (
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
          background-color: #2f2f30;
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
        }

        details[open] summary {
          margin-bottom: 0.5em;
          border-radius: 15px 15px 0px 0px;
        }
      `}</style>
    </li>
  );
};

const RulesList = ({ rules }) => {
  return (
    <ul style={{ listStyle: "none", margin: "6px 0px", padding: "0px" }}>
      {rules.map((rule) => (
        <RuleDisplay rule={rule} key={rule.title} />
      ))}
    </ul>
  );
};

const RulesBlock: React.FC<RulesBlockProps> = ({
  title,
  seeAllLink,
  rules
}) => {
  return (
    <div style={{ width: "600px" }}>
      <RulesBlockHeader seeAllLink={seeAllLink} title={title} />
      <RulesList rules={rules} />
    </div>
  );
};

export interface RulesBlockProps {
  title: string;
  seeAllLink: LinkWithAction;
  rules: string[];
}

export default RulesBlock;