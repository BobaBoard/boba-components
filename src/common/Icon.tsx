import React, { AriaAttributes } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";

export interface IconProps extends AriaAttributes {
  icon: string | IconProp;
  className?: string;
  color?: string;
}

export const isIcon = (prop: any): prop is IconProps => "icon" in prop;

const Icon: React.FC<IconProps> = ({ icon, className, color, ...props }) => (typeof icon === "string" ? (
    <img
      src={icon}
      className={classNames("icon", className)}
      aria-label={props["aria-label"]}
    />
  ) : (
    <FontAwesomeIcon
      icon={icon}
      className={classNames("icon", className)}
      aria-label={props["aria-label"]}
      color={color}
    />
  ));

export default Icon;
