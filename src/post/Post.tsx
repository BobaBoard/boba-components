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

const COLLAPSED_HEIGHT = 250;

const Post: React.FC<PostProps> = (props) => {
  const [newText, setNewText] = React.useState(JSON.parse(props.text));
  return (
    <>
      <div className="post-container">
        <UpdatesHeader
          newPost={props.newPost}
          newComments={props.newComments}
          newContributions={props.newContributions}
        />
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
                mode={
                  props.mode == modes.CREATE
                    ? footerModes.CREATE
                    : footerModes.VIEW
                }
                onSubmit={() => props.onSubmit(newText)}
              />
            </div>
          }
        >
          <Editor
            initialText={JSON.parse(props.text)}
            editable={props.mode == modes.CREATE}
            focus={props.focus || false}
            onSubmit={() => props.onSubmit(newText)}
            onTextChange={(text: any) => setNewText(JSON.stringify(text.ops))}
          />
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
          max-width: ${getPostWidth(props.size)}px;
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
  newComments?: number;
  newContributions?: number;
  onSubmit: (text: string) => void;
  onCancel: (id: string) => void;
  onNewContribution: () => void;
  onNewComment: () => void;
  collapsed?: boolean;
}
