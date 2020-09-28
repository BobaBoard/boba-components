import React from "react";

import classnames from "classnames";

const BobaDex: React.FC<BobaDexProps> = (props) => {
  // This is the function body
  const identityCircles = [];

  for (var i = 0; i < props.totalIdentities; i++) {
    const matchingID = props.revealedIdentities.find((el) => el.index == i);

    identityCircles.push(
      <div className="bobamon">
        {matchingID ? (
          <>
            <figure className="portrait">
              <img src={matchingID.avatarUrl} alt={matchingID.name}></img>
            </figure>
            <div className="info">{matchingID.name}</div>
          </>
        ) : (
          <figure className="portrait">
            <div className="number">{i + 1}</div>
          </figure>
        )}
        <style jsx>{`
          .bobamon {
            display: inline-block;
            height: auto;
            vertical-align: top;
            position: relative;
          }

          .portrait {
            width: 100px;
            height: 100px;
            margin: 0 0 5px;
            border-radius: 50%;
            background: #333;
            overflow: hidden;
          }

          .info {
            max-width: 120px;
            text-align: center;
          }

          .number {
            line-height: 100px;
            font-weight: bold;
            font-size: 36px;
            text-align: center;
            width: 100%;
            color: #777;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={classnames("identities")}>
      {identityCircles}
      <style jsx>{`
        .identities {
          display: grid;
          grid-template-columns: repeat(auto-fill, 100px);
          grid-gap: 20px;
        }

        .identities::after {
          content: "";
          flex: auto;
        }
      `}</style>
    </div>
  );
};

export interface BobaDexProps {
  totalIdentities: number;
  revealedIdentities: {
    index: number;
    name: string;
    avatarUrl: string;
    caughtOn: string;
  }[];
}

export default BobaDex;
