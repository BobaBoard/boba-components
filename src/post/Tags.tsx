import React from "react";

import Tag from "../common/Tag";
import Theme from "../theme/default";
import classnames from "classnames";
import debug from "debug";
import { TagsType } from "types";

const log = debug("bobaui:tagsinput-log");

const TAG_LENGTH_LIMIT = 200;
const ADD_A_TAG_STRING = "add a tag...";
const HEIGHT_TRIGGER = 30;
const INDEXABLE_CHARACTER = "!";
const UNSUBMITTABLE_TAGS = [INDEXABLE_CHARACTER, "", "#"];

const extractTag = (inputValue: string) => {
  return inputValue.replace(/\n/g, " ").trim().substr(0, TAG_LENGTH_LIMIT);
};

const isTagValid = (tag: string) => {
  log(UNSUBMITTABLE_TAGS.indexOf(tag));
  return UNSUBMITTABLE_TAGS.indexOf(tag) === -1;
};

const resetInputState = (span: HTMLSpanElement) => {
  const hasFocus = span == document.activeElement;
  log(`Resetting input element.`);
  log(`Input element focused: ${hasFocus}`);
  span.innerText = hasFocus ? "" : ADD_A_TAG_STRING;
  span.style.width = "auto";
  span.style.flex = "1";
};

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsAdd,
  onTagsDelete,
  editable,
  onSubmit,
  accentColor,
}) => {
  const [deleteState, setDeleteState] = React.useState(false);
  const [indexable, setIndexableState] = React.useState(false);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (spanRef.current) {
      resetInputState(spanRef.current);
      setDeleteState(false);
      setIndexableState(false);
    }
  }, [tags]);

  return (
    <>
      <div className="container">
        {!!tags.length && (
          <>
            {tags.map((tag, index) => (
              <div
                key={index}
                className={classnames("tag-container", {
                  deleting: deleteState && index == tags.length - 1,
                })}
              >
                <Tag
                  name={tag.name}
                  compact
                  color={tag.color}
                  symbol={!tag.indexable ? undefined : "!"}
                  highlightColor={
                    deleteState && index == tags.length - 1
                      ? "red"
                      : "rgba(0, 0, 0, 0.8)"
                  }
                />
              </div>
            ))}
          </>
        )}
        {!!editable && (
          <span
            className={classnames("tag-input", { indexable })}
            ref={spanRef}
            onKeyDown={(e) => {
              const inputValue = (e.target as HTMLSpanElement).innerText;
              const isDeletingPrevious =
                inputValue.length == 0 && e.key == "Backspace";
              const isSubmitAttempt =
                e.key === "Enter" && (e.metaKey || e.ctrlKey);
              const isTagEnterAttempt = e.key === "Enter" && !isSubmitAttempt;
              if (isDeletingPrevious) {
                log(`Received backspace on empty tag`);
                if (!deleteState) {
                  log(`Entering delete state for previous tag`);
                  setDeleteState(true);
                  return;
                }
                log(`Deleting previous tag`);
                setDeleteState(false);
                onTagsDelete?.(tags[tags.length - 1]);
                return;
              }
              setDeleteState(false);
              const currentTag = extractTag(inputValue);
              const isSubmittable = isTagValid(currentTag);
              if (isSubmitAttempt) {
                log(`Submitting with current tag ${inputValue}`);
                if (isSubmittable) {
                  onTagsAdd?.({ name: currentTag });
                }
                onSubmit?.();
                e.preventDefault();
                return;
              }
              if (isTagEnterAttempt) {
                log(`Attempting to enter tag ${inputValue}`);
                e.preventDefault();
                if (!isSubmittable) {
                  return;
                }
                onTagsAdd?.({ name: currentTag });
                if (spanRef.current) {
                  // Remove inner text here so it doesn't trigger flickering.
                  spanRef.current.innerText = "";
                }
              }
            }}
            onBeforeInput={(e) => {
              const target = e.target as HTMLSpanElement;
              let inputValue = target.innerText;
              if (inputValue.length >= TAG_LENGTH_LIMIT) {
                log("Tag Limit Reached Cannot Insert new Value");
                e.preventDefault();
              }

              if (/[\n]/g.test(inputValue)) {
                log("Found New Line Blocking");
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              log(`Pasting text!`);
              e.preventDefault();
              let text = extractTag(e.clipboardData.getData("text/plain"));
              if (document.queryCommandSupported("insertText")) {
                document.execCommand("insertText", false, text);
              } else {
                document.execCommand("paste", false, text);
              }
            }}
            onFocus={(e) => {
              const value = (e.target as HTMLSpanElement).innerText;
              if (value === ADD_A_TAG_STRING) {
                log('Focused: Removing "add a tag..."');
                if (spanRef.current) {
                  spanRef.current.innerText = "";
                }
              } else {
                log("Focused: Found text not removing anything");
              }
            }}
            onBlur={(e) => {
              if (!spanRef.current) {
                return;
              }
              const currentTag = extractTag(spanRef.current.innerText);
              const isSubmittable = isTagValid(currentTag);
              if (isSubmittable) {
                onTagsAdd?.({ name: currentTag });
              }
              resetInputState(spanRef.current);
              setIndexableState(false);
              setDeleteState(false);
            }}
            onKeyUp={(e) => {
              const target = e.target as HTMLSpanElement;
              const currentTag = extractTag(target.innerText);
              setIndexableState(currentTag.startsWith(INDEXABLE_CHARACTER));
              if (target.getBoundingClientRect().height > HEIGHT_TRIGGER) {
                log(`Multiline detected. Switching to full line.`);
                target.style.width = "100%";
                target.style.flex = "auto";
              }
            }}
            contentEditable={true}
          />
        )}
      </div>
      <style jsx>{`
        .tag-input.indexable {
          outline-color: ${accentColor || Theme.DEFAULT_ACCENT_COLOR};
          border-color: ${accentColor || Theme.DEFAULT_ACCENT_COLOR};
        }
        .container {
          padding: 5px;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          box-sizing: border-box;
        }
        .tag-input {
          flex: 1;
          word-break: normal;
          min-width: 100px;
          max-width: 500px;
          padding: 5px;
          padding-left: 2px;
          margin: 2px 2px;
          border-left: 5px solid transparent;
        }
        .tag-container:hover {
          cursor: pointer;
        }
        .tag-container {
          margin-right: 3px;
          display: flex;
          align-items: center;
          word-break: break-word;
        }
      `}</style>
    </>
  );
};

export default TagsInput;

export interface TagsInputProps {
  tags: TagsType[];
  onTagsDelete?: (deletedTag: TagsType) => void;
  onTagsAdd?: (newTag: TagsType) => void;
  editable?: boolean;
  onSubmit?: () => void;
  accentColor?: string;
}
