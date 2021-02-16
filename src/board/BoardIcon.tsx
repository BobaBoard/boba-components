import React from "react";
import cx from "classnames";
import CircleMask from "../images/circle-mask.svg";
import RectangleMask from "../images/rectangle-mask.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import Color from "color";

const CURRENT_BOARD_PIN_MASK = `url(${CircleMask}) 35px 32px / 25px 24px;`;
const BoardIcon: React.FC<BoardIconProps> = ({
  avatar,
  color,
  updates,
  small,
  large,
  muted,
  outdated,
  current,
}) => {
  return (
    <>
      <div
        className={cx("board-icon", {
          large: !!large,
          small: !!small,
          updates: !!updates,
          outdated: !!outdated,
          current: !!current,
        })}
      >
        <div className="board-image" />
        {!!updates && <div className="board-icon__update" />}
        {!!muted && (
          <div className="board-state-icon muted">
            <FontAwesomeIcon icon={faVolumeMute} />
          </div>
        )}
        {!!current && (
          <div className="current-board-icon">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
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
        .board-icon.large.updates:not(.current) .board-image:not(.current) {
          mask: url(${RectangleMask}),
            url(${CircleMask}) -7.5px -7.5px/20px 20px;
          mask-composite: source-out;
          mask-repeat: no-repeat;
        }
        .board-icon.small.updates:not(.current) .board-image {
          mask: url(${RectangleMask}),
            url(${CircleMask}) -3.5px -3.5px/12px 12px;
          mask-composite: source-out;
          mask-repeat: no-repeat;
        }
        .board-icon.large.updates.current .board-image {
          mask: url(${RectangleMask}),
            url(${CircleMask}) -7.5px -7.5px/21px 21px,
            ${CURRENT_BOARD_PIN_MASK};
          mask-composite: xor;
          mask-repeat: no-repeat;
        }
        .board-icon.large .board-image {
          width: 50px;
          height: 50px;
        }
        .board-icon.large.current:not(.updates) .board-image {
          mask: url(${RectangleMask}), ${CURRENT_BOARD_PIN_MASK};
          mask-composite: source-out;
          mask-repeat: no-repeat;
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
        .board-state-icon {
          background-color: rgb(46, 46, 48);
          border-radius: 50%;
          box-sizing: border-box;
          position: absolute;
          width: 25px;
          height: 25px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .board-state-icon :global(svg) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .board-state-icon.muted {
          color: rgb(191, 191, 191);
        }
        .current-board-icon {
          color: #ff0f4b;
          position: absolute;
          right: 0;
          bottom: 0;
          transform: translate(-3px, -5px);
        }
        .current-board-icon :global(svg) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 14px;
        }
        .board-icon.small .board-state-icon {
          width: 20px;
          height: 20px;
        }
        .board-icon.small .board-state-icon :global(svg) {
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
  current?: boolean;
}
