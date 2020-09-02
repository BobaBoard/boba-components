import React from "react";

import classnames from "classnames";

const BobaDex: React.FC<BobaDexProps> = (props) => {
  return (
    <div className={classnames("identities")}>
      There are {props.totalIdentities} identities.
      <style jsx>{`
        .identities {
          border: 1px solid red;
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
