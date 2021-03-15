import Color from "color";
import React from "react";
import LibraryLoadingBar from "react-top-loading-bar";

// From: https://github.com/klendi/react-top-loading-bar/issues/41
type LoadingBarRef = {
  add(value: number): void;
  decrease(value: number): void;
  continuousStart(startingValue?: number, refreshRate?: number): void;
  staticStart(startingValue: number): void;
  complete(): void;
};

const HEIGHT = 1;
const LoadingBar = (props: LoadingBarProps) => {
  const barRef = React.useRef<LoadingBarRef>();

  const barColor = props.accentColor || "#ffffff";
  const lighterColor = Color(barColor).darken(0.5);

  React.useEffect(() => {
    if (!barRef.current) {
      return;
    }
    if (props.progress) {
      // For some reason you can either use this with the ref or the progress prop.
      barRef.current.staticStart(props.progress);
      if (props.progress >= 100) {
        barRef.current.complete();
      }
      return;
    }
    if (props.loading) {
      barRef.current.continuousStart();
    } else {
      barRef.current.complete();
    }
  }, [props.loading, props.progress]);

  return (
    <div>
      <LibraryLoadingBar
        className={props.className}
        height={HEIGHT}
        ref={barRef}
        background={
          props.loading || props.progress ? lighterColor.toString() : undefined
        }
        color={barColor}
        waitingTime={800}
      />
    </div>
  );
};

export default LoadingBar;

export interface LoadingBarProps {
  accentColor?: string;
  loading?: boolean;
  progress?: number;
  className?: string;
}
