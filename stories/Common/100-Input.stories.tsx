import ColorInput, { ColorInputProps } from "common/ColorInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input, { InputProps } from "common/Input";

import React from "react";

export default {
  title: "Input/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ margin: "2em" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputProps) => {
  const [text, setText] = React.useState(args.value ?? "");

  return (
    <Input {...args} value={text} onTextChange={(text) => setText(text)} />
  );
};

export const Regular = Template.bind({});

Regular.args = {
  id: "test1",
  label: "Simple text input",
  placeholder: "Placeholder",
};

Regular.storyName = "regular";

export const WithHelper = Template.bind({});

WithHelper.args = {
  id: "test2",
  label: "Text input with helper text",
  placeholder: "Placeholder",
  helper: "helper text",
};

WithHelper.storyName = "with helper";

export const WithError = Template.bind({});

WithError.args = {
  id: "test3",
  label: "Text input with error message",
  placeholder: "Placeholder",
  errorMessage: "Error text",
};

WithError.storyName = "with error";

export const MaxLength = Template.bind({});

MaxLength.args = {
  id: "test4",
  label: "Text input with max length",
  placeholder: "Placeholder",
  helper: "helper text",
  maxLength: 30,
};

MaxLength.storyName = "with max length";

export const Password = Template.bind({});

Password.args = {
  id: "test1",
  label: "Password",
  password: true,
  value: "password",
};

Password.storyName = "password";

export const Disabled = Template.bind({});

Disabled.args = {
  id: "test1",
  label: "A text input",
  disabled: true,
  value: "disabled",
};

Disabled.storyName = "disabled";

// TODO: switch to new storybook format
export const ColorInputStory = () => {
  const [color, setColor] = React.useState("red");
  return (
    <>
      <ColorInput currentColor={color} onColorChange={setColor} />
    </>
  );
};

ColorInputStory.storyName = "color";
