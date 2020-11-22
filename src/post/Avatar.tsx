import React from "react";
import classnames from "classnames";

import CircleMask from "../images/circle-mask.svg";

const Avatar: React.FC<AvatarProps> = (props) => {
  const visibleSecretAvatar =
    !props.forceHide &&
    props.userIdentity?.avatar &&
    props.secretIdentity?.avatar;
  const currentAvatar = props.forceHide
    ? props.secretIdentity?.avatar
    : props.userIdentity?.avatar || props.secretIdentity?.avatar;
  const secretAvatar = props.secretIdentity?.avatar || "";

  return (
    <div
      className={classnames("avatar-container", {
        compact: props.compact,
      })}
    >
      <div className={classnames("avatar-wrapper")}>
        <div
          className={classnames("avatar", {
            "with-secret": visibleSecretAvatar,
          })}
        />
        <div
          className={classnames("secret-avatar", {
            visible: visibleSecretAvatar,
          })}
        />
      </div>
      <style jsx>{`
        .avatar-wrapper {
          position: relative;
        }
        .avatar {
          position: relative;
          width: 40px;
          height: 40px;
          display: block;
          background: url("${currentAvatar}");
          background-size: cover;
          border-radius: 50%;
          margin-right: 10px;
        }
        .avatar:not(.with-secret) {
        }
        .avatar.with-secret {
          mask: url(${CircleMask}), url(${CircleMask}) 20px 18px/26px 26px;
          mask-composite: source-out;
          mask-repeat: no-repeat;
        }
        .avatar-container.compact .avatar.with-secret {
          mask: url(${CircleMask}), url(${CircleMask}) 16px 16px/25px 25px;
          mask-composite: source-out;
          mask-repeat: no-repeat;
        }
        .avatar-container.compact .avatar {
          width: 35px;
          height: 35px;
        }
        .secret-avatar {
          position: absolute;
          top: 100%;
          bottom: 0;
          transform: translate(22px, -20px);
          width: 22px;
          height: 22px;
          display: none;
          background: url("${secretAvatar}");
          background-size: cover;
          border-radius: 50%;
        }
        .avatar-container.compact .secret-avatar {
          width: 20px;
          height: 20px;
          transform: translate(19px, -17px);
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
