import React from "react";
import classNames from "classnames";
import Editor from "@bobaboard/boba-editor";
import Header, { HeaderStyle } from "./Header";
import Button from "../common/Button";
import { faCross, faCheck } from "@fortawesome/free-solid-svg-icons";
import useComponentSize from "@rehooks/component-size";

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
          >
            Cancel
          </Button>
          <Button
            onClick={props.onSubmit}
            disabled={props.isEmpty || props.charactersLeft < 0}
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
const MAX_CHARACTERS = 200;
const Comment: React.FC<Props> = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // @ts-ignore
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [size, setSize] = React.useState(SIZES.COMPACT);
  const [sized, setSized] = React.useState(false);
  const [charactersTyped, setCharactersTyped] = React.useState(1);
  const [text, setText] = React.useState(props.initialText);
  // @ts-ignore
  let { width, height } = useComponentSize(containerRef);
  React.useEffect(() => {
    setSize(width > SIZE_TRIGGER ? SIZES.REGULAR : SIZES.COMPACT);
    setSized(true);
  }, [width]);

  return (
    <>
      <div
        className={classNames("comment-container", {
          compact: size == SIZES.COMPACT,
          sized: sized,
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
        <div
          className={classNames("comment", {
            editable: props.editable,
          })}
        >
          <Editor
            key={props.id + "_editor"}
            editable={!!props.editable}
            initialText={JSON.parse(text)}
            onTextChange={(text) => setText(JSON.stringify(text))}
            focus={!!props.focus}
            onCharactersChange={(characters) => setCharactersTyped(characters)}
            onSubmit={() => {
              // This is for cmd + enter
              props.onSubmit(text);
            }}
            singleLine={true}
            showTooltip={false}
          />
          {props.editable && (
            <CommentFooter
              size={size}
              charactersLeft={MAX_CHARACTERS - charactersTyped}
              isEmpty={charactersTyped == 1}
              onSubmit={() => {
                props.onSubmit(text);
              }}
              onCancel={() => {
                if (charactersTyped == 1) {
                  props.onCancel();
                } else {
                  setShowCancelModal(true);
                }
              }}
            />
          )}
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
        .comment-container.sized {
          display: flex;
        }
        .comment-container {
          margin-top: 15px;
          margin-left: 30px;
          align-items: start;
          display: none;
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
        }
        .comment:not(.editable) {
          align-self: flex-end;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
        }
        .comment.editable {
          background: white;
          border-radius: 5px;
        }
        .error {
          color: red;
        }
      `}</style>
    </>
  );
};

interface Props {
  id: string;
  editable?: boolean;
  focus?: boolean;
  initialText: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  onCancel: () => void;
  onSubmit: (text: string) => void;
}

export default Comment;
