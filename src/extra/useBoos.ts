import css from "styled-jsx/css";

import debug from "debug";
import React from "react";

import booAwake from "../images/boo_awake.png";
import booAwakeFlipped from "../images/boo_awake_flipped.png";
import booShy from "../images/boo_shy.png";
import booShyFlipped from "../images/boo_shy_flipped.png";

const info = debug("bobafrontend:index-info");

const GHOST_SIZE = 50;
const BOUNDARY = 60;
const { className, styles } = css.resolve`
  div {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    opacity: 0;
    background-image: url(${booAwake});
    width: ${GHOST_SIZE}px;
    height: ${GHOST_SIZE}px;
    background-size: contain;
    background-repeat: no-repeat;
    transform-origin: top left;
  }
  div:hover {
    cursor: pointer;
  }
  .left {
    background-image: url(${booAwakeFlipped});
  }
  .right {
  }
  .popout {
    animation: popout 0.4s ease;
    animation-name: popout;
    animation-duration: 0.4s;
    animation-timing-function: ease;
    transform-origin: 50% 50%;
    background-image: url(${booShy});
  }
  .popout.left {
    background-image: url(${booShyFlipped});
  }
  @keyframes popout {
    from {
      opacity: 1;
      transform: scale(0.8);
    }
    to {
      opacity: 0;
      transform: scale(1.2);
    }
  }
  @-webkit-keyframes popout {
    0% {
      opacity: 1;
      transform: scale(0.8);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
`;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
let MAX_GHOSTS = 5;
let GHOST_CHANCE = 3;
let GHOST_INTERVAL = 1000;
let currentGhosts = 0;

const moveGhost = (ghost: HTMLElement, onRemoveCallback?: () => void) => {
  if (ghost.classList.contains("popout")) {
    // The ghost is being cleared and can't move anymore.
    return;
  }
  if (!ghost.parentNode) {
    return;
  }
  if (ghost.style.opacity === "0" && ghost.parentNode) {
    // The ghost now has no opacity, but it's still attached to the page.
    // We remove it, and call the remove callback.
    ghost.parentNode?.removeChild(ghost);
    // info(`removing ghost ${ghost.dataset.index}`);
    // info(currentGhosts);
    onRemoveCallback?.();
    return;
  }
  if (
    parseInt(ghost.dataset.moves || "0") >
    parseInt(ghost.dataset.lifespan || "0")
  ) {
    // The ghost has made more moves than its lifespan allowed. We slowly
    // transition the opacity out.
    ghost.style.opacity = "0";
  }

  // Figure out the next position of the ghost
  const deltaX = getRandomInt(2) % 2 ? 100 : -100;
  const deltaY = getRandomInt(2) % 2 ? 100 : -100;
  const currentX = ghost.getBoundingClientRect().left;
  const currentY =
    ghost.getBoundingClientRect().top -
    (ghost.offsetParent?.getBoundingClientRect().top || 0);
  let nextX = currentX + deltaX;
  let nextY = currentY + deltaY;
  if (nextX < 0 || nextX + BOUNDARY > innerWidth) {
    nextX = currentX - deltaX;
  }
  if (
    nextY < BOUNDARY ||
    nextY + BOUNDARY > pageYOffset + innerHeight - BOUNDARY
  ) {
    nextY = currentY - deltaY;
  }
  // Make the ghost face the right direction
  ghost.classList.toggle("left", nextX < currentX);
  ghost.classList.toggle("right", nextX > currentX);
  // info(`${currentX} ${currentY}`);
  // info(`${deltaX} ${deltaY}`);
  // info(`translate(${nextX}px, ${nextY}px)`);
  ghost.style.transform = `translate(${nextX}px, ${nextY}px)`;
  ghost.dataset.moves = "" + (parseInt(ghost.dataset.moves || "0") + 1);
};

const clearGhost = (ghost: HTMLElement, onRemoveCallback?: () => void) => {
  const currentX = ghost.getBoundingClientRect().left;
  const currentY =
    ghost.getBoundingClientRect().top -
    (ghost.offsetParent?.getBoundingClientRect().top || 0);
  requestAnimationFrame(() => {
    ghost.classList.toggle("popout", true);
  });
  // Remove all styles tied up to moving transform, since the disappearing animation
  // will override them, and instead just fix the ghost div to the current X/Y.
  // If you don't remove the transition timings, Safari will do the (for once)
  // right thing and the element will just slowly translate to its new (0, 0) position,
  // and will not be where you expect it to.
  ghost.style.top = `${currentY}px`;
  ghost.style.left = `${currentX}px`;
  ghost.style.transition = ``;
  ghost.style.transform = `translate(0, 0)`;
  setTimeout(() => {
    ghost.parentNode?.removeChild(ghost);
    onRemoveCallback?.();
  }, 300);
};

const newGhost = (onRemoveCallback: () => void) => {
  info("Hello");
  const newGhost = document.createElement("div");
  newGhost.classList.add(className);
  document.body.appendChild(newGhost);
  newGhost.style.transform = `translate(${getRandomInt(
    innerWidth - GHOST_SIZE
  )}px, ${pageYOffset + getRandomInt(innerHeight - GHOST_SIZE)}px)`;
  newGhost.dataset.lifespan = "" + (4 + getRandomInt(4));
  info(`New ghost at ${newGhost.style.transform}`);

  // Whenever a ghost is done moving (its transition is finished),
  // queue up a new transition.
  newGhost.addEventListener("transitionend", () => {
    // let currentX = newGhost.getBoundingClientRect().x;
    // let currentY = newGhost.getBoundingClientRect().y;
    // // info(`${currentX} ${currentY}`);
    moveGhost(newGhost, onRemoveCallback);
  });
  newGhost.addEventListener("click", (e) => {
    clearGhost(newGhost, onRemoveCallback);
    e.stopPropagation();
  });

  // Rather than immediately adding the opacity/position transition to the new ghost,
  // we wait for a very tiny amount of time so that the browser has already attached
  // the element to the page.
  // If we don't do this, the browser will attach the element to the (0, 0) position,
  // and then the CSS transition will sloooooowly move it to its real starting place.
  // TODO: at least I think this is why this thing is here. I admit I should have
  // documented it when I first wrote it.
  setTimeout(() => {
    newGhost.style.transition = `transform 2.5s linear, opacity 2.5s linear`;
    newGhost.style.opacity = "1";
    newGhost.dataset.index = "" + currentGhosts;
    moveGhost(newGhost);
  }, 200);

  return newGhost;
};

const useBoos = ({ startActive }: { startActive: boolean }) => {
  const ghosts = React.useRef<HTMLElement[]>([]);
  const timeout = React.useRef<NodeJS.Timeout>(null);
  const [active, setActive] = React.useState(startActive);

  React.useEffect(() => {
    GHOST_CHANCE = 5;
    MAX_GHOSTS = 15;
    GHOST_INTERVAL = 1500;
    setActive(true);
  }, []);

  React.useEffect(() => {
    if (!active) {
      timeout.current && clearTimeout(timeout.current);
      // @ts-ignore
      timeout.current = null;
      return;
    }
    currentGhosts = 0;
    const maybeCreateGhost = () => {
      info(`Current ghosts: ${currentGhosts}; max ghosts: ${MAX_GHOSTS}`);
      if (
        active &&
        currentGhosts < MAX_GHOSTS &&
        getRandomInt(GHOST_CHANCE) % GHOST_CHANCE == 0
      ) {
        currentGhosts = currentGhosts + 1;
        const spawned = newGhost(() => {
          // info(currentGhosts);
          ghosts.current = ghosts.current.filter((ghost) => ghost != spawned);
          currentGhosts = currentGhosts - 1;
        });
        ghosts.current.push(spawned);
      }
      // @ts-ignore
      timeout.current = setTimeout(() => {
        maybeCreateGhost();
      }, GHOST_INTERVAL);
    };
    // @ts-ignore
    timeout.current = setTimeout(() => {
      maybeCreateGhost();
    }, GHOST_INTERVAL);
    return () => {
      ghosts.current.forEach((ghost) => {
        ghost.parentElement?.removeChild(ghost);
      });
      currentGhosts = 0;
      timeout.current && clearTimeout(timeout.current);
    };
  }, [active]);

  return { styles, setActive };
};

export default useBoos;
