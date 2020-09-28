import React from "react";

import Layout from "../src/layout/Layout";
import FeedWithMenu from "../src/layout/FeedWithMenu";
import PostingActionButton from "../src/board/PostingActionButton";
import Post from "../src/post/Post";
import Tag from "../src/common/Tag";
// @ts-ignore
import Editor from "@bobaboard/boba-editor";

import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";

import Button, { ButtonStyle } from "../src/common/Button";

export default {
  title: "Collections Preview",
  component: Layout,
};

const NewPostsFeed = (props) => {
  return (
    <>
      {" "}
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"oh hello\\n"},{"insert":{"block-image":{"src":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F9693e0a5-0e82-40ff-848f-b0d3de7064cd?alt=media&token=8510cdc6-03d5-4d16-b95f-6f5a114f2a7b","spoilers":false,"width":640,"height":1136}}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: [],
          indexTags: [],
        }}
        totalContributions={0}
        directContributions={0}
        totalComments={0}
        newPost
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"picking up from the third chapter of his hermit book and already off to a good start\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2Fd4cbb34c-df06-43f9-8b07-962e88150fbf?alt=media&token=97ef0262-629a-4ca4-b65f-d4ee72c0df98"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: [
            "we interrupt your scheduled Nadia route to bring you some Julian",
          ],
          indexTags: [],
        }}
        totalContributions={0}
        directContributions={0}
        totalComments={3}
        newComments={3}
        newPost
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"attributes":{"italic":true,"bold":true},"insert":"IT\'S TIME"},{"attributes":{"header":2},"insert":"\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F774fbcd6-45d5-43a2-9bcf-ace5c17ff07e?alt=media&token=e04a093e-8a89-4dc2-ac36-cceb4bf9a7eb"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: ["BEACH EPISODE GO"],
          indexTags: [],
        }}
        totalContributions={5}
        directContributions={3}
        totalComments={69}
        newContributions={5}
        newComments={69}
        newPost
      />
    </>
  );
};

const UpdatedPostsFeed = (props) => {
  return (
    <>
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"imagine getting this dramatically cockblocked\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F788551ad-ad31-4c06-add0-16237b82c09c?alt=media&token=165b31c1-e0ea-4d0f-94f3-571d7aedebb0"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        totalContributions={15}
        directContributions={3}
        totalComments={5}
        newComments={3}
        newContributions={5}
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"oh hello\\n"},{"insert":{"block-image":{"src":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F9693e0a5-0e82-40ff-848f-b0d3de7064cd?alt=media&token=8510cdc6-03d5-4d16-b95f-6f5a114f2a7b","spoilers":false,"width":640,"height":1136}}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: [],
          indexTags: [],
        }}
        totalContributions={0}
        directContributions={0}
        totalComments={0}
        newPost
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"picking up from the third chapter of his hermit book and already off to a good start\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2Fd4cbb34c-df06-43f9-8b07-962e88150fbf?alt=media&token=97ef0262-629a-4ca4-b65f-d4ee72c0df98"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: [
            "we interrupt your scheduled Nadia route to bring you some Julian",
          ],
          indexTags: [],
        }}
        totalContributions={0}
        directContributions={0}
        totalComments={3}
        newComments={3}
        newPost
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"attributes":{"italic":true,"bold":true},"insert":"IT\'S TIME"},{"attributes":{"header":2},"insert":"\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F774fbcd6-45d5-43a2-9bcf-ace5c17ff07e?alt=media&token=e04a093e-8a89-4dc2-ac36-cceb4bf9a7eb"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: ["BEACH EPISODE GO"],
          indexTags: [],
        }}
        totalContributions={5}
        directContributions={3}
        totalComments={69}
        newContributions={5}
        newComments={69}
        newPost
      />
    </>
  );
};

export const AllPost = () => {
  return (
    <>
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"it is "},{"attributes":{"bold":true},"insert":"time"},{"insert":"! for! "},{"attributes":{"italic":true},"insert":"she!"},{"insert":"\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F2246b0a3-8b79-4c4d-82d6-be1a4670c771?alt=media&token=a111c5d0-d9ae-4b0e-98d5-aa8a7415eaaf"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: ["I'm ready to get dommed"],
          indexTags: [],
        }}
        totalContributions={15}
        directContributions={3}
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"imagine getting this dramatically cockblocked\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F788551ad-ad31-4c06-add0-16237b82c09c?alt=media&token=165b31c1-e0ea-4d0f-94f3-571d7aedebb0"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        totalContributions={15}
        directContributions={3}
        totalComments={5}
        newComments={3}
        newContributions={5}
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"i was gonna be like \'here\'s this asshole again\' but it\'s starting to seem like he might be nicer on this route\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F0c469208-7e28-456d-aa2f-be062786e536?alt=media&token=9d5474d4-3a90-44d5-b79b-3225ad4c7f96"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: ["he's such an asshole usually", "i'm still suspicious"],
          indexTags: [],
        }}
        totalContributions={15}
        directContributions={3}
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"oh hello\\n"},{"insert":{"block-image":{"src":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F9693e0a5-0e82-40ff-848f-b0d3de7064cd?alt=media&token=8510cdc6-03d5-4d16-b95f-6f5a114f2a7b","spoilers":false,"width":640,"height":1136}}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: [],
          indexTags: [],
        }}
        totalContributions={0}
        directContributions={0}
        totalComments={0}
        newPost
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"insert":"picking up from the third chapter of his hermit book and already off to a good start\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2Fd4cbb34c-df06-43f9-8b07-962e88150fbf?alt=media&token=97ef0262-629a-4ca4-b65f-d4ee72c0df98"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: [
            "we interrupt your scheduled Nadia route to bring you some Julian",
          ],
          indexTags: [],
        }}
        totalContributions={0}
        directContributions={0}
        totalComments={3}
        newComments={3}
        newPost
      />
      <Post
        createdTime="2019/05/14 at 7:34pm"
        text={
          '[{"attributes":{"italic":true,"bold":true},"insert":"IT\'S TIME"},{"attributes":{"header":2},"insert":"\\n"},{"insert":{"block-image":"https://firebasestorage.googleapis.com/v0/b/bobaboard-fb.appspot.com/o/images%2Fliveblogging%2F85933834-15a9-411b-98b4-f6ac5f4c1b3c%2F774fbcd6-45d5-43a2-9bcf-ace5c17ff07e?alt=media&token=e04a093e-8a89-4dc2-ac36-cceb4bf9a7eb"}},{"insert":"\\n"}]'
        }
        secretIdentity={{
          name: "Tuxedo Mask",
          avatar: `/${tuxedoAvatar}`,
        }}
        userIdentity={{
          name: "SexyDaddy69",
          avatar: `/${mamoruAvatar}`,
        }}
        onNewContribution={() => console.log("click!")}
        onNewComment={() => console.log("click!")}
        onNotesClick={() => console.log("click")}
        notesUrl={"#"}
        tags={{
          whisperTags: ["BEACH EPISODE GO"],
          indexTags: [],
        }}
        totalContributions={5}
        directContributions={3}
        totalComments={69}
        newContributions={5}
        newComments={69}
        newPost
      />
    </>
  );
};

enum DisplayType {
  NEW,
  UPDATED,
  ALL,
}

export const Attempt1 = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [displayType, setDisplayType] = React.useState(DisplayType.NEW);
  return (
    <>
      <Layout
        mainContent={
          <FeedWithMenu
            sidebarContent={<div></div>}
            feedContent={
              <div className="feed-content">
                <div className="intro">
                  <Editor
                    initialText={JSON.parse(
                      '[{"insert":"It\'s real arcana hours~"},{"attributes":{"header":1},"insert":"\\n"},{"insert":"\\n"},{"insert":{"image":"https://uploads.jovemnerd.com.br/wp-content/uploads/2020/06/the-arcana-30dias-30dicas.jpg"}},{"insert":"\\n\\ni\'ve already played partway through some of the routes but haven\'t finished any yet, so i\'ll liveblog all of them at least a little\\n\\ni\'m not finishing any route before muriel\'s (meaning that on other routes, i\'ll only go as far as his latest book)"},{"attributes":{"list":"ordered"},"insert":"\\n"},{"insert":"i don\'t mind spoilers at all, so feel free to reply with anything that might be one"},{"attributes":{"list":"ordered"},"insert":"\\n"}]'
                    )}
                    editable={false}
                    focus={false}
                    onSubmit={() => {}}
                    onTextChange={() => {}}
                  />
                  <div className="tags">
                    <Tag name="The Arcana" symbol="!" compact color="#40e0d0" />
                    <Tag name="Videogames" symbol="!" compact color="#40e0d0" />
                    <Tag
                      name="Spoilers Beware"
                      symbol="#"
                      compact
                      highlightColor="white"
                    />
                    <Tag
                      name="CWs mostly untagged"
                      symbol="#"
                      compact
                      highlightColor="white"
                    />
                    <Tag
                      name="read at your own risk"
                      symbol="#"
                      compact
                      highlightColor="white"
                    />
                  </div>
                  <h3>Collection Categories</h3>
                  <div className="categories">
                    <Tag color="#cf436d" name="Nadia" symbol="+" />
                    <Tag color="#e85c49" name="Asra" symbol="+" />
                    <Tag color="#de0137" name="Julian" symbol="+" />
                    <Tag color="#376135" name="Muriel" symbol="+" />
                    <Tag color="#efc78c" name="BaeWatch" symbol="+" />
                    <Tag color="#6c43bc" name="Ramblings" symbol="+" />
                  </div>
                </div>

                <div className="title">
                  <div className="feed-type">
                    <Button
                      theme={
                        displayType == DisplayType.NEW
                          ? ButtonStyle.LIGHT
                          : ButtonStyle.DARK
                      }
                      color="#40e0d0"
                      onClick={() => setDisplayType(DisplayType.NEW)}
                      updates={3}
                    >
                      New
                    </Button>
                    <Button
                      theme={
                        displayType == DisplayType.UPDATED
                          ? ButtonStyle.LIGHT
                          : ButtonStyle.DARK
                      }
                      color="#40e0d0"
                      onClick={() => setDisplayType(DisplayType.UPDATED)}
                      updates={4}
                    >
                      Updates
                    </Button>
                    <Button
                      theme={
                        displayType == DisplayType.ALL
                          ? ButtonStyle.LIGHT
                          : ButtonStyle.DARK
                      }
                      color="#40e0d0"
                      onClick={() => setDisplayType(DisplayType.ALL)}
                    >
                      All
                    </Button>
                  </div>
                </div>
                {displayType == DisplayType.NEW && <NewPostsFeed />}
                {displayType == DisplayType.UPDATED && <UpdatedPostsFeed />}
                {displayType == DisplayType.ALL && <AllPost />}
              </div>
            }
          />
        }
        sideMenuContent={<div>The usual!</div>}
        actionButton={
          <PostingActionButton
            accentColor="#40e0d0"
            onNewPost={() => console.log("hi!")}
          />
        }
        headerAccent="#40e0d0"
        title="!liveblogging"
        onLogoClick={() => console.log("clack")}
        onTitleClick={() => {
          setShowSidebar(!showSidebar);
        }}
        onUserBarClick={() => console.log("userbar click!")}
        loggedInMenuOptions={[
          { name: "opt1", onClick: () => console.log("opt1 click!") },
          { name: "opt2", onClick: () => console.log("opt2 click!") },
        ]}
        user={{
          username: "SexyDaddy69",
          avatarUrl: mamoruAvatar,
        }}
      />
      <style jsx>{`
        .intro {
          max-width: 500px;
          color: white !important;
          border-radius: 25px;
          padding: 10px;
          margin: 0 auto;
        }
        .categories {
          margin: 20px auto;
          max-width: 500px;
          width: 100%;
          display: grid;
          /* Define Auto Row size */
          grid-auto-rows: 40px;
          /*Define our columns */
          grid-template-columns: repeat(auto-fill, 130px);
          grid-gap: 1em;
          text-align: center;
        }
        .tags {
          margin-top: 10px;
        }
        .tags > :global(div),
        .categories > :global(div) {
          margin-left: 5px;
          margin-bottom: 5px;
        }
        .feed-type {
          margin-bottom: 20px;
          max-width: 300px;
          display: flex;
          justify-content: space-around;
          margin: 0 auto;
        }
        :global(.post-container) {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

Attempt1.story = {
  name: "there was an attempt",
};
