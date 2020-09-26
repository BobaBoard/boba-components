import React from "react";
import classNames from "classnames";
// @ts-ignore
import Editor from "@bobaboard/boba-editor";
import Header, { HeaderStyle } from "./Header";
import Button from "../common/Button";
import { faCross, faCheck } from "@fortawesome/free-solid-svg-icons";
import useComponentSize from "@rehooks/component-size";
import Spinner from "../common/Spinner";

export const modes = {
  VIEW: "VIEW",
  CREATE: "CREATE",
};

const SIZES = {
  REGULAR: "REGULAR",
  COMPACT: "COMPACT",
};
const SIZE_TRIGGER = 315;

const CommentFooter = (props: {
  charactersLeft: number;
  isEmpty: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  loading: boolean;
  withActions?: boolean;
  canSubmit: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  let { width } = useComponentSize(containerRef);
  const size = width > SIZE_TRIGGER ? SIZES.REGULAR : SIZES.COMPACT;
  return (
    <>
      <div className="footer" ref={containerRef}>
        <span
          className={classNames("characters-remaining", {
            error: props.charactersLeft < 0,
            compact: size === SIZES.COMPACT,
          })}
        >
          {props.charactersLeft} <span>characters left</span>
        </span>
        <div
          className={classNames("actions", {
            hidden: props.withActions === false,
          })}
        >
          <Button
            onClick={props.onCancel}
            icon={faCross}
            compact={size === SIZES.COMPACT}
            disabled={props.loading}
          >
            Cancel
          </Button>
          <Button
            onClick={props.onSubmit}
            disabled={!props.canSubmit}
            icon={faCheck}
            compact={size === SIZES.COMPACT}
          >
            Submit
          </Button>
        </div>
      </div>
      <style jsx>{`
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }
        .actions.hidden {
          visibility: hidden;
        }
        .actions > :global(div:not(:first-child)) {
          margin-left: 5px;
        }
        .characters-remaining {
          font-size: small;
          color: gray;
          min-width: 30px;
        }
        .characters-remaining :global(span:last-child) {
          display: inline-block;
        }
        .compact.characters-remaining :global(span:last-child) {
          display: none;
        }
        .error {
          color: red;
        }
      `}</style>
    </>
  );
};

const MAX_CHARACTERS = 300;
const Comment = React.forwardRef<EditorRef, CommentProps>((props, ref) => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const focusRef = React.useRef<any>(null);
  // @ts-ignore
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [charactersTyped, setCharactersTyped] = React.useState(1);
  const [text, setText] = React.useState(props.initialText || "[]");

  // TODO: do something that's less of a crime
  React.useImperativeHandle(
    ref,
    () => ({
      headerRef,
      editorRef,
      text,
      focus: () => {
        console.log("focus");
        console.log(editorRef);
        focusRef.current?.focus();
      },
    }),
    [text]
  );

  const canSubmit = (charactersTyped: number) =>
    !(
      charactersTyped == 1 ||
      MAX_CHARACTERS - charactersTyped < 0 ||
      props.loading
    );

  return (
    <>
      <div
        className={classNames("comment-container", {
          loading: props.loading,
          centered: props.centered,
        })}
      >
        <div className="header">
          <Header
            size={HeaderStyle.COMPACT}
            secretIdentity={props.secretIdentity}
            userIdentity={props.userIdentity}
          />
        </div>
        <div className={classNames("editor")}>
          <div
            className={classNames("comment", { muted: props.muted })}
            ref={editorRef}
          >
            <div className="editor">
              <div className={"spinner"}>
                <Spinner size={50} />
              </div>
              <div>
                <Editor
                  key={"comment_editor"}
                  editable={!props.loading}
                  initialText={JSON.parse(text)}
                  onTextChange={(text: any) => {
                    const jsonText = JSON.stringify(text);
                    props.onTextChange?.(jsonText);
                    setText(jsonText);
                  }}
                  onCharactersChange={(characters: number) => {
                    setCharactersTyped(characters);
                    if (
                      (charactersTyped > 1 && characters == 1) ||
                      (charactersTyped == 1 && characters > 1)
                    ) {
                      props.onIsEmptyChange?.(characters == 1);
                    }
                    props.onCanSubmitChange?.(canSubmit(characters));
                  }}
                  onSubmit={() => {
                    // This is for cmd + enter
                    props.onSubmit(text);
                  }}
                  singleLine={true}
                  showTooltip={false}
                  ref={focusRef}
                />
              </div>
            </div>
            <CommentFooter
              charactersLeft={MAX_CHARACTERS - charactersTyped}
              isEmpty={charactersTyped == 1}
              onSubmit={() => {
                props.onSubmit(text);
              }}
              onCancel={() => {
                props.onCancel();
              }}
              loading={!!props.loading}
              withActions={props.withActions}
              canSubmit={
                canSubmit(charactersTyped) && props.canSubmit !== false
              }
            />
          </div>
        </div>
        {/* 
          <ModalTransition>
            {showCancelModal && (
              <ModalDialog
                heading="Cancel comment"
                appearance="warning"
                width={400}
                onClose={() => {
                  setState({ showCancelModal: false });
                }}
                actions={[
                  {
                    text: "Cancel",
                    onClick: () => {
                      props.onCancel(props.id);
                      setState({ showCancelModal: false });
                    },
                  },
                  {
                    text: "Nevermind",
                    onClick: () => {
                      setState({ showCancelModal: false });
                    },
                  },
                ]}
              >
                <div>Please, no! Please, it has a family to feed...!</div>
              </ModalDialog>
            )}
          </ModalTransition> */}
      </div>
      <style jsx>{`
        .comment-container {
          align-items: start;
          display: flex;
          position: relative;
          max-width: 550px;
        }
        .comment-container.centered {
          margin: 0 auto;
        }
        .header {
          margin-right: 10px;
          cursor: pointer;
        }
        .editor {
          position: relative;
          width: 100%;
        }
        .comment {
          position: relative;
          padding: 15px 20px;
          color: black;
          flex-grow: 1;
          min-width: 0;
          background: white;
          border-radius: 15px;
        }
        .comment.muted {
          background: #dcdcdc;
        }
        .error {
          color: red;
        }
        .editor {
          position: relative;
        }
        .comment-container.loading .editor div:not(.spinner) {
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
        .comment-container.loading .spinner {
          display: flex;
        }
      `}</style>
    </>
  );
});

export interface EditorRef {
  editorRef: React.RefObject<HTMLDivElement>;
  focus: () => void;
}

export interface CommentProps {
  secretIdentity?: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  initialText?: string;
  onCancel: () => void;
  onSubmit: (text: string) => void;
  onTextChange?: (text: string) => void;
  onCanSubmitChange?: (canSubmit: boolean) => void;
  onIsEmptyChange?: (empty: boolean) => void;
  loading?: boolean;
  centered?: boolean;
  withActions?: boolean;
  canSubmit?: boolean;
  muted?: boolean;
}

export default Comment;
