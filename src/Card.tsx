import React from "react";

export interface CardProps {}
const Card: React.FC<CardProps> = ({ children }) => {
  let content = null;
  let footer = null;
  if (Array.isArray(children)) {
    content = children[0];
    footer = children[1];
  } else {
    content = children;
  }

  return (
    <>
      <div className="card">
        <div className="content">{content}</div>
        {<div className="footer">{footer}</div>}
      </div>
      <style jsx>{`
        .card {
          padding: 15px 10px;
          border-radius: 5px;
          background-color: white;
          max-width: 450px;
        }
        .content {
          margin-bottom: 15px;
        }
        .footer {
          border-top: 1px rgba(0, 0, 0, 0.3) solid;
          padding-top: 15px;
        }
      `}</style>
    </>
  );
};

export default Card;
