import React from "react";
import DefaultTheme from "../theme/default";
import { LinkWithAction } from "types";

interface CompoundComponents {
  Option: React.FC<{ link: LinkWithAction; children: React.ReactNode }>;
}

const Option: CompoundComponents["Option"] = (props) => {
  return (
    <div className="option">
      {props.children}
      <style jsx>{`
        display: flex;
        background: ${DefaultTheme.BOARD_MENU_ITEM_BACKGROUND};
        border-radius: 15px;
        position: relative;
        text-decoration: none;
        align-items: center;
      `}</style>
    </div>
  );
};

interface TabsGroupProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const TabsGroup: React.FC<TabsGroupProps> & CompoundComponents = (props) => {
  return (
    <div>
      <div className="title">
        <div className="icon">
          {/* {typeof icon == "string" ? (
            <img src={icon} alt={`${emptyTitle} icon`} />
          ) : (
            <FontAwesomeIcon icon={icon} />
          )} */}
        </div>
        {props.title}
      </div>
      <div>{props.children}</div>
      <style jsx>{`
        .title {
          color: #fff;
          font-size: 12px;
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
