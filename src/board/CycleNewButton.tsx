import React from "react";
import FloatingActionButton from "../common/FloatingActionButton";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

export interface CycleNewButtonProps {
  onNext: () => void;
  text: string;
}

const CycleNewButton: React.FC<CycleNewButtonProps> = (props) => {
  return (
    <FloatingActionButton
      accentColor={"grey"}
      actions={[
        {
          icon: faCertificate,
          tooltip: props.text,
          action: props.onNext,
        },
      ]}
    />
  );
};

export default CycleNewButton;
