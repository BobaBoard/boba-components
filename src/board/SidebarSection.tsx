import React from "react";

import classnames from "classnames";
import debug from "debug";
const log = debug("bobaui:boards:sidebarSection");

export enum SidebarTypes {
  TEXT,
  CATEGORIES,
}

const SidebarSection: React.FC<SidebarSection> = (props) => {
  log("this is a component sample!");
  return (
    <div
      className={classnames("sidebar-section", { editable: props.editable })}
    >
      Component Sample with {props.sampleProp}!
      <style jsx>{`
        .sidebar-section {
          font-size: large;
          color: red;
        }
        .sidebar-section.editable {
          color: blue;
        }
      `}</style>
    </div>
  );
};

export interface SidebarSection {
  sampleProp: string;
  editable: boolean;
}

export default SidebarSection;
