import React from "react";

const RulesModuleHeader = () => {
  return (
    <div className="rules-header">
      <h3>📌 Pinned Rules</h3>
      <a href="#" className="rules-link">
        See all
      </a>
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
}

const RuleDisplay = ({ rule }) => {
  return (
    <li key={rule.index}>
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
}

const RulesList = ({ rules }) => {
  const list = [];

  rules.forEach((rule) => {
    list.push(<RuleDisplay rule={rule} key={rule.title} />);
  });

  return (
    <ul style={{ listStyle: "none", margin: "6px 0px", padding: "0px" }}>
      {list}
    </ul>
  );
}

const RulesBlock = () => {
  return (
    <div style={{ width: "600px" }}>
      <RulesModuleHeader />
      <RulesList rules={RULES} />
    </div>
  );
}

const RULES: Rules[] = [
  {
    title: "No Harassment",
    description: "The mods will tell your mom if you don't behave",
    index: 1,
  },
  { title: "No Memes", description: "", index: 2 },
  {
    title: "Use Required CN tags",
    description:
      "NSFW content posted to any board not in the explicit NSFW category requires a 'cn: NSFW' tag",
    index: 0,
  },
];

export interface Rules {
  title: string;
  description: string;
  index: number;
}

export default RulesBlock;