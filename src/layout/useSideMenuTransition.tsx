// @ts-ignore (for some reason, typescript thinks this is unused)
import type HammerManager from "hammerjs";
import React from "react";

type SideMenuStatus = "closed" | "open" | "closing" | "opening";
type TransitionHandler = (e: TransitionEvent) => void;

let swipeHandler: HammerManager | null = null;
const addSwipeHandler = ({
  layoutRef,
  onSwipe,
}: {
  layoutRef: HTMLDivElement;
  onSwipe: (direction: "left" | "right") => void;
}) => {
  // TODO: double-check what happens if the layoutRef changes
  if (swipeHandler) {
    return;
  }
  const Hammer = require("hammerjs") as HammerStatic;
  // @ts-ignore
  delete Hammer.defaults.cssProps.userSelect;
  // @ts-ignore
  delete Hammer.defaults.cssProps.touchCallout;
  swipeHandler = new Hammer(layoutRef, {
    inputClass: Hammer.TouchInput,
    touchAction: "auto",
  });
  swipeHandler.get("swipe").set({
    threshold: 30,
  });
  swipeHandler.on("swiperight", () => {
    onSwipe("right");
  });
  swipeHandler.on("swipeleft", () => {
    onSwipe("left");
  });
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
  setShowSideMenu,
  setInTransition,
}: {
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setInTransition: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (e: TransitionEvent) => {
    const sideMenu = e.target as HTMLDivElement;
    const isOpen = sideMenu.classList.contains("open");
    switch (e.type) {
      case "transitionstart": {
        setInTransition(true);
        setShowSideMenu((showSideMenu) => {
          if (isOpen == showSideMenu) {
            // If the CSS state and the React state agree
            // then we don't need to update the status.
            return isOpen;
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
  layoutRefHandler: (ref: HTMLDivElement | null) => void;
  sideMenuRefHandler: (ref: HTMLDivElement | null) => void;
  status: SideMenuStatus;
  setShowSideMenu: (show: boolean) => void;
} => {
  const currentSideMenuRef = React.useRef<HTMLDivElement | null>(null);

  const [showSideMenu, setShowSideMenu] = React.useState(false);
  const [inTransition, setInTransition] = React.useState(false);
  // We create a stable reference to a transition handler, so we can easily add
  // and remove it as we deal with different refs to sideMenu
  const transitionHandler = React.useRef<
    ReturnType<typeof getTransitionHandler>
  >(
    getTransitionHandler({
      setShowSideMenu,
      setInTransition,
    })
  );

  const layoutRefHandler = React.useCallback((ref: HTMLDivElement | null) => {
    if (!ref) {
      return;
    }
    addSwipeHandler({
      layoutRef: ref,
      // We don't need to change "in transition" here because swiping doesn't change
      // whether the menu is transitioning, but only its direction (which, if different
      // than the current, will then trigger the transition).
      onSwipe: (direction) => setShowSideMenu(direction == "right"),
    });
  }, []);

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
  currentSideMenuRef.current?.classList.toggle("closed", !showSideMenu);
  currentSideMenuRef.current?.classList.toggle("open", showSideMenu);
  currentSideMenuRef.current?.classList.toggle("in-transition", inTransition);

  let status: SideMenuStatus = showSideMenu ? "open" : "closed";
  if (inTransition) {
    status = showSideMenu ? "opening" : "closing";
  }

  return React.useMemo(
    () => ({
      setShowSideMenu,
      status,
      layoutRefHandler,
      sideMenuRefHandler,
    }),
    [setShowSideMenu, layoutRefHandler, sideMenuRefHandler, status]
  );
};
export default useSideMenuTransition;
