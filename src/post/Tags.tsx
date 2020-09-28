import React from "react";

import {
  TagsFactory,
  INDEXABLE_PREFIX,
  CATEGORY_PREFIX,
  CONTENT_WARNING_PREFIX,
  INDEXABLE_TAG_COLOR,
  CATEGORY_TAG_COLOR,
  CW_TAG_COLOR,
} from "../common/Tag";
import classnames from "classnames";
import debug from "debug";
import { TagsType } from "../types";
import DefaultTheme from "../theme/default";

const log = debug("bobaui:tagsinput-log");

const TAG_LENGTH_LIMIT = 200;
const ADD_A_TAG_STRING = "Add a tag...";
const HEIGHT_TRIGGER = 30;
const UNSUBMITTABLE_TAGS = [
  INDEXABLE_PREFIX,
  CATEGORY_PREFIX,
  CONTENT_WARNING_PREFIX,
  "",
  "#",
];

const extractTag = (inputValue: string | null) => {
  if (!inputValue) {
    return "";
  }
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
  span.textContent = hasFocus ? "" : ADD_A_TAG_STRING;
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
  const [category, setCategoryState] = React.useState(false);
  const [contentWarning, setCwState] = React.useState(false);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (spanRef.current) {
      resetInputState(spanRef.current);
      setDeleteState(false);
      setIndexableState(false);
      setCategoryState(false);
      setCwState(false);
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
                {TagsFactory.create(tag)}
              </div>
            ))}
          </>
        )}
        {!!editable && (
          <span
            className={classnames("tag-input", {
              indexable,
              category,
              "content-warning": contentWarning,
            })}
            ref={spanRef}
            onKeyDown={(e) => {
              const inputValue = (e.target as HTMLSpanElement).textContent;
              const isDeletingPrevious = !inputValue && e.key == "Backspace";
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
                  log(`Adding tag before submission: ${currentTag}`);
                  onTagsAdd?.(TagsFactory.getTypeFromString(currentTag));
                }
                onSubmit?.(
                  isSubmittable
                    ? TagsFactory.getTypeFromString(currentTag)
                    : undefined
                );
                e.preventDefault();
                return;
              }
              if (isTagEnterAttempt) {
                log(`Attempting to enter tag ${inputValue}`);
                e.preventDefault();
                if (!isSubmittable) {
                  return;
                }
                onTagsAdd?.(TagsFactory.getTypeFromString(currentTag));
                if (spanRef.current) {
                  // Remove inner text here so it doesn't trigger flickering.
                  spanRef.current.textContent = "";
                }
              }
            }}
            onBeforeInput={(e) => {
              const target = e.target as HTMLSpanElement;
              let inputValue = target.textContent || "";
              if (inputValue.length >= TAG_LENGTH_LIMIT) {
                log("Tag Limit Reached Cannot Insert new Value");
                e.preventDefault();
              }
              log(inputValue == "\n");
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
              const value = (e.target as HTMLSpanElement).textContent;
              if (value === ADD_A_TAG_STRING) {
                log('Focused: Removing "add a tag..."');
                if (spanRef.current) {
                  spanRef.current.textContent = "";
                }
              } else {
                log("Focused: Found text not removing anything");
              }
            }}
            onBlur={(e) => {
              if (!spanRef.current) {
                return;
              }
              const currentTag = extractTag(spanRef.current.textContent);
              const isSubmittable = isTagValid(currentTag);
              if (isSubmittable) {
                onTagsAdd?.(TagsFactory.getTypeFromString(currentTag));
              }
              resetInputState(spanRef.current);
              setIndexableState(false);
              setCategoryState(false);
              setCwState(false);
              setDeleteState(false);
            }}
            onKeyUp={(e) => {
              const target = e.target as HTMLSpanElement;
              const currentTag = extractTag(target.textContent);
              setIndexableState(currentTag.startsWith(INDEXABLE_PREFIX));
              setCategoryState(currentTag.startsWith(CATEGORY_PREFIX));
              setCwState(currentTag.startsWith(CONTENT_WARNING_PREFIX));
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
        .tag-input.indexable:focus {
          outline: ${accentColor || INDEXABLE_TAG_COLOR} solid 2px;
          border-color: ${accentColor || INDEXABLE_TAG_COLOR};
        }
        .tag-input.content-warning:focus {
          outline: ${CW_TAG_COLOR} solid 2px;
          border-color: ${CW_TAG_COLOR};
        }
        .tag-input.category:focus {
          outline: ${CATEGORY_TAG_COLOR} solid 2px;
          border-color: ${CATEGORY_TAG_COLOR};
        }
        .deleting :global(*) {
          color: red !important;
        }
        .container {
          padding: 5px 0;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          box-sizing: border-box;
        }
        .tag-input {
          flex: 1;
          word-break: normal;
          min-width: 100px;
          padding: 5px;
          padding-left: 2px;
          margin: 2px 2px;
          border-left: 5px solid transparent;
          color: ${DefaultTheme.LAYOUT_BOARD_BACKGROUND_COLOR};
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
  onSubmit?: (newTag?: TagsType) => void;
  accentColor?: string;
}
