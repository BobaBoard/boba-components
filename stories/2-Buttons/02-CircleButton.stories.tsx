import React from "react";
import { Story, Meta } from "@storybook/react";
import CircleButton, {
  CircleButtonProps,
} from "../../src/buttons/CircleButton";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import mamoru from "../images/mamoru.png";

export default {
  title: "Buttons/Circle Button",
  component: CircleButton,
  parameters: {
    actions: {
      handles: ["click button"],
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
            height: 45px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const ButtonTemplate: Story<CircleButtonProps> = (args) => {
  return <CircleButton {...args} />;
};

export const Regular = ButtonTemplate.bind({});
Regular.args = {
  icon: faCoffee,
  link: {
    onClick: () => {
      // This is already handled by the config parameters above
    },
  },
  accentColor: "red",
};

export const WithBorderColor = ButtonTemplate.bind({});
WithBorderColor.args = {
  ...Regular.args,
  defaultBorderColor: "magenta",
};

export const WithDropdown = ButtonTemplate.bind({});
WithDropdown.args = {
  ...Regular.args,
  withDropdown: true,
};

export const WithNotificationDot = ButtonTemplate.bind({});
WithNotificationDot.args = {
  ...Regular.args,
  withNotification: true,
};

export const WithNotificationDotAndBorder = ButtonTemplate.bind({});
WithNotificationDotAndBorder.args = {
  ...WithNotificationDot.args,
  defaultBorderColor: "cyan",
};

export const WithNotificationDotAndSelected = ButtonTemplate.bind({});
WithNotificationDotAndSelected.args = {
  ...WithNotificationDot.args,
  selected: true,
  accentColor: "red",
};

export const Selected = ButtonTemplate.bind({});
Selected.args = {
  ...Regular.args,
  selected: true,
  accentColor: "red",
};

export const Loading = ButtonTemplate.bind({});
Loading.args = {
  ...Selected.args,
  loading: true,
};

export const WithImage = ButtonTemplate.bind({});
WithImage.args = {
  ...Regular.args,
  icon: mamoru,
};

export const WithBlurredImage = ButtonTemplate.bind({});
WithBlurredImage.args = {
  ...Regular.args,
  icon: mamoru,
  blurred: true,
};
