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
import color from "color";

const log = debug("bobaui:tagsinput-log");

const TAG_LENGTH_LIMIT = 200;
const ADD_A_TAG_STRING = "Add a tag...";
// This is a horrible hack. If the higher of the input span grows
// beyond this number of pixel, we "detect" a two-line input and
// bring the tag input to a new line.
const HEIGHT_TRIGGER = 40;
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

const isWhisperTag = (tag: TagsType) => {
  return !(tag.category || tag.contentWarning || tag.indexable);
};

const resetInputState = (span: HTMLSpanElement, forceAdd: boolean = false) => {
  const hasFocus = span == document.activeElement;
  log(`Resetting input element.`);
  log(`Input element focused: ${hasFocus}`);
  span.textContent = !forceAdd && hasFocus ? "" : ADD_A_TAG_STRING;
  span.style.width = "auto";
  span.style.flex = "1";
};

const TagsDisplay: React.FC<TagsInputProps & { deleting: boolean }> = ({
  tags,
  editable,
  deleting,
}) => {
  const whisperTags: TagsType[] = [];
  const specialTags: TagsType[] = [];
  tags.forEach((tag) => {
    isWhisperTag(tag) ? whisperTags.push(tag) : specialTags.push(tag);
  });

  const maybeWrapInDiv = (component: JSX.Element[], wrapClassName: string) => {
    return editable ? (
      component
    ) : (
      <div className={wrapClassName}>{component}</div>
    );
  };

  return (
    <>
      {!!specialTags.length &&
        maybeWrapInDiv(
          specialTags.map((tag, index) => (
            <div
              key={index}
              className={classnames("tag-container", {
                deleting: deleting && index == tags.length - 1,
                // TODO: listing all things this isn't for condition, bad.
                whisper: !(tag.category || tag.contentWarning || tag.indexable),
              })}
            >
              {TagsFactory.create(tag)}
            </div>
          )),
          "special-tags"
        )}
      {!!whisperTags.length &&
        maybeWrapInDiv(
          whisperTags.map((tag, index) => (
            <div
              key={index}
              className={classnames("tag-container", {
                deleting:
                  deleting && specialTags.length + index == tags.length - 1,
                // TODO: listing all things this isn't for condition, bad.
                whisper: isWhisperTag(tag),
              })}
            >
              {TagsFactory.create(tag)}
            </div>
          )),
          "whisper-tags"
        )}
      <style jsx>{`
        .tag-container {
          margin: 5px 5px 0 0;
          align-items: center;
          word-break: break-word;
          display: inline-flex;
          position: relative;
        }
      `}</style>
    </>
  );
};

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsAdd,
  onTagsDelete,
  editable,
  onSubmit,
  accentColor,
  suggestedCategories,
}) => {
  const [deleteState, setDeleteState] = React.useState(false);
  const [indexable, setIndexableState] = React.useState(false);
  const [category, setCategoryState] = React.useState(false);
  const [contentWarning, setCwState] = React.useState(false);
  const [isTypingTag, setIsTypingTag] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);
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
        <div
          className={classnames("suggestions-container how-to", {
            visible: isFocused && tags.length == 0 && !isTypingTag,
          })}
        >
          Start a tag with <strong>!</strong> to make it searchable,{" "}
          <strong>+</strong> for a filterable category, or <strong>cw</strong>{" "}
          for content warnings. Tags are separated by new lines.
        </div>
        <div
          className={classnames(
            "suggestions-container categories-suggestions",
            {
              visible:
                isFocused &&
                suggestedCategories &&
                suggestedCategories.length > 0 &&
                category,
            }
          )}
        >
          {suggestedCategories?.map((category, index) => (
            <div
              key={index}
              className={classnames("tag-container")}
              // We use mouse down rather than on click because this runs
              // before the blur event.
              onMouseDown={(e) => {
                onTagsAdd?.({
                  name: category,
                  accentColor: "white",
                  category: true,
                });
                e.preventDefault();
              }}
            >
              {TagsFactory.create({
                name: category,
                accentColor: "white",
                category: true,
              })}
            </div>
          ))}
        </div>
        <TagsDisplay editable={editable} tags={tags} deleting={deleteState} />
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
              setFocused(true);
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
              setFocused(false);
              if (!spanRef.current) {
                return;
              }
              const currentTag = extractTag(spanRef.current.textContent);
              const isSubmittable = isTagValid(currentTag);
              if (isSubmittable) {
                onTagsAdd?.(TagsFactory.getTypeFromString(currentTag));
              }
              resetInputState(spanRef.current, true);
              setIndexableState(false);
              setCategoryState(false);
              setCwState(false);
              setDeleteState(false);
              setIsTypingTag(false);
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
              const value = (e.target as HTMLSpanElement).textContent || "";
              setIsTypingTag(value.length > 0);
              log(`input value: ${value}`);
            }}
            contentEditable={true}
          />
        )}
      </div>
      <style jsx>{`
        .tag-input {
          margin: 5px 0 0 0;
          flex: 1;
          word-break: normal;
          min-width: 100px;
          padding: 5px 8px;
          font-size: smaller;
          border-radius: 8px;
          color: ${color(DefaultTheme.LAYOUT_BOARD_BACKGROUND_COLOR).fade(0.5)};
        }
        .tag-input:focus {
          outline: none;
          color: ${DefaultTheme.LAYOUT_BOARD_BACKGROUND_COLOR};
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(0, 0, 0, 0.1);
        }
        .tag-input.indexable:focus {
          box-shadow: 0 0 0 1px
              ${color(accentColor || INDEXABLE_TAG_COLOR).fade(0)},
            0 0 0 4px ${color(accentColor || INDEXABLE_TAG_COLOR).fade(0.7)};
        }
        .tag-input.content-warning:focus {
          box-shadow: 0 0 0 1px ${color(accentColor || CW_TAG_COLOR).fade(0)},
            0 0 0 4px ${color(accentColor || CW_TAG_COLOR).fade(0.7)};
        }
        .tag-input.category:focus {
          box-shadow: 0 0 0 1px
              ${color(accentColor || CATEGORY_TAG_COLOR).fade(0)},
            0 0 0 4px ${color(accentColor || CATEGORY_TAG_COLOR).fade(0.7)};
        }
        .deleting > :global(*)::after {
          position: absolute;
          right: 0;
          bottom: -5px;
          left: 0;
          content: "";
          height: 3px;
          background: red;
        }
        .container {
          padding-bottom: 5px;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          box-sizing: border-box;
        }
        .tag-container {
          margin: 5px 5px 0 0;
          align-items: center;
          word-break: break-word;
          display: inline-flex;
          position: relative;
        }
        .suggestions-container {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          transform: translateY(-100%);
          padding: 10px 15px;
          box-shadow: 0 0 0 1px #d2d2d2;
          border-radius: 10px 10px 0 0;
          background-color: white;
          font-size: 14px;
          display: none;
          color: rgb(87, 87, 87);
        }
        .suggestions-container.visible {
          display: block;
        }
        .categories-suggestions .tag-container {
          margin-top: 3px;
          margin-bottom: 3px;
          margin-right: 10px;
        }
        .categories-suggestions .tag-container:hover {
          cursor: pointer;
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
  suggestedCategories?: string[];
}
