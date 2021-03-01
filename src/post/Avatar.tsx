import React from "react";
import classnames from "classnames";

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
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
          ref={ref}
        />
        {props.accessory && <img src={props.accessory} className="accessory" />}
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
        .accessory {
          position: absolute;
          top: 50%;
          left: 50%;
          /* remove half the margin */
          transform: translate(calc(-50% - 5px), -50%);
          pointer-events: none;
        }
        .compact .accessory {
          transform: translate(calc(-50% - 5px), -50%) scale(0.85);
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
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
                26px circle at bottom 9px right 7px,
                transparent 50%,
                black 51%
              )
              bottom right;
          mask-size: cover;
        }
        .avatar-container.compact .avatar.with-secret {
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
            radial-gradient(
                24px circle at bottom 7px right 6px,
                transparent 50%,
                black 51%
              )
              bottom right;
          mask-size: cover;
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
});

Avatar.displayName = "Avatar";
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
  accessory?: string;
}

export default Avatar;
