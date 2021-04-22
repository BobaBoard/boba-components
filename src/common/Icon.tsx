import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IconProps {
  icon: string | IconDefinition;
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  return typeof icon == "string" ? (
    <img src={icon} />
  ) : (
    <FontAwesomeIcon icon={icon} />
  );
};

export default Icon;
