import Color from "color";
import DefaultTheme from "theme/default";
import React from "react";
import css from "styled-jsx/css";

const { className: containerClassname, styles: containerStyles } = css.resolve`
  .board-menu-item {
    display: flex;
    background: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
    border-radius: 15px;
    position: relative;
    text-decoration: none;
    align-items: center;
  }
`;

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = (props) => {
  const color = Color(props.accentColor).darken(0.4).hex() || "#bd4faf";
  return (
    <div className={`${containerClassname} board-menu-item`}>
      {containerStyles}
      <style jsx>{`
        .board-menu-item {
          background: linear-gradient(-90deg, ${color}, #2e2e30);
          background-size: 400% 400%;
          animation: GradientBackground 3s ease-out infinite;
          height: ${props.height};
        }
        @keyframes GradientBackground {
          0% {
            background-position: 30% 50%;
          }

          50% {
            background-position: 80% 50%;
          }

          100% {
            background-position: 30% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingPlaceholder;

export interface LoadingPlaceholderProps {
  accentColor: string;
  height: string;
}
