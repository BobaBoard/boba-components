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
  setShowSideMenu,
}: {
  setShowSideMenu: (show: boolean) => void;
}) => {
  return React.useCallback(
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
        setShowSideMenu(true);
      });
      swipeHandler.on("swipeleft", () => {
        setShowSideMenu(false);
      });
    },
    [setShowSideMenu]
  );
};

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
  const activeTransitions: string[] = [];
  return (e: TransitionEvent) => {
    console.log(e.type, e.propertyName);
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

// TODO: remove references to sideMenu here and just call this something like
// "useOpenCloseTransition".
const useSideMenuTransition = (): {
  sideMenuRefHandler: (ref: HTMLDivElement | null) => void;
  showSideMenu: boolean;
  inTransition: boolean;
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const currentSideMenuRef = React.useRef<HTMLDivElement | null>(null);
  const isOpenRef = React.useRef<boolean>(false);

  const [showSideMenu, setShowSideMenu] = React.useState(false);
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

  const sideMenuRefHandler = React.useCallback((ref: HTMLDivElement | null) => {
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
  }, []);
  if (isOpenRef.current != showSideMenu) {
    // If the status of our ref is different from our saved status,
    // immediately mark the menu as being in transition, without waiting
    // for the React setState cycle to trigger.
    isOpenRef.current = showSideMenu;
    setInTransition(true);
  }

  return React.useMemo(
    () => ({
      setShowSideMenu,
      showSideMenu,
      inTransition,
      sideMenuRefHandler,
    }),
    [setShowSideMenu, sideMenuRefHandler, showSideMenu, inTransition]
  );
};
export default useSideMenuTransition;
