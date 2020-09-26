import React from "react";

import UpdatesHeader from "./UpdatesHeader";
import Header, { HeaderStyle } from "./Header";
import Footer from "./Footer";
import { PostSizes, getPostWidth } from "./Post";
import Card from "../common/Card";
import Editor from "@bobaboard/boba-editor";
import classnames from "classnames";
//import { useCompact } from "../utils";

import Theme from "../theme/default";
import { PostDetailsType } from "../types";

const PostContent: React.FC<
  PostDetailsType & { showHeader?: boolean; showFooter?: boolean }
> = (props) => {
  return (
    <div
      className={classnames("post", {
        old: !props.newPost,
        "with-footer": props.showFooter !== false,
      })}
    >
      {props.showHeader !== false && (
        <div className="header">
          <Header
            secretIdentity={props.secretIdentity}
            userIdentity={props.userIdentity}
            createdMessage={`${props.createdTime}`}
            size={HeaderStyle.REGULAR}
            newPost={props.newPost}
          />
        </div>
      )}
      <Editor
        initialText={JSON.parse(props.text)}
        editable={false}
        onSubmit={() => {}}
        onTextChange={() => {}}
      />
      {props.showFooter !== false && (
        <div className="footer">
          {/* <Footer
            mode={footerModes.VIEW}
            onSubmit={() => console.log("Click")}
          /> */}
        </div>
      )}
      <style jsx>{`
        .post.old {
          opacity: 0.8;
        }
        .post.with-footer {
        }
      `}</style>
    </div>
  );
};

const ThreadContent: React.FC<{ posts: PostDetailsType[] }> = ({ posts }) => {
  // const divRef = React.createRef<HTMLDivElement>();
  // const expandDiv = useCompact(divRef, 250, "lightgrey");

  const oldPosts = posts.filter((post) => !post.newPost);
  const newPosts = posts.filter((post) => post.newPost);
  return (
    <div>
      <div className="old-posts">
        {oldPosts.map((post, index) => {
          // Don't show the last post here, keep it unminified.
          if (index == oldPosts.length - 1) {
            return;
          }
          return <PostContent {...post} showHeader={index != 0} />;
        })}
        {/* {expandDiv} */}
      </div>
      <div className="old-last">
        {<PostContent {...oldPosts[oldPosts.length - 1]} />}
      </div>
      <div className="new-posts">
        {newPosts.map((post, index) => {
          return (
            <PostContent {...post} showFooter={index != newPosts.length - 1} />
          );
        })}
      </div>
      <style jsx>
        {`
          .old-posts,
          .old-last {
            position: relative;
            padding-bottom: 20px;
          }
          .post {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
};

const CompactThread: React.FC<CompactThreadProps> = (props) => {
  return (
    <>
      <div className="post-container">
        <UpdatesHeader
          newPost={props.newPost}
          newComments={props.newComments}
          newContributions={props.newContributions}
        />
        <Card
          header={
            <div className="header">
              <Header
                secretIdentity={props.posts[0].secretIdentity}
                userIdentity={props.posts[0].userIdentity}
                createdMessage={`${props.posts[0].createdTime}`}
                size={HeaderStyle.REGULAR}
              />
            </div>
          }
          footer={
            <div className="footer">
              <Footer />
            </div>
          }
        >
          <ThreadContent posts={props.posts} />
        </Card>
      </div>
      <style jsx>{`
        .header {
          border-radius: 15px 15px 0px 0px;
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 10px;
        }
        .post-container {
          margin-bottom: 50px;
          width: ${getPostWidth(PostSizes.REGULAR)}px;
        }
        .footer {
          border-radius: 0px 0px 15px 15px;
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 15px;
        }
      `}</style>
    </>
  );
};

export default CompactThread;

export interface CompactThreadProps {
  posts: PostDetailsType[];
  onNewContribution: () => void;
  onNewComment: () => void;
  newPost?: boolean;
  newComments?: number;
  newContributions?: number;
}
