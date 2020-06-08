import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

import pluralize from "pluralize";

export interface UpdatesHeaderProps {
  newPost?: boolean;
  newComments?: number;
  newContributions?: number;
}

const UpdatesHeader: React.FC<UpdatesHeaderProps> = (props) => {
  return (
    <div className="updates">
      {props.newPost && (
        <div className="update new-post">
          <FontAwesomeIcon icon={faCertificate} /> New post
        </div>
      )}
      {!!props.newContributions && (
        <div className="update new-contributions">
          <FontAwesomeIcon icon={faPlusSquare} /> {props.newContributions} new{" "}
          {pluralize("contribution", props.newContributions)}
        </div>
      )}
      {!!props.newComments && (
        <div className="update new-comments">
          <FontAwesomeIcon icon={faComment} /> {props.newComments} new{" "}
          {pluralize("comment", props.newComments)}
        </div>
      )}
      <style jsx>
        {`
          .updates {
            color: white;
            opacity: 0.6;
            font-size: 12px;
            margin-bottom: 3px;
          }
          .update {
            padding-bottom: 1px;
            margin-left: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default UpdatesHeader;
