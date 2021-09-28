import React from "react";
import { Story, Meta } from "@storybook/react";
0;
import IconButtonComponent, {
  IconButtonProps,
} from "../../src/buttons/IconButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Buttons/Icon Button",
  component: IconButtonComponent,
  parameters: {
    actions: {
      handles: ["click .option", "click button"],
    },
  },
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
          }
          .story > :global(div) {
            margin: 10px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const ButtonTemplate: Story<IconButtonProps> = (args) => {
  return <IconButtonComponent {...args} />;
};

export const IconButton = ButtonTemplate.bind({});
IconButton.args = {
  icon: faCoffee,
};
