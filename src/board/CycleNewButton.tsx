import { faCertificate, faSpinner } from "@fortawesome/free-solid-svg-icons";

import FloatingActionButton from "buttons/FloatingActionButton";
import React from "react";

export interface CycleNewButtonProps {
  onNext: () => void;
  text: string;
  loading?: boolean;
}

const CycleNewButton: React.FC<CycleNewButtonProps> = (props) => (
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

export default CycleNewButton;
