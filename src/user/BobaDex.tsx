import React from "react";
import classnames from "classnames";

const BobaDex: React.FC<BobaDexProps> = (props) => {
  const identityCircles = [];

  for (let i = 1; i <= props.totalIdentities; i++) {
    const matchingID = props.revealedIdentities.find((el) => el.index == i);

    identityCircles.push(
      <div className="bobamon" key={matchingID?.id || i}>
        {matchingID ? (
          <>
            <figure className="portrait">
              <img src={matchingID.avatar} alt={matchingID.name}></img>
            </figure>
            <div className="info">{matchingID.name}</div>
          </>
        ) : (
          <figure className="portrait">
            <div className="number">{i}</div>
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

          .portrait img {
            width: 100px;
            height: 100px;
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
          font-size: var(--font-size-regular);
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
    id: string;
    index: number;
    name: string;
    avatar: string;
  }[];
}

export default BobaDex;
