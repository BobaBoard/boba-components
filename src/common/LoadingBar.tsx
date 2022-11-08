import Color from "color";
import React from "react";
import classnames from "classnames";

const HEIGHT = 1;
const INCREASE_INTERVAL = 700;

const maybeSetNewProgress = (bar: HTMLElement | null, progress: number) => {
  if (!bar) {
    return;
  }
  bar.style.width = `${progress}%`;
  bar.setAttribute("aria-valuenow", `${progress}`);
};
const LoadingBar = (props: LoadingBarProps) => {
  const barColor = props.accentColor || "#ffffff";
  const lighterColor = Color(barColor).darken(0.5);
  const currentProgress = React.useRef(0);
  const progressTimeout = React.useRef<NodeJS.Timeout>();
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!props.loading) {
      if (progressTimeout.current && barRef.current) {
        clearTimeout(progressTimeout.current);
        currentProgress.current = 100;
        maybeSetNewProgress(barRef.current, currentProgress.current);
        const barContainer = barRef.current?.parentElement;
        if (barContainer) {
          barRef.current.parentElement.style.transitionDelay = `${INCREASE_INTERVAL}ms`;
        }
        setTimeout(() => {
          currentProgress.current = 0;
          maybeSetNewProgress(barRef.current, currentProgress.current);
          if (barContainer) {
            barContainer.style.transitionDelay = "0ms";
          }
        }, INCREASE_INTERVAL);
      }
      return;
    }
    const increaseProgress = () => {
      if (!barRef.current) {
        progressTimeout.current = setTimeout(
          increaseProgress,
          INCREASE_INTERVAL
        );
        return;
      }
      // Increase current progress by a random number between 5 and 20
      const random = Math.ceil(Math.random() * 15 + 5);
      currentProgress.current += random;
      if (currentProgress.current > 95) {
        currentProgress.current = 95;
      }
      maybeSetNewProgress(barRef.current, currentProgress.current);
      progressTimeout.current = setTimeout(increaseProgress, INCREASE_INTERVAL);
    };
    increaseProgress();
    return () => {
      if (progressTimeout.current) {
        clearTimeout(progressTimeout.current);
      }
      currentProgress.current = 0;
    };
  }, [props.loading]);

  return (
    <div
      className={classnames("progressbar", props.className, {
        loading: props.loading,
      })}
      role="progressbar"
      aria-busy={props.loading}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-hidden={!props.loading}
      aria-label={props.label}
    >
      <div className="bar" ref={barRef} />
      <style jsx>{`
        .progressbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: ${HEIGHT}px;
          background-color: ${lighterColor.toString()};
          z-index: 100;
          transition: all 0 ease;
          visibility: hidden;
          opacity: 0;
          max-height: 0;
        }
        .progressbar.loading {
          display: block;
          visibility: visible;
          opacity: 1;
          max-height: 1000px;
        }

        .progressbar .bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0%;
          height: ${HEIGHT}px;
          background-color: ${barColor};
          transition: width 0.3s ease-out;
        }
        .progressbar.loading .bar {
          background-color: ${barColor};
        }
      `}</style>
    </div>
  );
};

export default LoadingBar;

export interface LoadingBarProps {
  label: string;
  accentColor?: string;
  loading?: boolean;
  className?: string;
}
