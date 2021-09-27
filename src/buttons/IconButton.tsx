import React from "react";

import ActionLink from "./ActionLink";
import Theme from "../theme/default";

import { LinkWithAction } from "../types";
import classnames from "classnames";
import Icon, { IconProps } from "../common/Icon";

interface IconButtonProps {
  icon: IconProps["icon"];
  label?: string;
  link?: LinkWithAction;
  dotColor?: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <ActionLink label={props.label} link={props.link}>
      <div
        className={classnames("sidemenu-button", {
          "has-dot": !!props.dotColor,
        })}
      >
        <Icon icon={props.icon} />
      </div>
      <style jsx>{`
        .sidemenu-button.notification::after {
          background-color: ${props.dotColor};
        }
      `}</style>
      <style jsx>{`
        .sidemenu-button {
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
        .sidemenu-button:focus {
          outline: none;
        }
        .sidemenu-button:focus-visible {
          outline: white auto 1px;
        }
        .sidemenu-button:hover {
          cursor: pointer;
          background-color: ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR};
        }
        .sidemenu-button:hover {
          color: ${Theme.MENU_ITEM_ICON_HIGHLIGHT_COLOR};
        }
        .sidemenu-button.has-dot::after {
          content: "";
          position: absolute;
          top: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: ${Theme.NOTIFICATIONS_NEW_COLOR};
          border-radius: 50%;
          border: 2px solid ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
        }
        .sidemenu-button..has-dot:hover::after {
          border-color: ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR};
        }
      `}</style>
    </ActionLink>
  );
};

export default IconButton;
