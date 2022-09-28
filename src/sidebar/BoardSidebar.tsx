import { BoardMetadataType, DescriptionType } from "types";
import Button, { ButtonStyle } from "buttons/Button";
import DropdownMenu, {
  DropdownProps,
  DropdownStyle,
} from "common/DropdownListMenu";
import SidebarSection, {
  SidebarSectionProps,
  getSectionData,
  makeSidebarSection,
} from "./SidebarSection";
import {
  faArrowLeft,
  faCaretDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import BoardPreview from "board/BoardPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PreviewEditor from "./PreviewEditor";
import React from "react";
import SectionsList from "./SectionsList";
import TagsFilterSection from "./TagsFilterSection";
import TextSection from "./TextSection";
import Theme from "theme/default";
import classnames from "classnames";
import { extractCompounds } from "utils/compound-utils";
import { v4 as uuidv4 } from "uuid";

interface EditableBoardSidebarProps {
  children:
    | React.ReactElement<SidebarSectionProps>[]
    | React.ReactElement<SidebarSectionProps>
    | undefined;
  editing: true;
  onCancelEditing: () => void;
  onUpdateMetadata: (metadata: BoardMetadataType) => void;
}

interface DisplayBoardSidebarProps {
  children:
    | React.ReactElement<SidebarSectionProps>[]
    | React.ReactElement<SidebarSectionProps>
    | undefined;
  editing?: false;
  previewOptions?: DropdownProps["options"];
  activeCategory: string | null;
  onCategoriesStateChange: (
    categories: { name: string; active: boolean }[]
  ) => void;
}

export type BoardSidebarProps = BoardMetadataType &
  (DisplayBoardSidebarProps | EditableBoardSidebarProps);

const BoardOptionsDropdown: React.FC<{
  accentColor: string;
  previewOptions: DropdownProps["options"];
}> = ({ accentColor, previewOptions }) => {
  return (
    <div className={classnames("preview-options")}>
      <DropdownMenu
        options={previewOptions}
        style={DropdownStyle.DARK}
        accentColor={accentColor}
        zIndex={200}
        label="Board options"
      >
        <span className="options-button">
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
      </DropdownMenu>
      <style jsx>{`
        .preview-options {
          position: absolute;
          top: 8px;
          right: 8px;
        }
        .options-button {
          display: block;
          width: 30px;
          height: 30px;
          background-color: ${Theme.BUTTON_BACKGROUND_COLOR_DARK};
          border-radius: 50%;
          border: 2px solid ${accentColor};
          color: ${accentColor};
          postion: relative;
        }
        .options-button:hover {
          background-color: ${Theme.BUTTON_ACCENT_COLOR_DARK};
        }
        .options-button :global(svg) {
          position: absolute;
          top: calc(50% - 2px);
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

const EditHeader: React.FC<{
  onBack: () => void;
  onSubmit: () => void;
}> = (props) => {
  return (
    <div className={classnames("buttons")}>
      <Button
        icon={faArrowLeft}
        onClick={props.onBack}
        theme={ButtonStyle.DARK}
      >
        Back
      </Button>
      <Button icon={faCheck} onClick={props.onSubmit} theme={ButtonStyle.DARK}>
        Save
      </Button>
      <style jsx>{`
        .buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

const createBlankSection = (
  type: "text" | "category_filter",
  nextIndex: number
) => {
  const baseType = {
    id: uuidv4(),
    index: nextIndex,
    title: "",
  };
  return type == "text"
    ? {
        ...baseType,
        type,
        description: "",
      }
    : {
        ...baseType,
        type,
        categories: [],
      };
};

const getNextIndex = (sectionsData: {
  sections: React.ReactElement<SidebarSectionProps>[];
  newSections: DescriptionType[];
}) => {
  return (
    Math.max(
      0,
      ...sectionsData.sections.map(getSectionData).map((data) => data!.index),
      ...sectionsData.newSections.map((data) => data.index)
    ) + 1
  );
};

const BoardSidebar: React.FC<BoardSidebarProps> & {
  SidebarSection: React.FC<SidebarSectionProps>;
  TextSection: typeof TextSection;
  TagsFilterSection: typeof TagsFilterSection;
} = (props) => {
  const [currentAccent, setCurrentAccent] = React.useState(props.accentColor);
  const [currentTagline, setCurrentTagline] = React.useState(props.tagline);

  // The data of the section we're currently editing. This is used
  // to generate an editable SidebarSection to update the data.
  const [editingSection, setEditingSection] = React.useState<DescriptionType>();
  // This contains all the sections that did not exist when the sidebar was first edited
  const [newSections, setNewSections] = React.useState<DescriptionType[]>([]);
  // This contains all the sections whose existing state was updated
  const [editedSections, setEditedSections] = React.useState<DescriptionType[]>(
    []
  );
  // This contains the id of all the deleted sections (including the ones in new)
  const [deletedSections, setDeletedSections] = React.useState<string[]>([]);

  React.useEffect(() => {
    setCurrentAccent(props.accentColor);
  }, [props.accentColor]);
  React.useEffect(() => {
    setCurrentTagline(props.tagline);
  }, [props.tagline]);

  const sections = extractCompounds<SidebarSectionProps>(
    props.children,
    SidebarSection
  );
  sections.sort((c1, c2) => c1.props.index - c2.props.index);

  const currentSectionsData = [
    // Take the existing sections (the edited version, if one exists).
    ...sections.map((section) => {
      const editedData = editedSections.find(
        (editedSection) => editedSection.id == section.props.id
      );
      return editedData || getSectionData(section)!;
    }),
    // Add the new sections
    ...newSections,
  ].filter(
    // And remove the ones we deleted sections
    (section) =>
      !deletedSections.find((deletedSection) => deletedSection === section.id)
  );
  return (
    <div className="sidebar">
      {props.editing && (
        <EditHeader
          onBack={() => {
            if (!editingSection) {
              props.onCancelEditing();
              return;
            }
            setEditingSection(undefined);
          }}
          onSubmit={() => {
            if (!editingSection) {
              props.onUpdateMetadata({
                slug: props.slug,
                avatarUrl: props.avatarUrl,
                tagline: currentTagline,
                accentColor: currentAccent,
                // We update the index of the descriptions
                descriptions: currentSectionsData
                  .sort((s1, s2) => s1.index - s2.index)
                  .map((data, index) => ({
                    ...data,
                    index: index + 1,
                  })),
              });
              return;
            }
            const isExisting = sections.find(
              (section) => section.props.id == editingSection.id
            );
            if (!isExisting) {
              setNewSections([...newSections, editingSection]);
            } else {
              setEditedSections([
                // Remove this section if it already was in edited
                ...editedSections.filter(
                  (editedSection) => editedSection.id !== editedSection.id
                ),
                editingSection,
              ]);
            }
            setEditingSection(undefined);
          }}
        />
      )}
      <div className="board-details">
        <div
          className={classnames("board-preview", {
            "editing-section": !!editingSection,
          })}
        >
          <BoardPreview
            slug={props.slug}
            avatar={props.avatarUrl}
            description={currentTagline}
            color={currentAccent}
            muted={props.muted}
          />
          {!props.editing && (
            <BoardOptionsDropdown
              accentColor={currentAccent}
              previewOptions={props.previewOptions}
            />
          )}
          {props.editing && (
            <PreviewEditor
              tagline={currentTagline}
              onSetTagline={setCurrentTagline}
              accentColor={currentAccent}
              onSetAccentColor={setCurrentAccent}
            />
          )}
        </div>
        <h2
          className={classnames("descriptions-title", {
            vanquished: !props.editing || editingSection,
          })}
        >
          Description Sections
        </h2>
        {
          // We are not editing anything, just show the sections
          !props.editing && sections
        }
        {
          // We are not editing, but we haven't selected a specific section to edit
          props.editing && !editingSection && (
            <SectionsList
              sections={currentSectionsData}
              onSelectSection={(sectionId) => {
                setEditingSection(
                  currentSectionsData.find((section) => section.id == sectionId)
                );
              }}
              onAddSection={(type) => {
                setEditingSection(
                  createBlankSection(
                    type,
                    getNextIndex({ sections, newSections })
                  )
                );
              }}
            />
          )
        }
        {
          // We are editing a specific section
          editingSection &&
            React.cloneElement(makeSidebarSection(editingSection), {
              ...editingSection,
              editable: true,
              onChangeTitle: (title: string) => {
                setEditingSection({
                  ...editingSection,
                  title,
                });
              },
              onChangeData: (data: DescriptionType) => {
                setEditingSection(data);
              },
              onDeleteSection: (sectionId: string) => {
                setDeletedSections([...deletedSections, sectionId]);
                setEditingSection(undefined);
              },
            })
        }
      </div>
      <style jsx>{`
        .sidebar {
          padding: 20px;
        }
        h2 {
          color: white;
          font-size: var(--font-size-regular);
          font-weight: bold;
        }
        .board-details {
          margin-top: 10px;
        }
        .board-preview {
          position: relative;
        }
        .board-preview.editing-section {
          display: none;
        }
        .hidden {
          visibility: hidden;
        }
        .vanquished {
          display: none;
        }
        @media only screen and (max-width: ${Theme.MOBILE_WIDTH_TRIGGER_PX}px) {
          .sidebar {
            max-width: 800px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};

BoardSidebar.SidebarSection = SidebarSection;
BoardSidebar.TextSection = TextSection;
BoardSidebar.TagsFilterSection = TagsFilterSection;

export default BoardSidebar;
