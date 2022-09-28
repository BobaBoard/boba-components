import Input, { InputStyle } from "common/Input";
import TagsFactory, { getDataForTagType } from "./TagsFactory";

import Button from "buttons/Button";
import { ButtonStyle } from "buttons/Button";
import React from "react";
import Tag from "tags/Tag";
import { TagType } from "types";
import classnames from "classnames";
import debug from "debug";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
const log = debug("bobaui:common:TagsFilter");

const TagsFilter: React.FC<TagsFilterProps> = (props) => {
  const [newTag, setNewTag] = React.useState("");

  return (
    <div className="filter-section">
      <div className="filter-container">
        {props.tags.map((tag) => (
          <div
            key={tag.name}
            className={classnames("tag", {
              disabled: tag.state === FilteredTagsState.DISABLED,
            })}
            role="switch"
            aria-checked={tag.state !== FilteredTagsState.DISABLED}
            onClick={() =>
              !props.editable &&
              props.onTagStateChangeRequest?.({
                name: tag.name,
                state:
                  tag.state == FilteredTagsState.ACTIVE
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
                      props.tags
                        .filter((oldTag) => oldTag.name != tag.name)
                        .map((tag) => ({ name: tag.name }))
                    );
                }}
              />
            }
          </div>
        ))}
        {!props.editable && typeof props.uncategorized !== "undefined" && (
          <div
            key={"uncategorized"}
            className={classnames("tag", {
              disabled: props.uncategorized === FilteredTagsState.DISABLED,
            })}
            role="switch"
            aria-checked={props.uncategorized !== FilteredTagsState.DISABLED}
            onClick={() =>
              !props.editable &&
              props.onUncategorizedStateChangeRequest?.(
                props.uncategorized == FilteredTagsState.ACTIVE
                  ? FilteredTagsState.DISABLED
                  : FilteredTagsState.ACTIVE
              )
            }
          >
            <Tag
              name="uncategorized"
              color="lightgray"
              symbol={getDataForTagType(props.type).symbol}
              compact
            />
          </div>
        )}
      </div>
      <div className={classnames("tag-input", { visible: props.editable })}>
        <Input
          key="new"
          id="category"
          label="Add new tag"
          value={newTag}
          onTextChange={setNewTag}
          theme={InputStyle.DARK}
          onEnter={(e) => {
            // TODO: check if tag is effectively submittable
            props.editable &&
              props.onTagsChange?.([
                ...props.tags.map((tag) => ({ name: tag.name })),
                { name: newTag },
              ]);
            setNewTag("");
            e.preventDefault();
          }}
        />
        <div className="new-tag-button">
          <Button
            onClick={() => {
              props.editable &&
                props.onTagsChange?.([
                  ...props.tags.map((tag) => ({ name: tag.name })),
                  { name: newTag },
                ]);
              setNewTag("");
            }}
            theme={ButtonStyle.DARK}
            icon={faPlus}
            label="Add tag button"
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
  uncategorized?: FilteredTagsState;
  onUncategorizedStateChangeRequest?: (nextState: FilteredTagsState) => void;
}

export interface EditableTagsFilterProps {
  tags: { name: string; state?: FilteredTagsState }[];
  type: TagType;
  editable: true;
  onTagsChange: (tags: { name: string }[]) => void;
}

export type TagsFilterProps = DisplayTagsFilterProps | EditableTagsFilterProps;

export default TagsFilter;
