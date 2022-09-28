import Card, { CardProps } from "common/Card";
import {
  EDITOR_TEXT_VALUES,
  EditorControlsType,
  editorArgTypes,
  getInitialText,
} from "../utils/editor-controls";
import { Meta, Story } from "@storybook/react";

import Editor from "@bobaboard/boba-editor";
import React from "react";

export default {
  title: "Posts/Card",
  component: Card,
  argTypes: {
    ...editorArgTypes,
  },
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 25px;
            background-color: lightgray;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const CardTemplate: Story<
  CardProps &
    EditorControlsType & {
      footer: React.ReactNode;
      header: React.ReactNode;
    }
> = ({ footer, header, ...args }) => {
  return (
    <Card {...args}>
      <Card.Footer>{footer}</Card.Footer>
      <Card.Header>{header}</Card.Header>
      <Editor editable={false} initialText={getInitialText(args.editorText)} />
    </Card>
  );
};

export const Regular = CardTemplate.bind({});
Regular.args = {
  editorText: EDITOR_TEXT_VALUES.WITH_IMAGE,
};

export const WithBackgroundColor = CardTemplate.bind({});
WithBackgroundColor.args = {
  editorText: EDITOR_TEXT_VALUES.WITH_IMAGE,
  backgroundColor: "pink",
};

export const WithFixedHeight = CardTemplate.bind({});
WithFixedHeight.args = {
  ...WithBackgroundColor.args,
  height: 300,
};

export const WithHeaderAndFooter = CardTemplate.bind({});
WithHeaderAndFooter.args = {
  editorText: EDITOR_TEXT_VALUES.WITH_IMAGE,
  header: <div style={{ backgroundColor: "lightgreen" }}>This is a header</div>,
  footer: <div style={{ backgroundColor: "red" }}>This is a footer</div>,
};
