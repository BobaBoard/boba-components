import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import classNames from "classnames";

export interface IconProps {
  icon: string | IconDefinition;
  className?: string;
  label?: string;
}

export const isIcon = (prop: any): prop is IconProps => "icon" in prop;

const Icon: React.FC<IconProps> = ({ icon, className, label }) => {
  return typeof icon == "string" ? (
    <img
      src={icon}
      className={classNames("icon", className)}
      aria-label={label}
    />
  ) : (
    <FontAwesomeIcon
      icon={icon}
      className={classNames("icon", className)}
      title={label}
    />
  );
};

export default Icon;
