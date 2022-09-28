import DropdownListMenu, { DropdownProps } from "common/DropdownListMenu";
import { TagType, TagsType } from "types";

import React from "react";
import Tag from "./Tag";
import classnames from "classnames";
import { getDataForTagType } from "./TagsFactory";

export interface TagsDisplayProps {
  tags: TagsType[];
  onTagsDelete?: (deletedTag: TagsType) => void;
  editable?: boolean;
  getOptionsForTag?: (tag: TagsType) => DropdownProps["options"];
  // Make the tags be packed on the bottom of the display, so single
  // item lines are at the top.
  packBottom?: boolean;
  deleting: boolean;
}
const TagsDisplay: React.FC<TagsDisplayProps> = ({
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
  const maybeWrapInDiv = (
    component: React.ReactNode[],
    wrapClassName: string
  ) => {
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

export default TagsDisplay;
