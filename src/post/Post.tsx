import React from "react";

import UpdatesHeader from "./UpdatesHeader";
import Header, { HeaderStyle } from "./Header";
import Footer, { modes as footerModes } from "./Footer";
import Card from "../common/Card";
import Editor from "@bobaboard/boba-editor";

import Theme from "../theme/default";

export const modes = {
  VIEW: "VIEW",
  CREATE: "CREATE",
};

export enum PostSizes {
  REGULAR,
  WIDE,
}

export const getPostWidth = (size?: PostSizes) => {
  switch (size) {
    case PostSizes.WIDE:
      return 850;
    case PostSizes.REGULAR:
    default:
      return 550;
  }
};

const COLLAPSED_HEIGHT = 150;

const Post: React.FC<PostProps> = (props) => {
  const hasUpdate =
    props.newComments || props.newContributions || props.newPost;
  return (
    <>
      <div className="post-container">
        {hasUpdate && (
          <UpdatesHeader
            newPost={props.newPost}
            newComments={props.newComments}
            newContributions={props.newContributions}
          />
        )}
        <Card
          height={props.collapsed ? COLLAPSED_HEIGHT : undefined}
          header={
            <div className="header">
              <Header
                secretIdentity={props.secretIdentity}
                userIdentity={props.userIdentity}
                createdMessage={`${props.createdTime}`}
                size={HeaderStyle.REGULAR}
              />
            </div>
          }
          footer={
            <div className="footer">
              <Footer
                mode={footerModes.VIEW}
                onContribution={() => props.onNewContribution()}
                onComment={() => props.onNewComment()}
                totalContributions={props.totalContributions}
                directContributions={props.directContributions}
                totalComments={props.totalComments}
                newContributions={props.newContributions}
                newComments={props.newComments}
              />
            </div>
          }
        >
          <Editor
            initialText={JSON.parse(props.text)}
            editable={false}
            focus={props.focus || false}
            onSubmit={() => {
              /*no-op*/
            }}
            onTextChange={(text: any) => {
              /*no-op*/
            }}
          />
        </Card>
      </div>
      <style jsx>{`
        .header {
          border-radius: ${Theme.BORDER_RADIUS_REGULAR}
            ${Theme.BORDER_RADIUS_REGULAR} 0px 0px;
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 10px;
        }
        .post-container {
          max-width: ${getPostWidth(props.size)}px;
        }
        .footer {
          border-radius: 0px 0px ${Theme.BORDER_RADIUS_REGULAR}
            ${Theme.BORDER_RADIUS_REGULAR};
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 15px;
        }
      `}</style>
    </>
  );
};

export default Post;

export interface PostProps {
  mode?: string;
  focus?: boolean;
  editable?: boolean;
  text: string;
  createdTime: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  size?: PostSizes;
  newPost?: boolean;
  totalContributions?: number;
  directContributions?: number;
  newContributions?: number;
  totalComments?: number;
  newComments?: number;
  onNewContribution: () => void;
  onNewComment: () => void;
  collapsed?: boolean;
}
