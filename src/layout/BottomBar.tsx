import CircleButton, { CircleButtonProps } from "buttons/CircleButton";
import DropdownMenu, {
  DropdownProps,
  DropdownStyle,
} from "common/DropdownListMenu";
import Icon, { IconProps } from "common/Icon";

import ActionLink from "buttons/ActionLink";
import DefaultTheme from "theme/default";
import { LinkWithAction } from "types";
import React from "react";
import classnames from "classnames";
import css from "styled-jsx/css";

interface ContextMenuProps {
  icons: (IconProps & { id: string })[];
  options: DropdownProps["options"];
  info?: React.ReactNode;
}

export interface BottomBarProps {
  accentColor?: string;
  centerButton: IconProps & { link: LinkWithAction };
  circleButtons: CircleButtonProps[];
  contextMenu: ContextMenuProps;
}

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

  @media only screen and (min-width: 520px) {
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

const ContextMenu = (props: ContextMenuProps) => (
  <DropdownMenu options={props.options} style={DropdownStyle.DARK}>
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

const ACTION_BUTTON_SIZE_PX = 55;
const getCenterButtonCss = (props: { accentColor?: string }) => css.resolve`
  .action-button {
    background: ${props.accentColor ?? DefaultTheme.DEFAULT_ACCENT_COLOR};
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
  }

  @media only screen and (min-width: 520px) {
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
  @media only screen and (min-width: 520px) {
    .button {
      margin-top: 0;
    }

    .circle-button {
      width: auto;
    }
  }
`;
const BottomBar = (props: BottomBarProps) => (
  <div className="bottom-bar">
    <div className="left-buttons">
      <ContextMenu {...props.contextMenu} />
      <CircleButton
        className={classnames("button", circleButtonCss.className)}
        {...props.circleButtons[0]}
      />
    </div>
    <CenterButton {...props.centerButton} accentColor={props.accentColor} />
    <div className="right-buttons">
      <CircleButton
        className={classnames("button", circleButtonCss.className)}
        {...props.circleButtons[1]}
      />
      <CircleButton
        className={classnames("button", circleButtonCss.className)}
        {...props.circleButtons[2]}
      />
    </div>
    <style jsx>{`
      .bottom-bar {
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

      @media only screen and (min-width: 520px) {
        .bottom-bar {
          display: grid;
          grid-template-columns: ${ACTION_BUTTON_SIZE_PX}px auto auto;
          grid-template-areas: "center-button left-buttons right-buttons";
          justify-content: flex-end;
          gap: 0;
          top: auto;
          padding: 5px;
        }

        .left-buttons {
          margin-left: 5px;
          border-radius: 999px 0 0 999px;
          background: rgb(19, 21, 24);
          padding: 10px 5px 10px 10px;
        }

        .right-buttons {
          border-radius: 0 999px 999px 0;
          background: rgb(19, 21, 24);
          padding: 10px 10px 10px 5px;
        }
      }
    `}</style>
    {circleButtonCss.styles}
  </div>
);

export default BottomBar;
