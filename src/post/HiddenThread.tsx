import React from "react";

import classnames from "classnames";

import Tags from "../tags/Tags";

const HiddenThreadContainer: React.FC = (props) => {
    return (
      <div className="post hidden" >
        You hid this thread{" "}
        <a
          href="#"
        >
          [unhide]
        </a>
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
        `}</style>
      </div>
    );
  };

export default HiddenThreadContainer;