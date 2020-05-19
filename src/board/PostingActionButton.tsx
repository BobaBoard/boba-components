import React from "react";
import FloatingActionButton from "../common/FloatingActionButton";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export interface PostingActionButtonProps {
  accentColor?: string;
}

const PostingActionButtion: React.FC<PostingActionButtonProps> = (props) => {
  return (
    <FloatingActionButton
      accentColor={props.accentColor}
      actions={[
        {
          icon: faPlusSquare,
          tooltip: "New Post",
          action: () => {
            console.log("bobop!");
          },
        },
      ]}
    />
  );
};

export default PostingActionButtion;
