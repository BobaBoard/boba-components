import React from "react";
import { TagType } from "../types";
import TagsFactory from "./TagsFactory";
import classnames from "classnames";

export interface TagSuggestionsProps {
  title: string;
  description: string;
  tags: string[];
  onSelectTag: (tag: string) => void;
}

const TagSuggestions: React.FC<TagSuggestionsProps> = (props) => {
  return (
    <div className={classnames("suggestions-container categories-suggestions")}>
      <div className="title">{props.title}</div>
      <div>{props.description}</div>
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
            category: true,
            type: TagType.CATEGORY,
          })}
        </button>
      ))}
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
          margin-top: 20px;
          display: flex;
          -webkit-box-align: baseline;
          align-items: baseline;
        }
        .suggestions-container {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          transform: translateY(-100%);
          padding: 10px 15px;
          box-shadow: 0 0 0 1px #d2d2d2;
          border-radius: 10px 10px 0 0;
          background-color: white;
          font-size: 14px;
          color: rgb(87, 87, 87);
        }
        .categories-suggestions .tag-container {
          margin-top: 3px;
          margin-bottom: 3px;
          margin-right: 10px;
        }
        .categories-suggestions .tag-container:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TagSuggestions;
