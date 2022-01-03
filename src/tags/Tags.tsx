import TagInput, { TagInputRef } from "./TagInput";
import { TagType, TagsType } from "../types";
import TagsFactory, {
  CATEGORY_PREFIX,
  CONTENT_NOTICE_DEFAULT_PREFIX,
  INDEXABLE_PREFIX,
} from "./TagsFactory";

import DefaultTheme from "../theme/default";
import { DropdownProps } from "../common/DropdownListMenu";
import React from "react";
import TagSuggestions from "./TagSuggestions";
import TagsDisplay from "./TagsDisplay";
import classnames from "classnames";
import color from "color";
import debug from "debug";

const log = debug("bobaui:tagsinput-log");

enum TagInputState {
  CONTENT_NOTICE = "CONTENT_NOTICE",
  INDEXABLE = "INDEXABLE",
  CATEGORY = "CATEGORY",
  WHISPER = "WHISPER",
  EMPTY = "EMPTY",
  DELETE = "DELETE",
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

const getInputMessage = ({
  tagInputState,
  currentTag,
  isFocused,
}: {
  tagInputState: TagInputState;
  currentTag: string | null;
  isFocused: boolean;
}) => {
  if (!isFocused) {
    return "Add a tag...";
  }
  if (tagInputState == TagInputState.EMPTY || !currentTag?.length) {
    return (
      <>
        Try prefixing tags with <strong>{INDEXABLE_PREFIX}</strong>,{" "}
        <strong>{CONTENT_NOTICE_DEFAULT_PREFIX}</strong>, or{" "}
        <strong>{CATEGORY_PREFIX}</strong>. Enter to submit.
      </>
    );
  }
  if (currentTag.length == 1 && tagInputState == TagInputState.CATEGORY) {
    return `${currentTag} category tags can be used to filter posts across threads or boards.`;
  }
  // TODO: this needs to account for all the possible lengths of CN prefixes.
  if (currentTag.length == 3 && tagInputState == TagInputState.CONTENT_NOTICE) {
    return `${currentTag} content notices can help others avoid sensitive topics.`;
  }

  // TODO: this needs to account for all the possible lengths of CN prefixes.
  if (currentTag.length == 1 && tagInputState == TagInputState.INDEXABLE) {
    return `${currentTag} index tags can be searched across the realm.`;
  }
  return "";
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
  const [currentTag, setCurrentTag] = React.useState<string | null>(null);
  const [isFocused, setFocused] = React.useState(false);
  const [isPromptingDelete, setPromptingDelete] = React.useState(false);
  const inputRef = React.useRef<TagInputRef>(null);

  const showCategoriesHint =
    isFocused &&
    suggestedCategories &&
    suggestedCategories.length > 0 &&
    tagInputState == TagInputState.CATEGORY;
  return (
    <>
      <div className={classnames("container", { editable })}>
        {showCategoriesHint && (
          <div className={classnames("suggestions-container")}>
            <TagSuggestions
              type={TagType.CATEGORY}
              description={
                <>
                  <strong>Category tags</strong> can be used to filter posts
                  across threads or boards.
                </>
              }
              tags={suggestedCategories}
              onSelectTag={(tag) => {
                onTagsAdd?.({
                  name: tag,
                  accentColor: "white",
                  category: true,
                  type: TagType.CATEGORY,
                });
                setTagInputState(TagInputState.EMPTY);
                inputRef.current?.clear();
              }}
            />
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
            ref={inputRef}
            onFocusChange={(focused) => {
              setFocused(focused);
              if (!focused) {
                setTagInputState(TagInputState.EMPTY);
              }
            }}
            onTagChange={(value) => {
              setPromptingDelete(false);
              setCurrentTag(value);
              const currentTag = TagsFactory.getTagDataFromString(value);
              if (value.length == 0 && currentTag.type == TagType.WHISPER) {
                setTagInputState(TagInputState.EMPTY);
                return;
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
            {getInputMessage({
              tagInputState,
              currentTag,
              isFocused,
            })}
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
        .extra {
          border-right: 1px solid rgb(210, 210, 210);
          margin-top: 5px;
          padding-right: 5px;
          margin-right: 5px;
        }

        .suggestions-container {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          transform: translateY(-100%);
          padding: 10px 12px 7px;
          box-shadow: 0 0 0 1px #d2d2d2;
          border-radius: 10px 10px 0 0;
          background-color: white;
          font-size: 14px;
          color: rgb(87, 87, 87);
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
