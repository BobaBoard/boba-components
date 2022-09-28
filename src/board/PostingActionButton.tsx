import FloatingActionButton from "buttons/FloatingActionButton";
import React from "react";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export interface PostingActionButtonProps {
  accentColor?: string;
  onNewPost: () => void;
}

const PostingActionButtion: React.FC<PostingActionButtonProps> = (props) => {
  return (
    <FloatingActionButton
      accentColor={props.accentColor}
      actions={[
        {
          icon: faPlusSquare,
          tooltip: "New Post",
          action: props.onNewPost,
        },
      ]}
    />
  );
};

export default PostingActionButtion;
