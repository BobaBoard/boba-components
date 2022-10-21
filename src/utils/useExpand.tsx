import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";

import Icon from "common/Icon";
import React from "react";
import classNames from "classnames";

const toggleCompact = (
  div: HTMLDivElement,
  oldStyle: {
    height: string;
    overflow: string;
  } | null,
  compactHeight: number
) => {
  const refStyle = getComputedStyle(div);
  if (refStyle.overflow == "hidden" && oldStyle) {
    div.style.height = oldStyle.height;
    div.style.overflow = oldStyle.overflow;
    delete div.dataset.shrunk;
  } else if (refStyle.height != compactHeight + "px") {
    div.style.height = compactHeight + "px";
    div.style.overflow = "hidden";
    div.dataset.shrunk = "";
  }
};

export const useExpand = (
  ref: React.RefObject<HTMLDivElement>,
  options: {
    compactHeight: number;
  }
) => {
  const [oldStyle, setOldStyle] =
    React.useState<{
      height: string;
      overflow: string;
    }>();
  const [expanded, setExpanded] = React.useState(true);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const currentStyle = {
      height: ref.current.style.height,
      overflow: ref.current.style.overflow,
    };
    if (
      currentStyle.height != options.compactHeight + "px" &&
      ref.current.getBoundingClientRect().height > options.compactHeight
    ) {
      setOldStyle(currentStyle);
      toggleCompact(ref.current, currentStyle, options.compactHeight);
      setExpanded(false);
    }
  }, [ref, options.compactHeight]);

  if (!ref.current || !oldStyle) {
    return null;
  }

  const refStyle = getComputedStyle(ref.current);
  const backgroundColor = refStyle.backgroundColor;
  return (
    <button
      className={classNames("expand-overlay", {
        expanded,
      })}
      onClick={() => {
        if (!ref.current || !oldStyle) {
          return;
        }
        toggleCompact(ref.current, oldStyle, options.compactHeight);
        setExpanded((expanded) => !expanded);
      }}
    >
      <Icon icon={expanded ? faAngleDoubleUp : faAngleDoubleDown} />
      <style jsx>{`
        .expand-overlay {
          height: 40px;
          width: 100%;
          background: linear-gradient(
            rgba(255, 255, 255, 0.001) 10%,
            ${backgroundColor} 30%,
            ${backgroundColor}
          );
          cursor: pointer;
          text-align: center;
          border: 0px;
        }
        .expand-overlay:not(.expanded) {
          position: absolute;
          bottom: 0;
        }
      `}</style>
    </button>
  );
};
