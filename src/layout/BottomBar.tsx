import CircleButton, { CircleButtonProps } from "buttons/CircleButton";
import {
  CreateBaseCompound,
  GetProps,
  extractCompounds,
} from "utils/compound-utils";
import DropdownMenu, {
  DropdownProps,
  DropdownStyle,
} from "common/DropdownListMenu";
import Icon, { IconProps } from "common/Icon";
import React, { AriaAttributes } from "react";

import ActionLink from "buttons/ActionLink";
import { LinkWithAction } from "types";
import Theme from "theme/default";
import classnames from "classnames";
import css from "styled-jsx/css";

interface ContextMenuProps {
  icons: (IconProps & { id: string })[];
  options: DropdownProps["options"];
  info?: React.ReactNode;
}
export interface BottomBarProps {
  accentColor?: string;
  centerButton?: IconProps & { link: LinkWithAction };
  contextMenu: ContextMenuProps;
  children: React.ReactNode;
}

const Button =
  CreateBaseCompound<GetProps<CompoundComponents["Button"]>>("Button");
export interface CompoundComponents {
  Button: React.FC<
    CircleButtonProps &
      AriaAttributes & {
        id: string;
        position: "left" | "right";
        desktopOnly?: boolean;
      }
  >;
}

export type BottomBarCompound = React.FC<BottomBarProps> & CompoundComponents;

const CONTEXT_BUTTON_SIZE_PX = 58;
const contextMenuCss = css.resolve`
  .context-menu-wrapper {
    display: flex;
    height: ${CONTEXT_BUTTON_SIZE_PX}px;
    width: ${CONTEXT_BUTTON_SIZE_PX}px;
    align-items: center;
    justify-content: center;
    position: relative;
    background: black;
    border-radius: 15px 15px 0 0;
    box-shadow: inset 0 0 0 1px hsl(0deg 0% 100% / 20%);
  }
  .context-menu {
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
    gap: 4px;
  }
  .icon {
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon :global(svg) {
    max-width: 100%;
  }

  @media only screen and (min-width: 600px) {
    .context-menu-wrapper {
      width: auto;
      height: auto;
      padding: 5px 8px;
      border-radius: 999px;
    }
    .context-menu {
      display: flex;
    }

    .icon {
      padding: 5px;
    }
  }
`;

const ContextMenu = (props: ContextMenuProps) => {
  if (!props.icons.length) {
    return null;
  }

  return (
    <DropdownMenu
      options={props.options}
      style={DropdownStyle.DARK}
      label="context menu"
    >
      {props.info && <DropdownMenu.Header>{props.info}</DropdownMenu.Header>}
      <div
        className={classnames("context-menu-wrapper", contextMenuCss.className)}
      >
        <div className={classnames("context-menu", contextMenuCss.className)}>
          {props.icons.map((icon) => (
            <div
              key={icon.id}
              className={classnames("icon", contextMenuCss.className)}
            >
              <Icon {...icon} />
            </div>
          ))}
        </div>
        {contextMenuCss.styles}
      </div>
    </DropdownMenu>
  );
};

const ACTION_BUTTON_SIZE_PX = 55;
const getCenterButtonCss = (props: { accentColor?: string }) => css.resolve`
  .action-button {
    background: ${props.accentColor ?? Theme.DEFAULT_ACCENT_COLOR};
    border: none;
    border-radius: 999px;
    width: ${ACTION_BUTTON_SIZE_PX}px;
    height: ${ACTION_BUTTON_SIZE_PX}px;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3px;
    grid-area: center-button;
    z-index: 2;
  }

  @media only screen and (min-width: 600px) {
    .action-button {
      margin-bottom: 0;
    }
  }
`;
const CenterButton = (
  props: IconProps & { accentColor?: string; link: LinkWithAction }
) => {
  const css = getCenterButtonCss({ accentColor: props.accentColor });
  return (
    <DropdownMenu>
      <ActionLink
        className={classnames("action-button", css.className)}
        link={props.link}
      >
        <Icon {...props} />
        {css.styles}
      </ActionLink>
    </DropdownMenu>
  );
};

const circleButtonCss = css.resolve`
  .button {
    margin-top: 7px;
    height: auto;
  }

  .circle-button {
    width: ${CONTEXT_BUTTON_SIZE_PX}px;
  }
  @media only screen and (min-width: 600px) {
    .button {
      margin-top: 0;
    }

    .circle-button {
      width: auto;
    }
  }
  @media only screen and (min-width: ${Theme.MOBILE_WIDTH_TRIGGER_PX}px) {
    .desktop-only {
      display: none;
    }
  }
`;

const BottomBar: BottomBarCompound = (props: BottomBarProps) => {
  const buttons = extractCompounds(props.children, Button);
  const leftButtons = buttons.filter(
    (button) => button.props.position === "left"
  );
  const rightButtons = buttons.filter(
    (button) => button.props.position === "right"
  );

  if (rightButtons.length > 2) {
    throw new Error("BottomBar cannot display more than 2 right buttons");
  }

  if (leftButtons.length > 1) {
    throw new Error("BottomBar cannot display more than 1 left button");
  }

  const noLeftButtonsOnDesktop =
    !leftButtons.length ||
    leftButtons.every((button) => button.props.desktopOnly);

  const hasLeftPortionOnDestkop =
    noLeftButtonsOnDesktop && !props.contextMenu.icons.length;

  const isEmptyOnDesktop =
    noLeftButtonsOnDesktop &&
    !rightButtons.length &&
    !props.contextMenu.icons.length &&
    !props.centerButton;
  return (
    <div
      className={classnames("bottom-bar", {
        // If there's elements, but there's none on desktop, then we hide the bottom bar
        // when the desktop UI is triggered.
        "empty-on-desktop": isEmptyOnDesktop,
      })}
    >
      <div
        className={classnames("left-buttons", {
          // If there's neither a context menu nor a left button that is displayed on
          // desktop, then we completely hide this left part.
          "hidden-on-desktop": hasLeftPortionOnDestkop,
        })}
      >
        <ContextMenu {...props.contextMenu} />
        {leftButtons.map((button) => (
          <CircleButton
            key={button.props.id}
            className={classnames("button", circleButtonCss.className, {
              "desktop-only": button.props.desktopOnly,
            })}
            {...button.props}
          />
        ))}
      </div>
      {props.centerButton && (
        <CenterButton {...props.centerButton} accentColor={props.accentColor} />
      )}
      <div
        className={classnames("right-buttons", {
          "desktop-left-rounded": hasLeftPortionOnDestkop,
        })}
      >
        {rightButtons.map((button) => (
          <CircleButton
            key={button.props.id}
            className={classnames("button", circleButtonCss.className, {
              "desktop-only": button.props.desktopOnly,
            })}
            {...button.props}
          />
        ))}
      </div>
      <style jsx>{`
        .bottom-bar {
          pointer-events: all;
          display: grid;
          grid-template-columns: 1fr ${ACTION_BUTTON_SIZE_PX}px 1fr;
          grid-template-areas: "left-buttons center-button right-buttons";
          position: absolute;
          top: -7px;
          left: 0;
          right: 0;
          bottom: 0;
          gap: 8px;
        }
        .bottom-bar::before {
          content: "";
          background-color: ${Theme.LAYOUT_HEADER_BACKGROUND_COLOR};
          position: absolute;
          top: 7px;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .left-buttons,
        .right-buttons {
          display: flex;
          justify-content: space-evenly;
          gap: 8px;
        }

        .left-buttons {
          grid-area: left-buttons;
        }

        .right-buttons {
          grid-area: right-buttons;
        }

        // This is the desktop portion of the CSS
        @media only screen and (min-width: 600px) {
          .bottom-bar {
            display: grid;
            grid-template-columns: ${ACTION_BUTTON_SIZE_PX}px auto auto;
            grid-template-areas: "center-button left-buttons right-buttons";
            justify-content: flex-end;
            gap: 0;
            top: auto;
            padding: 5px;
            width: fit-content;
            margin-left: auto;
          }
          .bottom-bar::before {
            display: none;
          }
          .bottom-bar.empty-on-desktop {
            display: none;
          }
          .left-buttons {
            margin-left: 5px;
            border-radius: 999px 0 0 999px;
            background: rgb(19, 21, 24);
            padding: 10px 5px 10px 10px;
          }
          .left-buttons.hidden-on-desktop {
            display: none;
          }

          .right-buttons {
            border-radius: 0 999px 999px 0;
            background: rgb(19, 21, 24);
            padding: 10px 10px 10px 5px;
          }
          .right-buttons.desktop-left-rounded {
            padding: 10px 10px 10px 10px;
            border-radius: 999px;
            margin-left: 5px;
          }
        }
      `}</style>
      {circleButtonCss.styles}
    </div>
  );
};
BottomBar.Button = Button;

export default BottomBar;
