import React from "react";

import BoardPreview from "./BoardPreview";
import Tag from "../common/Tag";

const BoardSidebar: React.FC<BoardSidebarProps> = ({ board }) => {
  return (
    <div className="sidebar">
      <div className="board-details">
        <div className="board-preview">
          <BoardPreview
            slug={board.slug}
            avatar={board.avatar}
            description={board.description}
            color={board.color}
          ></BoardPreview>
        </div>
        <div className="tag-clouds">
          <h2>Board-wide Tags</h2>
          <div className="tag-group">
            <Tag name="gore" color="#f96680" />
            <Tag name="guro" color="#e22b4b" />
            <Tag name="nsfw" color="#27caba" />
            <Tag name="dead dove" color="#f9e066" />
          </div>
          <h2>Canonical Board Tags</h2>
          <div className="tag-group">
            <Tag name="request" color="#27caba" />
            <Tag name="blood" color="#f96680" />
            <Tag name="knifeplay" color="#93b3b0" />
            <Tag name="aesthetic" color="#24d282" />
            <Tag name="impalement" color="#27caba" />
            <Tag name="skullfuck" color="#e22b4b" />
            <Tag name="hanging" color="#f9e066" />
            <Tag name="torture" color="#f96680" />
            <Tag name="necrophilia" color="#93b3b0" />
            <Tag name="shota" color="#e22b4b" />
            <Tag name="fanfiction" color="#27caba" />
            <Tag name="rec" color="#f9e066" />
            <Tag name="doujinshi" color="#f96680" />
            <Tag name="untagged" color="#93b3b0" />
          </div>
          <h2>Content Rules</h2>
          <div className="tag-group">
            <Tag symbol="✓" name="shota" color="#66f98c" />
            <Tag symbol="✓" name="nsfw" color="#66f98c" />
            <Tag symbol="✓" name="noncon" color="#66f98c" />
            <Tag symbol="✘" name="IRL" color="#ff0124" />
            <Tag symbol="✘" name="RP" color="#ff0124" />
          </div>
          <h2>Other Rules</h2>
          <div className="other">
            <ul>
              <li>
                Shota <strong>must</strong> be tagged.
              </li>
              <li>
                Requests go in the appropriate tag. If the same request has been
                made less than a month ago, it will be deleted by the mods.
              </li>
              <li>
                Mods might add any TWs tag as they see fit. If you need help,
                add #untagged and a mod will take care of it.
              </li>
            </ul>
          </div>
          <div></div>
          <div></div>
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
        }
        .other ul {
          padding-left: 30px;
        }
        .other li {
          color: white;
          font-size: 15px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default BoardSidebar;

export interface BoardSidebarProps {
  board: {
    slug: string;
    avatar: string;
    description: string;
    color: string;
  };
}
