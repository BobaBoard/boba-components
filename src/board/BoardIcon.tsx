import React from "react";
import cx from "classnames";
import { LinkWithAction } from "types";
import CircleMask from "../images/circle-mask.svg";
import RectangleMask from "../images/rectangle-mask.svg";

const BoardIcon: React.FC<BoardIconProps> = ({
  avatar,
  color,
  link,
  updates,
  small,
  large,
}) => {
  return (
    <>
      <div
        className={cx("board-icon", {
          large: !!large,
          small: !!small,
          updates: !!updates,
        })}
      >
        <div className="board-image" />
        {!!updates && <div className="board-icon__update" />}
      </div>
      <style jsx>{`
        .board-icon {
          cursor: pointer;
          position: relative;
          display: block;
        }
        .board-image {
          background: url("${avatar}");
          background-position: center;
          background-size: cover;
          border: 2px solid ${color};
          border-radius: 15px;
          box-sizing: border-box;
        }
        .updates .board-image {
          mask: url(${RectangleMask}),
            url(${CircleMask}) -7.5px -7.5px/20px 20px;
          mask-composite: source-out;
          mask-repeat: no-repeat;
        }

        .board-icon.small.updates .board-image {
          mask: url(${RectangleMask}),
            url(${CircleMask}) -3.5px -3.5px/12px 12px;
          mask-composite: source-out;
          mask-repeat: no-repeat;
        }
        .board-icon.large .board-image {
          width: 50px;
          height: 50px;
        }
        .board-icon.small .board-image {
          width: 35px;
          height: 35px;
        }
        .board-icon__update {
          background-color: ${color};
          border-radius: 50%;
          box-sizing: border-box;
          width: 15px;
          height: 15px;
          position: absolute;
          top: -5.5px;
          left: -5.5px;
        }
        .board-icon.small .board-icon__update {
          width: 10px;
          height: 10px;
          position: absolute;
          top: -3px;
          left: -3px;
        }
      `}</style>
    </>
  );
};

export default BoardIcon;

export interface BoardIconProps {
  avatar: string;
  color?: string;
  link?: LinkWithAction;
  updates?: number | boolean;
  small?: boolean;
  large?: boolean;
}
