import React from "react";
import { TagType } from "types";
import TagsFactory from "./TagsFactory";
import classnames from "classnames";

export interface TagSuggestionsProps {
  description: React.ReactNode;
  tags: string[];
  onSelectTag: (tag: string) => void;
  type: TagType;
}

const TagSuggestions: React.FC<TagSuggestionsProps> = (props) => (
  <div className={classnames("tags-suggestions")}>
    <div className="description">{props.description}</div>
    <div className="tags-container">
      {props.tags?.map((category) => (
        <button
          key={category}
          className={classnames("tag-container")}
          // We use mouse down rather than on click because this runs
          // before the blur event.
          onMouseDown={(event) => {
            props.onSelectTag(category);
            event.preventDefault();
          }}
        >
          {TagsFactory.create({
            name: category,
            accentColor: "white",
            type: props.type,
          })}
        </button>
      ))}
    </div>
    <style jsx>{`
      .tag-container {
        margin: 5px 5px 0 0;
        align-items: center;
        word-break: break-word;
        display: inline-flex;
        position: relative;
        border: 0;
        background: none;
        padding: 0;
      }

      .description {
        font-size: var(--font-size-small);
      }
      .tags-container {
        margin-top: 2px;
        padding-top: 4px;
      }

      .tags-suggestions .tag-container {
        margin-top: 3px;
        margin-bottom: 3px;
        margin-right: 10px;
      }
      .tags-suggestions .tag-container:hover {
        cursor: pointer;
      }
    `}</style>
  </div>
);

export default TagSuggestions;
