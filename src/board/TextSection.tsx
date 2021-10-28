import Input, { InputStyle } from "../common/Input";

import Editor from "@bobaboard/boba-editor";
import React from "react";
import classnames from "classnames";
import debug from "debug";
import noop from "noop-ts";

// @ts-ignore
const log = debug("bobaui:boards:sidebarSection");

const TextSection: React.FC<TextSectionProps> = (props) => {
  return (
    <div
      className={classnames("sidebar-section", { editable: props.editable })}
    >
      {/* <div className="title">
        {props.editable ? (
          <Input
            id="title"
            label="title"
            value={props.title}
            onTextChange={props.onTitleChange || noop}
            theme={InputStyle.DARK}
            disabled={!props.editable}
          />
        ) : (
          <div className="title">{props.title}</div>
        )}
      </div> */}
      <div className="description">
        <div
          className={classnames("content-editor", {
            editing: props.editable,
          })}
        >
          <Editor
            initialText={props.description ? JSON.parse(props.description) : ""}
            editable={props.editable || false}
            onTextChange={(text) =>
              props.editable &&
              props.onDescriptionChange?.(JSON.stringify(text.ops))
            }
          />
        </div>
      </div>
      <style jsx>{`
         {
          /* .content-title {
          font-size: var(--font-size-large);
        }
        .title {
          font-weight: bold;
          font-size: var(--font-size-regular);
          margin-bottom: 10px;
        }
        .sidebar-section {
          color: white;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        } */
        }
        .content-editor.editing {
          border: 1px solid rgba(255, 255, 255, 0.3);
          min-height: 300px;
        }
        .content-editor {
          background-color: #2f2f30;
          border-radius: 8px;
          padding: 10px 15px 15px;
          --text-color: white;
          --text-padding: 0px;
        }

        .content-editor :global(.ql-editor > * + *) {
          margin: 10px 0 0 0 !important;
        }

        .content-editor :global(.ql-editor > ul, .ql-editor > ol) {
          padding: 0;
        }

        .content-editor :global(.ql-editor > ul > li, .ql-editor > ol > li) {
          padding-left: 1em;
        }
      `}</style>
    </div>
  );
};

export interface DisplayTextSectionProps {
  title: string;
  description: string;
  editable?: false;
}

export interface EditableTextSectionProps {
  title: string;
  description: string;
  editable: true;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
}

export type TextSectionProps =
  | DisplayTextSectionProps
  | EditableTextSectionProps;

export default TextSection;
