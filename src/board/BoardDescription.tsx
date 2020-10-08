import React from "react";

import TextSection from "./TextSection";
import CategoryFilterSection from "./CategoryFilterSection";
import Button, { ButtonStyle } from "../common/Button";
import { faFont, faPlus, faTags } from "@fortawesome/free-solid-svg-icons";

import classnames from "classnames";

import debug from "debug";
import { DescriptionType } from "types";
// @ts-ignore
const log = debug("bobaui:boards:boardsDescription");

const getSection = (
  props: BoardDescriptionProps,
  description?: BoardDescriptionProps["descriptions"][0]
) => {
  if (!description) {
    return <></>;
  }
  switch (description.type) {
    case "text":
      return props.editing ? (
        <TextSection
          key={description.id}
          title={description.title}
          description={description.description}
          editable={true}
          onTitleChange={(title) => {
            props.onDescriptionChange({ ...description, title });
          }}
          onDescriptionChange={(newDescription) => {
            props.onDescriptionChange({
              ...description,
              description: newDescription,
            });
          }}
        />
      ) : (
        <TextSection
          key={description.id}
          title={description.title}
          description={description.description}
          editable={false}
        />
      );
    case "category_filter":
      return props.editing ? (
        <CategoryFilterSection
          key={description.id}
          title={description.title}
          categories={description.categories}
          editable={true}
          onTitleChange={(title) => {
            props.onDescriptionChange({ ...description, title });
          }}
          onCategoriesChange={(categories) =>
            props.onDescriptionChange({ ...description, categories })
          }
        />
      ) : (
        <CategoryFilterSection
          key={description.id}
          title={description.title}
          categories={description.categories.map((category) => ({
            name: category,
            active: props.activeCategories.some(
              (activeCategory) => category === activeCategory
            ),
          }))}
          editable={false}
          onCategoryStateChangeRequest={props.onCategoryStateChangeRequest}
          onClearFilterRequests={props.onClearFilterRequests}
        />
      );
  }
};

const EditableBoardDescriptions: React.FC<EditableBoardDescriptionProps> = (
  props
) => {
  return (
    <div
      className={classnames("edit-container", {
        "single-description": !!props.editingCategory,
      })}
    >
      {!props.editingCategory ? (
        props.descriptions.map((description) => (
          <div className={classnames("section")}>
            <Button
              icon={description.type == "text" ? faFont : faTags}
              onClick={() => props.onEditDescriptionRequest(description.id)}
              theme={ButtonStyle.DARK}
            >
              {description.title}
            </Button>
          </div>
        ))
      ) : (
        <div>{getSection(props, props.editingCategory)}</div>
      )}
      <div className="options-add">
        <Button
          icon={faPlus}
          onClick={() => props.onAddDescription("text")}
          theme={ButtonStyle.DARK}
        >
          Add Text Section
        </Button>
        <Button
          icon={faPlus}
          onClick={() => props.onAddDescription("category_filter")}
          theme={ButtonStyle.DARK}
        >
          Add Tags Section
        </Button>
      </div>
      <div className="options-delete">
        <Button
          onClick={() => props.onDeleteDescription(props.editingCategory?.id)}
          theme={ButtonStyle.DARK}
        >
          Delete
        </Button>
      </div>
      <style jsx>{`
        .options-delete,
        .options-add {
          margin-top: 10px;
          text-align: center;
        }
        .edit-container.single-description .options-add {
          display: none;
        }
        .edit-container:not(.single-description) .options-delete {
          display: none;
        }
        .section {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

const BoardDescription: React.FC<BoardDescriptionProps> = (props) => {
  return (
    <div
      className={classnames("sections-container", {
        editing: !!props.editing,
      })}
    >
      {!props.editing ? (
        props.descriptions.map((description) => (
          <div className={classnames("section")}>
            {getSection(props, description)}
          </div>
        ))
      ) : (
        <EditableBoardDescriptions {...props} />
      )}
      <style jsx>{`
        .sections-container:not(.editing) {
          margin-top: 30px;
        }
        .section {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

interface EditableBoardDescriptionProps {
  editing: true;
  editingCategory?: DescriptionType;
  descriptions: DescriptionType[];
  onEditDescriptionRequest: (id: string) => void;
  onAddDescription: (type: "text" | "category_filter") => void;
  onDeleteDescription: (id?: string) => void;
  onDescriptionChange: (description: DescriptionType) => void;
}

interface DisplayBoardDescriptionProps {
  editing?: false;
  descriptions: DescriptionType[];
  activeCategories: string[];
  onCategoryStateChangeRequest: (name: string) => void;
  onClearFilterRequests: () => void;
}

export type BoardDescriptionProps =
  | EditableBoardDescriptionProps
  | DisplayBoardDescriptionProps;

export default BoardDescription;
