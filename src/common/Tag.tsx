import React from "react";
import classnames from "classnames";
import { TagLists, TagsType, TagType } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export interface TagProps {
  name: string;
  deletable?: false;
  symbol?: string | JSX.Element;
  color?: string;
  accentColor?: string;
  compact?: boolean;
}

export interface DeletableTagProps {
  name: string;
  deletable: true;
  onDeleteTag: (name: string) => void;
  symbol?: string | JSX.Element;
  color?: string;
  accentColor?: string;
  compact?: boolean;
}

const Tag: React.FC<TagProps | DeletableTagProps> = (props) => {
  return (
    <>
      <div
        className={classnames("tag", {
          compact: !!props.compact,
          text: !props.color,
          deletable: !!props.deletable,
        })}
      >
        <span className="hashtag">{props.symbol ?? "#"}</span>
        {props.name}
        {props.deletable && (
          <button
            onClick={() => props.onDeleteTag?.(props.name)}
            className={classnames("delete")}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </div>
      <style jsx>{`
        .hashtag {
          opacity: 0.4;
          margin-right: 4px;
          flex-shrink: 0;
          align-self: center;
          display: inline-flex;
        }
        .tag {
          padding: 5px 8px 5px 8px;
          border-radius: 13px;
          background-color: ${props.color};
          color: ${props.accentColor || "black"};
          overflow-wrap: break-word;
          word-break: break-word;
          position: relative;
        }
        .tag.deletable {
          display: flex;
          padding-right: 25px;
        }
        .tag.text {
          display: inline;
        }
        .tag.text .hashtag {
          float: left;
          display: inline;
          margin-left: 2px;
          margin-right: 3px;
        }
        .tag.text .hashtag :global(svg) {
          margin-top: 1px;
          height: 12px;
        }
        .delete {
          display: none;
        }

        .deletable > .delete {
          display: block;
          position: absolute;
          right: 0;
          padding: 6px;
          top: 0;
          bottom: 0;
          color: inherit;
          opacity: 0.6;
        }

        .deletable > .delete:hover {
          opacity: 1;
        }

        .deletable > .delete:active,
        .deletable > .delete:focus {
          outline: 0;
        }

        .deletable > .delete:focus-visible > :global(svg) {
          box-shadow: 0 0 0 4px blue;
          border-radius: 50%;
        }

        .deletable > .delete > :global(svg) {
          display: block;
          width: 13px;
          height: 13px;
          margin: auto;
        }

        :global(.editable) .tag.text {
          background-color: rgba(47, 47, 48, 0.15);
          padding: 5px 25px 5px 8px;
        }

        :global(.editable) .deletable.tag.text > .delete {
          color: #4d4d4d;
        }

        button {
          border-width: 0;
          background-color: transparent;
          padding: 0;
        }
        button:hover {
          cursor: pointer;
        }
        .tag.compact {
          font-size: smaller;
        }
        .tag.text {
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default Tag;

export const INDEXABLE_PREFIX = "#";
export const CATEGORY_PREFIX = "+";
export const BOARD_PREFIX = "!";
export const CONTENT_NOTICE_DEFAULT_PREFIX = "cn:";
export const CONTENT_NOTICE_PREFIXES = [
  CONTENT_NOTICE_DEFAULT_PREFIX,
  "cw:",
  "sq:",
  "squick:",
];
export const WHISPER_PREFIX = "»";

export const INDEXABLE_TAG_COLOR = "#FF5A13";
export const CATEGORY_TAG_COLOR = "#138EFF";
export const CW_TAG_COLOR = "#FFC700";
export const BOARD_DEFAULT_TAG_COLOR = "#f96680";

export const getDataForTagType = (tag: TagsType) => {
  if (tag.indexable || tag.type == TagType.INDEXABLE) {
    return {
      symbol: INDEXABLE_PREFIX,
      color: INDEXABLE_TAG_COLOR,
      type: TagType.INDEXABLE,
      accentColor: "white",
    };
  } else if (tag.category || tag.type == TagType.CATEGORY) {
    return {
      symbol: CATEGORY_PREFIX,
      color: CATEGORY_TAG_COLOR,
      type: TagType.CATEGORY,
      accentColor: "white",
    };
  } else if (tag.contentWarning || tag.type == TagType.CONTENT_WARNING) {
    return {
      symbol: CONTENT_NOTICE_DEFAULT_PREFIX,
      color: CW_TAG_COLOR,
      type: TagType.CONTENT_WARNING,
    };
  } else if (tag.type == TagType.BOARD) {
    return {
      symbol: BOARD_PREFIX,
      color: tag.color || BOARD_DEFAULT_TAG_COLOR,
      type: TagType.BOARD,
    };
  } else {
    return {
      symbol: WHISPER_PREFIX,
      color: undefined,
      type: TagType.WHISPER,
    };
  }
};

export class TagsFactory {
  static create(tag: TagsType) {
    return <Tag {...TagsFactory.createProps(tag)} />;
  }

  static createProps(tag: TagsType) {
    const tagData = getDataForTagType(tag);

    return {
      name: tag.name,
      compact: true,
      color: tag.color || tagData.color,
      accentColor: tag.accentColor,
      symbol: tagData.symbol,
    };
  }

  static getTagsFromTagObject(tagsObject?: TagLists) {
    if (!tagsObject) {
      return [];
    }
    const boardTags =
      tagsObject.boardTags?.map((tag) =>
        TagsFactory.getTagDataFromString(BOARD_PREFIX + tag)
      ) || [];
    const indexableTags =
      tagsObject.indexTags?.map((tag) =>
        TagsFactory.getTagDataFromString(INDEXABLE_PREFIX + tag)
      ) || [];
    const categoryTags =
      tagsObject.categoryTags?.map((tag) =>
        TagsFactory.getTagDataFromString(CATEGORY_PREFIX + tag)
      ) || [];
    const contentWarnings =
      tagsObject.contentWarnings?.map((tag) =>
        TagsFactory.getTagDataFromString(CONTENT_NOTICE_DEFAULT_PREFIX + tag)
      ) || [];
    const whisperTags =
      tagsObject.whisperTags?.map((tag) =>
        TagsFactory.getTagDataFromString(tag)
      ) || [];

    return [
      ...boardTags,
      ...indexableTags,
      ...categoryTags,
      ...contentWarnings,
      ...whisperTags,
    ];
  }

  static orderTags(tags: TagsType[]) {
    const boardTags = tags.filter((tag) => tag.type == TagType.BOARD);
    const indexableTags = tags.filter((tag) => tag.indexable);
    const categoryTags = tags.filter((tag) => tag.category);
    const contentWarnings = tags.filter((tag) => tag.contentWarning);
    const whisperTags = tags.filter(
      (tag) => !tag.category && !tag.indexable && !tag.contentWarning
    );

    return [
      ...boardTags,
      ...indexableTags,
      ...categoryTags,
      ...contentWarnings,
      ...whisperTags,
    ];
  }

  static getTagDataFromString(tag: string, accentColor?: string): TagsType {
    const tagType = TagsFactory.getTagTypeFromString(tag);
    const lowerCaseTag = tag.toLowerCase().trim();
    if (tagType == TagType.INDEXABLE) {
      return {
        name: lowerCaseTag.substring(INDEXABLE_PREFIX.length).trim(),
        color: accentColor || INDEXABLE_TAG_COLOR,
        accentColor: "white",
        indexable: true,
        type: TagType.INDEXABLE,
      };
    } else if (tagType == TagType.CATEGORY) {
      return {
        name: tag.substring(CATEGORY_PREFIX.length).trim(),
        accentColor: "white",
        category: true,
        type: TagType.CATEGORY,
      };
    } else if (tagType == TagType.BOARD) {
      return {
        name: tag.substring(BOARD_PREFIX.length).trim(),
        color: accentColor || BOARD_DEFAULT_TAG_COLOR,
        type: TagType.BOARD,
      };
    } else if (tagType == TagType.CONTENT_WARNING) {
      const cwPrefix = CONTENT_NOTICE_PREFIXES.find((prefix) =>
        lowerCaseTag.startsWith(prefix)
      ) as string;
      return {
        name: lowerCaseTag.substring(cwPrefix.length).trim(),
        contentWarning: true,
        type: TagType.CONTENT_WARNING,
      };
    } else {
      return {
        name: (tag.trim().startsWith(WHISPER_PREFIX)
          ? tag.trim().substring(WHISPER_PREFIX.length)
          : tag
        ).trim(),
        type: TagType.WHISPER,
      };
    }
  }

  static getTagTypeFromString(tag: string) {
    const lowerCaseTag = tag.toLowerCase().trim();
    if (lowerCaseTag.startsWith(INDEXABLE_PREFIX)) {
      return TagType.INDEXABLE;
    } else if (lowerCaseTag.startsWith(CATEGORY_PREFIX)) {
      return TagType.CATEGORY;
    } else if (lowerCaseTag.startsWith(BOARD_PREFIX)) {
      return TagType.BOARD;
    } else if (
      CONTENT_NOTICE_PREFIXES.some((prefix) => lowerCaseTag.startsWith(prefix))
    ) {
      return TagType.CONTENT_WARNING;
    } else {
      return TagType.WHISPER;
    }
  }

  static isTagValid(tag: string) {
    const tagData = TagsFactory.getTagDataFromString(tag);
    return tagData.name !== "";
  }
}
