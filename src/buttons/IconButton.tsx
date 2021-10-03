import React from "react";

import ActionLink from "./ActionLink";
import Theme from "../theme/default";

import { LinkWithAction } from "../types";
import classnames from "classnames";
import Icon, { IconProps } from "../common/Icon";

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
   * The color of the notification dot.
   */
  dotColor?: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <ActionLink label={props.label} link={props.link}>
      <div
        className={classnames("icon-button", {
          "has-dot": !!props.dotColor,
        })}
      >
        <Icon icon={props.icon} />
      </div>
      <style jsx>{`
        .icon-button.has-dot::after {
          background-color: ${props.dotColor};
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
        .icon-button.has-dot::after {
          content: "";
          position: absolute;
          top: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
        }
        .icon-button.has-dot:hover::after {
          border-color: ${Theme.MENU_ITEM_ICON_BACKGROUND_COLOR};
        }
      `}</style>
    </ActionLink>
  );
};

export default IconButton;
