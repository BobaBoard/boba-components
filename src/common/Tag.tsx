import React from "react";
import classnames from "classnames";
import Theme from "../theme/default";
import { TagsType } from "../types";

export interface TagProps {
  name: string;
  symbol?: string | JSX.Element;
  avatar?: string;
  color?: string;
  highlightColor?: string;
  compact?: boolean;
}

const Tag: React.FC<TagProps> = (props) => {
  return (
    <>
      <div className={classnames("tag", { compact: !!props.compact })}>
        <span className="hashtag">{props.symbol || "#"}</span>
        {props.name}
      </div>
      <style jsx>{`
        .hashtag {
          opacity: 0.6;
          margin-right: 2px;
        }
        .tag {
          display: inline-block;
          padding: 5px 10px;
          border: 3px ${props.highlightColor || "black"} solid;
          border-radius: 10px;
          background-color: ${props.color};
          font-weight: bold;
          color: ${props.highlightColor || "black"};
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .tag.compact {
          border: 0px;
          font-size: smaller;
          padding: 3px 6px;
          font-weight: normal;
        }
      `}</style>
    </>
  );
};

export default Tag;

export const INDEXABLE_PREFIX = "!";
export const CATEGORY_PREFIX = "+";
export const CONTENT_WARNING_PREFIX = "cw:";

export const INDEXABLE_TAG_COLOR = Theme.DEFAULT_ACCENT_COLOR;
export const CATEGORY_TAG_COLOR = "#2ea5ff";
export const CW_TAG_COLOR = "#fbdd18";

const getDataForTagType = (tag: TagsType) => {
  if (tag.indexable) {
    return {
      symbol: INDEXABLE_PREFIX,
      color: INDEXABLE_TAG_COLOR,
    };
  } else if (tag.category) {
    return {
      symbol: CATEGORY_PREFIX,
      color: CATEGORY_TAG_COLOR,
    };
  } else if (tag.contentWarning) {
    return {
      symbol: CONTENT_WARNING_PREFIX,
      color: CW_TAG_COLOR,
    };
  } else {
    return {
      symbol: undefined,
      color: undefined,
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
        symbol={tagData.symbol}
      />
    );
  }

  static getTagsFromTagObject(tagsObject: {
    contentWarnings: string[];
    categoryTags: string[];
    whisperTags: string[];
    indexTags: string[];
  }) {
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

  static getTypeFromString(tag: string, accentColor?: string): TagsType {
    if (tag.startsWith(INDEXABLE_PREFIX)) {
      return {
        name: tag.substring(INDEXABLE_PREFIX.length),
        color: accentColor || INDEXABLE_TAG_COLOR,
        indexable: true,
      };
    } else if (tag.startsWith(CATEGORY_PREFIX)) {
      return {
        name: tag.substring(CATEGORY_PREFIX.length),
        category: true,
      };
    } else if (tag.startsWith(CONTENT_WARNING_PREFIX)) {
      return {
        name: tag.substring(CONTENT_WARNING_PREFIX.length).trim(),
        contentWarning: true,
      };
    } else {
      return {
        name: tag,
      };
    }
  }
}
