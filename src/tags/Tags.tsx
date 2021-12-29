import { TagType, TagsType } from "../types";
import TagsFactory, {
  CATEGORY_PREFIX,
  CONTENT_NOTICE_DEFAULT_PREFIX,
  INDEXABLE_PREFIX,
} from "./TagsFactory";

import DefaultTheme from "../theme/default";
import { DropdownProps } from "../common/DropdownListMenu";
import React from "react";
import TagInput from "./TagInput";
import TagsDisplay from "./TagsDisplay";
import classnames from "classnames";
import color from "color";
import debug from "debug";

const log = debug("bobaui:tagsinput-log");

enum TagInputState {
  CONTENT_NOTICE,
  INDEXABLE,
  CATEGORY,
  WHISPER,
  EMPTY,
  DELETE,
}

const getHighlightVariable = (inputState: TagInputState) => {
  let highlighColor = "#898989";
  switch (inputState) {
    case TagInputState.CONTENT_NOTICE: {
      highlighColor = DefaultTheme.CONTENT_NOTICE_COLOR;
      break;
    }
    case TagInputState.CATEGORY: {
      highlighColor = DefaultTheme.CATEGORY_FILTER_COLOR;
      break;
    }
    case TagInputState.INDEXABLE: {
      highlighColor = DefaultTheme.INDEX_TAG_COLOR;
      break;
    }
  }
  return color(highlighColor).rgb().array().join(", ");
};

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsAdd,
  onTagsDelete,
  editable,
  suggestedCategories,
  getOptionsForTag,
  packBottom,
  children,
}) => {
  const [tagInputState, setTagInputState] = React.useState(TagInputState.EMPTY);
  const [isFocused, setFocused] = React.useState(false);
  const [isPromptingDelete, setPromptingDelete] = React.useState(false);

  const showTagsHint =
    isFocused && tags.length == 0 && tagInputState == TagInputState.EMPTY;
  const showCategoriesHint =
    isFocused &&
    suggestedCategories &&
    suggestedCategories.length > 0 &&
    tagInputState == TagInputState.CATEGORY;
  return (
    <>
      <div className={classnames("container", { editable })}>
        {/* {showTagsHint && (
          <div className={classnames("suggestions-container how-to")}>
            Start a tag with <strong>{INDEXABLE_PREFIX}</strong> to make it
            searchable, <strong>{CATEGORY_PREFIX}</strong> for a filterable
            category, or <strong>{CONTENT_NOTICE_DEFAULT_PREFIX}</strong> for
            content notices. Tags are separated by new line.
          </div>
        )} */}
        {showCategoriesHint && (
          <div
            className={classnames(
              "suggestions-container categories-suggestions"
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
        )}
        {children && <div className="extra">{children}</div>}
        <TagsDisplay
          editable={editable}
          tags={tags}
          deleting={isPromptingDelete}
          getOptionsForTag={getOptionsForTag}
          packBottom={packBottom}
          onTagsDelete={onTagsDelete}
        />
        {!!editable && (
          <TagInput
            onFocusChange={(focused) => {
              setFocused(focused);
              if (!focused) {
                setTagInputState(TagInputState.EMPTY);
              }
            }}
            onTagChange={(value) => {
              setPromptingDelete(false);
              const currentTag = TagsFactory.getTagDataFromString(value);
              console.log(currentTag);
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
            onTagSubmit={(value) => {
              onTagsAdd?.(TagsFactory.getTagDataFromString(value));
            }}
            onDeletePrevious={() => {
              if (isPromptingDelete) {
                onTagsDelete?.(tags[tags.length - 1]);
                setPromptingDelete(false);
              } else {
                setPromptingDelete(true);
              }
            }}
          >
            Add a tag! Try starting one with <strong>{INDEXABLE_PREFIX}</strong>
            , <strong>{CONTENT_NOTICE_DEFAULT_PREFIX}</strong>, or{" "}
            <strong>{CATEGORY_PREFIX}</strong>.
          </TagInput>
        )}
      </div>
      <style jsx>{`
        .container {
          --highlight-color: ${getHighlightVariable(tagInputState)};
        }
      `}</style>
      <style jsx>{`
        .container {
          padding-bottom: 5px;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          box-sizing: border-box;
          pointer-events: all;
        }
        .tag-container {
          margin: 5px 5px 0 0;
          align-items: center;
          word-break: break-word;
          display: inline-flex;
          position: relative;
          border: 0;
          background: none;
          padding: 0;
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
          color: rgb(87, 87, 87);
        }
        .categories-suggestions .tag-container {
          margin-top: 3px;
          margin-bottom: 3px;
          margin-right: 10px;
        }
        .categories-suggestions .tag-container:hover {
          cursor: pointer;
        }
        .extra {
          border-right: 1px solid rgb(210, 210, 210);
          margin-top: 5px;
          padding-right: 5px;
          margin-right: 5px;
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
  suggestedCategories?: string[];
  getOptionsForTag?: (tag: TagsType) => DropdownProps["options"];
  // Make the tags be packed on the bottom of the display, so single
  // item lines are at the top.
  packBottom?: boolean;
  children?: React.ReactNode;
}
