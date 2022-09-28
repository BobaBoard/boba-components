import Icon, { IconProps } from "common/Icon";

import ActionLink from "buttons/ActionLink";
import DefaultTheme from "theme/default";
import { LinkWithAction } from "types";
import React from "react";
import classNames from "classnames";

interface CompoundComponents {
  Option: React.FC<{
    id?: string;
    link: LinkWithAction<string | undefined>;
    children: React.ReactNode;
    selected?: boolean;
  }>;
}

const Option: CompoundComponents["Option"] = ({
  selected,
  children,
  link,
  id,
}) => {
  const linkWithId = React.useMemo(() => {
    if (!id || !link.onClick) {
      return link;
    }
    return {
      ...link,
      onClick: () => link.onClick?.(id),
    };
  }, [link, id]);
  return (
    <ActionLink link={linkWithId}>
      <div className={classNames("option", { selected })}>
        {children}
        <style jsx>{`
          .option {
            display: flex;
            border-radius: 15px;
            position: relative;
            text-decoration: none;
            align-items: center;
            font-size: var(--font-size-regular);
            padding: 10px 15px;
            margin-bottom: 2px;
            color: #c7c7c7;
          }
          .option.selected {
            color: white;
            background: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
          }
          .option:hover {
            background: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
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
    <div className="tab-group">
      <div className="title">
        {props.icon && (
          <div className="icon">
            <Icon icon={props.icon} />
          </div>
        )}
        {props.title}
      </div>
      <div className="tabs">{props.children}</div>
      <style jsx>{`
        .tabs {
          display: flex;
          flex-direction: column;
        }
        .icon {
          margin-right: 10px;
        }
        .title {
          color: #fff;
          font-size: var(--font-size-small);
          font-weight: 600;
          line-height: 15px;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
          text-transform: uppercase;
          display: flex;
        }
        .tab-group + .tab-group {
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
};
TabsGroup.Option = Option;

export default TabsGroup;
