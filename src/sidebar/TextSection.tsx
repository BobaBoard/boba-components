import Editor from "@bobaboard/boba-editor";
import React from "react";
import classnames from "classnames";
import debug from "debug";

// @ts-ignore
const log = debug("bobaui:boards:sidebarSection");

const TextSection: React.FC<TextSectionProps> = (props) => {
  // For some reason, two description changes are triggered automatically
  // when the component is first mounted (likely this is a Editor thing).
  // To avoid surprising behavior, we simply swallow them.
  // TODO: this hack should be investigated and potentially removed.
  const swallowInitialDescriptionChange = React.useRef<number>(2);
  return (
    <div
      className={classnames("sidebar-section", { editable: props.editable })}
    >
      <div className="description">
        <div
          className={classnames("content-editor", {
            editing: props.editable,
          })}
        >
          <Editor
            initialText={props.description ? JSON.parse(props.description) : {}}
            editable={props.editable || false}
            onTextChange={(text) => {
              if (swallowInitialDescriptionChange.current) {
                swallowInitialDescriptionChange.current--;
                return;
              }
              props.editable &&
                props.onDescriptionChange?.(JSON.stringify(text.ops));
            }}
          />
        </div>
      </div>
      <style jsx>{`
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
  description: string;
  editable?: false;
}

export interface EditableTextSectionProps {
  description: string;
  editable: true;
  onDescriptionChange?: (description: string) => void;
}

export type TextSectionProps =
  | DisplayTextSectionProps
  | EditableTextSectionProps;

export default TextSection;
