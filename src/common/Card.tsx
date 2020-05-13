import React from "react";

import classnames from "classnames";

export enum CardSizes {
  REGULAR,
  WIDE,
}

export interface CardProps {
  footer?: JSX.Element;
  header?: JSX.Element;
  size?: CardSizes;
}

const getMaxWidth = (size?: CardSizes) => {
  switch (size) {
    case CardSizes.REGULAR:
      return 450;
    case CardSizes.WIDE:
      return 800;
    default:
      return 450;
  }
};

const Card: React.FC<CardProps> = ({ children, footer, header, size }) => {
  return (
    <>
      <div
        className={classnames("card", {
          "with-footer": !!footer,
          "with-header": !!header,
        })}
      >
        {<div className="header">{header}</div>}
        <div className="content">{children}</div>
        {<div className="footer">{footer}</div>}
      </div>
      <style jsx>{`
        .card {
          padding: 15px 10px;
          border-radius: 15px;
          background-color: white;
          max-width: ${getMaxWidth(size)}px;
        }
        .card.with-header {
          padding-top: 0px;
          padding-left: 0px;
          padding-right: 0px;
        }

        .card.with-header .content,
        .card.with-footer .content {
          padding-left: 10px;
          padding-right: 10px;
        }

        .card.with-footer {
          padding-bottom: 0px;
          padding-left: 0px;
          padding-right: 0px;
        }
      `}</style>
    </>
  );
};

export default Card;
