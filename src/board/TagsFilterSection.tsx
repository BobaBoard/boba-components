import React from "react";

import classnames from "classnames";
import Input, { InputStyle } from "../common/Input";
import Button from "../buttons/Button";

import debug from "debug";
import TagsFilter, { FilteredTagsState } from "../tags/TagsFilter";
import { TagType } from "types";
// @ts-ignore
const log = debug("bobaui:boards:CategoryFilterSection");

const TagsFilterSection: React.FC<TagsFilterSectionProps> = (props) => {
  const [newCategory, setNewCategory] = React.useState("");

  const { onUncategorizedStateChangeRequest = undefined } =
    "uncategorized" in props ? props : {};
  const onUncategorizedStateChangeRequestCallback = React.useCallback(
    (state: FilteredTagsState) => {
      onUncategorizedStateChangeRequest?.(state == FilteredTagsState.ACTIVE);
    },
    [onUncategorizedStateChangeRequest]
  );

  const allCategoriesActive =
    props.editable ||
    (!props.tags.some((category) => !category.active) &&
      props.uncategorized !== false);
  return (
    <div
      className={classnames("sidebar-section", { editable: props.editable })}
    >
      <div className="title-container">
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
      </div>
      <div className="description">
        {props.editable && <div className="content-title">Categories</div>}
        <div
          className={classnames("content-categories", {
            editable: props.editable,
          })}
        >
          <TagsFilter
            tags={
              !props.editable
                ? props.tags.map((c) => ({
                    name: c.name,
                    state: c.active
                      ? FilteredTagsState.ACTIVE
                      : FilteredTagsState.DISABLED,
                  }))
                : props.tags?.map((c) => ({
                    name: c,
                    state: FilteredTagsState.ACTIVE,
                  }))
            }
            onTagStateChangeRequest={(updatedTag) => {
              if (props.editable) {
                return;
              }
              props.onTagsStateChangeRequest(updatedTag.name);
            }}
            type={props.type}
            uncategorized={
              "uncategorized" in props
                ? props.uncategorized
                  ? FilteredTagsState.ACTIVE
                  : FilteredTagsState.DISABLED
                : undefined
            }
            onUncategorizedStateChangeRequest={
              "uncategorized" in props
                ? onUncategorizedStateChangeRequestCallback
                : undefined
            }
          />
        </div>
        {props.editable && (
          <div className={"add-category"}>
            <Input
              key="new"
              id="category"
              label="New Category"
              value={newCategory}
              onTextChange={setNewCategory}
              theme={InputStyle.DARK}
            />
            <Button
              onClick={() => {
                props.onTagsChange?.([...props.tags, newCategory]);
                setNewCategory("");
              }}
            >
              Add New
            </Button>
          </div>
        )}
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
  title: string;
  tags: { name: string; active: boolean }[];
  editable?: false;
  type: TagType;
  onTagsStateChangeRequest: (name: string) => void;
  onClearFilterRequests: () => void;
  uncategorized?: boolean;
  onUncategorizedStateChangeRequest?: (state: boolean) => void;
}

export interface EditableCategoryFilterSectionProps {
  title: string;
  tags: string[];
  editable: true;
  type: TagType;
  onTitleChange: (title: string) => void;
  onTagsChange: (tags: string[]) => void;
}

export type TagsFilterSectionProps =
  | DisplayCategoryFilterSectionProps
  | EditableCategoryFilterSectionProps;

export default TagsFilterSection;
