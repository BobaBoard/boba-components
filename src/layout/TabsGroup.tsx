import React from "react";
import DefaultTheme from "../theme/default";
import Icon, { IconProps } from "../common/Icon";
import { LinkWithAction } from "types";
import classNames from "classnames";
import ActionLink from "../common/ActionLink";

interface CompoundComponents {
  Option: React.FC<{
    link: LinkWithAction;
    children: React.ReactNode;
    selected?: boolean;
  }>;
}

const Option: CompoundComponents["Option"] = ({ selected, children, link }) => {
  return (
    <ActionLink link={link}>
      <div className={classNames("option", { selected })}>
        {children}
        <style jsx>{`
          .option {
            display: flex;
            background: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
            border-radius: 15px;
            position: relative;
            text-decoration: none;
            align-items: center;
            font-size: var(--font-size-large);
            padding: 10px 15px;
            margin-bottom: 3px;
            color: #c7c7c7;
          }
          .option.selected {
            color: white;
          }
        `}</style>
      </div>
    </ActionLink>
  );
};

interface TabsGroupProps {
  icon?: IconProps["icon"];
  title: string;
  children: React.ReactNode;
}

const TabsGroup: React.FC<TabsGroupProps> & CompoundComponents = (props) => {
  return (
    <div>
      <div className="title">
        {props.icon && (
          <div className="icon">
            <Icon icon={props.icon} />
          </div>
        )}
        {props.title}
      </div>
      <div>{props.children}</div>
      <style jsx>{`
        .icon {
          margin-right: 8px;
        }
        .title {
          color: #fff;
          font-size: var(--font-size-small);
          font-weight: 600;
          line-height: 15px;
          letter-spacing: 1.5px;
          margin-bottom: 15px;
          text-transform: uppercase;
          display: flex;
        }
      `}</style>
    </div>
  );
};
TabsGroup.Option = Option;

export default TabsGroup;
