import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Button from "../src/Button";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Button Preview",
  component: Button,
};

export const SimpleButton = () => {
  return (
    <div>
      <Button>This is a button</Button>
      <Button icon={faCoffee}>This is a button with icon</Button>
      <Button icon={faCoffee} compact>
        This is a compact button with icon
      </Button>

      <style jsx>
        {`
          div {
            display: flex;
            justify-content: space-evenly;
          }
        `}
      </style>
    </div>
  );
};

SimpleButton.story = {
  name: "simple",
};
