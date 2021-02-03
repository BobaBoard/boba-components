import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export interface TagProps {
  name: string;
  deletable?: false;
  symbol?: string | React.ReactNode;
  color?: string;
  accentColor?: string;
  compact?: boolean;
}

export interface DeletableTagProps {
  name: string;
  deletable: true;
  onDeleteTag: (name: string) => void;
  symbol?: string | React.ReactNode;
  color?: string;
  accentColor?: string;
  compact?: boolean;
}

const Tag: React.FC<TagProps | DeletableTagProps> = (props) => {
  return (
    <>
      <div
        className={classnames("tag", {
          compact: !!props.compact,
          text: !props.color,
          deletable: !!props.deletable,
        })}
      >
        <span className="hashtag">{props.symbol ?? "#"}</span>
        {props.name}
        {props.deletable && (
          <button
            onClick={() => props.onDeleteTag?.(props.name)}
            className={classnames("delete")}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </div>
      <style jsx>{`
        .hashtag {
          opacity: 0.4;
          margin-right: 4px;
          flex-shrink: 0;
          align-self: center;
          display: inline-flex;
        }
        .tag {
          padding: 5px 8px 5px 8px;
          border-radius: 13px;
          background-color: ${props.color};
          color: ${props.accentColor || "black"};
          overflow-wrap: break-word;
          word-break: break-word;
          position: relative;
        }
        .tag.deletable {
          display: flex;
          padding-right: 25px;
        }
        .tag.text {
          display: inline;
        }
        .tag.text .hashtag {
          float: left;
          display: inline;
          margin-left: 2px;
          margin-right: 3px;
        }
        .tag.text .hashtag :global(svg) {
          margin-top: 1px;
          height: 12px;
        }
        .delete {
          display: none;
        }

        .deletable > .delete {
          display: block;
          position: absolute;
          right: 0;
          padding: 6px;
          top: 0;
          bottom: 0;
          color: inherit;
          opacity: 0.6;
        }

        .deletable > .delete:hover {
          opacity: 1;
        }

        .deletable > .delete:active,
        .deletable > .delete:focus {
          outline: 0;
        }

        .deletable > .delete:focus-visible > :global(svg) {
          box-shadow: 0 0 0 4px blue;
          border-radius: 50%;
        }

        .deletable > .delete > :global(svg) {
          display: block;
          width: 13px;
          height: 13px;
          margin: auto;
        }

        :global(.editable) .tag.text {
          background-color: rgba(47, 47, 48, 0.15);
          padding: 5px 25px 5px 8px;
        }

        :global(.editable) .deletable.tag.text > .delete {
          color: #4d4d4d;
        }

        button {
          border-width: 0;
          background-color: transparent;
          padding: 0;
        }
        button:hover {
          cursor: pointer;
        }
        .tag.compact {
          font-size: smaller;
        }
        .tag.text {
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default Tag;
