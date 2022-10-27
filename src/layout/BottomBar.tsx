import CircleButton, { CircleButtonProps } from "buttons/CircleButton";
import Icon, { IconProps } from "common/Icon";
import DefaultTheme from "theme/default";

export interface BottomBarProps {
  centerButtonColor: string;
  centerButtonIcon: IconProps;
  circleButtons: CircleButtonProps[];
  contextMenuIcons: IconProps[];
}

const ContextMenu = (props: { icons: IconProps[] }) => (
  <button className="context-menu">
    <Icon color={props.icons[0].color} icon={props.icons[0].icon} />
    <Icon color={props.icons[1].color} icon={props.icons[1].icon} />
    <Icon color={props.icons[2].color} icon={props.icons[2].icon} />
    <Icon color={props.icons[3].color} icon={props.icons[3].icon} />
    <style jsx>{`
      .context-menu {
        display: grid;
        grid-template: 1fr 1fr / 1fr 1fr;
        border: 0;
        background-color: blue;
        border-radius: 0 15px 15px 0;
        box-shadow: 0 5px 0.5px yellow;
        padding-right: 10px;
        padding-bottom: 10px;
        padding-left: 5px;
        padding-top: 5px;
        gap: 5px;
      }
    `}</style>
  </button>
);
const CenterButton = (props: any) => (
  <button className="center-button">
    <Icon color="white" icon={props.icon} />
    <style jsx>{`
      .center-button {
        background-color: ${props.color};
        border: none;
        border-radius: 15px;
        width: 50px;
        height: 50px;
      }
    `}</style>
  </button>
);

const BottomBar = (props: BottomBarProps) => (
  <div className="bottom-bar">
    <ContextMenu icons={props.contextMenuIcons} />
    <CircleButton {...props.circleButtons[0]} />
    <CenterButton
      icon={props.centerButtonIcon}
      color={props.centerButtonColor}
    />
    <CircleButton {...props.circleButtons[1]} />
    <CircleButton {...props.circleButtons[2]} />
    <style jsx>{`
      .bottom-bar {
        display: flex;
        background-color: ${DefaultTheme.LAYOUT_HEADER_BACKGROUND_COLOR};
        justify-content: space-between;
        align-items: flex-end;
        padding: 15px 15px 15px 0;
      }
    `}</style>
  </div>
);

export default BottomBar;
