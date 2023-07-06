import Icon, { IconProps } from "common/Icon";

import DropdownListMenu from "common/DropdownListMenu";
import React from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export interface ViewOption {
  name: string;
  icon: IconProps["icon"];
}
[];
const ViewSelector = (props: {
  views: ViewOption[] | undefined;
  selectedView: ViewOption | undefined;
  onSelectView: (selectedView: ViewOption) => void;
}) => (
    <DropdownListMenu
      options={props.views?.map((option) => ({
        name: option.name,
        icon: option.icon,
        link: {
          onClick: () => props.onSelectView(option),
        },
      }))}
      zIndex={200}
    >
      <div>
        <div className="views-dropdown">
          <div className="default-view">
            Default View: {props.selectedView?.name}
          </div>
          <Icon icon={faCaretDown} />
        </div>
      </div>
      <style jsx>{`
        .views-dropdown {
          display: inline-flex;
          color: #1c1c1c;
          border-radius: 10px;
          padding: 3px 6px;
          align-items: center;
        }
        .views-dropdown :global(svg) {
          margin-left: 4px;
        }
        .views-dropdown:hover {
          cursor: pointer;
          background-color: #ececec;
        }
      `}</style>
    </DropdownListMenu>
  );

export default ViewSelector;
