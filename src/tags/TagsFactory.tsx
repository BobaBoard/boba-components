import React from "react";

import { TagsType, TagType } from "../types";
import Tag from "./Tag";

export const INDEXABLE_PREFIX = "#";
export const CATEGORY_PREFIX = "+";
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

export default TagsFactory;
