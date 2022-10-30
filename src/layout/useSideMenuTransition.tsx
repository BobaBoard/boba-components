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

const getTransitionHandler = ({
  isOpenRef,
  setShowSideMenu,
  setInTransition,
}: {
  isOpenRef: React.MutableRefObject<boolean>;
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setInTransition: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (e: TransitionEvent) => {
    if (e.propertyName != "transform") {
      return;
    }
    switch (e.type) {
      case "transitionstart": {
        setInTransition(true);
        setShowSideMenu((showSideMenu) => {
          if (isOpenRef.current == showSideMenu) {
            // If the CSS state and the React state agree
            // then we don't need to update the status.
            return isOpenRef.current;
          }
          return !showSideMenu;
        });
        break;
      }
      case "transitionend": {
        setInTransition(false);
        break;
      }
      case "transitioncancel": {
        // We do nothing here, as a new transition start event will fire
        // immediately after.
        break;
      }
    }
  };
};

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
    ReturnType<typeof getTransitionHandler>
  >(
    getTransitionHandler({
      isOpenRef,
      setShowSideMenu,
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
    ref.classList.add("closed");
    // Save a reference to the transition handler so we can remove it later
    addTransitionHandlers(
      currentSideMenuRef.current,
      transitionHandler.current
    );
  }, []);
  isOpenRef.current = showSideMenu;

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
