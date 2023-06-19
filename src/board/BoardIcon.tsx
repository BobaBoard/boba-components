import {
  faMapMarkerAlt,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import Color from "color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import cx from "classnames";

const BoardIcon: React.FC<BoardIconProps> = ({
  avatar,
  color,
  updates,
  small,
  large,
  muted,
  outdated,
  current,
}) => (
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
        {!!updates && <div className="board-icon__update" role="presentation" />}
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
        .board-icon * {
          box-sizing: border-box;
        }
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
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
                21px at left 2px top 2px,
                transparent 50%,
                black 55%
              )
              left top;
        }
        .board-icon.small.updates:not(.current) .board-image {
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
                16px at left 2px top 2px,
                transparent 50%,
                black 54%
              )
              left top;
        }
        .board-icon.large.updates.current .board-image {
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
              14px at left 0px top 0px,
              transparent 14px,
              black 14px,
              black 45px,
              transparent 41px
            ),
            radial-gradient(
                11px at right 2px bottom 4px,
                transparent 12px,
                black 13px,
                black 45px,
                transparent 41px
              )
              bottom right;
        }
        .board-icon.large {
          width: 50px;
          height: 50px;
        }
        .board-icon .board-image {
          width: 100%;
          height: 100%;
        }
        .board-icon.large.current:not(.updates) .board-image {
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
                11px at right 2px bottom 4px,
                transparent 12px,
                black 13px
              )
              right bottom;
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
          background-color: ${Color(color?.toLowerCase()).darken(0.6).hex()};
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
