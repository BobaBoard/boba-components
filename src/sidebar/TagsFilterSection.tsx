import TagsFilter, { FilteredTagsState } from "../tags/TagsFilter";

import React from "react";
import { TagType } from "../types";
import classnames from "classnames";
import debug from "debug";
import noop from "noop-ts";

// @ts-ignore
const log = debug("bobaui:boards:CategoryFilterSection");

const TagsFilterSection: React.FC<TagsFilterSectionProps> = (props) => {
  const {
    uncategorized,
    onUncategorizedStateChangeRequest,
  } = props as DisplayCategoryFilterSectionProps;
  const allCategoriesActive =
    props.editable ||
    (props.tags.every(
      (category) => category.state === FilteredTagsState.ACTIVE
    ) &&
      props.uncategorized !== FilteredTagsState.DISABLED);
  return (
    <div
      className={classnames("sidebar-section", { editable: props.editable })}
    >
      {/* <div className="title-container">
        {props.editable ? (
          <Input
            id="title"
            label="title"
            value={props.title}
            onTextChange={(title) => {
              props.onTitleChange?.(title);
            }}
            theme={InputStyle.DARK}
            disabled={!props.editable}
          />
        ) : (
          <>
            <div className="title">{props.title}</div>
            <button
              className={classnames("clear-filters", {
                visible: !allCategoriesActive,
              })}
              onClick={(e) => {
                e.preventDefault();
                props.onClearFilterRequests();
              }}
            >
              Clear filters
            </button>
          </>
        )}
      </div> */}
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
        .clear-filters {
          color: white;
          font-size: var(--font-size-small);
          display: block;
          margin-top: 5px;
          visibility: hidden;
          background-color: transparent;
          border: 0;
          text-decoration: underline;
        }
        .clear-filters:hover {
          cursor: pointer;
        }
        .clear-filters:focus {
          outline: none;
        }
        .clear-filters:focus-visible {
          outline: auto;
        }
        .clear-filters.visible {
          visibility: visible;
        }
        .add-category {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export interface DisplayCategoryFilterSectionProps {
  tags: { name: string; state: FilteredTagsState }[];
  editable?: false;
  type: TagType;
  onTagsStateChangeRequest: (name: string) => void;
  onClearFilterRequests: () => void;
  uncategorized?: FilteredTagsState;
  onUncategorizedStateChangeRequest?: (state: FilteredTagsState) => void;
}

export interface EditableCategoryFilterSectionProps {
  tags: { name: string }[];
  editable: true;
  type: TagType;
  onTagsChange: (tags: { name: string }[]) => void;
}

export type TagsFilterSectionProps =
  | DisplayCategoryFilterSectionProps
  | EditableCategoryFilterSectionProps;

export default TagsFilterSection;
