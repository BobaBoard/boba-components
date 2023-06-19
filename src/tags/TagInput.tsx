import React, {
  ClipboardEventHandler,
  FormEventHandler,
  KeyboardEvent,
} from "react";

import DefaultTheme from "theme/default";
import TagsFactory from "./TagsFactory";
import color from "color";
import debug from "debug";

const TAG_LENGTH_LIMIT = 200;
// const ADD_A_TAG_STRING = "Add a tag...";
// This is a horrible hack. If the higher of the input div grows
// beyond this number of pixel, we "detect" a two-line input and
// bring the tag input to a new line.
const HEIGHT_TRIGGER = 30;
// TODO: move this to tag utils
const extractSanitizedTag = (inputValue: string | null) => {
  if (!inputValue) {
    return "";
  }
  return inputValue.replace(/\n/g, " ").trim().substr(0, TAG_LENGTH_LIMIT);
};

const isDeletingPrevious = (e: KeyboardEvent<HTMLElement>) => {
  const previousValue = e.currentTarget.getAttribute("data-previous");
  return !previousValue && e.key == "Backspace";
};
const isSubmissionAttempt = (e: KeyboardEvent<HTMLElement>) => e.key === "Enter";
const log = debug("bobaui:TagInput-log");

const maybePreventInput: FormEventHandler<HTMLDivElement> = (e) => {
  const inputValue = e.currentTarget.textContent || "";
  if (inputValue.length >= TAG_LENGTH_LIMIT) {
    log("Tag Limit Reached Cannot Insert new Value");
    e.preventDefault();
  }
  log(inputValue == "\n");
  if (/[\n]/g.test(inputValue)) {
    log("Found New Line Blocking");
    e.preventDefault();
  }
};

const sanitizeForPasting: ClipboardEventHandler<HTMLElement> = (e) => {
  log(`Pasting text!`);
  e.preventDefault();
  const text = extractSanitizedTag(
    e.clipboardData?.getData("text/plain") || ""
  );
  if (document.queryCommandSupported("insertText")) {
    document.execCommand("insertText", false, text);
  } else {
    document.execCommand("paste", false, text);
  }
};

const resetInputState = (div: HTMLDivElement | null) => {
  if (!div) {
    return;
  }
  const hasFocus = div == document.activeElement;
  log(`Resetting input element.`);
  log(`Input element focused: ${hasFocus}`);
  div.textContent = "";
  div.parentElement!.classList.remove("multiline");
};

const LIGHT_BOARD_BACKGROUND_COLOR = color(
  DefaultTheme.LAYOUT_BOARD_BACKGROUND_COLOR
).fade(0.5);

const TagInput = React.forwardRef<TagInputRef, TagInputProps>((props, ref) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (divRef.current) {
      resetInputState(divRef.current);
    }
  }, [divRef]);

  React.useImperativeHandle(
    ref,
    () => ({
      clear: () => resetInputState(divRef.current),
    }),
    [divRef]
  );

  const maybeSubmitTag = (div: HTMLDivElement | null) => {
    if (!div) {
      return;
    }
    const currentTag = extractSanitizedTag(div.textContent || null);
    if (TagsFactory.isTagValid(currentTag)) {
      props.onTagSubmit(currentTag);
    }
    resetInputState(div);
    props.onTagChange("");
  };

  return (
    <div className="tag-input-container">
      <div className="shadow-text">{props.children}</div>
      <div
        className={"tag-input"}
        role="textbox"
        aria-label="The tags input area"
        ref={divRef}
        onKeyDown={(e) => {
          e.currentTarget.setAttribute(
            "data-previous",
            e.currentTarget.textContent || ""
          );
          if (isDeletingPrevious(e)) {
            log(`Received backspace on empty tag`);
            log(`Deleting previous tag`);
            props.onDeletePrevious();
            return;
          }

          if (isSubmissionAttempt(e)) {
            e.preventDefault();
            maybeSubmitTag(e.currentTarget);
          }
        }}
        onBeforeInput={maybePreventInput}
        onPaste={sanitizeForPasting}
        onFocus={(e) => {
          props.onFocusChange(true);
          // e.currentTarget.parentElement!.classList.remove("with-hint");
        }}
        onBlur={(e) => {
          props.onFocusChange(false);
          maybeSubmitTag(divRef.current);
        }}
        onKeyUp={(e) => {
          // TODO: if the user holds the button down (e.g. when deleting),
          // then key up behaves weirdly.
          const target = e.target as HTMLDivElement;
          if (target.getBoundingClientRect().height > HEIGHT_TRIGGER) {
            log(`Multiline detected. Switching to full line.`);
            target.parentElement!.classList.add("multiline");
          }

          // We give the tag change input when the key is up because that's the
          // moment when the value of textContent has stabilized.
          if (!isDeletingPrevious(e)) {
            // TODO: we don't return the sanitized value here because we want
            // to be able to know the real length of the input in the
            // tag editor.
            props.onTagChange(e.currentTarget.textContent || "");
          }
        }}
        contentEditable={true}
      />
      <style jsx>{`
        .tag-input-container {
          display: inline-block;
          flex: 1;
          position: relative;
        }
        .tag-input-container:hover {
          cursor: text;
        }

        .tag-input-container.multiline {
          width: 100%;
        }
        .shadow-text {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          pointer-events: none;
          margin: 5px 0 0 0;
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: normal;
          min-width: 100px;
          padding: 5px 8px;
          font-size: var(--font-size-small);
          color: ${LIGHT_BOARD_BACKGROUND_COLOR};
          box-sizing: border-box;
        }

        .tag-input {
          margin: 5px 0 0 0;
          max-width: 100%;
          word-break: normal;
          min-width: 100px;
          padding: 5px 8px;
          font-size: var(--font-size-small);
          color: ${DefaultTheme.LAYOUT_BOARD_BACKGROUND_COLOR};
          border-radius: 8px;
          box-sizing: border-box;
        }
        .tag-input:focus {
          outline: none;
          box-shadow: 0 0 0 1px rgba(var(--highlight-color), 0.5),
            0 0 0 4px rgba(var(--highlight-color), 0.3);
        }
      `}</style>
    </div>
  );
});
TagInput.displayName = "TagInput";

export interface TagInputRef {
  clear: () => void;
}
export interface TagInputProps {
  onTagChange: (value: string) => void;
  onTagSubmit: (value: string) => void;
  onDeletePrevious: () => void;
  onFocusChange: (focused: boolean) => void;
  children?: React.ReactNode;
}

export default TagInput;
