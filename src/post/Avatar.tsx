import React from "react";
import { SecretIdentityType } from "../types";
import Theme from "../theme/default";
import classnames from "classnames";
import questionMark from "../images/question_mark.png";

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const visibleSecretAvatar = !props.forceHide && props.userIdentity?.avatar;
  const currentAvatar = props.forceHide
    ? props.secretIdentity?.avatar
    : props.userIdentity?.avatar || props.secretIdentity?.avatar;
  const secretAvatar = props.secretIdentity?.avatar || questionMark;

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
            "with-border": !!props.secretIdentity?.color,
          })}
          ref={ref}
          role="img"
          aria-label="The avatar of the secret identity"
          data-testid="secret-identity-avatar"
        />
        {props.secretIdentity?.accessory && (
          <img
            src={props.secretIdentity?.accessory}
            className="accessory"
            aria-label="The secret identity accessory"
          />
        )}
        <div
          className={classnames("secret-avatar", {
            visible: visibleSecretAvatar,
          })}
          aria-label="The avatar of the user identity"
        />
      </div>
      <style jsx>{`
        .avatar-container * {
          box-sizing: border-box;
        }
        .avatar-wrapper {
          position: relative;
          margin-top: -13px;
        }
        .accessory {
          position: absolute;
          top: 50%;
          left: 50%;
          /* remove half the margin */
          transform: translate(calc(-50% - 0px), -50%) scale(1.625);
          pointer-events: none;
        }
        .compact .accessory {
          transform: translate(calc(-50% - 3px), -50%) scale(0.85);
        }
        .avatar {
          position: relative;
          width: 65px;
          height: 65px;
          display: block;
          background: url("${secretAvatar}");
          background-size: cover;
          border-radius: 15%;
        }
        .avatar.with-border {
          border: 2px solid
            ${
              props.secretIdentity ? props.secretIdentity.color : "transparent"
            };
        }
        .avatar:not(.with-secret) {
        }
        .avatar-container.compact .avatar {
          width: 35px;
          height: 35px;
          margin-right: 5px;
        }
        .avatar-container.compact .avatar-wrapper{
          margin-top: 0px;
        }
        .secret-avatar {
          --avatar-backdrop-color;
          position: absolute;
          top: 66%;
          left: 70%;
          width: 43%;
          min-width: 20px;
          height: 43%;
          min-height: 20px;
          display: none;
          background: url("${currentAvatar}");
          background-size: cover;
          border-radius: 50%;
          border: 2px solid var(--avatar-backdrop-color, white); 
        }
        .avatar-container.compact .secret-avatar{
          top: 21px;
          left: 22px;  
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
  userIdentity?: {
    avatar: string;
    name: string;
  };
  forceHide?: boolean;
  compact?: boolean;
}

export default Avatar;
