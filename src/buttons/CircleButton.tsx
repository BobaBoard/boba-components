import React from "react";
import {
  faChevronCircleDown,
  faSpinner,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { LinkWithAction } from "types";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionLink from "../buttons/ActionLink";
import css from "styled-jsx/css";
import DefaultTheme from "../theme/default";
import Icon from "../common/Icon";

export enum SelectLightPosition {
  BOTTOM = "BOTTOM",
  LEFT = "LEFT",
}

const getIconStyle = ({
  accentColor,
  defaultBorderColor,
}: {
  accentColor?: string;
  defaultBorderColor?: string;
}) => css.resolve`
  .icon {
    width: 35px;
    height: 35px;
    background-color: ${DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR};
    border: 2px solid
      ${defaultBorderColor || DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR};
    border-radius: 50%;
    color: ${DefaultTheme.MENU_ITEM_ICON_COLOR};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon.blurred :global(img) {
    filter: blur(3px) invert(1);
  }
  .icon.blurred:hover :global(img) {
    filter: none;
  }
  .icon.dropdown {
    mask: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
      radial-gradient(18px at right 3px bottom 6px, transparent 50%, black 55%)
        bottom right;
  }
  .icon :global(img) {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .selected.icon {
    border-color: ${accentColor || DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
    color: ${DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
  }
  .loading.icon :global(svg) {
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

export interface CircleButtonProps {
  id: string;
  loading?: boolean;
  icon: IconDefinition | string;
  selected?: boolean;
  selectLightPosition?: SelectLightPosition;
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
   * Whether to show an icon indicating the button has multiple options.
   */
  withDropdown?: boolean;
  /**
   * Whether to show an icon indicating the button has a notification.
   */
  withNotification?: boolean;
  /**
   * Applies a blurred filter to the icon, for privacy reasons.
   * This only applies to icons of type "image".
   */
  blurred?: boolean;
  /**
   * The aria-label associated with the icon.
   */
  label?: string;
}

const CircleButton: React.FC<CircleButtonProps> = ({
  id,
  loading,
  icon,
  label,
  selected,
  selectLightPosition,
  link,
  accentColor,
  defaultBorderColor,
  withDropdown,
  withNotification,
  blurred,
}) => {
  const { className: iconClassName, styles: iconStyle } = getIconStyle({
    accentColor,
    defaultBorderColor,
  });
  return (
    <div
      key={id}
      className={classnames("circle-button", {
        selected,
        loading,
        "has-dot": !!withNotification,
      })}
    >
      <div className="icon-wrapper">
        <ActionLink
          label={label}
          link={link}
          className={classnames("icon", iconClassName, {
            dropdown: !!withDropdown,
            loading,
            selected,
            blurred,
          })}
        >
          <Icon icon={loading ? faSpinner : icon} />
        </ActionLink>
        <div
          className={classnames("dropdown-indicator", {
            visible: !!withDropdown,
          })}
        >
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </div>
      </div>
      {selected && (
        <div
          className={classnames("select-bar", {
            left: selectLightPosition === SelectLightPosition.LEFT,
          })}
        />
      )}
      <style jsx>{`
        .circle-button {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0px 10px;
          position: relative;
        }
        .circle-button:hover {
          cursor: pointer;
        }
        .circle-button:hover :global(.icon) {
          color: ${DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
          border-color: ${
            accentColor ||
            defaultBorderColor ||
            DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR
          };
        }
        .icon-wrapper {
          position: relative;
        }
        .circle-button.has-dot::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: ${DefaultTheme.NOTIFICATIONS_NEW_COLOR};
          border-radius: 50%;
          border: 2px solid
            ${
              selected
                ? accentColor
                : defaultBorderColor ||
                  DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR
            };
          transform: translate(-3px, 3px);
        }
        .circle-button.has-dot:hover::after {
          border-color: ${
            accentColor ||
            defaultBorderColor ||
            DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR
          };
        }
        .dropdown-indicator {
          position: absolute;
          right: -3px;
          bottom: 1px;
          color: ${DefaultTheme.MENU_ITEM_ICON_BACKGROUND_COLOR};
          background-color: ${DefaultTheme.MENU_ITEM_ICON_COLOR};
          border-radius: 50%;
          width: 10px;
          height: 10px;
          z-index: 1;
          display: none;
        }
        .dropdown-indicator.visible {
          display: block;
        }
        .dropdown-indicator :global(svg) {
          height: 15px;
          width: 15px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .circle-button :global(button):focus {
          outline: none;
        }
        .circle-button :global(button):focus-visible {
          outline: none;
          box-shadow: blue 0px 0px 0px 3px;
        }
        .select-bar {
          position: absolute;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          height: 3px;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: ${
            accentColor || DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR
          };
        }
        .select-bar.left {
          position: absolute;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          width: 3px;
          height: 100%;
          left: 0;
          top: 0;
          background-color: ${
            accentColor || DefaultTheme.MENU_ITEM_ICON_HIGHLIGHT_COLOR
          };
      `}</style>
      {iconStyle}
    </div>
  );
};

export default CircleButton;
