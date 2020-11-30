import React from "react";

import classnames from "classnames";
import Input, { InputStyle } from "../common/Input";
import Button from "../common/Button";

import debug from "debug";
import Tag, { TagsFactory } from "./Tag";
import { TagType } from "../types";
import { ButtonStyle } from "../common/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
const log = debug("bobaui:common:TagsFilter");

const TagsFilterSection: React.FC<TagsFilterProps> = (props) => {
  const [newTag, setNewTag] = React.useState("");
  return (
    <div className="filter-section">
      <div className="filter-container">
        {
          // @ts-ignore
          props.tags.map((tag: TagsFilterProps["tags"][0]) => (
            <button
              key={tag.name}
              className={classnames("tag", {
                disabled: tag["state"] == FilteredTagsState.DISABLED,
              })}
              onClick={() =>
                !props.editable &&
                props.onTagStateChangeRequest?.({
                  name: tag.name,
                  state:
                    tag["state"] == FilteredTagsState.ACTIVE
                      ? FilteredTagsState.DISABLED
                      : FilteredTagsState.ACTIVE,
                })
              }
            >
              {
                <Tag
                  {...TagsFactory.createProps({
                    name: tag.name,
                    type: props.type,
                  })}
                  deletable={props.editable}
                  onDeleteTag={() => {
                    props.editable &&
                      props.onTagsChange?.(
                        props.tags.filter((oldTag) => oldTag != tag)
                      );
                  }}
                />
              }
            </button>
          ))
        }
      </div>
      <div className={classnames("tag-input", { visible: props.editable })}>
        <Input
          key="new"
          id="category"
          label="Add new"
          value={newTag}
          onTextChange={setNewTag}
          theme={InputStyle.DARK}
          onEnter={(e) => {
            // TODO: check if tag is effectively submittable
            props.editable &&
              props.onTagsChange?.([...props.tags, { name: newTag }]);
            setNewTag("");
            e.preventDefault();
          }}
        />
        <div className="new-tag-button">
          <Button
            onClick={() => {
              props.editable &&
                props.onTagsChange?.([...props.tags, { name: newTag }]);
              setNewTag("");
            }}
            theme={ButtonStyle.DARK}
            icon={faPlus}
            compact
          >
            Add New
          </Button>
        </div>
      </div>
      <style jsx>{`
        .filter-container {
          display: flex;
          flex-wrap: wrap;
        }
        .tag-input {
          align-items: center;
          display: none;
        }
        .tag-input.visible {
          display: flex;
        }
        .new-tag-button {
          padding-top: 26px;
        }
        .tag {
          flex-shrink: none;
          margin-bottom: 5px;
          margin-right: 5px;
          max-width: 500px;
          border: 0;
          background: none;
          padding: 0;
          border: 1px transparent solid;
        }
        .tag.disabled {
          opacity: 0.7;
        }
        .tag:active,
        .tag:focus {
          outline: none;
        }
        .tag:focus-visible {
          border: 1px red solid;
          border-radius: 13px;
        }
        .tag:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export enum FilteredTagsState {
  ACTIVE,
  DISABLED,
}

export interface DisplayTagsFilterProps {
  tags: { name: string; state: FilteredTagsState }[];
  type: TagType;
  editable?: false;
  onTagStateChangeRequest?: (details: {
    name: string;
    state: FilteredTagsState;
  }) => void;
  onClearTagsFilterRequests?: () => void;
}

export interface EditableTagsFilterProps {
  tags: { name: string }[];
  type: TagType;
  editable: true;
  onTagsChange: (tags: { name: string }[]) => void;
}

export type TagsFilterProps = DisplayTagsFilterProps | EditableTagsFilterProps;

export default TagsFilterSection;
