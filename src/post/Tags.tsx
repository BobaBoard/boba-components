import React from "react";

import Tag, {
  TagsFactory,
  INDEXABLE_TAG_COLOR,
  CATEGORY_TAG_COLOR,
  CW_TAG_COLOR,
  getDataForTagType,
} from "../common/Tag";
import DropdownListMenu, { DropdownProps } from "../common/DropdownListMenu";
import classnames from "classnames";
import debug from "debug";
import { TagsType, TagType } from "../types";
import DefaultTheme from "../theme/default";
import color from "color";

const log = debug("bobaui:tagsinput-log");

const TAG_LENGTH_LIMIT = 200;
const ADD_A_TAG_STRING = "Add a tag...";
// This is a horrible hack. If the higher of the input span grows
// beyond this number of pixel, we "detect" a two-line input and
// bring the tag input to a new line.
const HEIGHT_TRIGGER = 30;

const extractSanitizedTag = (inputValue: string | null) => {
  if (!inputValue) {
    return "";
  }
  return inputValue.replace(/\n/g, " ").trim().substr(0, TAG_LENGTH_LIMIT);
};

const resetInputState = (span: HTMLSpanElement, forceAdd = false) => {
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
  onTagsDelete,
  getOptionsForTag,
  packBottom,
}) => {
  const whisperTags: TagsType[] = [];
  const specialTags: TagsType[] = [];
  tags.forEach((tag) => {
    tag.type == TagType.WHISPER ? whisperTags.push(tag) : specialTags.push(tag);
  });

  // We cannot just wrap in a div/span because making things in different divs
  // flow inline with a with a container that is display:flex seems to be impossible.
  // Removing the display:flex from the container makes it impossible to keep the tag
  // input following the text on its line while expanding to fill.
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
          (packBottom ? [...specialTags].reverse() : specialTags).map(
            (tag, index) => (
              <div
                key={index}
                className={classnames("tag-container", {
                  deleting: deleting && index == tags.length - 1,
                  // TODO: listing all things this isn't for condition, bad.
                  whisper: !(
                    tag.category ||
                    tag.contentWarning ||
                    tag.indexable
                  ),
                })}
              >
                <DropdownListMenu options={getOptionsForTag?.(tag)}>
                  <Tag
                    name={tag.name}
                    {...getDataForTagType(tag)}
                    compact
                    deletable={editable}
                    onDeleteTag={() => {
                      onTagsDelete?.(tag);
                    }}
                  />
                </DropdownListMenu>
              </div>
            )
          ),
          classnames("special-tags", {
            "bottom-packed": !!packBottom,
          })
        )}
      {!!whisperTags.length &&
        maybeWrapInDiv(
          whisperTags.map((tag, index) => (
            <div
              key={index}
              className={classnames("tag-container", {
                deleting:
                  deleting && specialTags.length + index == tags.length - 1,
                whisper: tag.type == TagType.WHISPER,
              })}
            >
              <DropdownListMenu options={getOptionsForTag?.(tag)}>
                <Tag
                  name={tag.name}
                  {...getDataForTagType(tag)}
                  compact
                  deletable={editable}
                  onDeleteTag={() => {
                    onTagsDelete?.(tag);
                  }}
                />
              </DropdownListMenu>
            </div>
          )),
          "whisper-tags"
        )}
      <style jsx>{`
        :global(.tag-container) {
          margin: 5px 5px 0 0;
          align-items: center;
          word-break: break-word;
          display: inline-flex;
          position: relative;
        }
        :global(.whisper-tags) {
          display: flex;
          text-align: left;
          flex-shrink: 0;
          flex-wrap: wrap;
          max-width: 100%;
        }
        :global(.special-tags.bottom-packed) {
          display: flex;
          flex-wrap: wrap-reverse;
          flex-direction: row-reverse;
          justify-content: flex-end;
        }
        :global(.deleting) > :global(*)::after {
          position: absolute;
          right: 0;
          bottom: -5px;
          left: 0;
          content: "";
          height: 3px;
          background: red;
        }
      `}</style>
    </>
  );
};

enum TagInputState {
  CONTENT_NOTICE,
  INDEXABLE,
  CATEGORY,
  WHISPER,
  EMPTY,
  DELETE,
}

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsAdd,
  onTagsDelete,
  editable,
  onSubmit,
  accentColor,
  suggestedCategories,
  getOptionsForTag,
  packBottom,
}) => {
  const [tagInputState, setTagInputState] = React.useState(TagInputState.EMPTY);
  const [isFocused, setFocused] = React.useState(false);
  const spanRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (spanRef.current) {
      resetInputState(spanRef.current);
      setTagInputState(TagInputState.EMPTY);
    }
  }, [tags]);

  return (
    <>
      <div className={classnames("container", { editable })}>
        <div
          className={classnames("suggestions-container how-to", {
            visible: isFocused && tags.length == 0 && TagInputState.EMPTY,
          })}
        >
          Start a tag with <strong>!</strong> to make it searchable,{" "}
          <strong>+</strong> for a filterable category, or <strong>cn</strong>{" "}
          for content notices. Tags are separated by new line.
        </div>
        <div
          className={classnames(
            "suggestions-container categories-suggestions",
            {
              visible:
                isFocused &&
                suggestedCategories &&
                suggestedCategories.length > 0 &&
                tagInputState == TagInputState.CATEGORY,
            }
          )}
        >
          {suggestedCategories?.map((category) => (
            <button
              key={category}
              className={classnames("tag-container")}
              // We use mouse down rather than on click because this runs
              // before the blur event.
              onMouseDown={(e) => {
                onTagsAdd?.({
                  name: category,
                  accentColor: "white",
                  category: true,
                  type: TagType.CATEGORY,
                });
                e.preventDefault();
              }}
            >
              {TagsFactory.create({
                name: category,
                accentColor: "white",
                category: true,
                type: TagType.CATEGORY,
              })}
            </button>
          ))}
        </div>
        <TagsDisplay
          editable={editable}
          tags={tags}
          deleting={tagInputState == TagInputState.DELETE}
          getOptionsForTag={getOptionsForTag}
          packBottom={packBottom}
          onTagsDelete={onTagsDelete}
        />
        {!!editable && (
          <span
            className={classnames("tag-input", {
              indexable: tagInputState == TagInputState.INDEXABLE,
              category: tagInputState == TagInputState.CATEGORY,
              "content-warning": tagInputState == TagInputState.CONTENT_NOTICE,
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
                if (tagInputState != TagInputState.DELETE) {
                  log(`Entering delete state for previous tag`);
                  setTagInputState(TagInputState.DELETE);
                  return;
                }
                log(`Deleting previous tag`);
                setTagInputState(TagInputState.EMPTY);
                onTagsDelete?.(tags[tags.length - 1]);
                return;
              }
              if (tagInputState == TagInputState.DELETE) {
                setTagInputState(TagInputState.EMPTY);
              }
              // TODO: move this to tag utils
              const currentTag = extractSanitizedTag(inputValue);
              const isSubmittable = TagsFactory.isTagValid(currentTag);
              if (isSubmitAttempt) {
                log(`Submitting with current tag ${inputValue}`);
                if (isSubmittable) {
                  log(`Adding tag before submission: ${currentTag}`);
                  onTagsAdd?.(TagsFactory.getTagDataFromString(currentTag));
                }
                onSubmit?.(
                  isSubmittable
                    ? TagsFactory.getTagDataFromString(currentTag)
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
                onTagsAdd?.(TagsFactory.getTagDataFromString(currentTag));
                if (spanRef.current) {
                  // Remove inner text here so it doesn't trigger flickering.
                  spanRef.current.textContent = "";
                }
              }
            }}
            onBeforeInput={(e) => {
              const target = e.target as HTMLSpanElement;
              const inputValue = target.textContent || "";
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
              const text = extractSanitizedTag(
                e.clipboardData.getData("text/plain")
              );
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
              const currentTag = extractSanitizedTag(
                spanRef.current.textContent
              );
              const isSubmittable = TagsFactory.isTagValid(currentTag);
              if (isSubmittable) {
                onTagsAdd?.(TagsFactory.getTagDataFromString(currentTag));
              }
              resetInputState(spanRef.current, true);
              setTagInputState(TagInputState.EMPTY);
            }}
            onKeyUp={(e) => {
              const target = e.target as HTMLSpanElement;
              if (target.textContent?.trim().length == 0) {
                if (tagInputState != TagInputState.DELETE) {
                  setTagInputState(TagInputState.EMPTY);
                }
                return;
              }
              const currentTag = TagsFactory.getTagDataFromString(
                extractSanitizedTag(target.textContent)
              );
              if (target.getBoundingClientRect().height > HEIGHT_TRIGGER) {
                log(`Multiline detected. Switching to full line.`);
                target.style.width = "100%";
                target.style.flex = "auto";
              }
              log(`Current tag type: ${currentTag.type}`);
              switch (currentTag.type) {
                case TagType.INDEXABLE:
                  setTagInputState(TagInputState.INDEXABLE);
                  return;
                case TagType.CATEGORY:
                  setTagInputState(TagInputState.CATEGORY);
                  return;
                case TagType.CONTENT_WARNING:
                  setTagInputState(TagInputState.CONTENT_NOTICE);
                  return;
                case TagType.WHISPER:
                default:
                  setTagInputState(TagInputState.WHISPER);
              }
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
  onTagClick?: (clickedTag: TagsType) => void;
  editable?: boolean;
  onSubmit?: (newTag?: TagsType) => void;
  accentColor?: string;
  suggestedCategories?: string[];
  getOptionsForTag?: (tag: TagsType) => DropdownProps["options"];
  // Make the tags be packed on the bottom of the display, so single
  // item lines are at the top.
  packBottom?: boolean;
}
