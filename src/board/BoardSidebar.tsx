import React from "react";

import BoardPreview from "./BoardPreview";
import { BoardMetadataType, DescriptionType, LinkWithAction } from "types";
import Button, { ButtonStyle } from "../common/Button";
import DropdownMenu, { DropdownStyle } from "../common/DropdownListMenu";
import {
  faCaretDown,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";

import BoardDescription from "./BoardDescription";

const BoardSidebar: React.FC<BoardSidebarProps> = (props) => {
  const [editingSection, setEditingSection] = React.useState<{
    id: string;
    current: DescriptionType;
    new: boolean;
  }>();
  const [currentDescriptions, setCurrentDescriptions] = React.useState(
    props.descriptions.sort((c1, c2) => c1.index - c2.index)
  );

  React.useEffect(() => {
    setCurrentDescriptions(
      props.descriptions
        .sort((c1, c2) => c1.index - c2.index)
        .map((description, index) => ({
          ...description,
          index: index + 1,
        }))
    );
  }, [props.descriptions, props.editing]);

  return (
    <div className="sidebar">
      <div
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
              tagline: props.tagline,
              accentColor: props.accentColor,
              descriptions: currentDescriptions,
            });
          }}
          theme={ButtonStyle.DARK}
        >
          Save
        </Button>
      </div>
      <div className="board-details">
        <div
          className={classnames("board-preview", {
            "editing-section": !!editingSection,
          })}
        >
          <BoardPreview
            slug={props.slug}
            avatar={props.avatarUrl}
            description={props.tagline}
            color={props.accentColor}
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
                accentColor={props.accentColor}
                zIndex={200}
              >
                <Button
                  icon={faCaretDown}
                  compact
                  color={props.accentColor}
                  theme={ButtonStyle.DARK}
                >
                  Options
                </Button>
              </DropdownMenu>
            )}
          </div>
        </div>
        <BoardDescription
          descriptions={currentDescriptions || []}
          onCategoriesStateChange={(categories) => {
            !props.editing && props.onCategoriesStateChange(categories);
          }}
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
        />
      </div>
      <style jsx>{`
        h2 {
          color: white;
          font-size: 16px;
          font-weight: bold;
        }
        .sidebar {
          padding: 20px;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
        }
        .board-details {
          margin-top: 10px;
        }
        .board-preview {
          text-align: center;
          position: relative;
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
      `}</style>
    </div>
  );
};

export default BoardSidebar;

interface EditableBoardSidebarProps extends BoardMetadataType {
  editing: true;
  onCancelEditing: () => void;
  onUpdateMetadata: (metadata: BoardMetadataType) => void;
}

interface DisplayBoardSidebarProps extends BoardMetadataType {
  editing?: false;
  previewOptions?: { name: string; link: LinkWithAction }[];
  onCategoriesStateChange: (
    categories: { category: string; active: boolean }[]
  ) => void;
}

export type BoardSidebarProps =
  | DisplayBoardSidebarProps
  | EditableBoardSidebarProps;
