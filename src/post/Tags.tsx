import React from "react";

import Tag from "../common/Tag";
import classnames from "classnames";
import debug from "debug";

const log = debug("bobaui:tagsinput-log");

const TAG_LENGTH_LIMIT = 100;
const ADD_A_TAG_STRING = "add a tag...";
const HEIGHT_TRIGGER = 30;

const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsChange,
  editable,
}) => {
  const [deleteState, setDeleteState] = React.useState(false);
  const spanRef = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    if (spanRef.current) {
      spanRef.current.innerHTML = ADD_A_TAG_STRING;
    }
  }, [spanRef]);

  return (
    <>
      <div className="container">
        {!!tags.length && (
          <>
            {tags.map((tag, index) => (
              <div
                key={index}
                className={classnames("tag-container", {
                  deleting: deleteState && index == tags.length - 1,
                })}
              >
                <Tag
                  name={tag}
                  compact
                  highlightColor={
                    deleteState && index == tags.length - 1
                      ? "red"
                      : "rgba(0, 0, 0, 0.8)"
                  }
                />
              </div>
            ))}
          </>
        )}
        {!!editable && (
          <span
            className="tag-input"
            ref={spanRef}
            onKeyDown={(e) => {
              const inputValue = (e.target as HTMLSpanElement).innerText;

              if (inputValue.length == 0 && e.key == "Backspace") {
                log(`Received backspace on empty tag`);
                if (!deleteState) {
                  log(`Entering delete state for previous tag`);
                  setDeleteState(true);
                  return;
                }
                log(`Deleting previous tag`);
                setDeleteState(false);
                onTagsChange?.(tags.slice(0, -1));
                return;
              }
              setDeleteState(false);

              if (e.key === "Enter") {
                if (inputValue.trim().length == 0) {
                  log(`Received enter on empty tag`);
                  e.preventDefault();
                  return;
                }
                log(`Entering new tag ${inputValue}`);
                onTagsChange?.([...tags, inputValue.trim()]);
                if (spanRef.current) {
                  spanRef.current.innerText = "";
                  spanRef.current.style.width = "auto";
                  spanRef.current.style.flex = "1";
                }
                e.preventDefault();
              }
            }}
            onBeforeInput={(e) => {
              const target = e.target as HTMLSpanElement;
              let inputValue = target.innerText;
              if (inputValue.length >= TAG_LENGTH_LIMIT) {
                log("Tag Limit Reached Cannot Insert new Value");
                e.preventDefault();
              }

              if (/[\n]/g.test(inputValue)) {
                log("Found New Line Blocking");
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const target = e.target as HTMLSpanElement;
              let value = target.innerHTML;
              if (/<\/?[^>]+(>|$)|\n/g.test(value)) {
                let text = value.replace(/<\/?[^>]+(>|$)/g, "");
                text = text.replace(/\n/g, " ");
                text = text.replace(/&nbsp;/g, " ");
                log("Removing newLine and HTML tags");
                target.textContent = text.substr(0, TAG_LENGTH_LIMIT);
              }
            }}
            onFocus={(e) => {
              const target = e.target as HTMLSpanElement;
              const value = target.innerText;
              if (value === ADD_A_TAG_STRING) {
                log('Focused: Removing "add a tag..."');
                if (spanRef.current) {
                  spanRef.current.innerText = "";
                }
              } else {
                log("Focused: Found text not Removing anything");
              }
            }}
            onBlur={(e) => {
              if (!spanRef.current) {
                return;
              }
              const value = spanRef.current.innerText;
              if (value.trim()) {
                onTagsChange?.([...tags, value.trim()]);
              }
              spanRef.current.innerText = ADD_A_TAG_STRING;
              console.log(spanRef.current.getBoundingClientRect());
              log('Blur: Adding "Add a tag..."');
              spanRef.current.style.width = "auto";
              spanRef.current.style.flex = "1";
              setDeleteState(false);
            }}
            onKeyUp={(e) => {
              const target = e.target as HTMLSpanElement;
              if (target.getBoundingClientRect().height > HEIGHT_TRIGGER) {
                log(`Multiline detected. Switching to full line.`);
                target.style.width = "100%";
                target.style.flex = "auto";
              }
            }}
            contentEditable={true}
          />
        )}
      </div>
      <style jsx>{`
        .container {
          padding: 5px;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          box-sizing: border-box;
        }
        .tag-input {
          flex: 1;
          word-break: normal;
          min-width: 100px;
          max-width: 500px;
          padding: 5px;
          margin: 2px 2px;
        }
        .tag-container:hover {
          cursor: pointer;
        }
        .tag-container {
          margin-right: 3px;
          display: flex;
          align-items: center;
          word-break: break-all;
        }
      `}</style>
    </>
  );
};

export default TagsInput;

export interface TagsInputProps {
  tags: string[];
  onTagsChange?: (newTags: string[]) => void;
  editable?: boolean;
}
