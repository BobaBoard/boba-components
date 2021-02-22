import React from "react";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Theme from "./theme/default";
import {
  getAllImages,
  replaceImages,
  removeTrailingWhitespace,
} from "@bobaboard/boba-editor";
import chroma from "chroma-js";

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

const maybeCreateBackdropNode = (id: string, onClick: () => void) => {
  let backdropNode = document.querySelector(
    `.backdrop-hook[data-backdrop-id="${id}"]`
  ) as HTMLDivElement;
  if (backdropNode) {
    return backdropNode;
  }
  backdropNode = document.createElement("div");
  backdropNode.classList.add("backdrop-hook");
  backdropNode.dataset.backdropId = id;

  backdropNode.style.position = "fixed";
  backdropNode.style.backgroundColor = Theme.MODAL_BACKGROUND_COLOR;
  backdropNode.style.top = "0";
  backdropNode.style.bottom = "0";
  backdropNode.style.left = "0";
  backdropNode.style.right = "0";
  backdropNode.style.display = "none";
  document.body.appendChild(backdropNode);

  backdropNode.addEventListener("click", (e) => {
    onClick();
    e.stopPropagation();
  });

  return backdropNode;
};

const removeBackdropNode = (id: string) => {
  const backdropNode = document.querySelector(
    `.backdrop-hook[data-backdrop-id="${id}"]`
  ) as HTMLDivElement;
  if (!backdropNode) {
    return;
  }
  backdropNode.parentElement?.removeChild(backdropNode);
};

export const useBackdrop = ({
  id,
  onClick,
  zIndex,
}: {
  id: string;
  onClick: () => void;
  zIndex?: number;
}) => {
  const [open, setOpen] = React.useState(false);
  const currentId = React.useRef(id);

  React.useEffect(() => {
    const ref = currentId;
    return () => {
      removeBackdropNode(ref.current);
    };
  }, []);

  React.useEffect(() => {
    const backdropNode = maybeCreateBackdropNode(id, () => {
      // TODO: this doesn't take into account the onclick
      // method being updated.
      onClick();
    });

    backdropNode.style.display = open ? "block" : "none";
    backdropNode.style.zIndex = "" + (zIndex || 50);
    return () => {
      removeBackdropNode(id);
    };
  }, [open, id, onClick, zIndex]);

  return { open, setOpen };
};

export const prepareContentSubmission = (
  text: any,
  uploadFunction: (src: string) => Promise<string>
) => {
  const delta = removeTrailingWhitespace(text);
  const images = getAllImages(delta);
  return Promise.all(images.map((src: string) => uploadFunction(src))).then(
    (uploadedImages) => {
      const replacements = images.reduce(
        (obj: any, image: string, index: number) => {
          return {
            ...obj,
            [image]: uploadedImages[index],
          };
        },
        {}
      );
      replaceImages(delta, replacements);
      return JSON.stringify(delta);
    }
  );
};

export const lightenColor = (color: string, lightenPercentage: number) => {
  const oldColor = chroma(color);
  const newColor = oldColor.set("lch.l", `*${1 + lightenPercentage}`);
  return newColor.css();
};

export const darkenColor = (color: string, darkenPercentage: number) => {
  const oldColor = chroma(color);
  const newColor = oldColor.set("lch.l", `*${1 - darkenPercentage}`);
  return newColor.css();
};
