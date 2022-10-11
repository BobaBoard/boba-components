import Icon, { IconProps } from "common/Icon";
import {
  faChevronCircleDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import ActionLink from "./ActionLink";
import { LinkWithAction } from "types";
import React from "react";
import Theme from "theme/default";
import classnames from "classnames";

const NotificationDot = (props: IconButtonProps) => {
  return (
    <div className="notification-dot">
      <Icon icon={props.notificationIcon || faCircle} />
      <style jsx>{`
        .notification-dot {
          --top-icon-color: ${props.notificationColor};
        }
      `}</style>
      <style jsx>{`
        .notification-dot {
          position: absolute;
          color: var(--top-icon-color, red);
          top: 2px;
          right: 0px;
          transform: translate(50%, -50%);
          font-size: 10px;
          // The border around the icon
          // TODO: extract this into a utility style #css
          filter: drop-shadow(
              -1px 0px 0px var(--top-icon-background-color, ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR})
            )
            drop-shadow(
              0px -1px 0px var(--top-icon-background-color, ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR})
            )
            drop-shadow(
              1px 0px 0px
                var(
                  --top-icon-background-color,
                  ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR}
                )
            )
            drop-shadow(
              0px 1px 0px
                $var(
                  --top-icon-background-color,
                  ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR}
                )
            );
        }
        .notification-dot:hover {
          // The border around the icon, on hover.
          filter: drop-shadow(
              -1px 0px 0px var(--top-icon-background-color--hover, ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR})
            )
            drop-shadow(
              0px -1px 0px var(--top-icon-background-color--hover, ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR})
            )
            drop-shadow(
              1px 0px 0px
                var(
                  --top-icon-background-color--hover,
                  ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR}
                )
            )
            drop-shadow(
              0px 1px 0px
                var(
                  --top-icon-background-color--hover,
                  ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR}
                )
            );
        }
      `}</style>
    </div>
  );
};

const DropdownIndicator = (props: IconButtonProps) => {
  return (
    <div
      className={classnames("dropdown-indicator", {
        visible: !!props.withDropdown,
      })}
    >
      <Icon icon={props.dropdownIcon || faChevronCircleDown} />
      <style jsx>{`
        .dropdown-indicator {
          position: absolute;
          right: -3px;
          bottom: 1px;
          color: ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR};
          background-color: ${Theme.MENU_ITEM_ICON_COLOR};
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
      `}</style>
    </div>
  );
};

/**
 * A button made of a single icon.
 */
export interface IconButtonProps {
  icon: IconProps["icon"];
  /**
   * The aria-label associated with the icon.
   */
  label?: string;
  link?: LinkWithAction;
  /**
   * The notification icon settings.
   */
  withNotifications?: boolean;
  notificationIcon?: IconProps["icon"];
  withDropdown?: boolean;
  dropdownIcon: IconProps["icon"];
  notificationColor?: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <ActionLink label={props.label} link={props.link}>
      <div className={classnames("icon-button")}>
        {props.withNotifications && <NotificationDot {...props} />}
        <Icon icon={props.icon} />
        {props.withDropdown && <DropdownIndicator {...props} />}
      </div>
      <style jsx>{`
        .icon-button {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 0;
          background: transparent;
          color: ${Theme.MENU_ITEM_ICON_COLOR};
          position: relative;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
          font-size: 20px;
          padding: 0;
        }
        .icon-button:focus {
          outline: none;
        }
        .icon-button:focus-visible {
          box-shadow: ${Theme.MENU_ITEM_ICON_COLOR} 0px 0px 0px 3px;
        }
        .icon-button:hover {
          cursor: pointer;
          background-color: ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR};
          color: ${Theme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
        }
        .icon-button :global(svg) {
          display: block;
        }
      `}</style>
    </ActionLink>
  );
};

export default IconButton;
