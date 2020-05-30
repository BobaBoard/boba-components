import React from "react";

import Input, { InputStyle } from "../src/common/Input";

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
          label="A text input"
          onTextChange={(text) => setText(text)}
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.DARK}
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.LIGHT}
          color="#f96680"
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.DARK}
          color="#f96680"
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
          label="A text input"
          onTextChange={(text) => setText(text)}
          password
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.DARK}
          password
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.LIGHT}
          color="#f96680"
          password
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.DARK}
          color="#f96680"
          password
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.DARK}
          color="#f96680"
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
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.DARK}
          disabled
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.LIGHT}
          color="#f96680"
          disabled
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.DARK}
          color="#f96680"
          disabled
        />
        <Input
          id="test1"
          value={text}
          label="A text input"
          onTextChange={(text) => setText(text)}
          theme={InputStyle.DARK}
          color="#f96680"
          disabled
        />
      </div>
    </>
  );
};

Disabled.story = {
  name: "disabled",
};
