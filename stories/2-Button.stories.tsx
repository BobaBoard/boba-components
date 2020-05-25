import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Button, { ButtonStyle } from "../src/common/Button";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Button Preview",
  component: Button,
};

export const SimpleButton = () => {
  return (
    <div>
      <div>
        <Button>This is a button</Button>
        <Button icon={faCoffee}>This is a button with icon</Button>
        <Button icon={faCoffee} updates={5}>
          This is a button with updates
        </Button>
        <Button icon={faCoffee} updates={5} disabled>
          Disabled
        </Button>
        <Button compact>No icon</Button>
        <Button icon={faCoffee} compact>
          This is a compact button with icon
        </Button>
        <Button icon={faCoffee} compact updates={5}>
          This is a compact button with updates
        </Button>
      </div>

      <div>
        <Button theme={ButtonStyle.DARK}>This is a button</Button>
        <Button theme={ButtonStyle.DARK} icon={faCoffee}>
          This is a button with icon
        </Button>
        <Button theme={ButtonStyle.DARK} icon={faCoffee} updates={5}>
          This is a button with updates
        </Button>
        <Button theme={ButtonStyle.DARK} icon={faCoffee} updates={5} disabled>
          Disabled
        </Button>
        <Button theme={ButtonStyle.DARK} compact>
          No icon
        </Button>
        <Button theme={ButtonStyle.DARK} icon={faCoffee} compact>
          This is a compact button with icon
        </Button>
        <Button theme={ButtonStyle.DARK} icon={faCoffee} compact updates={5}>
          This is a compact button with updates
        </Button>
      </div>

      <div>
        <Button color="#f96680">This is a button</Button>
        <Button color="#f96680" icon={faCoffee}>
          This is a button with icon
        </Button>
        <Button color="#f96680" icon={faCoffee} updates={5}>
          This is a button with updates
        </Button>
        <Button color="#f96680" icon={faCoffee} updates={5} disabled>
          Disabled
        </Button>
        <Button color="#f96680" compact>
          No icon
        </Button>
        <Button color="#f96680" icon={faCoffee} compact>
          This is a compact button with icon
        </Button>
        <Button color="#f96680" icon={faCoffee} compact updates={5}>
          This is a compact button with updates
        </Button>
      </div>

      <div>
        <Button theme={ButtonStyle.DARK} color="#f96680">
          This is a button
        </Button>
        <Button theme={ButtonStyle.DARK} color="#f96680" icon={faCoffee}>
          This is a button with icon
        </Button>
        <Button
          theme={ButtonStyle.DARK}
          color="#f96680"
          icon={faCoffee}
          updates={5}
        >
          This is a button with updates
        </Button>
        <Button
          theme={ButtonStyle.DARK}
          color="#f96680"
          icon={faCoffee}
          updates={5}
          disabled
        >
          Disabled
        </Button>
        <Button theme={ButtonStyle.DARK} color="#f96680" compact>
          No icon
        </Button>
        <Button
          theme={ButtonStyle.DARK}
          color="#f96680"
          icon={faCoffee}
          compact
        >
          This is a compact button with icon
        </Button>
        <Button
          theme={ButtonStyle.DARK}
          color="#f96680"
          icon={faCoffee}
          compact
          updates={5}
        >
          This is a compact button with updates
        </Button>
      </div>

      <style jsx>
        {`
          div > div {
            display: flex;
            justify-content: space-evenly;
            margin-top: 15px;
          }
        `}
      </style>
    </div>
  );
};

SimpleButton.story = {
  name: "simple",
};
