import React from "react";
import ReactDOM from "react-dom";

import classnames from "classnames";

const POSITION_OFFSET = 30;
const MAX_TRAILS = 15;
let CURRENT = 0;
const EVERY = 2;
let TRAILS: HTMLImageElement[] = [];

import sparkle from "../../stories/images/sparkle.gif";
import wand from "../../stories/images/sailor_wand.png";

const trail = (x: number, y: number) => {
  const img = document.createElement("IMG") as HTMLImageElement;
  img.src = sparkle;
  img.classList.add("trail");
  img.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  img.addEventListener("animationend", () => {
    if (img.parentElement) {
      img.parentElement.removeChild(img);
      TRAILS = TRAILS.filter((e) => e != img);
    }
  });
  if (TRAILS.length > MAX_TRAILS) {
    const toRemove = TRAILS.shift();
    toRemove?.parentElement?.removeChild(toRemove);
  }
  TRAILS.push(img);
  return img;
};

export default () => {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      if (!imageRef.current) {
        return;
      }
      const x = e.x + POSITION_OFFSET;
      const y = e.y + POSITION_OFFSET;
      imageRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (CURRENT++ % EVERY !== 0) {
        return;
      }
      const toAppend = trail(x, y);
      if (toAppend) {
        containerRef.current?.appendChild(toAppend);
      }
    };
    const leaveHandler = (e: MouseEvent) => {
      if (!imageRef.current || e.target !== document) {
        return;
      }
      imageRef.current.style.display = "none";
    };
    const enterHandler = (e: MouseEvent) => {
      if (!imageRef.current || e.target !== document) {
        return;
      }
      CURRENT = 0;
      imageRef.current.style.display = "block";
    };

    document.addEventListener("mousemove", moveHandler, {
      passive: true,
    });
    document.addEventListener("mouseleave", leaveHandler, {
      passive: true,
      capture: true,
    });
    document.addEventListener("mouseenter", enterHandler, {
      passive: true,
      capture: true,
    });

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseleave", leaveHandler);
      document.removeEventListener("mouseenter", enterHandler);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={classnames("cursor-container")} ref={containerRef}>
      <img src={sparkle} ref={imageRef} />
      <style jsx>{`
        :global(body) {
          cursor: url(${wand}), auto;
        }
        .cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .cursor-container :global(img) {
          position: absolute;
          max-width: 50px;
          max-height: 50px;
          pointer-events: none;
        }
        .cursor-container :global(.trail) {
          opacity: 0;
          animation: 100ms ease-out disappear;
          animation-delay: 50ms;
        }

        @keyframes disappear {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};
