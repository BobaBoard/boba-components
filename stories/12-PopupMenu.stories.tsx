import React from "react";
import DropdownMenu from "../src/common/DropdownMenu";

export default {
  title: "Popup Preview",
  component: DropdownMenu,
};

export const ReactionStory = () => {
  const [count, setCount] = React.useState(1);
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "15px" }}>
      <DropdownMenu
        options={[
          {
            name: "test1",
            onClick: () => {
              console.log("ckuck!");
            },
          },
          {
            name: "test2",
            onClick: () => {
              console.log("ckuck!");
            },
          },
          {
            name: "test3",
            onClick: () => {
              console.log("ckuck!");
            },
          },
        ]}
      />
    </div>
  );
};

ReactionStory.story = {
  name: "reaction",
};
