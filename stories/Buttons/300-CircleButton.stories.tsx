import CircleButton, { CircleButtonProps } from "buttons/CircleButton";
import { Meta, Story } from "@storybook/react";

import React from "react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import mamoru from "stories/images/mamoru.png";

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
            background-color: cornflowerblue;
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
  icon: { icon: faCoffee },
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
  withDropdown: {},
};

export const WithNotificationDot = ButtonTemplate.bind({});
WithNotificationDot.args = {
  ...Regular.args,
  withNotification: {},
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

export const Disabled = ButtonTemplate.bind({});
Disabled.args = {
  ...WithBorderColor.args,
  disabled: true,
};

export const WithImage = ButtonTemplate.bind({});
WithImage.args = {
  ...Regular.args,
  icon: { icon: mamoru },
};

export const WithBlurredImage = ButtonTemplate.bind({});
WithBlurredImage.args = {
  ...Regular.args,
  icon: { icon: mamoru },
  blurred: true,
};
