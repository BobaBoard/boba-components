import React from "react";
import Theme from "../theme/default";
import Icon, { IconProps } from "../common/Icon";

const Badge: React.FC<{
  icon: IconProps["icon"];
  label: string;
}> = (props) => {
  return (
    <div className="badge">
      <Icon icon={props.icon} />
      <span>new</span>
      <style jsx>{`
        .badge {
          background-image: linear-gradient(
            135deg,
            ${Theme.DEFAULT_ACCENT_COLOR} 0%,
            ${Theme.DEFAULT_ACCENT_COLOR} 10px,
            rgba(255, 255, 255, 0.3) 15px,
            rgba(255, 255, 255, 0.3) 18px,
            ${Theme.DEFAULT_ACCENT_COLOR} 23px,
            ${Theme.DEFAULT_ACCENT_COLOR} 100%
          );
          background-color: ${Theme.DEFAULT_ACCENT_COLOR};
          background-size: 200% 200%;
          position: relative;
          overflow: hidden;
          font-size: 1.3rem;
          padding: 2px 4px;
          border-radius: 15px;
          line-height: 1.3rem;
          color: white;
          background-position-x: 80%;
          animation: TransitioningBackground 10s ease-out normal infinite;
          border: 1px solid rgb(255 0 0 / 80%);
        }

        @keyframes TransitioningBackground {
          0% {
            background-position-x: 250%;
          }
          12% {
            background-position-x: 80%;
          }
          100% {
            background-position-x: 80%;
          }
        }
        span {
          margin: 0 2px;
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default Badge;
