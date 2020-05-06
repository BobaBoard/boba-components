import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Card from "../src/Card";
import Editor from "@bobaboard/boba-editor";
export default {
  title: "Post Preview",
  component: Card,
};

export const CardSimple = () => (
  <Card>
    <Editor
      editable={true}
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

export const CardWithFooter = () => (
  <Card>
    <Editor
      editable={true}
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
    <div>
      <input type="button" value="submit" />
    </div>
  </Card>
);

CardWithFooter.story = {
  name: "with footer",
};
