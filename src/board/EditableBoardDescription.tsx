import React from "react";

import TextSection from "./TextSection";
import CategoryFilterSection from "./CategoryFilterSection";
import Button from "../common/Button";

import classnames from "classnames";

import debug from "debug";
import {
  faArrowLeft,
  faFont,
  faPlus,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { DescriptionType } from "types";
// @ts-ignore
const log = debug("bobaui:boards:boardsDescription");

const EditableBoardDescription: React.FC<EditableBoardDescriptionProps> = (
  props
) => {
  const [currentDescriptions, setCurrentDescriptions] = React.useState(
    props.descriptions.sort((c1, c2) => c1.index - c2.index)
  );
  // Index of the category being currently edited
  const [
    editingDescription,
    setEditingDescription,
  ] = React.useState<DescriptionType | null>(null);

  React.useEffect(() => {
    setCurrentDescriptions(
      props.descriptions.sort((c1, c2) => c1.index - c2.index)
    );
  }, [props.descriptions]);

  return (
    <div className={classnames("board-description")}>
      <div>
        <Button
          icon={faArrowLeft}
          onClick={() => {
            if (!editingDescription) {
              // TODO: add boolean to indicate whether any edit has been done and prompt to be sure
              props.onCancel();
              return;
            }
            setEditingDescription(null);
          }}
        >
          Back
        </Button>
        <Button
          icon={faPlus}
          onClick={() => {
            if (!editingDescription) {
              props.onSave(currentDescriptions);
              return;
            }
            const newDescriptions = currentDescriptions.map((desc) =>
              desc.index == editingDescription.index ? editingDescription : desc
            );
            // indexes start from 1
            editingDescription.index > newDescriptions.length &&
              newDescriptions.push(editingDescription);
            setCurrentDescriptions(newDescriptions);
            setEditingDescription(null);
          }}
        >
          Save
        </Button>
      </div>
      <div
        className={classnames("editing-section", {
          visible: editingDescription != null,
        })}
      >
        {editingDescription &&
          (editingDescription.type == "text" ? (
            <TextSection
              title={editingDescription.title}
              description={editingDescription.description || ""}
              editable={true}
              onTitleChange={(title) => {
                setEditingDescription({ ...editingDescription, title });
              }}
              onDescriptionChange={(description) => {
                setEditingDescription({ ...editingDescription, description });
              }}
            />
          ) : (
            <CategoryFilterSection
              title={editingDescription.title}
              categories={
                editingDescription.categories?.map((c) => ({
                  name: c,
                  active: true,
                })) || []
              }
              editable={true}
              onTitleChange={(title) => {
                setEditingDescription({ ...editingDescription, title });
              }}
              onCategoriesChange={(categories) => {
                setEditingDescription({ ...editingDescription, categories });
              }}
              onCategoryStateChange={() => {}}
            />
          ))}
        <Button
          onClick={() => {
            const newDescriptions = currentDescriptions.filter(
              (desc) => desc.index !== editingDescription?.index
            );
            setCurrentDescriptions(
              newDescriptions.map((d, index) => ({ ...d, index: index + 1 }))
            );
            setEditingDescription(null);
          }}
        >
          Delete Section
        </Button>
      </div>
      <div
        className={classnames("sections-selection", {
          visible: editingDescription == null,
        })}
      >
        <div className="title">Sections</div>
        {currentDescriptions.map((description) => (
          <Button
            icon={description.type == "text" ? faFont : faTags}
            onClick={() => setEditingDescription(description)}
          >
            {description.title}
          </Button>
        ))}
      </div>
      <div className="options">
        <Button
          icon={faPlus}
          onClick={() => {
            // indexes start from 1
            const nextIndex = currentDescriptions.length + 1;
            setEditingDescription({
              index: nextIndex,
              title: "",
              type: "text",
            });
          }}
        >
          Add Text Section
        </Button>
        <Button
          icon={faPlus}
          onClick={() => {
            // indexes start from 1
            const nextIndex = currentDescriptions.length + 1;
            setEditingDescription({
              index: nextIndex,
              title: "",
              type: "category_filter",
            });
          }}
        >
          Add Tags Section
        </Button>
      </div>
      <style jsx>{`
        .board-description {
          color: white;
        }
        .sections-selection {
          flex-direction: column;
          display: none;
        }
        .editing-section {
          display: none;
        }
        .sections-selection.visible {
          display: flex;
        }
        .editing-section.visible {
          display: block;
        }
      `}</style>
    </div>
  );
};

// Types for props
export interface EditableBoardDescriptionProps {
  descriptions: {
    index: number;
    title: string;
    type: "text" | "category_filter";
    description?: string;
    categories?: string[];
  }[];
  loading?: boolean;
  onCancel: () => void;
  onSave: (descriptions: DescriptionType[]) => void;
}

export default EditableBoardDescription;
