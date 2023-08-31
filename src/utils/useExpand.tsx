import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";

import DefaultTheme from "theme/default";
import Icon from "common/Icon";
import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";

const toggleCompact = (
  div: HTMLDivElement,
  oldStyle: {
    height: string;
    overflow: string;
  } | null,
  compactHeight: number
) => {
  const refStyle = getComputedStyle(div);
  if (refStyle.overflow === "hidden" && oldStyle) {
    div.style.height = oldStyle.height;
    div.style.overflow = oldStyle.overflow;
    delete div.dataset.shrunk;
  } else if (refStyle.height !== `${compactHeight}px`) {
    div.style.height = `${compactHeight}px`;
    div.style.overflow = "hidden";
    div.dataset.shrunk = "";
  }
};

const { styles: iconStyles, className: iconClassName } = css.resolve`
  svg {
    // see: https://stackoverflow.com/questions/29814709/click-event-not-fired-on-button-with-svg-element-in-safari
    pointer-events: none;
  }
`;

/**
 * Modifies the component passed as a ref, and collapses it so its height
 * doesn't surpass `compactHeight`.
 * Returns a button to add to the DOM (usually right after the component), which
 * can then be used to toggle the expansion/contraption of the component.
 */
export const useExpand = (
  ref: React.RefObject<HTMLDivElement>,
  options: {
    // If compactHeight is not provided, the component will not be collapsed.
    compactHeight: number | undefined;
    backgroundColor?: string;
    className?: string;
  }
) => {
  const [oldStyle, setOldStyle] = React.useState<{
    height: string;
    overflow: string;
  }>();
  const [expanded, setExpanded] = React.useState(true);

  React.useEffect(() => {
    if (!ref.current || !options.compactHeight) {
      return;
    }
    const currentStyle = {
      height: ref.current.style.height,
      overflow: ref.current.style.overflow,
    };
    if (
      currentStyle.height !== `${options.compactHeight}px` &&
      ref.current.getBoundingClientRect().height > options.compactHeight
    ) {
      ref.current.dataset.shrinkable = "true";
      setOldStyle(currentStyle);
      toggleCompact(ref.current, currentStyle, options.compactHeight);
      setExpanded(false);
    }
  }, [ref, options.compactHeight]);

  if (!ref.current || !oldStyle) {
    return null;
  }

  const refStyle = getComputedStyle(ref.current);
  const backgroundColor = options.backgroundColor || refStyle.backgroundColor;
  return (
    <button
      className={classnames("expand-overlay", options.className, {
        expanded,
      })}
      onClick={() => {
        if (!ref.current || !oldStyle || !options.compactHeight) {
          return;
        }
        toggleCompact(ref.current, oldStyle, options.compactHeight);
        setExpanded((expanded) => !expanded);
      }}
    >
      <div className="expand-icon">
        <Icon
          icon={expanded ? faAngleDoubleUp : faAngleDoubleDown}
          className={classnames(iconClassName, "icon")}
        />
      </div>
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
          position: absolute;
          bottom: 0;
          z-index: 2;
        }
        .expand-overlay.expanded {
          background: transparent;
          transform: translateY(50%);
        }
        .expand-icon {
          background-color: ${DefaultTheme.BUTTON_BACKGROUND_COLOR_DARK};
          color: ${DefaultTheme.BUTTON_ACCENT_COLOR_DARK};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin: 0 auto;
          margin-top: -10px;
          display: flex;
          align-content: center;
          justify-content: center;
          align-items: center;
          z-index: 2;
          position: relative;
        }
        // Note: I previously did this adding a border to the icon, but it
        // resulted in a bad-looking interaction because the border would not
        // cause changes to the hover state, nor trigger the expansion if clicked.
        // This looks much better.
        .expand-overlay:before {
          content: "";
          width: 40px;
          height: 40px;
          background-color: ${backgroundColor};
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
        }
        .expand-overlay:hover .expand-icon {
          background-color: ${DefaultTheme.BUTTON_BACKGROUND_COLOR_LIGHT};
          color: ${DefaultTheme.BUTTON_ACCENT_COLOR_LIGHT};
        }
      `}</style>
      {iconStyles}
    </button>
  );
};
