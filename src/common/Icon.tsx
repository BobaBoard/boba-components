import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export interface IconProps {
  icon: string | IconDefinition;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return typeof icon == "string" ? (
    <img src={icon} className={classNames("image", className)} />
  ) : (
    <FontAwesomeIcon icon={icon} className={classNames("icon", className)} />
  );
};

export default Icon;
