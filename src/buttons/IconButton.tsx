import Icon, { IconProps } from "common/Icon";
import {
  faChevronCircleDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

import ActionLink from "./ActionLink";
import { AriaAttributes } from "react";
import { LinkWithAction } from "types";
import React from "react";
import Theme from "theme/default";
import classnames from "classnames";
import css from "styled-jsx/css";

const NotificationDot = (props: IconButtonProps) => {
  const notificationProps = {
    ...props.withNotifications,
    icon: props.withNotifications?.icon || faCircle,
    color: props.withNotifications?.color || "inherit",
    "aria-label": props.withNotifications?.["aria-label"] ?? "notification",
  };
  return (
    <div className="notification-dot">
      <Icon {...notificationProps} />
      <style jsx>{`
        .notification-dot {
          --top-icon-color: ${notificationProps.color};
        }
      `}</style>
      <style jsx>{`
        .notification-dot {
          position: absolute;
          color: var(--top-icon-color, ${Theme.NOTIFICATIONS_NEW_COLOR});
          top: 0px;
          right: 0px;
          z-index: 1;
          font-size: 10px;
          // The border around the icon
          // TODO: extract this into a utility style #css
          filter: drop-shadow(
              -1px 0px 0px var(--top-icon-border-color, ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR})
            )
            drop-shadow(
              0px -1px 0px var(--top-icon-border-color, ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR})
            )
            drop-shadow(
              1px 0px 0px
                var(
                  --top-icon-border-color,
                  ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR}
                )
            )
            drop-shadow(
              0px 1px 0px
                var(
                  --top-icon-border-color,
                  ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR}
                )
            );
        }
      `}</style>
    </div>
  );
};

const DropdownIndicator = (props: IconButtonProps) => {
  const dropdownProps = {
    ...props.withDropdown,
    icon: props.withDropdown?.icon || faChevronCircleDown,
    color: props.withDropdown?.color || "inherit",
    "aria-label": props.withDropdown?.["aria-label"] ?? "dropdown",
  };
  return (
    <div
      className={classnames("dropdown-indicator", {
        visible: !!props.withDropdown,
      })}
    >
      <Icon {...dropdownProps} />
      <style jsx>{`
        .dropdown-indicator {
          position: absolute;
          right: 0;
          bottom: 0;
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
export interface IconButtonProps extends AriaAttributes {
  icon: IconProps;
  className?: string;
  link?: LinkWithAction;
  withNotifications?: Partial<IconProps>;
  withDropdown?: Partial<IconProps>;
  disabled?: boolean;
}

const { className: linkWrapper, styles: linkWrapperStyles } = css.resolve`
  width: 35px;
  height: 35px;
  position: relative;
`;

const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <ActionLink
      aria-label={props["aria-label"]}
      aria-current={props["aria-current"]}
      link={props.link}
      className={classnames(props.className, linkWrapper)}
      disabled={props.disabled}
    >
      {props.withNotifications && <NotificationDot {...props} />}
      <div className={classnames("icon-button")}>
        <Icon {...props.icon} />
      </div>
      {props.withDropdown && <DropdownIndicator {...props} />}
      {linkWrapperStyles}
      <style jsx>{`
        .icon-button {
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
          padding: 0;
          width: 100%;
          height: 100%;
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
