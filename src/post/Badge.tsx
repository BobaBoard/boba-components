import Icon, { IconProps } from "../common/Icon";

import React from "react";
import { darkenColor } from "../utils";

const Badge: React.FC<{
  icon?: IconProps["icon"];
  label: string;
  color: string;
}> = (props) => {
  const borderColor = darkenColor(props.color, 0.1);
  return (
    <div className="badge">
      {props.icon && <Icon icon={props.icon} />}
      <div>{props.label}</div>
      <style jsx>{`
        .badge {
          --badge-color: ${props.color};
          background-image: linear-gradient(
            135deg,
            var(--badge-color) 0%,
            var(--badge-color) 10px,
            rgba(255, 255, 255, 0.3) 15px,
            rgba(255, 255, 255, 0.3) 18px,
            var(--badge-color) 23px,
            var(--badge-color) 100%
          );
          background-color: var(--badge-color);
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
          border: 1px solid ${borderColor};
          display: flex;
          align-items: center;
        }

        .badge :global(svg) {
          width: 1em;
          padding: 1px;
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
        .badge div {
          margin: 0 2px;
          letter-spacing: 1px;
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
};

export default Badge;
