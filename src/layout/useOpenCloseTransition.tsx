// @ts-ignore (for some reason, typescript thinks this is unused)
import type HammerManager from "hammerjs";
import React from "react";

type TransitionHandler = (e: TransitionEvent) => void;

let swipeHandler: HammerManager | null = null;
let Hammer: HammerStatic | null = null;
if (typeof window !== "undefined") {
  Hammer = require("hammerjs") as HammerStatic;
  // @ts-ignore
  delete Hammer.defaults.cssProps.userSelect;
  // @ts-ignore
  delete Hammer.defaults.cssProps.touchCallout;
}
export const useSwipeHandler = ({
  setOpen,
}: {
  setOpen: (show: boolean) => void;
}) => React.useCallback(
    (ref: HTMLDivElement | null) => {
      if (!ref) {
        if (swipeHandler) {
          swipeHandler.destroy();
          swipeHandler = null;
        }
        return;
      }
      // TODO: double-check what happens if the layoutRef changes
      if (swipeHandler || !Hammer) {
        return;
      }
      swipeHandler = new Hammer(ref, {
        inputClass: Hammer.TouchInput,
        touchAction: "auto",
      });
      swipeHandler.get("swipe").set({
        threshold: 30,
      });
      swipeHandler.on("swiperight", () => {
        setOpen(true);
      });
      swipeHandler.on("swipeleft", () => {
        setOpen(false);
      });
    },
    [setOpen]
  );

/**
 * Adds all the transition handlers in a single function call.
 */
const addTransitionHandlers = (
  element: HTMLElement | null,
  handler: TransitionHandler
) => {
  if (!element) {
    return;
  }
  element.addEventListener("transitionstart", handler);
  element.addEventListener("transitionend", handler);
  element.addEventListener("transitioncancel", handler);
};

/**
 * Remove all the transition handlers in a single function call.
 */
const removeTransitionHandlers = (
  element: HTMLElement | null,
  handler: TransitionHandler
) => {
  if (!element) {
    return;
  }
  element.removeEventListener("transitionstart", handler);
  element.removeEventListener("transitionend", handler);
  element.removeEventListener("transitioncancel", handler);
};

const getTransitionEndHandler = ({
  setInTransition,
}: {
  setInTransition: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // We create a stack of the currently active transitions, and only
  // change the transition status to false when all the transitions
  // have effectively ended.
  const activeTransitions: string[] = [];
  return (e: TransitionEvent) => {
    switch (e.type) {
      case "transitionstart": {
        setInTransition(true);
        activeTransitions.push(e.type);
        break;
      }
      case "transitionend": {
        activeTransitions.shift();
        if (activeTransitions.length == 0) {
          setInTransition(false);
        }
        break;
      }
      case "transitioncancel": {
        // We never end a transition on cancel, as a new transition
        // start event will fire immediately after, or the transition
        // has been cancelled before it can even start (e.g. in case
        // of a transition with delay).
        activeTransitions.shift();
        break;
      }
    }
  };
};

export const useOpenCloseTransition = (): {
  transitionerRefHandler: (ref: HTMLDivElement | null) => void;
  isOpen: boolean;
  inTransition: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const currentSideMenuRef = React.useRef<HTMLDivElement | null>(null);
  const isOpenRef = React.useRef<boolean>(false);

  const [isOpen, setOpen] = React.useState(false);
  const [inTransition, setInTransition] = React.useState(false);
  // We create a stable reference to a transition handler, so we can easily add
  // and remove it as we deal with different refs to sideMenu
  const transitionHandler = React.useRef<
    ReturnType<typeof getTransitionEndHandler>
  >(
    getTransitionEndHandler({
      setInTransition,
    })
  );

  const transitionerRefHandler = React.useCallback(
    (ref: HTMLDivElement | null) => {
      if (!ref) {
        currentSideMenuRef.current = null;
        return;
      }
      const isSameRef = currentSideMenuRef.current == ref;
      if (isSameRef) {
        return;
      }
      // Remove all the transition handlers that we had added to the previous menu
      removeTransitionHandlers(
        currentSideMenuRef.current,
        transitionHandler.current
      );
      currentSideMenuRef.current = ref;
      // Save a reference to the transition handler so we can remove it later
      addTransitionHandlers(
        currentSideMenuRef.current,
        transitionHandler.current
      );
    },
    []
  );
  if (isOpenRef.current != isOpen) {
    // If the status of our ref is different from our saved status,
    // immediately mark the menu as being in transition, without waiting
    // for the React setState cycle to trigger.
    isOpenRef.current = isOpen;
    setInTransition(true);
  }

  return React.useMemo(
    () => ({
      setOpen,
      isOpen,
      inTransition,
      transitionerRefHandler,
    }),
    [setOpen, transitionerRefHandler, isOpen, inTransition]
  );
};
