import React from "react";
//@ts-ignore
import { Container, Button, Link } from "react-floating-action-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import Theme from "../theme/default";

export interface FloatingActionButtonProps {
  accentColor?: string;
  actions: {
    icon: IconDefinition;
    tooltip: string;
    action: () => void;
  }[];
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = (props) => {
  return (
    <Container styles={{ bottom: "4vh", right: "3vw" }}>
      {props.actions.map((action) => {
        return (
          <Button
            tooltip={action.tooltip}
            rotate={true}
            onClick={action.action}
            styles={{
              backgroundColor: props.accentColor || Theme.DEFAULT_ACCENT_COLOR,
              color: "white",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={action.icon} />
          </Button>
        );
      })}
    </Container>
  );
};

export default FloatingActionButton;
