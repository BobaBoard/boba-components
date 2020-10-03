import React from "react";

import BoardPreview from "./BoardPreview";
import Tag from "../common/Tag";
import { LinkWithAction } from "types";
import Button, { ButtonStyle } from "../common/Button";
import DropdownMenu, { DropdownStyle } from "../common/DropdownListMenu";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

const BoardSidebar: React.FC<BoardSidebarProps> = (props) => {
  return (
    <div className="sidebar">
      <div className="board-details">
        <div className="board-preview">
          <BoardPreview
            slug={props.slug}
            avatar={props.avatarUrl}
            description={props.tagline}
            color={props.accentColor}
            muted={props.muted}
          />
          <div
            className={classnames("preview-options", {
              visible: !!props.previewOptions,
            })}
          >
            <DropdownMenu
              options={props.previewOptions || []}
              style={DropdownStyle.DARK}
              accentColor={props.accentColor}
              zIndex={200}
            >
              <Button
                icon={faCaretDown}
                compact
                color={props.accentColor}
                theme={ButtonStyle.DARK}
              >
                Options
              </Button>
            </DropdownMenu>
          </div>
        </div>
        <div className="tag-clouds">
          {props.boardWideTags && (
            <>
              <h2>Board-wide Tags</h2>
              <div className="tag-group">
                {props.boardWideTags.map((tag) => (
                  <Tag name={tag.name} color={tag.color} />
                ))}
              </div>
            </>
          )}
          {props.canonicalTags && (
            <>
              <h2>Canonical Board Tags</h2>
              <div className="tag-group">
                {props.canonicalTags.map((tag) => (
                  <Tag name={tag.name} color={tag.color} />
                ))}
              </div>
            </>
          )}
          {props.contentRulesTags && (
            <>
              <h2>Content Rules</h2>
              <div className="tag-group">
                {props.contentRulesTags.map((tag) => (
                  <Tag
                    symbol={tag.allowed ? "✓" : "✘"}
                    name={tag.name}
                    color={tag.allowed ? "#66f98c" : "#ff0124"}
                  />
                ))}
              </div>
            </>
          )}
          {props.otherRules && (
            <>
              <h2>Other Rules</h2>
              <div className="other">{props.otherRules}</div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        h2 {
          color: white;
          font-size: 16px;
          font-weight: bold;
        }
        .tag-clouds {
          margin-top: 30px;
        }
        .tag-group {
          display: flex;
          flex-wrap: wrap;
        }
        .tag-group > :global(div) {
          margin-bottom: 3px;
          margin-right: 3px;
        }
        .sidebar {
          padding: 20px;
        }
        .board-details {
          margin-top: 30px;
        }
        .board-preview {
          text-align: center;
          position: relative;
        }
        .other :global(ul) {
          padding-left: 30px;
        }
        .other :global(li) {
          color: white;
          font-size: 15px;
          margin-bottom: 10px;
        }
        .preview-options {
          display: none;
          position: absolute;
          top: 8px;
          right: 8px;
        }
        .preview-options.visible {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default BoardSidebar;

export interface BoardSidebarProps {
  slug: string;
  avatarUrl: string;
  tagline: string;
  accentColor: string;
  boardWideTags?: {
    name: string;
    color: string;
  }[];
  canonicalTags?: {
    name: string;
    color: string;
  }[];
  contentRulesTags?: {
    allowed: boolean;
    name: string;
  }[];
  otherRules?: JSX.Element;
  previewOptions?: { name: string; link: LinkWithAction }[];
  muted?: boolean;
}
