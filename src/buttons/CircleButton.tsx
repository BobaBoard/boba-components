import IconButton, { IconButtonProps } from "buttons/IconButton";
import React, { AriaAttributes } from "react";

import DefaultTheme from "theme/default";
import { LinkWithAction } from "types";
import classnames from "classnames";
import css from "styled-jsx/css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const { className: iconClassName, styles: iconStyle } = css.resolve`
  width: auto;
  height: 1em;

  .blurred {
    filter: blur(3px) invert(1);
  }
  .blurred:hover {
    filter: none;
  }
  .dropdown {
    mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
      radial-gradient(18px at right 3px bottom 6px, transparent 50%, black 55%)
        bottom right;
  }
  img {
    width: 100% !important;
    height: 100% !important;
    border-radius: 50%;
  }

  .loading {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

/**
 * An element indicating that the current circle button is in the
 * "selected" state.
 */
const SelectBar = (props: Pick<CircleButtonProps, "selectLightPosition">) => {
  return (
    <div
      role="presentation"
      className={classnames("select-bar", {
        left: props.selectLightPosition === "left",
      })}
    >
      <style jsx>
        {`
          .select-bar {
            position: absolute;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            height: 3px;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: var(
              --accent-color,
              ${DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR}
            );
          }
          .select-bar.left {
            width: 3px;
            height: 100%;
            top: 0;
          }
        `}
      </style>
    </div>
  );
};

// Make the underlying link take the full width of the "circle button",
// as not to "influence" its rendering.
const { className: linkWrapper, styles: linkWrapperStyles } = css.resolve`
  width: 100%;
  height: 100%;
`;

export interface CircleButtonProps extends AriaAttributes {
  loading?: boolean;
  icon: IconButtonProps["icon"];
  selected?: boolean;
  selectLightPosition?: "left" | "top";
  className?: string;
  link?: LinkWithAction;
  /**
   * The color to use to highlight the button when selected or hovered.
   */
  accentColor?: string;
  /**
   * The border color to show around the icon when it's neither selected
   * nor interacted with.
   */
  defaultBorderColor?: string;
  /**
   * Applies a blurred filter to the icon.
   */
  blurred?: boolean;
  disabled?: boolean;
  withDropdown?: IconButtonProps["withDropdown"];
  withNotification?: IconButtonProps["withNotifications"];
}

const CircleButton: React.FC<CircleButtonProps> = ({
  loading,
  icon,
  className,
  selected,
  selectLightPosition,
  link,
  accentColor,
  // TODO: we only use border color for the "green" outline in the
  // logged in menu. See about removing this and just using CSS
  // variables or passing a style. #css
  defaultBorderColor,
  withDropdown,
  withNotification,
  disabled,
  blurred,
  ...props
}) => {
  const iconProps = {
    ...icon,
    icon: loading ? faSpinner : icon.icon,
    className: classnames("icon", icon.className, iconClassName, {
      loading,
      selected,
      blurred,
    }),
  };
  return (
    <div
      className={classnames("circle-button", className, {
        selected,
        loading,
        disabled,
      })}
    >
      <div className="icon-circle">
        <IconButton
          icon={iconProps}
          aria-label={props["aria-label"]}
          link={link}
          withDropdown={withDropdown}
          withNotifications={withNotification}
          className={linkWrapper}
          // TODO: we should pass aria-current from above, in case it's
          // not just used to select pages anymore.
          aria-current={selected ? "page" : false}
          disabled={disabled}
        />
      </div>
      {selected && <SelectBar selectLightPosition={selectLightPosition} />}
      {linkWrapperStyles}
      {iconStyle}
      <style jsx>{`
        .circle-button :global(*) {
          box-sizing: border-box;
        }
        .circle-button {
          display: flex;
          align-items: center;
          height: 100%;
          justify-content: center;
          position: relative;
          // TODO: figure out how to type CSS variables
          --accent-color: ${accentColor ?? "inherit"};
          --top-icon-border-color: ${defaultBorderColor ?? "inherit"};
        }
        .circle-button:hover,
        .circle-button:hover :global(*) {
          cursor: pointer;
        }
        .circle-button :global(button):focus {
          outline: none;
        }
        .circle-button :global(button):focus-visible {
          outline: none;
          box-shadow: blue 0px 0px 0px 3px;
        }
        .icon-circle {
          width: 35px;
          height: 35px;
          background-color: ${DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR};
          border: 2px solid
            ${defaultBorderColor ||
            DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR};
          border-radius: 50%;
          color: ${DefaultTheme.MENU_ITEM_ICON_COLOR};
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .selected .icon-circle {
          border-color: ${accentColor ||
          DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
          color: ${DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
          --top-icon-border-color: var(--accent-color, inherit);
        }
        .icon-circle:hover {
          border-color: ${accentColor ||
          defaultBorderColor ||
          DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR};
          --top-icon-border-color: var(--accent-color, inherit);
        }
        .selected :global(.${iconClassName}),
        .icon-circle:hover :global(.${iconClassName}) {
          color: ${DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
        }
        .disabled {
          opacity: 70%;
          filter: grayscale(100%);
        }
      `}</style>
    </div>
  );
};

export default CircleButton;
