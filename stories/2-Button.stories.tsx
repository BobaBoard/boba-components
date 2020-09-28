import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Button, { ButtonStyle } from "../src/common/Button";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import mamoru from "./images/mamoru.png";

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
        <Button imageUrl={mamoru} updates={5}>
          This is a button with image
        </Button>
        <Button imageUrl={mamoru} compact updates={5}>
          This is a compact button with image
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
        <Button theme={ButtonStyle.DARK} imageUrl={mamoru} updates={5}>
          This is a button with image
        </Button>
        <Button theme={ButtonStyle.DARK} imageUrl={mamoru} compact updates={5}>
          This is a compact button with image
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
        <Button color="#f96680" imageUrl={mamoru} updates={5}>
          This is a button with image
        </Button>
        <Button color="#f96680" imageUrl={mamoru} compact updates={5}>
          This is a compact button with image
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
        <Button
          color="#f96680"
          theme={ButtonStyle.DARK}
          imageUrl={mamoru}
          updates={5}
        >
          This is a button with image
        </Button>
        <Button
          color="#f96680"
          theme={ButtonStyle.DARK}
          imageUrl={mamoru}
          compact
          updates={5}
        >
          This is a compact button with image
        </Button>
      </div>
      <div>
        <Button theme={ButtonStyle.TRANSPARENT}>This is a button</Button>
        <Button theme={ButtonStyle.TRANSPARENT} icon={faCoffee}>
          This is a button with icon
        </Button>
        <Button theme={ButtonStyle.TRANSPARENT} icon={faCoffee} updates={5}>
          This is a button with updates
        </Button>
        <Button
          theme={ButtonStyle.TRANSPARENT}
          icon={faCoffee}
          updates={5}
          disabled
        >
          Disabled
        </Button>
        <Button theme={ButtonStyle.TRANSPARENT} compact>
          No icon
        </Button>
        <Button theme={ButtonStyle.TRANSPARENT} icon={faCoffee} compact>
          This is a compact button with icon
        </Button>
        <Button
          theme={ButtonStyle.TRANSPARENT}
          icon={faCoffee}
          compact
          updates={5}
        >
          This is a compact button with updates
        </Button>
        <Button theme={ButtonStyle.TRANSPARENT} imageUrl={mamoru} updates={5}>
          This is a button with image
        </Button>
        <Button
          theme={ButtonStyle.TRANSPARENT}
          imageUrl={mamoru}
          compact
          updates={5}
        >
          This is a compact button with image
        </Button>
      </div>

      <div>
        <Button theme={ButtonStyle.TRANSPARENT} color="#f96680">
          This is a button
        </Button>
        <Button theme={ButtonStyle.TRANSPARENT} color="#f96680" icon={faCoffee}>
          This is a button with icon
        </Button>
        <Button
          theme={ButtonStyle.TRANSPARENT}
          color="#f96680"
          icon={faCoffee}
          updates={5}
        >
          This is a button with updates
        </Button>
        <Button
          theme={ButtonStyle.TRANSPARENT}
          color="#f96680"
          icon={faCoffee}
          updates={5}
          disabled
        >
          Disabled
        </Button>
        <Button theme={ButtonStyle.TRANSPARENT} color="#f96680" compact>
          No icon
        </Button>
        <Button
          theme={ButtonStyle.TRANSPARENT}
          color="#f96680"
          icon={faCoffee}
          compact
        >
          This is a compact button with icon
        </Button>
        <Button
          theme={ButtonStyle.TRANSPARENT}
          color="#f96680"
          icon={faCoffee}
          compact
          updates={5}
        >
          This is a compact button with updates
        </Button>
        <Button
          color="#f96680"
          theme={ButtonStyle.TRANSPARENT}
          imageUrl={mamoru}
          updates={5}
        >
          This is a button with image
        </Button>
        <Button
          color="#f96680"
          theme={ButtonStyle.TRANSPARENT}
          imageUrl={mamoru}
          compact
          updates={5}
        >
          This is a compact button with image
        </Button>
      </div>
      <div>
        <Button color="#f96680" imageUrl={mamoru} updates={true}>
          This is a button with an undisclosed number of updates
        </Button>
        <Button color="#f96680" imageUrl={mamoru} compact updates={true}>
          This is a compact button with an undisclosed number of updates
        </Button>
        <Button
          color="#f96680"
          theme={ButtonStyle.DARK}
          imageUrl={mamoru}
          updates={true}
        >
          This is a button with an undisclosed number of updates
        </Button>
        <Button
          color="#f96680"
          theme={ButtonStyle.DARK}
          imageUrl={mamoru}
          compact
          updates={true}
        >
          This is a compact button with an undisclosed number of updates
        </Button>
      </div>

      <style jsx>
        {`
          div > div {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
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
