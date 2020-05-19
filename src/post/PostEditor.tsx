import React from "react";

import Header, { HeaderStyle } from "./Header";
import Footer, { modes as footerModes } from "./Footer";
import Card, { CardSizes } from "../common/Card";
import Editor from "@bobaboard/boba-editor";

import Theme from "../theme/default";
import Button from "../common/Button";
import { faPortrait, faImage } from "@fortawesome/free-solid-svg-icons";

const PostEditor: React.FC<PostEditorProps> = (props) => {
  const [size, setNewSize] = React.useState(
    props.defaultSize || CardSizes.REGULAR
  );
  const [newText, setNewText] = React.useState(
    props.initialText ? JSON.parse(props.initialText) : ""
  );
  return (
    <>
      <div className="post-container">
        <Card
          header={
            <div className="header">
              <Header
                secretIdentity={props.secretIdentity}
                userIdentity={props.userIdentity}
                size={HeaderStyle.REGULAR}
              >
                <Button
                  icon={size == CardSizes.REGULAR ? faImage : faPortrait}
                  onClick={() =>
                    setNewSize(
                      size == CardSizes.REGULAR
                        ? CardSizes.WIDE
                        : CardSizes.REGULAR
                    )
                  }
                >
                  {size == CardSizes.REGULAR ? "Enlarge" : "Shrink"}
                </Button>
              </Header>
            </div>
          }
          footer={
            <div className="footer">
              <Footer
                mode={footerModes.CREATE}
                onSubmit={() => props.onSubmit(newText)}
              />
            </div>
          }
          size={size}
        >
          <div className="editor">
            <Editor
              initialText={
                props.initialText ? JSON.parse(props.initialText) : ""
              }
              editable={true}
              focus={true}
              onSubmit={() => props.onSubmit(newText)}
              onTextChange={(text) => setNewText(JSON.stringify(text.ops))}
            />
          </div>
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
        }
        .footer {
          border-radius: 0px 0px 15px 15px;
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 15px;
        }
        .editor {
          padding-top: 5px;
          min-height: 300px;
        }
      `}</style>
    </>
  );
};

export default PostEditor;

export interface PostEditorProps {
  initialText?: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity: {
    avatar: string;
    name: string;
  };
  defaultSize?: CardSizes;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}
