import React from "react";
import cx from "classnames";
import CircleMask from "../images/circle-mask.svg";
import RectangleMask from "../images/rectangle-mask.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import Color from "color";

const BoardIcon: React.FC<BoardIconProps> = ({
  avatar,
  color,
  updates,
  small,
  large,
  muted,
  outdated,
}) => {
  return (
    <>
      <div
        className={cx("board-icon", {
          large: !!large,
          small: !!small,
          updates: !!updates,
          outdated: !!outdated,
        })}
      >
        <div className="board-image" />
        {!!updates && <div className="board-icon__update" />}
        {!!muted && (
          <div className="board-icon__muted">
            <FontAwesomeIcon icon={faVolumeMute} />
          </div>
        )}
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
          border-radius: 11px;
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
        .outdated .board-icon__update {
          background-color: ${Color(color).darken(0.6).hex()};
        }
        .board-icon.small .board-icon__update {
          width: 10px;
          height: 10px;
          position: absolute;
          top: -3px;
          left: -3px;
        }
        .board-icon__muted {
          background-color: rgb(46, 46, 48);
          color: rgb(191, 191, 191);
          border-radius: 50%;
          box-sizing: border-box;
          position: absolute;
          width: 25px;
          height: 25px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .board-icon__muted :global(svg) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .board-icon.small .board-icon__muted {
          width: 20px;
          height: 20px;
        }
        .board-icon.small .board-icon__muted :global(svg) {
          width: 0.7em;
        }
      `}</style>
    </>
  );
};

export default BoardIcon;

export interface BoardIconProps {
  avatar: string;
  color?: string;
  muted?: boolean;
  updates?: number | boolean;
  small?: boolean;
  large?: boolean;
  outdated?: boolean;
}
