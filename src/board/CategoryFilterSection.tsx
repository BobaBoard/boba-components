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
  return (
    <div
      className={classnames("sidebar-section", { editable: props.editable })}
    >
      <div className="title">
        {props.editable ? (
          <Input
            id="title"
            label="title"
            value={props.title}
            onTextChange={props.onTitleChange || noop}
            theme={InputStyle.DARK}
            disabled={!props.editable}
          />
        ) : (
          <div className="title">{props.title}</div>
        )}
      </div>
      <div className="description">
        {props.editable && <div className="content-title">Categories</div>}
        <div className="content-categories">
          <CategoryFilter
            categories={props.categories}
            onCategoryStateChange={props.onCategoryStateChange}
          />
        </div>
        {props.editable && (
          <div>
            <Input
              id="category"
              label="New Category"
              value={newCategory}
              onTextChange={setNewCategory}
              theme={InputStyle.DARK}
            />
            <Button
              onClick={() => {
                props.onCategoriesChange?.([
                  ...props.categories.map((c) => c.name),
                  newCategory,
                ]);
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
        .sidebar-section {
          color: white;
        }
        .content-categories {
          background-color: #2f2f30;
        }
      `}</style>
    </div>
  );
};

export interface CategoryFilterSectionProps {
  title: string;
  categories: {
    name: string;
    active: boolean;
  }[];
  editable: boolean;
  onTitleChange?: (title: string) => void;
  onCategoriesChange?: (categories: string[]) => void;
  onCategoryStateChange: (name: string, active: boolean) => void;
}

export default CategoryFilterSection;
