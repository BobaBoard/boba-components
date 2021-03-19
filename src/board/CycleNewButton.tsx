import React from "react";
import FloatingActionButton from "../common/FloatingActionButton";
import { faCertificate, faSpinner } from "@fortawesome/free-solid-svg-icons";

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
            icon: props.loading ? faSpinner : faCertificate,
            tooltip: props.text,
            action: props.onNext,
          },
        ],
        [props.onNext, props.text, props.loading]
      )}
    />
  );
};

export default CycleNewButton;
