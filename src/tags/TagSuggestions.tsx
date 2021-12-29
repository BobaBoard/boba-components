import DefaultTheme from "../theme/default";
import React from "react";
import { TagType } from "../types";
import TagsFactory from "./TagsFactory";
import classnames from "classnames";

export interface TagSuggestionsProps {
  title: string;
  description: string;
  tags: string[];
  onSelectTag: (tag: string) => void;
  type: TagType;
}

const TagSuggestions: React.FC<TagSuggestionsProps> = (props) => {
  return (
    <div className={classnames("tags-suggestions")}>
      <div className="title">{props.title}</div>
      <div className="description">{props.description}</div>
      <div className="tags-container">
        {props.tags?.map((category) => (
          <button
            key={category}
            className={classnames("tag-container")}
            // We use mouse down rather than on click because this runs
            // before the blur event.
            onMouseDown={(e) => {
              props.onSelectTag(category);
              e.preventDefault();
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
        .title {
          font-weight: bold;
          font-size: var(--font-size-regular);
          display: flex;
          -webkit-box-align: baseline;
          align-items: baseline;
        }
        .description {
          font-size: var(--font-size-small);
        }
        .tags-container {
          margin-top: 5px;
          padding-top: 4px;
          border-top: 1px dashed rgba(0, 0, 0, 0.3);
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
};

export default TagSuggestions;
