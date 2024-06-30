import Button, { ButtonProps, ButtonStyle } from "buttons/Button";
import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import SegmentedButton, { SegmentedButtonProps } from "buttons/SegmentedButton";

import { action } from "@storybook/addon-actions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import mamoru from "stories/images/mamoru.png";

export default {
  title: "Buttons/Regular Button",
  component: Button,
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

const ButtonTemplate: Story<ButtonProps & { text: string }> = (args) => (
  <>
    <Button {...args}>{args.text}</Button>
    <Button theme={ButtonStyle.DARK} {...args}>
      {args.text}
    </Button>
    <Button color="#f96680" {...args}>
      {args.text}
    </Button>
    <Button theme={ButtonStyle.DARK} color="#f96680" {...args}>
      {args.text}
    </Button>
    <Button theme={ButtonStyle.TRANSPARENT} {...args}>
      {args.text}
    </Button>
    <Button theme={ButtonStyle.TRANSPARENT} color="#f96680" {...args}>
      {args.text}
    </Button>
  </>
);

export const Regular = ButtonTemplate.bind({});
Regular.args = {
  text: "A regular button",
};

export const WithIcon = ButtonTemplate.bind({});
WithIcon.args = {
  text: "A button with icon",
  icon: faCoffee,
};

export const WithImage = ButtonTemplate.bind({});
WithImage.args = {
  text: "A button with image",
  icon: mamoru,
};

export const Disabled = ButtonTemplate.bind({});
Disabled.args = {
  text: "A disabled button",
  icon: faCoffee,
  disabled: true,
};

export const Compact = ButtonTemplate.bind({});
Compact.args = {
  text: "A compact button",
  compact: true,
};

export const CompactWithIcon = ButtonTemplate.bind({});
CompactWithIcon.args = {
  text: "A compact button (icon)",
  icon: faCoffee,
  compact: true,
};

export const CompactWithImage = ButtonTemplate.bind({});
CompactWithImage.args = {
  text: "A compact button (image)",
  icon: mamoru,
  compact: true,
};

enum SegmentedButtonOptions {
  LEFT = "LEFT",
  MIDDLE = "MIDDLE",
  RIGHT = "RIGHT",
}

const SegmentedTemplate = (args: Partial<SegmentedButtonProps>) => {
  const [selected, setSelected] = useState(SegmentedButtonOptions.LEFT);
  return (
    <SegmentedButton
      options={[
        {
          id: SegmentedButtonOptions.LEFT,
          label: "Left",
          link: {
            onClick: () => setSelected(SegmentedButtonOptions.LEFT),
          },
        },
        {
          id: SegmentedButtonOptions.MIDDLE,
          label: "Middle",
          link: {
            onClick: () => setSelected(SegmentedButtonOptions.MIDDLE),
          },
        },
        {
          id: SegmentedButtonOptions.RIGHT,
          label: "Right",
          link: {
            onClick: () => setSelected(SegmentedButtonOptions.RIGHT),
          },
        },
      ]}
      selected={selected}
      {...args}
    />
  );
};

// TODO: refactor this story so it's its separate file, with separate expamples
export const Segmented = () => {
  const [selected, setSelected] = useState(SegmentedButtonOptions.LEFT);
  return (
    <div className="container">
      <div style={{ width: "300px" }}>
        <SegmentedTemplate theme={ButtonStyle.LIGHT} />
      </div>
      <div style={{ width: "400px" }}>
        <SegmentedTemplate color="#f96680" />
      </div>
      <div style={{ width: "500px" }}>
        <SegmentedButton
          options={[
            {
              id: SegmentedButtonOptions.LEFT,
              label: "onClick",
              link: {
                onClick: () => {
                  setSelected(SegmentedButtonOptions.LEFT);
                  action("Left button was selected")();
                },
              },
            },
            {
              id: SegmentedButtonOptions.MIDDLE,
              label: "href",
              link: {
                href: "https://boba.social/",
              },
            },
            {
              id: SegmentedButtonOptions.RIGHT,
              label: "Both",
              link: {
                href: "https://boba.social/",
                onClick: () => {
                  setSelected(SegmentedButtonOptions.RIGHT);
                  action("Right button was selected")();
                },
              },
            },
          ]}
          selected={selected}
        />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
          }
          .container > div {
            margin-top: 15px;
          }
        `}
      </style>
    </div>
  );
};
