import Input, { InputStyle } from "common/Input";

import ColorInput from "common/ColorInput";
import React from "react";

export default {
  title: "Input",
  component: Input,
};

export const Editable = () => {
  const [text, setText] = React.useState("");

  return (
    <>
      <div style={{ margin: "25px" }}>
        <Input
          id="test1"
          value={text}
          label="Simple text input"
          placeholder="Placeholder"
          onTextChange={(text) => setText(text)}
        />
      </div>
      <div style={{ margin: "25px" }}>
        <Input
          id="test2"
          value={text}
          label="Text input with helper text"
          placeholder="Placeholder"
          helper="helper text"
          onTextChange={(text) => setText(text)}
        />
      </div>
      <div style={{ margin: "25px" }}>
        <Input
          id="test3"
          value={text}
          label="Text input with error message"
          placeholder="Placeholder"
          errorMessage="Error text"
          onTextChange={(text) => setText(text)}
        />
      </div>
      <div style={{ margin: "25px" }}>
        <Input
          id="test4"
          value={text}
          label="Text input with max length"
          placeholder="Placeholder"
          helper="helper text"
          maxLength={30}
          onTextChange={(text) => setText(text)}
        />
      </div>
    </>
  );
};

Editable.story = {
  name: "editable",
};

export const Password = () => {
  const [text, setText] = React.useState("password");
  return (
    <>
      <div style={{ margin: "25px" }}>
        <Input
          id="test1"
          value={text}
          label="Password"
          onTextChange={(text) => setText(text)}
          password
        />
      </div>
    </>
  );
};

Password.story = {
  name: "password",
};

export const Disabled = () => {
  const [text, setText] = React.useState("disabled");
  return (
    <>
      <div style={{ margin: "25px" }}>
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          disabled
        />
      </div>
    </>
  );
};

Disabled.story = {
  name: "disabled",
};

export const ColorInputStory = () => {
  const [color, setColor] = React.useState("red");
  return (
    <>
      <ColorInput currentColor={color} onColorChange={setColor} />
    </>
  );
};

ColorInputStory.story = {
  name: "color",
};
