import React from "react";
import classnames from "classnames";
import { TagsType, TagType } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export interface TagProps {
  name: string;
  deletable?: false;
  symbol?: string | JSX.Element;
  avatar?: string;
  color?: string;
  accentColor?: string;
  compact?: boolean;
}

export interface DeleatableTagProps {
  name: string;
  deletable: true;
  onDeleteTag: (name: string) => void;
  symbol?: string | JSX.Element;
  avatar?: string;
  color?: string;
  accentColor?: string;
  compact?: boolean;
}

const Tag: React.FC<TagProps | DeleatableTagProps> = (props) => {
  return (
    <>
      <div
        className={classnames("tag", {
          compact: !!props.compact,
          text: !props.color,
          deletable: !!props.deletable,
        })}
      >
        <span className="hashtag">{props.symbol || "#"}</span>
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
          opacity: 0.6;
          margin-right: 2px;
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

        .deletable > .delete:focus > :global(svg) {
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

export const INDEXABLE_PREFIX = "!";
export const CATEGORY_PREFIX = "+";
export const CONTENT_WARNING_PREFIX = "cw:";

export const INDEXABLE_TAG_COLOR = "#FF5A13";
export const CATEGORY_TAG_COLOR = "#138EFF";
export const CW_TAG_COLOR = "#FFC700";

export const getDataForTagType = (tag: TagsType) => {
  if (tag.indexable) {
    return {
      symbol: INDEXABLE_PREFIX,
      color: INDEXABLE_TAG_COLOR,
      type: TagType.INDEXABLE,
      accentColor: "white",
    };
  } else if (tag.category) {
    return {
      symbol: CATEGORY_PREFIX,
      color: CATEGORY_TAG_COLOR,
      type: TagType.CATEGORY,
      accentColor: "white",
    };
  } else if (tag.contentWarning) {
    return {
      symbol: CONTENT_WARNING_PREFIX,
      color: CW_TAG_COLOR,
      type: TagType.CONTENT_WARNING,
    };
  } else {
    return {
      symbol: undefined,
      color: undefined,
      type: TagType.WHISPER,
    };
  }
};

export class TagsFactory {
  static create(tag: TagsType) {
    const tagData = getDataForTagType(tag);

    return (
      <Tag
        name={tag.name}
        compact
        color={tag.color || tagData.color}
        accentColor={tag.accentColor}
        symbol={tagData.symbol}
      />
    );
  }

  static getTagsFromTagObject(tagsObject?: {
    contentWarnings: string[];
    categoryTags: string[];
    whisperTags: string[];
    indexTags: string[];
  }) {
    if (!tagsObject) {
      return [];
    }
    const indexableTags =
      tagsObject.indexTags?.map((tag) =>
        TagsFactory.getTypeFromString(INDEXABLE_PREFIX + tag)
      ) || [];
    const categoryTags =
      tagsObject.categoryTags?.map((tag) =>
        TagsFactory.getTypeFromString(CATEGORY_PREFIX + tag)
      ) || [];
    const contentWarnings =
      tagsObject.contentWarnings?.map((tag) =>
        TagsFactory.getTypeFromString(CONTENT_WARNING_PREFIX + tag)
      ) || [];
    const whisperTags =
      tagsObject.whisperTags?.map((tag) =>
        TagsFactory.getTypeFromString(tag)
      ) || [];

    return [
      ...indexableTags,
      ...categoryTags,
      ...contentWarnings,
      ...whisperTags,
    ];
  }

  static orderTags(tags: TagsType[]) {
    const indexableTags = tags.filter((tag) => tag.indexable);
    const categoryTags = tags.filter((tag) => tag.category);
    const contentWarnings = tags.filter((tag) => tag.contentWarning);
    const whisperTags = tags.filter(
      (tag) => !tag.category && !tag.indexable && !tag.contentWarning
    );

    return [
      ...indexableTags,
      ...categoryTags,
      ...contentWarnings,
      ...whisperTags,
    ];
  }

  // Turn tag type into a enum and refactor everything, honestly.
  static getTypeFromString(tag: string, accentColor?: string): TagsType {
    if (tag.startsWith(INDEXABLE_PREFIX)) {
      return {
        name: tag.substring(INDEXABLE_PREFIX.length),
        color: accentColor || INDEXABLE_TAG_COLOR,
        accentColor: "white",
        indexable: true,
        type: TagType.INDEXABLE,
      };
    } else if (tag.startsWith(CATEGORY_PREFIX)) {
      return {
        name: tag.substring(CATEGORY_PREFIX.length),
        accentColor: "white",
        category: true,
        type: TagType.CATEGORY,
      };
    } else if (tag.startsWith(CONTENT_WARNING_PREFIX)) {
      return {
        name: tag.substring(CONTENT_WARNING_PREFIX.length).trim(),
        contentWarning: true,
        type: TagType.CONTENT_WARNING,
      };
    } else {
      return {
        name: tag,
        type: TagType.WHISPER,
      };
    }
  }
}
