import React from "react";
import FloatingActionButton from "../common/FloatingActionButton";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

export interface CycleNewButtonProps {
  onNext: () => void;
  text: string;
  loading?: boolean;
}

const CycleNewButton: React.FC<CycleNewButtonProps> = (props) => {
  return (
    <FloatingActionButton
      spin={props.loading}
      accentColor={"grey"}
      actions={React.useMemo(
        () => [
          {
            icon: faCertificate,
            tooltip: props.text,
            action: props.onNext,
          },
        ],
        [props.onNext, props.text]
      )}
    />
  );
};

export default CycleNewButton;
