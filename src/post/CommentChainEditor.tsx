import React from "react";
import CommentEditor, { EditorRef } from "./CommentEditor";
import classnames from "classnames";
import DefaultTheme from "../theme/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const isValidSubmitState = (chainComments: any) => {
  const hasUnsubmittable = chainComments.some(
    (comment: any) => !comment.canSubmit
  );
  return !hasUnsubmittable;
};
const getTopRightCornerPosition = (
  parent: HTMLDivElement,
  element: HTMLDivElement
) => {
  const parentBox = parent.getBoundingClientRect();
  const elementBox = element.getBoundingClientRect();

  return {
    top: elementBox.top - parentBox.top,
    left: elementBox.right - parentBox.left,
  };
};

const INITIAL_COMMENT_VALUE = () => ({
  text: "[]",
  empty: true,
  id: new Date().getTime(),
  canSubmit: false,
});
const CommentChainEditor = React.forwardRef<
  {
    focus: () => void;
  },
  CommentChainEditorProps
>((props, ref) => {
  const [chainComments, setChainComments] = React.useState([
    INITIAL_COMMENT_VALUE(),
  ]);
  const [focusedChainIndex, setFocusedChainIndex] = React.useState(0);
  const editorRefs = React.useRef(new Map<number, EditorRef>());
  const deleteRef = React.useRef<HTMLDivElement>(null);
  const chainEditorRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        editorRefs.current.get(focusedChainIndex)?.editorRef.current?.focus();
      },
    }),
    []
  );

  React.useEffect(() => {
    // Change this on chainComments change cause that's when the refs change
    editorRefs.current.forEach((ref, index) => {
      if (!ref?.editorRef.current) {
        return;
      }
      if (index != 0) {
        ref.editorRef.current.style.borderTopLeftRadius = "0px";
        ref.editorRef.current.style.borderTopRightRadius = "0px";
        ref.editorRef.current.style.borderTop = "1px dotted black";
      }
      if (index < chainComments.length - 1) {
        ref.editorRef.current.style.borderBottomLeftRadius = "0px";
        ref.editorRef.current.style.borderBottomRightRadius = "0px";
      }
    });
  }, [chainComments]);

  React.useEffect(() => {
    const comment = chainComments[focusedChainIndex];
    const emptyEditorRef = editorRefs.current.get(focusedChainIndex)?.editorRef
      .current;
    if (
      chainEditorRef.current &&
      deleteRef.current &&
      comment.empty &&
      (focusedChainIndex != 0 || chainComments.length > 1) &&
      emptyEditorRef
    ) {
      const differences = getTopRightCornerPosition(
        chainEditorRef.current,
        emptyEditorRef
      );
      deleteRef.current.style.left = differences.left + "px";
      deleteRef.current.style.top = differences.top + "px";
      deleteRef.current.style.display = "block";
    } else if (deleteRef.current) {
      deleteRef.current.style.display = "none";
    }
  }, [chainComments, focusedChainIndex, deleteRef.current]);

  React.useEffect(() => {
    console.log(editorRefs.current.get(focusedChainIndex));
    editorRefs.current.get(focusedChainIndex)?.focus();
  }, [focusedChainIndex]);

  return (
    <div className="comment-chain-editor" ref={chainEditorRef}>
      {chainComments.map((comment, index) => (
        <div
          className={classnames("comment-container", {
            focused: index == focusedChainIndex,
          })}
          onClickCapture={() => {
            setFocusedChainIndex(index);
          }}
        >
          <CommentEditor
            key={`comment_${comment.id}`}
            ref={(ref: EditorRef) => editorRefs.current.set(index, ref)}
            initialText={comment.text}
            userIdentity={props.userIdentity}
            secretIdentity={props.secretIdentity}
            muted={focusedChainIndex != index}
            onSubmit={(text) =>
              props.onSubmit?.(chainComments.map((comment) => comment.text))
            }
            withActions={index == chainComments.length - 1}
            onIsEmptyChange={(empty) => {
              chainComments[index] = {
                ...chainComments[index],
                empty,
              };
              setChainComments([...chainComments]);
            }}
            onTextChange={(text) => {
              comment.text = text;
            }}
            onCancel={() => {
              props.onCancel();
            }}
            onCanSubmitChange={(canSubmit) => {
              console.log(canSubmit);
              if (comment.canSubmit != canSubmit) {
                chainComments[index] = {
                  ...chainComments[index],
                  canSubmit,
                };
                setChainComments([...chainComments]);
              }
            }}
            canSubmit={isValidSubmitState(chainComments)}
            loading={props.loading}
          />
        </div>
      ))}
      <div
        key="append"
        className={classnames("fake-button append", {
          disabled: chainComments[chainComments.length - 1].empty,
        })}
        onClick={() => {
          if (chainComments[chainComments.length - 1].empty) {
            return;
          }
          setFocusedChainIndex(chainComments.length);
          setChainComments([...chainComments, INITIAL_COMMENT_VALUE()]);
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <div
        key="delete"
        className={classnames("fake-button delete")}
        onClick={() => {
          editorRefs.current.delete(focusedChainIndex);
          setFocusedChainIndex(
            // The currently focused chain is either the last one (and then we
            // need to move back to the new "last one"), ot it's one in the middle.
            // In the latter case, it should stay the same because we want to
            // focus the one after which, after the present chain is gone, will
            // be at the same index as the present one
            focusedChainIndex != chainComments.length - 1
              ? focusedChainIndex
              : chainComments.length - 2
          );
          setChainComments(
            chainComments.filter((comment, index) => index != focusedChainIndex)
          );
        }}
        ref={deleteRef}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <style jsx>{`
        .comment-chain-editor {
          position: relative;
          width: 100%;
          max-width: 550px;
        }
        .comment-container {
          opacity: 1;
        }
        .comment-container.focused {
          opacity: 1;
        }
        .editor.chainable {
          margin-bottom: 15px;
        }
        .append {
          bottom: 0;
          left: 15px;
          transform: translate(50%, 50%);
        }
        .delete {
          right: 0;
          transform: translate(-50%, -50%);
        }
        .fake-button {
          position: absolute;
          border-radius: 50%;
          background: ${DefaultTheme.BUTTON_BACKGROUND_COLOR_LIGHT};
          border: 2px ${DefaultTheme.BUTTON_ACCENT_COLOR_LIGHT} solid;
          width: 25px;
          height: 25px;
          display: block;
        }
        .fake-button.disabled {
          border-color: #adadad;
          color: #adadad;
          background: ${DefaultTheme.BUTTON_BACKGROUND_COLOR_LIGHT};
        }
        .fake-button.disabled:hover {
          border-color: #adadad;
          color: #adadad;
          background: ${DefaultTheme.BUTTON_BACKGROUND_COLOR_LIGHT};
          cursor: not-allowed;
        }
        .fake-button:hover {
          cursor: pointer;
          color: ${DefaultTheme.BUTTON_BACKGROUND_COLOR_LIGHT};
          border-color: ${DefaultTheme.BUTTON_BACKGROUND_COLOR_LIGHT};
          background-color: ${DefaultTheme.BUTTON_ACCENT_COLOR_LIGHT};
        }
        .fake-button :global(svg) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
});

export interface CommentChainEditorProps {
  onCancel: () => void;
  onSubmit: (text: string[]) => void;
  secretIdentity?: {
    avatar: string;
    name: string;
  };
  loading?: boolean;
  userIdentity?: {
    avatar: string;
    name: string;
  };
}

export default CommentChainEditor;
