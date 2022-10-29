// @ts-ignore (for some reason, typescript thinks this is unused)
import type HammerManager from "hammerjs";
import React from "react";
import debug from "debug";

const log = debug("bobaui:layout-log");

const useSwipeHandler = ({
  layoutRef,
  onSwipe,
}: {
  layoutRef: React.RefObject<HTMLDivElement>;
  onSwipe: (direction: "left" | "right") => void;
}) => {
  const swipeHandler = React.useRef<HammerManager>(null);
  React.useEffect(() => {
    const Hammer = require("hammerjs") as HammerStatic;
    if (layoutRef.current && !swipeHandler.current) {
      // @ts-ignore
      delete Hammer.defaults.cssProps.userSelect;
      // @ts-ignore
      delete Hammer.defaults.cssProps.touchCallout;
      // @ts-ignore
      swipeHandler.current = new Hammer(layoutRef.current, {
        inputClass: Hammer.TouchInput,
        touchAction: "auto",
      });
      swipeHandler.current.get("swipe").set({
        threshold: 30,
      });
      swipeHandler.current.on("swiperight", () => {
        onSwipe("right");
      });
      swipeHandler.current.on("swipeleft", () => {
        onSwipe("left");
      });
    }
  }, [layoutRef, onSwipe]);
};

const useSideMenuTransition = ({
  onSideMenuFullyOpen,
  onSideMenuFullyClosed,
}: {
  onSideMenuFullyOpen?: () => void;
  onSideMenuFullyClosed?: () => void;
}): {
  layoutRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  sideMenuRef: React.RefObject<HTMLDivElement>;
  showSideMenu: boolean;
  setShowSideMenu: (show: boolean) => void;
} => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const layoutRef = React.useRef<HTMLDivElement>(null);
  const sideMenuRef = React.useRef<HTMLDivElement>(null);

  const [showSideMenu, setShowSideMenu] = React.useState(false);

  useSwipeHandler({
    layoutRef,
    onSwipe: React.useCallback(
      (direction) => setShowSideMenu(direction == "right"),
      []
    ),
  });

  React.useEffect(() => {
    log(`${showSideMenu ? "Opening" : "Closing"} side`);
    const scrollY = document.body.style.top;
    log(`Current body top position: ${scrollY}`);
    log(`Current body scrollY: ${window.scrollY}`);

    if (!contentRef.current || !layoutRef.current || !sideMenuRef.current) {
      return;
    }
    log(`Current sideMenu scrollY: ${sideMenuRef.current.offsetWidth}`);
    log(`Current sideMenu scrollY: ${sideMenuRef.current.clientWidth}`);
    log(`Show side menu? ${showSideMenu ? "true" : "false"}`);

    if (!showSideMenu) {
      if (layoutRef.current.style.overflow == "hidden") {
        sideMenuRef.current.classList.remove("opened");
        sideMenuRef.current.classList.add("closing");
      } else {
        sideMenuRef.current.classList.add("closed");
        onSideMenuFullyClosed?.();
      }
      return;
    }
    sideMenuRef.current.classList.add("opening");
    sideMenuRef.current.classList.remove("closed");
    // NOTE: body doesn't respect overflow hidden on mobile, so we
    // move it to layout
    document.body.style.overflow = "hidden";
    layoutRef.current.style.overflow = "hidden";
    // contentRef.current.style.overflow = "hidden";
    // This will be triggered when the animation for either
    // closing the sidemenu ends.
    // We attach it when we get the first request for showing
    // the sidemenu, and then reattach it only once that
    // transition is finished.
    const transitionEndListener = (e: TransitionEvent) => {
      log(`Animation finished...`);
      if (e.propertyName !== "transform") {
        // We only listen to this on transform or it might fire multiple
        // times for the same transition, which makes the logic not work.
        // This is because we're relying on ".opening" as a condition, since
        // we don't want to deal with parsing the CSS transform property.
        return;
      }
      if (
        !contentRef.current ||
        !layoutRef.current ||
        !sideMenuRef.current ||
        sideMenuRef.current.classList.contains("opening")
      ) {
        // The menu is open (or the refs are not available).
        // This means that we're still waiting for the menu to
        // close so we can remove all styles from the body.
        sideMenuRef.current?.classList.remove("opening");
        sideMenuRef.current?.classList.add("opened");
        onSideMenuFullyOpen?.();
        return;
      }
      sideMenuRef.current.classList.remove("closing");
      sideMenuRef.current.classList.add("closed");
      onSideMenuFullyClosed?.();

      log(`...Reactivating!`);
      sideMenuRef.current?.removeEventListener(
        "transitionend",
        transitionEndListener
      );
      document.body.style.overflow = "";
      // layoutRef.current.style.overflow = "";
      // contentRef.current.style.overflow = "";
    };
    log(`Adding event listener for end of transition...`);
    sideMenuRef.current.addEventListener(
      "transitionend",
      transitionEndListener
    );
  }, [showSideMenu, onSideMenuFullyOpen, onSideMenuFullyClosed]);

  return React.useMemo(
    () => ({
      layoutRef,
      contentRef,
      sideMenuRef,
      setShowSideMenu,
      showSideMenu,
    }),
    [layoutRef, contentRef, sideMenuRef, setShowSideMenu, showSideMenu]
  );
};
export default useSideMenuTransition;
