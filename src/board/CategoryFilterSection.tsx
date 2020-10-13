import React from "react";

import classnames from "classnames";
import Input, { InputStyle } from "../common/Input";
import CategoryFilter from "../common/CategoryFilter";
import Button from "../common/Button";

import debug from "debug";
// @ts-ignore
const log = debug("bobaui:boards:CategoryFilterSection");

const CategoryFilterSection: React.FC<CategoryFilterSectionProps> = (props) => {
  const [newCategory, setNewCategory] = React.useState("");

  const allCategoriesActive =
    props.editable || !props.categories.some((category) => !category.active);
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
            <a
              className={classnames("clear-filters", {
                visible: !allCategoriesActive,
              })}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.onClearFilterRequests();
              }}
            >
              Clear filters
            </a>
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
          <CategoryFilter
            categories={
              !props.editable
                ? props.categories
                : props.categories?.map((c) => ({ name: c, active: true }))
            }
            onCategoryStateChangeRequest={(updatedCategory) => {
              if (props.editable) {
                return;
              }
              props.onCategoryStateChangeRequest(updatedCategory);
            }}
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
                props.onCategoriesChange?.([...props.categories, newCategory]);
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
          font-size: large;
          color: white;
        }
        .title {
          font-weight: bold;
          font-size: 16px;
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
          font-size: smaller;
          display: block;
          margin-top: 5px;
          visibility: hidden;
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
  categories: { name: string; active: boolean }[];
  editable?: false;
  onCategoryStateChangeRequest: (name: string) => void;
  onClearFilterRequests: () => void;
}

export interface EditableCategoryFilterSectionProps {
  title: string;
  categories: string[];
  editable: true;
  onTitleChange: (title: string) => void;
  onCategoriesChange: (categories: string[]) => void;
}

export type CategoryFilterSectionProps =
  | DisplayCategoryFilterSectionProps
  | EditableCategoryFilterSectionProps;

export default CategoryFilterSection;
