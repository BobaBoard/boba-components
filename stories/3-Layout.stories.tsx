import React from "react";
import Layout from "../src/Layout";
import BoardSidebar from "../src/BoardSidebar";
import BoardPreview from "../src/BoardPreview";
import BoardsGroup from "../src/BoardsGroup";
import Card from "../src/Card";
import Footer, { modes as footerModes } from "../src/post/Footer";
import Editor from "@bobaboard/boba-editor";

import goreBackground from "./images/gore.png";

export default {
  title: "Layout Preview",
  component: Layout,
};

export const SimpleLayout = () => {
  return (
    <Layout
      mainContent={<div>This is the main content!</div>}
      sideMenuContent={<div>Get a load of this menu content!</div>}
    />
  );
};

SimpleLayout.story = {
  name: "simple",
};

export const LayoutWithSidebar = () => {
  return (
    <Layout
      mainContent={<div>This is the main content!</div>}
      sideMenuContent={<div>Get a load of this menu content!</div>}
      sidebarContent={<div>We have a sidebar now</div>}
    />
  );
};

LayoutWithSidebar.story = {
  name: "with sidebar",
};

export const Attempt1 = () => {
  return (
    <>
      <Layout
        mainContent={
          <div className="main">
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
          </div>
        }
        sideMenuContent={
          <div>
            <BoardsGroup>
              <BoardPreview
                slug="fic-club"
                avatar={`/${goreBackground}`}
                description="Love me some bruised bois (and more)."
                onClick={() => console.log("go!")}
                compact
                color="#f96680"
              />
              <BoardPreview
                slug="meta"
                avatar={`/${goreBackground}`}
                description="Love me some bruised bois (and more)."
                onClick={() => console.log("go!")}
                compact
                color="#24d282"
              />
            </BoardsGroup>
          </div>
        }
        sidebarContent={
          <BoardSidebar
            board={{
              slug: "gore",
              avatar: `/${goreBackground}`,
              description: "Love me some bruised bois (and more).",
              color: "#f96680",
            }}
          />
        }
        headerAccent="#f96680"
      />

      <style jsx>
        {`
          .main > :global(div) {
            margin: 0 auto;
            margin-bottom: 5px;
          }
        `}
      </style>
    </>
  );
};

Attempt1.story = {
  name: "there was an attempt",
};
