import React from "react";
import classnames from "classnames";

import AvatarMask from "../../stories/images/avatar_mask.svg";

const Avatar: React.FC<AvatarProps> = (props) => {
  const visibleSecretAvatar =
    !props.forceHide &&
    props.userIdentity?.avatar &&
    props.secretIdentity?.avatar;
  return (
    <>
      <div className={classnames("avatar", { mask: visibleSecretAvatar })}>
        <div
          className={classnames("secret-avatar", {
            visible: visibleSecretAvatar,
          })}
        />
      </div>
      <style jsx>{`
        .avatar {
          position: relative;
          width: 60px;
          margin-right: 5%;
          height: 60px;
          min-width: 30px;
          min-height: 30px;
          display: block;
          align-self: center;
        }
        .avatar::before {
          background: url("${props.forceHide
            ? (props.secretIdentity || {}).avatar
            : (props.userIdentity || {}).avatar ||
              (props.secretIdentity || {}).avatar}");
          background-size: cover;
          display: block;
          content: "";
          width: 100%;
          padding-top: 100%;
          position: absolute;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        .avatar.mask {
          margin-right: 40px;
        }
        .avatar.mask::before {
          mask-image: url(${AvatarMask});
          mask-position: center;
          mask-repeat: no-repeat;
        }
        .secret-avatar {
          position: absolute;
          bottom: 0;
          right: -42%;
          width: 64%;
          height: 64%;
          display: none;
        }
        .secret-avatar.visible {
          display: block;
        }
        .secret-avatar::before {
          background: url("${(props.secretIdentity || {}).avatar}");
          background-size: cover;
          display: block;
          content: "";
          width: 100%;
          padding-top: 100%;
          position: absolute;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        @media only screen and (max-width: 300px) {
          .avatar {
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
    </>
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
}

export default Avatar;
