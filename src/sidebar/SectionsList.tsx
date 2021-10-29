import Button, { ButtonStyle } from "../buttons/Button";
import { CreateBaseCompound, extractCompounds } from "../utils/compound-utils";
import { DescriptionType, TagType } from "../types";
import {
  faCross,
  faFont,
  faPlus,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import TagsFilterSection from "./TagsFilterSection";
import TextSection from "./TextSection";
import classnames from "classnames";
import debug from "debug";

// // @ts-ignore
// const log = debug("bobaui:boards:boardsDescription");

// const getSection = (
//   props: BoardSectionEditorProps,
//   description?: BoardSectionEditorProps["descriptions"][0]
// ) => {
//   if (!description) {
//     return <></>;
//   }
//   switch (description.type) {
//     case "text":
//       return props.editing ? (
//         <TextSection
//           key={description.id}
//           title={description.title}
//           description={description.description}
//           editable={true}
//           onTitleChange={(title) => {
//             props.onDescriptionChange({ ...description, title });
//           }}
//           onDescriptionChange={(newDescription) => {
//             props.onDescriptionChange({
//               ...description,
//               description: newDescription,
//             });
//           }}
//         />
//       ) : (
//         <TextSection
//           key={description.id}
//           title={description.title}
//           description={description.description}
//           editable={false}
//         />
//       );
//     case "category_filter":
//       return props.editing ? (
//         <TagsFilterSection
//           key={description.id}
//           title={description.title}
//           tags={description.categories}
//           editable={true}
//           type={TagType.CATEGORY}
//           onTitleChange={(title) => {
//             props.onDescriptionChange({ ...description, title });
//           }}
//           onTagsChange={(categories) =>
//             props.onDescriptionChange({ ...description, categories })
//           }
//         />
//       ) : (
//         <TagsFilterSection
//           key={description.id}
//           title={description.title}
//           type={TagType.CATEGORY}
//           tags={description.categories.map((category) => ({
//             name: category,
//             active: props.activeCategories.some(
//               (activeCategory) => category === activeCategory
//             ),
//           }))}
//           editable={false}
//           onTagsStateChangeRequest={props.onCategoryStateChangeRequest}
//           onClearFilterRequests={props.onClearFilterRequests}
//         />
//       );
//   }
// };

// interface SidebarSectionProps {
//   title: string;
//   description?: string;
// }
// const SidebarSection = CreateBaseCompound<SidebarSectionProps>(
//   "SidebarSection"
// );

export interface SectionsListProps {
  sections: {
    id: string;
    title: string;
    type: "category_filter" | "text";
  }[];
  onSelectSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
  onAddSection: (type: "category_filter" | "text") => void;
}

const SectionsList: React.FC<SectionsListProps> = (props) => {
  return (
    <div className={classnames("edit-container")}>
      {props.sections.map((section) => (
        <div className={classnames("section")} key={section.id}>
          <div className="title">
            <Button
              icon={section.type == "text" ? faFont : faTags}
              onClick={() => props.onSelectSection(section.id)}
              theme={ButtonStyle.DARK}
              full
            >
              {section.title}
            </Button>
          </div>
          <div className="delete">
            <Button
              icon={faCross}
              compact
              onClick={() => props.onDeleteSection(section.id)}
              label={`Delete ${section.title}`}
            >
              Delete section
            </Button>
          </div>
        </div>
      ))}
      <div className="options-add">
        <Button
          icon={faPlus}
          onClick={() => props.onAddSection("text")}
          theme={ButtonStyle.LIGHT}
        >
          Add Text Section
        </Button>
        <Button
          icon={faPlus}
          onClick={() => props.onAddSection("category_filter")}
          theme={ButtonStyle.LIGHT}
        >
          Add Filters Section
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
          margin-bottom: 10px;
          display: flex;
        }
        .section .title {
          flex-grow: 1;
          width: 100%;
        }
        .section .delete {
          margin-left: auto;
        }
      `}</style>
    </div>
  );
};
// EditableBoardSectionEditors.SidebarSection = SidebarSection;

// const BoardSectionEditor: React.FC<BoardSectionEditorProps> & {
//   SidebarSection: React.FC<SidebarSectionProps>;
// } = (props) => {
//   return (
//     <div
//       className={classnames("sections-container", {
//         editing: !!props.editing,
//       })}
//     >
//       {!props.editing ? (
//         props.descriptions.map((description) => (
//           <div className={classnames("section")} key={description.id}>
//             {getSection(props, description)}
//           </div>
//         ))
//       ) : (
//         <EditableBoardSectionEditors {...props} />
//       )}
//       <style jsx>{`
//         .sections-container:not(.editing),
//         .section {
//           margin-top: 20px;
//         }
//       `}</style>
//     </div>
//   );
// };

// interface EditableBoardSectionEditorProps {
//   editing: true;
//   editingCategory?: DescriptionType;
//   descriptions: DescriptionType[];
//   onEditDescriptionRequest: (id: string) => void;
//   onAddDescription: (type: "text" | "category_filter") => void;
//   onDeleteDescription: (id?: string) => void;
//   onDescriptionChange: (description: DescriptionType) => void;
// }

// interface DisplayBoardSectionEditorProps {
//   editing?: false;
//   descriptions: DescriptionType[];
//   activeCategories: string[];
//   onCategoryStateChangeRequest: (name: string) => void;
//   onClearFilterRequests: () => void;
//   children: React.FC<SidebarSectionProps>[];
// }

// export type BoardSectionEditorProps =
//   | EditableBoardSectionEditorProps
//   | DisplayBoardSectionEditorProps;

export default SectionsList;
