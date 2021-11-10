import TagsFilter, { FilteredTagsState } from "../tags/TagsFilter";

import React from "react";
import { TagType } from "../types";
import classnames from "classnames";
import debug from "debug";
import noop from "noop-ts";

// @ts-ignore
const log = debug("bobaui:boards:CategoryFilterSection");

const TagsFilterSection: React.FC<TagsFilterSectionProps> & {
  FilteredTagsState: typeof FilteredTagsState;
} = (props) => {
  const {
    uncategorized,
    onUncategorizedStateChangeRequest,
  } = props as DisplayTagsFilterSectionProps;

  return (
    <div
      className={classnames("sidebar-section", { editable: props.editable })}
    >
      <div className="description">
        {props.editable && <div className="content-title">Categories</div>}
        <div
          className={classnames("content-categories", {
            editable: props.editable,
          })}
        >
          <TagsFilter
            editable={!!props.editable}
            tags={
              !props.editable
                ? props.tags
                : props.tags?.map((c) => ({
                    name: c.name,
                    state: FilteredTagsState.ACTIVE,
                  }))
            }
            onTagStateChangeRequest={(updatedTag) => {
              if (props.editable) {
                return;
              }
              props.onTagsStateChangeRequest(updatedTag.name);
            }}
            onTagsChange={props.editable ? props.onTagsChange : noop}
            type={props.type}
            uncategorized={uncategorized}
            onUncategorizedStateChangeRequest={
              onUncategorizedStateChangeRequest
            }
          />
        </div>
      </div>
      <style jsx>{`
        .content-title {
          font-size: var(--font-size-large);
          color: white;
        }
        .title {
          font-weight: bold;
          font-size: var(--font-size-regular);
          margin-bottom: 10px;
        }
        .title-container {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .sidebar-section {
          color: white;
        }
        .add-category {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

TagsFilterSection.FilteredTagsState = FilteredTagsState;

export interface DisplayTagsFilterSectionProps {
  tags: { name: string; state: FilteredTagsState }[];
  editable?: false;
  type: TagType;
  onTagsStateChangeRequest: (name: string) => void;
  onClearFilterRequests: () => void;
  uncategorized?: FilteredTagsState;
  onUncategorizedStateChangeRequest?: (state: FilteredTagsState) => void;
}

export interface EditableTagsFilterSectionProps {
  tags: { name: string; state?: FilteredTagsState }[];
  editable: true;
  type: TagType;
  uncategorized?: FilteredTagsState;
  onTagsChange: (tags: { name: string }[]) => void;
}

export type TagsFilterSectionProps =
  | DisplayTagsFilterSectionProps
  | EditableTagsFilterSectionProps;

export default TagsFilterSection;
