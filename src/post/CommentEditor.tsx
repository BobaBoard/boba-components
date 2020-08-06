import React from "react";
import classNames from "classnames";
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
  size: string;
  onSubmit: () => void;
  loading: boolean;
}) => {
  return (
    <>
      <div className="footer">
        <span
          className={classNames("characters-remaining", {
            error: props.charactersLeft < 0,
            compact: props.size === SIZES.COMPACT,
          })}
        >
          {props.charactersLeft} <span>characters left</span>
        </span>
        <div className="actions">
          <Button
            onClick={props.onCancel}
            icon={faCross}
            compact={props.size === SIZES.COMPACT}
            disabled={props.loading}
          >
            Cancel
          </Button>
          <Button
            onClick={props.onSubmit}
            disabled={
              props.isEmpty || props.charactersLeft < 0 || props.loading
            }
            icon={faCheck}
            compact={props.size === SIZES.COMPACT}
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
const Comment: React.FC<CommentProps> = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // @ts-ignore
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [size, setSize] = React.useState(SIZES.COMPACT);
  const [charactersTyped, setCharactersTyped] = React.useState(1);
  const [text, setText] = React.useState(props.initialText || "[]");
  // @ts-ignore
  let { width, height } = useComponentSize(containerRef);
  React.useLayoutEffect(() => {
    setSize(width > SIZE_TRIGGER ? SIZES.REGULAR : SIZES.COMPACT);
  }, [width]);

  return (
    <>
      <div
        className={classNames("comment-container", {
          compact: size == SIZES.COMPACT,
          loading: props.loading,
          centered: props.centered,
        })}
        ref={containerRef}
      >
        <div className="header">
          <Header
            size={HeaderStyle.COMPACT}
            secretIdentity={props.secretIdentity}
            userIdentity={props.userIdentity}
          />
        </div>
        <div className={classNames("comment")}>
          <div className="editor">
            <div className={"spinner"}>
              <Spinner size={50} />
            </div>
            <div>
              <Editor
                key={"comment_editor"}
                editable={!props.loading}
                initialText={JSON.parse(text)}
                onTextChange={(text: any) => setText(JSON.stringify(text))}
                focus={!!props.focus}
                onCharactersChange={(characters: number) =>
                  setCharactersTyped(characters)
                }
                onSubmit={() => {
                  // This is for cmd + enter
                  props.onSubmit(text);
                }}
                singleLine={true}
                showTooltip={false}
              />
            </div>
          </div>
          <CommentFooter
            size={size}
            charactersLeft={MAX_CHARACTERS - charactersTyped}
            isEmpty={charactersTyped == 1}
            onSubmit={() => {
              props.onSubmit(text);
            }}
            onCancel={() => {
              props.onCancel();
            }}
            loading={!!props.loading}
          />
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
        .comment {
          position: relative;
          padding: 15px 20px;
          color: black;
          flex-grow: 1;
          min-width: 0;
          background: white;
          border-radius: 15px;
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
};

export interface CommentProps {
  focus?: boolean;
  secretIdentity?: {
    avatar: string;
    name: string;
  };
  userIdentity: {
    avatar: string;
    name: string;
  };
  initialText?: string;
  onCancel: () => void;
  onSubmit: (text: string) => void;
  loading?: boolean;
  centered?: boolean;
}

export default Comment;
