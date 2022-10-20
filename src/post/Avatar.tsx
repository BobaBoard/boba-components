import { SecretIdentityType, UserIdentityType } from "types";

import React from "react";
import classnames from "classnames";
import questionMark from "images/question_mark.png";

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
  const visibleSecretAvatar = !props.forceHide && props.userIdentity?.avatar;
  const currentAvatar = props.forceHide
    ? props.secretIdentity?.avatar
    : props.userIdentity?.avatar || props.secretIdentity?.avatar;
  const secretAvatar = props.secretIdentity?.avatar || questionMark;

  return (
    <div
      className={classnames("avatar-container", {
        compact: props.compact === true,
        mini: props.compact == "mini",
      })}
    >
      <img
        className={classnames("avatar", {
          "with-secret": visibleSecretAvatar,
          "with-border": !!props.secretIdentity?.color,
        })}
        src={secretAvatar}
        ref={ref}
        aria-label="The avatar of the secret identity"
      />
      {props.secretIdentity?.accessory && (
        <img
          src={props.secretIdentity?.accessory}
          className="accessory"
          aria-label="The secret identity accessory"
        />
      )}
      <img
        className={classnames("secret-avatar", {
          visible: visibleSecretAvatar,
        })}
        src={currentAvatar}
        aria-label="The avatar of the user identity"
      />
      <style jsx>{`
        .avatar-container * {
          box-sizing: border-box;
        }
        .avatar-container {
          position: relative;
        }
        .accessory {
          position: absolute;
          top: 50%;
          left: 50%;
          /* remove half the margin */
          transform: translate(calc(-50% - 4px), -50%);
          pointer-events: none;
        }
        .compact .accessory {
          transform: translate(calc(-50% - 3px), -50%) scale(0.85);
        }
        .avatar {
          position: relative;
          width: 40px;
          height: 40px;
          display: block;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 5px;
        }
        .avatar.with-border {
          border: 2px solid
            ${props.secretIdentity ? props.secretIdentity.color : "transparent"};
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
        .avatar-container.mini .avatar.with-secret {
          mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)) 0% 0% /
              cover,
            radial-gradient(
                26px at right -4px bottom 12px,
                transparent 50%,
                black 51%
              )
              right bottom;
          mask-size: cover;
        }
        .avatar-container.mini .avatar {
          width: 25px;
          height: 25px;
        }
        .avatar-container.mini .avatar.with-secret {
          margin-right: 20px;
        }
        .secret-avatar {
          position: absolute;
          top: 100%;
          bottom: 0;
          transform: translate(22px, -20px);
          width: 22px;
          height: 22px;
          display: none;
          object-fit: cover;
          border-radius: 50%;
        }
        .avatar-container.compact .secret-avatar {
          width: 20px;
          height: 20px;
          transform: translate(19px, -17px);
        }
        .avatar-container.mini .secret-avatar {
          width: 25px;
          height: 25px;
          transform: translate(17px, -24px);
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
  secretIdentity?:
    | SecretIdentityType
    | {
        name?: undefined;
        avatar?: undefined;
        color?: undefined;
        accessory?: string;
      };
  userIdentity?: UserIdentityType;
  forceHide?: boolean;
  compact?: boolean | "mini";
}

export default Avatar;
