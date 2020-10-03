import React from "react";

import classnames from "classnames";
import Input, { InputStyle } from "../common/Input";
import CategoryFilter from "../common/CategoryFilter";
import Button from "../common/Button";
import noop from "noop-ts";

import debug from "debug";
// @ts-ignore
const log = debug("bobaui:boards:CategoryFilterSection");

const CategoryFilterSection: React.FC<CategoryFilterSectionProps> = (props) => {
  const [newCategory, setNewCategory] = React.useState("");
  const [filteredCategory, setFilteredCategory] = React.useState<string | null>(
    null
  );
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
                visible: filteredCategory != null,
              })}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setFilteredCategory(null);
                props.onCategoriesStateChange(
                  props.categories.map((category) => {
                    return {
                      category,
                      active: true,
                    };
                  }) || []
                );
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
              props.categories?.map((c) => ({
                name: c,
                active: filteredCategory === null || filteredCategory === c,
              })) || []
            }
            onCategoryStateChange={noop}
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
          margin: 5px 0;
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
  categories: string[];
  editable?: false;
  onCategoriesStateChange: (
    categories: { category: string; active: boolean }[]
  ) => void;
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
