import React from "react";
// @ts-ignore
import LoadingBar from "react-top-loading-bar";
import css from "styled-jsx/css";

const getLoadingBarStyle = (color: string) => {
  return css.resolve`
    div {
      background-color: ${color}!important;
      box-shadow: 0px 1px 1px ${color};
    }
  `;
};

const getLoadingBarContainerStyle = (color: string, height: number) => {
  return css.resolve`
    div::before {
      content: "";
      background-color: ${color};
      opacity: 0.5;
      position: absolute;
      height: ${height}px;
      width: 100%;
      display: block;
      box-shadow: 0px 1px 1px ${color};
    }
    div {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      transition: width 0.5s;
      width: "0%";
    }
  `;
};

const getGrandpa = (className: string) => {
  return document.getElementsByClassName(className)[0]?.parentElement
    ?.parentElement;
};

const HEIGHT = 1;
export default (props: LoadingBarProps) => {
  const barRef = React.useRef<any>();
  const {
    className: loadingBarClassName,
    styles: loadingBarStyle,
  } = getLoadingBarStyle(props.accentColor || "#ffffff");
  const {
    className: loadingBarContainerClassName,
    styles: loadingBarContainerStyle,
  } = getLoadingBarContainerStyle(props.accentColor || "#ffffff", HEIGHT);

  React.useEffect(() => {
    if (barRef.current) {
      getGrandpa(loadingBarClassName)?.classList.add(
        loadingBarContainerClassName
      );
    }
  }, [barRef]);
  React.useEffect(() => {
    if (barRef.current) {
      const grandpa = getGrandpa(loadingBarClassName);
      if (!grandpa) {
        return;
      }
      if (props.loading) {
        grandpa.style.width = "100%";
        barRef.current.continuousStart();
      } else {
        barRef.current.complete();
        // Give it some time to complete then hide container
        setTimeout(() => {
          grandpa.style.width = "0%";
        }, 500);
      }
    }
  }, [props.loading]);

  return (
    <div>
      <LoadingBar
        className={loadingBarClassName}
        height={HEIGHT}
        ref={barRef}
        progress={50}
      />
      {loadingBarContainerStyle}
      {loadingBarStyle}
    </div>
  );
};

export interface LoadingBarProps {
  accentColor?: string;
  loading?: boolean;
}
