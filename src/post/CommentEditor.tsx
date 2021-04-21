import React from "react";
import classNames from "classnames";
import Editor from "@bobaboard/boba-editor";
import Header, { HeaderStyle, PostHeaderProps } from "./Header";
import Button from "../common/Button";
import { faCross, faCheck } from "@fortawesome/free-solid-svg-icons";
import useDimensions from "react-cool-dimensions";
import Spinner from "../common/Spinner";
import questionMark from "../images/question_mark.png";
import { prepareContentSubmission } from "../utils";
import { DefaultTheme, ImageUploaderContext } from "../index";
import { SecretIdentityType } from "types";

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
  const {
    ref: containerRef,
    currentBreakpoint,
  } = useDimensions<HTMLDivElement>({
    breakpoints: { compact: 0, regular: SIZE_TRIGGER },
    updateOnBreakpointChange: true,
  });
  const size = currentBreakpoint == "regular" ? SIZES.REGULAR : SIZES.COMPACT;
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
          padding: 0 5px 5px 5px;
        }
        .actions.hidden {
          visibility: hidden;
        }
        .actions > :global(div:not(:first-child)) {
          margin-left: 5px;
        }
        .characters-remaining {
          font-size: var(--font-size-small);
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
  const [charactersTyped, setCharactersTyped] = React.useState(1);
  const [text, setText] = React.useState(props.initialText || "[]");
  const imageUploader = React.useContext(ImageUploaderContext);

  // TODO: do something that's less of a crime
  React.useImperativeHandle(
    ref,
    () => ({
      headerRef,
      editorRef,
      text,
      focus: () => {
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

  const { onSelectIdentity } = props;
  const identityOptions = React.useMemo(
    () =>
      props.additionalIdentities
        ? [
            {
              name: "Random Identity",
              icon: questionMark,
              link: {
                onClick: () => onSelectIdentity?.(undefined),
              },
            },
            ...(props.additionalIdentities || []).map((identity) => ({
              name: identity.name,
              icon: identity.avatar,
              color: identity.color,
              link: {
                onClick: () => onSelectIdentity?.(identity),
              },
            })),
          ]
        : undefined,
    [props.additionalIdentities, onSelectIdentity]
  );

  const { onSubmit, prepareSubmission } = props;
  const onSubmitHandler = React.useCallback(() => {
    if (!imageUploader?.onImageUploadRequest) {
      throw new Error("An image uploader context must be provided");
    }
    onSubmit(
      (prepareSubmission !== false
        ? prepareContentSubmission(text, imageUploader.onImageUploadRequest)
        : Promise.resolve(text)
      ).then((uploadedText) => ({
        text: uploadedText,
      }))
    );
  }, [onSubmit, text, prepareSubmission, imageUploader?.onImageUploadRequest]);

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
            avatarOptions={identityOptions}
            showMetadata={false}
            accessories={props.accessories}
            accessory={props.accessory}
            onSelectAccessory={props.onSelectAccessory}
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
                  onTextChange={(text) => {
                    const jsonText = JSON.stringify(text);
                    props.onTextChange?.(jsonText);
                    setText(jsonText);
                  }}
                  onIsEmptyChange={props.onIsEmptyChange}
                  onCharactersChange={(characters: number) => {
                    setCharactersTyped(characters);
                    props.onCanSubmitChange?.(canSubmit(characters));
                  }}
                  singleLine={true}
                  ref={focusRef}
                />
              </div>
            </div>
            <CommentFooter
              charactersLeft={MAX_CHARACTERS - charactersTyped}
              isEmpty={charactersTyped == 1}
              onSubmit={onSubmitHandler}
              onCancel={props.onCancel}
              loading={!!props.loading}
              withActions={props.withActions}
              canSubmit={
                canSubmit(charactersTyped) && props.canSubmit !== false
              }
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .comment-container {
          align-items: start;
          display: flex;
          position: relative;
          max-width: ${DefaultTheme.POST_WIDTH_PX}px;
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
          padding: 5px 10px;
          color: ${DefaultTheme.POST_TEXT_COLOR};
          flex-grow: 1;
          min-width: 0;
          background: ${DefaultTheme.POST_BACKGROUND_COLOR};
          border-radius: 15px;
        }
        .comment.muted {
          background: ${DefaultTheme.POST_BACKGROUND_COLOR};
          opacity: 0.9;
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
  secretIdentity?: SecretIdentityType;
  userIdentity?: {
    avatar: string;
    name: string;
  };
  additionalIdentities?: SecretIdentityType[];
  onSelectIdentity?: (identity: SecretIdentityType | undefined) => void;
  accessories?: PostHeaderProps["accessories"];
  accessory?: PostHeaderProps["accessory"];
  onSelectAccessory?: PostHeaderProps["onSelectAccessory"];
  initialText?: string;
  onCancel: () => void;
  onSubmit: (commentPromise: Promise<{ text: string }>) => void;
  prepareSubmission?: boolean;
  onTextChange?: (text: string) => void;
  onCanSubmitChange?: (canSubmit: boolean) => void;
  onIsEmptyChange?: (empty: boolean) => void;
  loading?: boolean;
  centered?: boolean;
  withActions?: boolean;
  canSubmit?: boolean;
  muted?: boolean;
}

Comment.displayName = "CommentForwardRef";
export default Comment;
