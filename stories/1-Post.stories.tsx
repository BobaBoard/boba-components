import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Card from "../src/Card";
import Footer, { modes as footerModes } from "../src/post/Footer";
import Editor from "@bobaboard/boba-editor";
export default {
  title: "Post Preview",
  component: Card,
};

export const CardSimple = () => (
  <Card>
    <Editor
      editable={false}
      initialText={JSON.parse(
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      )}
      onTextChange={() => {
        console.log("changed!");
      }}
      focus={true}
      onIsEmptyChange={() => {
        console.log("empty!");
      }}
      onSubmit={() => {
        // This is for cmd + enter pressed while in the editor
        console.log("submit!");
      }}
    />
  </Card>
);

CardSimple.story = {
  name: "simple",
};

export const EditableWithFooter = () => (
  <Card>
    <Editor
      editable
      initialText={JSON.parse(
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      )}
      onTextChange={() => {
        console.log("changed!");
      }}
      focus={true}
      onIsEmptyChange={() => {
        console.log("empty!");
      }}
      onSubmit={() => {
        // This is for cmd + enter pressed while in the editor
        console.log("submit!");
      }}
    />
    <Footer mode={footerModes.CREATE} />
  </Card>
);

export const NonEditable = () => (
  <Card>
    <Editor
      editable={false}
      initialText={JSON.parse(
        '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
      )}
      onTextChange={() => {
        console.log("changed!");
      }}
      focus={true}
      onIsEmptyChange={() => {
        console.log("empty!");
      }}
      onSubmit={() => {
        // This is for cmd + enter pressed while in the editor
        console.log("submit!");
      }}
    />
    <Footer mode={footerModes.VIEW} />
  </Card>
);

EditableWithFooter.story = {
  name: "editable with footer",
};

NonEditable.story = {
  name: "non-editable with footer",
};
