import {
  getAllImages,
  removeTrailingWhitespace,
  replaceImages,
} from "@bobaboard/boba-editor";

import React from "react";
import Theme from "theme/default";
import chroma from "chroma-js";

export const hex2rgba = (hex: string, alpha = 1) => {
  const [red, green, blue] =
    hex.match(/\w\w/g)?.map((color: string) => parseInt(color, 16)) || [];
  if (!red) {
    return hex;
  }
  return `rgba(${red},${green},${blue},${alpha})`;
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
  backdropNode.setAttribute("role", "presentation");
  document.body.appendChild(backdropNode);

  backdropNode.addEventListener("click", (event) => {
    onClick();
    event.stopPropagation();
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
    backdropNode.style.zIndex = `${zIndex || 50}`;
    return () => {
      removeBackdropNode(id);
    };
  }, [open, id, onClick, zIndex]);

  return { open, setOpen };
};

export const prepareContentSubmission = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any,
  uploadFunction: (src: string) => Promise<string>
) => {
  const delta = removeTrailingWhitespace(text);
  const images = getAllImages(delta);
  return Promise.all(images.map((src: string) => uploadFunction(src))).then(
    (uploadedImages) => {
      const replacements = images.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (obj: any, image: string, index: number) => ({
          ...obj,
          [image]: uploadedImages[index],
        }),
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
