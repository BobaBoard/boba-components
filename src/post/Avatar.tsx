import React from "react";
import classnames from "classnames";

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className="avatar">
      <div
        className={classnames("secret-avatar", {
          visible: props.userIdentity?.avatar && props.secretIdentity?.avatar,
        })}
      />
      <style jsx>{`
        .avatar::before {
          background: url("${
            (props.userIdentity || {}).avatar ||
            (props.secretIdentity || {}).avatar
          }");
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
        .secret-avatar {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40%;
          height: 40%;
          display: none;
        }
        .secret-avatar.visible {
          display: block;
        }
        .secret-avatar::before {
          border: 3px solid ${props.backgroundColor || "white"};
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
          `}</style>
    </div>
  );
};
export interface AvatarProps {
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  backgroundColor?: string;
}

export default Avatar;
