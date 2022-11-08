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

const contextMenuCss = css.resolve`
  .context-menu {
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
    border: 0;
    background: linear-gradient(
        126.16deg,
        rgb(48 40 40 / 91%) 1.01%,
        rgb(115 121 130 / 20%) 110.27%
      ),
      rgb(46, 46, 48);
    box-shadow: rgb(42 47 55 / 18%) 1px 3px 2px 2px;
    border-radius: 0 15px 15px 0;
    padding: 8px 10px 8px 6px;
    gap: 4px;
    position: relative;
    margin-bottom: 3px;
  }
  .context-menu::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 15px 15px 0;
    background: linear-gradient(
        126.16deg,
        rgb(48 40 40 / 91%) 1.01%,
        rgb(115 121 130 / 20%) 110.27%
      ),
      rgb(46, 46, 48);
    opacity: 20%;
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
`;

const ContextMenu = (props: ContextMenuProps) => (
  <DropdownMenu options={props.options} style={DropdownStyle.DARK}>
    {props.info && <DropdownMenu.Header>{props.info}</DropdownMenu.Header>}
    <div className={classnames("context-menu", contextMenuCss.className)}>
      {props.icons.map((icon) => (
        <div
          key={icon.id}
          className={classnames("icon", contextMenuCss.className)}
        >
          <Icon {...icon} />
        </div>
      ))}
      {contextMenuCss.styles}
    </div>
  </DropdownMenu>
);

const ACTION_BUTTON_SIZE_PX = 55;
const getCenterButtonCss = (props: { accentColor?: string }) => css.resolve`
  .action-button {
    background: ${props.accentColor ?? DefaultTheme.DEFAULT_ACCENT_COLOR};
    border: none;
    border-radius: 15px;
    width: ${ACTION_BUTTON_SIZE_PX}px;
    height: ${ACTION_BUTTON_SIZE_PX}px;
    top: -10px;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3px;
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
`;
const BottomBar = (props: BottomBarProps) => (
  <div className="bottom-bar">
    <ContextMenu {...props.contextMenu} />
    <CircleButton
      className={classnames("button", circleButtonCss.className)}
      {...props.circleButtons[0]}
    />
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
        grid-template-columns: ${ACTION_BUTTON_SIZE_PX}px 1fr ${ACTION_BUTTON_SIZE_PX}px 1fr ${ACTION_BUTTON_SIZE_PX}px;
        grid-template-areas: "context-menu left-buttons center-button right-buttons-1 right-buttons-2";
        position: absolute;
        top: -7px;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .right-buttons {
        grid-column-start: right-buttons-1-start;
        grid-column-end: right-buttons-2-end;
        display: flex;
        justify-content: space-around;
      }
    `}</style>
    {circleButtonCss.styles}
  </div>
);

export default BottomBar;
