import React from "react";

import Header, { HeaderStyle } from "./Header";
import Footer, { modes as footerModes } from "./Footer";
import Card, { CardSizes } from "../common/Card";
import Spinner from "../common/Spinner";
import Editor from "@bobaboard/boba-editor";

import Theme from "../theme/default";
import Button from "../common/Button";
import { faPortrait, faImage } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

const PostEditor: React.FC<PostEditorProps> = (props) => {
  const [size, setNewSize] = React.useState(
    props.defaultSize || CardSizes.REGULAR
  );
  const [newText, setNewText] = React.useState(
    props.initialText ? props.initialText : ""
  );
  const [isEmpty, setIsEmpty] = React.useState(true);

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
                  disabled={props.loading}
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
                onSubmit={() =>
                  props.onSubmit({
                    text: newText,
                    large: size == CardSizes.WIDE,
                  })
                }
                onCancel={props.onCancel}
                submittable={!props.loading && !isEmpty}
                cancellable={!props.loading}
              />
            </div>
          }
          size={size}
        >
          <div
            className={classnames("editor-container", {
              loading: props.loading,
            })}
          >
            <div className={"spinner"}>
              <Spinner />
            </div>
            <div className="editor">
              <Editor
                initialText={
                  props.initialText ? JSON.parse(props.initialText) : ""
                }
                editable={!props.loading}
                focus={true}
                onSubmit={() =>
                  props.onSubmit({
                    text: newText,
                    large: size == CardSizes.WIDE,
                  })
                }
                onIsEmptyChange={(empty) => {
                  setIsEmpty(empty);
                }}
                onTextChange={(text) => setNewText(JSON.stringify(text.ops))}
              />
            </div>
          </div>
        </Card>
      </div>
      <style jsx>{`
        .post-container {
          width: 100%;
        }
        .post-container > :global(div) {
          margin: 0 auto;
        }
        .header {
          border-radius: 15px 15px 0px 0px;
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 10px;
        }
        .footer {
          border-radius: 0px 0px 15px 15px;
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 15px;
        }
        .editor-container {
          padding-top: 5px;
          min-height: 300px;
        }
        .editor-container.loading .editor {
          opacity: 0.5;
        }
        .spinner {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          justify-content: center;
          align-items: center;
          z-index: 100;
          display: none;
        }

        .editor-container.loading .spinner {
          display: flex;
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
  loading?: boolean;
  defaultSize?: CardSizes;
  onSubmit: (post: { text: string; large: boolean }) => void;
  onCancel: () => void;
}
