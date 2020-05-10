import React from "react";
import Layout from "../src/Layout";
import BoardSidebar from "../src/BoardSidebar";
import BoardPreview from "../src/BoardPreview";
import BoardsGroup from "../src/BoardsGroup";
import Post from "../src/post/Post";

import oncelerAvatar from "./images/oncie.jpg";
import greedlerAvatar from "./images/greedler.jpg";
import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";

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
            <div className="post">
              <Post
                createdTime="2019/05/14 at 7:34pm"
                text={
                  '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
                }
                secretIdentity={{
                  name: "Good Guy",
                  avatar: `/${oncelerAvatar}`,
                }}
                onSubmit={() => console.log("click!")}
                onCancel={() => console.log("click!")}
                onNewContribution={() => console.log("click!")}
                onNewComment={() => console.log("click!")}
              />
            </div>
            <div className="post">
              <Post
                createdTime="2019/05/14 at 7:34pm"
                text={
                  '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
                }
                secretIdentity={{
                  name: "Tuxedo Mask",
                  avatar: `/${tuxedoAvatar}`,
                }}
                userIdentity={{
                  name: "SexyDaddy69",
                  avatar: `/${mamoruAvatar}`,
                }}
                onSubmit={() => console.log("click!")}
                onCancel={() => console.log("click!")}
                onNewContribution={() => console.log("click!")}
                onNewComment={() => console.log("click!")}
              />
            </div>
            <div className="post">
              <Post
                createdTime="2019/05/14 at 7:34pm"
                text={
                  '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
                }
                secretIdentity={{
                  name: "Bad Guy",
                  avatar: `/${greedlerAvatar}`,
                }}
                onSubmit={() => console.log("click!")}
                onCancel={() => console.log("click!")}
                onNewContribution={() => console.log("click!")}
                onNewComment={() => console.log("click!")}
              />
            </div>
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
          .post {
            max-width: 450px;
            margin: 0 auto;
            margin-top: 25px;
          }
        `}
      </style>
    </>
  );
};

Attempt1.story = {
  name: "there was an attempt",
};
