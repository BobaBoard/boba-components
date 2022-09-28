import Icon, { IconProps } from "common/Icon";

import ActionLink from "./ActionLink";
import { LinkWithAction } from "types";
import React from "react";
import Theme from "theme/default";
import classnames from "classnames";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

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
  notificationColor?: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <ActionLink label={props.label} link={props.link}>
      <div
        className={classnames("icon-button", {
          // "has-dot": !!props.dotColor,
        })}
      >
        <div className="icon-wrapper">
          {props.withNotifications && (
            <div className="notification-dot">
              <Icon icon={props.notificationIcon || faCircle} />
            </div>
          )}
          <Icon icon={props.icon} />
        </div>
      </div>
      <style jsx>{`
        .notification-dot {
          color: ${props.notificationColor};
        }
      `}</style>
      <style jsx>{`
        .icon-button {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 0;
          background: transparent;
          color: ${Theme.MENU_ITEM_ICON_COLOR};
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
        .icon-wrapper {
          position: relative;
        }
        .notification-dot {
          position: absolute;
          color: RED;
          top: 2px;
          right: 0px;
          transform: translate(50%, -50%);
          font-size: 10px;
          filter: drop-shadow(
              -1px 0px 0px ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR}
            )
            drop-shadow(0px -1px 0px ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR})
            drop-shadow(1px 0px 0px ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR})
            drop-shadow(0px 1px 0px ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR});
        }
        .notification-dot:hover {
          filter: drop-shadow(
              -1px 0px 0px ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR}
            )
            drop-shadow(0px -1px 0px ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR})
            drop-shadow(1px 0px 0px ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR})
            drop-shadow(0px 1px 0px ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR});
        }
      `}</style>
    </ActionLink>
  );
};

export default IconButton;
