import React from "react";

import BoardIcon from "./BoardIcon";

const BoardMenuItem: React.FC<BoardMenuItemProps> = ({
  avatar,
  color,
  updates,
  slug,
}) => {
  return (
    <>
      <div className="boardMenuItem">
        <div className="boardMenuItem-icon">
          <BoardIcon avatar={avatar} color={color} updates={updates} small />
        </div>
        <span className="boardMenuItem-slug">!{slug}</span>
      </div>
      <style jsx>{`
        .boardMenuItem {
          background: #2e2e30;
          border-radius: 15px;
          height: 35px;
          position: relative;
        }
        .boardMenuItem-icon {
          position: absolute;
        }
        .boardMenuItem-slug {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          line-height: 35px;
          padding-left: 45px;
        }
      `}</style>
    </>
  );
};

export default BoardMenuItem;

export interface BoardMenuItemProps {
  avatar: string;
  color: string;
  updates?: number | boolean;
  slug: string;
}
