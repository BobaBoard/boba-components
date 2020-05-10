import React from "react";

import Header, { HeaderStyle } from "./Header";
import Footer, { modes as footerModes } from "./Footer";
import Card from "../common/Card";
import Editor from "@bobaboard/boba-editor";

export const modes = {
  VIEW: "VIEW",
  CREATE: "CREATE",
};

const Post: React.FC<PostProps> = (props) => {
  const [newText, setNewText] = React.useState("");
  return (
    <>
      <div className="container">
        <div className="post-container">
          <div className="header">
            <Header
              secretIdentity={props.secretIdentity}
              userIdentity={props.userIdentity}
              createdMessage={`Posted on: ${props.createdTime}`}
              size={HeaderStyle.REGULAR}
            />
          </div>
          <Card>
            <Editor
              initialText={JSON.parse(
                '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
              )}
              editable={props.mode == modes.CREATE}
              focus={props.focus || false}
              onSubmit={() => props.onSubmit(newText)}
              onTextChange={(text) => setNewText(JSON.stringify(text))}
            />
            <Footer mode={footerModes.CREATE} />
          </Card>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 450px;
          display: flex;
          flex-direction: column;
          margin-bottom: 50px;
        }
        .header {
          margin-bottom: 15px;
        }
      `}</style>
    </>
  );
};

export default Post;

export interface PostProps {
  mode: string;
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
  onSubmit: (text: string) => void;
  onCancel: (id: string) => void;
  onNewContribution: () => void;
  onNewComment: () => void;
}
