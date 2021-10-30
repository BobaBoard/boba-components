import { DescriptionType, TagType } from "../types";
import Input, { InputStyle } from "../common/Input";
import TagsFilterSection, { TagsFilterSectionProps } from "./TagsFilterSection";
import TextSection, { TextSectionProps } from "./TextSection";

import Button from "../buttons/Button";
import { FilteredTagsState } from "../tags/TagsFilter";
import React from "react";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import noop from "noop-ts";

type SidebarSectionChild = React.ReactElement<
  TextSectionProps | TagsFilterSectionProps
>;

/**
 * Get the type of a valid child element of a SidebarSection.
 */
const getType = (child: SidebarSectionChild) => {
  if (child.type == TagsFilterSection) {
    return "category_filter";
  } else if (child.type == TextSection) {
    return "text";
  } else {
    throw new Error("Unknown sidebar section type");
  }
};

/**
 * Given a valid child element of a SidebarSection, make a copy of it
 * that is editable.
 */
const makeEditableChild = (
  child: SidebarSectionChild,
  props: {
    id: string;
    index: number;
    title: string;
    onChangeData?: (data: DescriptionType) => void;
  }
) => {
  return React.cloneElement(child, {
    ...child.props,
    editable: true,
    onDescriptionChange: (description: string) => {
      props.onChangeData?.({
        id: props.id,
        index: props.index,
        title: props.title,
        type: "text",
        description,
      });
    },
    onTagsChange: (categories: { name: string }[]) => {
      props.onChangeData?.({
        id: props.id,
        index: props.index,
        title: props.title,
        type: "category_filter",
        categories: categories.map((category) => category.name),
      });
    },
  });
};

/**
 * Given a valid child element of a SidebarSection, get its description data.
 */
export const getSectionData = (
  section?: React.ReactElement<SidebarSectionProps>
): DescriptionType | null => {
  if (!section) {
    return null;
  }
  const type = getType(section.props.children);
  switch (type) {
    case "text":
      return {
        id: section.props.id,
        index: section.props.index,
        title: section.props.title,
        type: "text",
        description: (section.props
          .children as React.ReactElement<TextSectionProps>).props.description,
      };
    case "category_filter":
      return {
        id: section.props.id,
        index: section.props.index,
        title: section.props.title,
        type: "category_filter",
        categories: (section.props
          .children as React.ReactElement<TagsFilterSectionProps>).props.tags.map(
          (tag) => tag.name
        ),
      };
  }
};

/**
 * Return the appropriate child of a SidebarSection given a DescriptionType.
 */
const makeSidebarChild = (
  description: DescriptionType
): SidebarSectionChild => {
  switch (description.type) {
    case "category_filter":
      return (
        <TagsFilterSection
          tags={description.categories.map((categoryName) => ({
            name: categoryName,
            state: FilteredTagsState.ACTIVE,
          }))}
          type={TagType.CATEGORY}
          onTagsStateChangeRequest={noop}
          onClearFilterRequests={noop}
        />
      );
    case "text":
      return <TextSection description={description.description} />;
  }
};

/**
 * Return a SidebarSection given a DescriptionType.
 */
export const makeSidebarSection = (
  description: DescriptionType
): React.ReactElement<SidebarSectionProps> => {
  return (
    <SidebarSection
      id={description.id}
      index={description.index}
      title={description.title}
    >
      {makeSidebarChild(description)}
    </SidebarSection>
  );
};

export interface SidebarSectionProps {
  id: string;
  index: number;
  title: string;
  children: SidebarSectionChild;
  editable?: boolean;
  onChangeTitle?: (title: string) => void;
  onChangeData?: (data: DescriptionType) => void;
  onDeleteSection?: (sectionId: string) => void;
}
const SidebarSection: React.FC<SidebarSectionProps> = (props) => {
  return (
    <div className="section">
      <div className="title">
        {!props.editable ? (
          props.title
        ) : (
          <Input
            id="title"
            label="Title"
            value={props.title}
            onTextChange={props.onChangeTitle || noop}
            theme={InputStyle.DARK}
          />
        )}
      </div>
      <div className="content">
        {props.editable
          ? makeEditableChild(props.children, props)
          : props.children}
      </div>
      {props.editable && (
        <div className="delete">
          <Button
            icon={faCross}
            full
            center
            onClick={() => props.onDeleteSection?.(props.id)}
          >
            Delete section
          </Button>
        </div>
      )}
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
        .delete {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default SidebarSection;
