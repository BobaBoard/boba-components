import React from "react";
import classnames from "classnames";

import Button from "../../src/buttons/Button";

const HiddenThreadContainer: React.FC = (props) => {
    return (
      <div className="post hidden" >
        You hid this thread{" "}
        <div className="reveal thread">
          <Button>Reveal Thread</Button>
        </div>
        <style jsx>{`
          .post.hidden {
            margin: 0 auto;
            max-width: 500px;
            width: calc(100% - 40px);
            background-color: gray;
            padding: 20px;
            border: 1px dashed black;
            border-radius: 15px;
          }
          .reveal.thread {
            text-align:center;
          }
        `}</style>
      </div>
    );
  };

export default HiddenThreadContainer;