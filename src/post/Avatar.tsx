import React from "react";
import classnames from "classnames";

import AvatarMask from "../images/avatar_mask.svg";

const Avatar: React.FC<AvatarProps> = (props) => {
  const visibleSecretAvatar =
    !props.forceHide &&
    props.userIdentity?.avatar &&
    props.secretIdentity?.avatar;
  return (
    <div
      className={classnames("avatar-container", {
        compact: props.compact,
      })}
    >
      <div className={classnames("avatar-wrapper")}>
        <div
          className={classnames("avatar", {
            mask: visibleSecretAvatar,
          })}
        />
        <div
          className={classnames("secret-avatar", {
            visible: visibleSecretAvatar,
          })}
        />
      </div>
      <style jsx>{`
        .avatar-container {
          width: 80px;
        }
        .avatar-container.compact {
          width: 55px;
        }
        .avatar-wrapper {
          position: relative;
        }
        .avatar {
          position: relative;
          width: 50px;
          height: 50px;
          display: block;
          align-self: center;
          background: url("${props.forceHide
            ? props.secretIdentity?.avatar
            : props.userIdentity?.avatar || props.secretIdentity?.avatar}");
          background-size: cover;
          border-radius: 50%;
        }
        .avatar.mask {
          mask-image: url(${AvatarMask});
          mask-position: center;
          mask-repeat: no-repeat;
        }
        .avatar-container.compact .avatar {
          width: 35px;
          height: 35px;
        }
        .secret-avatar {
          position: absolute;
          top: 18px;
          left: 39px;
          width: 33px;
          height: 33px;
          display: none;
          background: url("${props.secretIdentity?.avatar}");
          background-size: cover;
          border-radius: 50%;
        }
        .avatar-container.compact .secret-avatar {
          width: 20px;
          height: 20px;
          top: 14px;
          left: 29px;
        }
        .secret-avatar.visible {
          display: block;
        }
      `}</style>
    </div>
  );
};
export interface AvatarProps {
  secretIdentity?: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  forceHide?: boolean;
  compact?: boolean;
}

export default Avatar;
