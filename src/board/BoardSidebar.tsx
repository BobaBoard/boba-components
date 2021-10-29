import { BoardMetadataType, DescriptionType } from "../types";
import Button, { ButtonStyle } from "../buttons/Button";
import { CreateBaseCompound, extractCompounds } from "../utils/compound-utils";
import DropdownMenu, {
  DropdownProps,
  DropdownStyle,
} from "../common/DropdownListMenu";
import Input, { InputStyle } from "../common/Input";
import {
  faArrowLeft,
  faCaretDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import BoardDescription from "./BoardDescription";
import BoardPreview from "./BoardPreview";
import ColorInput from "../common/ColorInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SectionsList from "./SectionsList";
import TagsFilterSection from "./TagsFilterSection";
import TextSection from "./TextSection";
import Theme from "../theme/default";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";

interface SidebarSectionProps {
  id: string;
  title: string;
  description?: string;
  children: typeof TagsFilterSection | typeof TextSection;
}
const SidebarSection = CreateBaseCompound<SidebarSectionProps>(
  "SidebarSection"
);

interface EditableBoardSidebarProps {
  children: React.FC<SidebarSectionProps>;
  editing: true;
  onCancelEditing: () => void;
  onUpdateMetadata: (metadata: BoardMetadataType) => void;
}

interface DisplayBoardSidebarProps {
  children: React.FC<SidebarSectionProps>;
  editing?: false;
  previewOptions?: DropdownProps["options"];
  activeCategory: string | null;
  onCategoriesStateChange: (
    categories: { name: string; active: boolean }[]
  ) => void;
}

export type BoardSidebarProps = BoardMetadataType &
  (DisplayBoardSidebarProps | EditableBoardSidebarProps);

const SectionContainer: React.FC<SidebarSectionProps> = (props) => {
  return (
    <div className="section">
      <div className="title">{props.title}</div>
      <div className="description">{props.description}</div>
      <div className="content">{props.children}</div>
      <style jsx>{`
        .title {
          font-weight: bold;
          font-size: var(--font-size-regular);
          margin-top: 20px;
        }
        .section {
          color: white;
        }
        .content {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

const BoardSidebar: React.FC<BoardSidebarProps> & {
  SidebarSection: React.FC<unknown>;
} = (props) => {
  const [editingSection, setEditingSection] = React.useState<{
    id: string;
    current: DescriptionType;
    new: boolean;
  }>();
  // const [currentDescriptions, setCurrentDescriptions] = React.useState(
  //   props.descriptions.sort((c1, c2) => c1.index - c2.index)
  // );
  const [currentAccent, setCurrentAccent] = React.useState(props.accentColor);
  const [currentTagline, setCurrentTagline] = React.useState(props.tagline);

  const sections = extractCompounds<SidebarSectionProps>(
    props.children,
    SidebarSection
  );

  React.useEffect(() => {
    setCurrentAccent(props.accentColor);
  }, [props.accentColor, props.editing]);

  React.useEffect(() => {
    setCurrentTagline(props.tagline);
  }, [props.tagline, props.editing]);

  // React.useEffect(() => {
  //   setCurrentDescriptions(
  //     props.descriptions
  //       .sort((c1, c2) => c1.index - c2.index)
  //       .map((description, index) => ({
  //         ...description,
  //         index: index + 1,
  //       }))
  //   );
  // }, [props.descriptions, props.editing]);

  return (
    <div className="sidebar">
      {/* <div
        className={classnames("buttons", {
          hidden: !props.editing,
        })}
      >
        <Button
          icon={faArrowLeft}
          onClick={() => {
            if (!props.editing) {
              return;
            }
            if (editingSection) {
              // If the section was new, filter it out. Else, leave it be.
              setCurrentDescriptions(
                editingSection.new
                  ? currentDescriptions.filter(
                      (description) => description.id !== editingSection.id
                    )
                  : currentDescriptions
              );
              setEditingSection(undefined);
            }
            props.onCancelEditing();
          }}
          theme={ButtonStyle.DARK}
        >
          Back
        </Button>
        <Button
          icon={faCheck}
          onClick={() => {
            if (!props.editing) {
              return;
            }
            if (editingSection) {
              setCurrentDescriptions(
                currentDescriptions.map((description) =>
                  description.id == editingSection.id
                    ? editingSection.current
                    : description
                )
              );
              setEditingSection(undefined);
              return;
            }
            props.onUpdateMetadata({
              slug: props.slug,
              avatarUrl: props.avatarUrl,
              tagline: currentTagline,
              accentColor: currentAccent,
              descriptions: currentDescriptions,
            });
          }}
          theme={ButtonStyle.DARK}
        >
          Save
        </Button>
      </div> */}
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
          <div
            className={classnames("preview-options", {
              visible: !props.editing && !!props.previewOptions,
            })}
          >
            {!props.editing && (
              <DropdownMenu
                options={props.previewOptions || []}
                style={DropdownStyle.DARK}
                accentColor={currentAccent}
                zIndex={200}
              >
                <span className="options-button">
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
              </DropdownMenu>
            )}
          </div>
        </div>
        <div
          className={classnames("preview-editor", {
            vanquished: !props.editing || editingSection,
          })}
        >
          <h2>Preview</h2>
          <Input
            id="tagline"
            label="tagline"
            value={currentTagline}
            onTextChange={setCurrentTagline}
            theme={InputStyle.DARK}
          />
          <div className={classnames("color-picker")}>
            <ColorInput
              currentColor={currentAccent}
              onColorChange={setCurrentAccent}
            />
          </div>
        </div>
        <h2
          className={classnames("descriptions-title", {
            vanquished: !props.editing || editingSection,
          })}
        >
          Description Sections
        </h2>
        {!props.editing &&
          sections.map((section) => (
            <SectionContainer key={section.props.title} {...section.props} />
          ))}
        {props.editing && (
          <SectionsList
            sections={sections.map((section) => ({
              id: section.props.id,
              title: section.props.title,
              // @ts-expect-error
              type: section.props.children.props.tags
                ? "category_filter"
                : "text",
            }))}
            onSelectSection={() => {}}
            onDeleteSection={() => {}}
            onAddSection={() => {}}
          />
        )}
        {/* <BoardDescription
          descriptions={currentDescriptions || []}
          onClearFilterRequests={() => {
            if (props.editing) {
              return;
            }

            props.onCategoriesStateChange(
              currentDescriptions.flatMap((description) =>
                description.type == "category_filter"
                  ? description.categories.map((category) => ({
                      name: category,
                      active: true,
                    }))
                  : []
              )
            );
          }}
          onCategoryStateChangeRequest={(changingCategory) => {
            if (props.editing) {
              return;
            }
            props.onCategoriesStateChange(
              currentDescriptions.flatMap((description) =>
                description.type == "category_filter"
                  ? description.categories.map((category) => ({
                      name: category,
                      active: category == changingCategory,
                    }))
                  : []
              )
            );
          }}
          activeCategories={currentDescriptions.flatMap((description) =>
            description.type == "category_filter"
              ? !props.editing && props.activeCategory
                ? [props.activeCategory]
                : description.categories
              : []
          )}
          onDescriptionChange={(description) => {
            if (!editingSection) {
              return;
            }
            setEditingSection({
              ...editingSection,
              current: description,
            });
          }}
          editing={props.editing}
          editingCategory={editingSection?.current}
          onEditDescriptionRequest={(id) =>
            setEditingSection({
              id,
              current: {
                ...currentDescriptions.find((d) => d.id == id),
              } as DescriptionType,
              new: false,
            })
          }
          onAddDescription={(type) => {
            const newId = uuidv4();
            const newDescription: DescriptionType = {
              id: newId,
              index: props.descriptions.length + 1,
              title: "",
              type,
              description: "",
              categories: [] as string[],
            };
            setCurrentDescriptions([...currentDescriptions, newDescription]);
            setEditingSection({
              id: newId,
              current: newDescription,
              new: true,
            });
          }}
          onDeleteDescription={() => {
            setCurrentDescriptions(
              currentDescriptions.filter(
                (description) => description.id != editingSection?.id
              )
            );
            setEditingSection(undefined);
          }}
        /> */}
      </div>
      <style jsx>{`
        h2 {
          color: white;
          font-size: var(--font-size-regular);
          font-weight: bold;
        }
        .sidebar {
          padding: 20px;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
        }
        .options-button {
          display: block;
          width: 30px;
          height: 30px;
          background-color: ${Theme.BUTTON_BACKGROUND_COLOR_DARK};
          border-radius: 50%;
          border: 2px solid ${props.accentColor};
          color: ${props.accentColor};
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
        .board-details {
          margin-top: 10px;
        }
        .board-preview {
          text-align: center;
          position: relative;
        }
        .preview-editor {
          margin: 30px 0;
        }
        .color-picker {
          margin-top: 15px;
        }
        .board-preview.editing-section {
          display: none;
        }
        .preview-options {
          display: none;
          position: absolute;
          top: 8px;
          right: 8px;
        }
        .preview-options.visible {
          display: block;
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

export default BoardSidebar;
