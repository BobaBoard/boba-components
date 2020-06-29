import React from "react";
import DropdownListMenu from "../src/common/DropdownListMenu";
import Button from "../src/common/Button";

export default {
  title: "Popup Preview",
  component: DropdownListMenu,
};

export const ReactionStory = () => {
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "15px" }}>
      <DropdownListMenu
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
      >
        <Button>Click me!</Button>
      </DropdownListMenu>
    </div>
  );
};

ReactionStory.story = {
  name: "reaction",
};
