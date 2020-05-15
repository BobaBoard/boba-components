import React from "react";

import Post from "../post/Post";

import { CardSizes } from "../common/Card";

export interface BoardFeedProps {
  posts: {
    createdTime: string;
    text: string;
    secretIdentity: {
      name: string;
      avatar: string;
    };
    userIdentity?: {
      name: string;
      avatar: string;
    };
    options?: {
      size?: CardSizes;
    };
    newPost?: boolean;
    newComments?: boolean;
    newContributions?: boolean;
  }[];
}

const BoardFeed: React.FC<BoardFeedProps> = ({ posts }) => {
  return (
    <>
      <div className="main">
        {posts.map((post) => (
          <div className="post">
            <Post
              createdTime={post.createdTime}
              text={post.text}
              secretIdentity={post.secretIdentity}
              userIdentity={post.userIdentity}
              onSubmit={() => console.log("click!")}
              onCancel={() => console.log("click!")}
              onNewContribution={() => console.log("click!")}
              onNewComment={() => console.log("click!")}
              size={post.options?.size}
              newPost={post.newPost}
              newComments={post.newComments}
              newContributions={post.newContributions}
              collapsed={post.newComments && post.newContributions}
            />
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .post {
            margin: 0 auto;
            margin-top: 25px;
          }
          .main {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};

export default BoardFeed;
