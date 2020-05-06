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
          padding: 25px 10px;
          border-radius: 10px;
          background-color: white;
          max-width: 500px;
        }
      `}</style>
    </>
  );
};

export default Card;
