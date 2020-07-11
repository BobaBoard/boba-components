import React from "react";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] =
    hex.match(/\w\w/g)?.map((x: string) => parseInt(x, 16)) || [];
  if (r == undefined) {
    return hex;
  }
  return `rgba(${r},${g},${b},${alpha})`;
};

export const useCompact = (
  ref: React.RefObject<HTMLDivElement>,
  compactHeight: number,
  color: string
) => {
  const [isExpanded, setExpanded] = React.useState(false);
  const [oldHeight, setOldHeight] = React.useState("");

  React.useEffect(() => {
    if (!ref?.current?.style) {
      return;
    }
    if (ref.current.style.height == compactHeight + "px") {
      return;
    }
    setOldHeight(ref.current.style.height);
    ref.current.style.overflow = "hidden";
  }, []);
  React.useEffect(() => {
    if (!ref?.current?.style) {
      return;
    }
    if (isExpanded) {
      ref.current.style.height = oldHeight;
    } else {
      ref.current.style.height = compactHeight + "px";
    }
  }, [isExpanded]);

  return (
    <div
      className="expand-overlay"
      onClick={() => {
        setExpanded(!isExpanded);
      }}
    >
      <FontAwesomeIcon
        icon={isExpanded ? faAngleDoubleUp : faAngleDoubleDown}
      />
      <style jsx>{`
        .expand-overlay {
          position: absolute;
          height: 40px;
          width: 100%;
          background: linear-gradient(
            rgba(255, 255, 255, 0.001) 10%,
            ${color} 30%,
            ${color}
          );
          bottom: 0;
          cursor: pointer;
          text-align: center;
        }
      `}</style>
    </div>
  );
};
