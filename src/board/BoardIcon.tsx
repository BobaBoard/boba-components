import React from "react";
import cx from "classnames";

const BoardIcon: React.FC<BoardIconProps> = ({
  avatar,
  color,
  href,
  onClick,
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
        })}
      >
        <a
          onClick={React.useCallback(
            (e) => {
              onClick?.();
              e.preventDefault();
            },
            [onClick]
          )}
          href={href}
        />
        {!!updates && <div className="board-icon__update" />}
      </div>
      <style jsx>{`
        .board-icon {
          background: url("${avatar}");
          background-position: center;
          background-size: cover;
          border: 2px solid ${color};
          border-radius: 15px;
          box-sizing: border-box;
          cursor: pointer;
          position: relative;
        }
        .board-icon.large {
          width: 50px;
          height: 50px;
        }
        .board-icon.small {
          width: 35px;
          height: 35px;
        }
        .board-icon__update {
          background-color: ${color};
          border: 2px solid #252526;
          border-radius: 50%;
          box-sizing: border-box;
          width: 15px;
          height: 15px;
          position: absolute;
          top: -7.5px;
          left: -7.5px;
        }
      `}</style>
    </>
  );
};

export default BoardIcon;

export interface BoardIconProps {
  avatar: string;
  color?: string;
  onClick?: () => void;
  href?: string;
  updates?: number | boolean;
  small?: boolean;
  large?: boolean;
}
