import { Meta, Story } from "@storybook/react";
import PopupButtonsComponent, { PopupButtonsProps } from "buttons/PopupButtons";
import {
  faBellSlash,
  faMapPin,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";

import DefaultTheme from "theme/default";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Buttons/Popup Buttons",
  component: PopupButtonsComponent,
} as Meta;

export const PopupButtons: Story<
  PopupButtonsProps & {
    setShow: (show: boolean) => void;
  }
> = ({ show, setShow, container }) => (
  <PopupButtonsComponent
    onCloseRequest={() => setShow(false)}
    options={[
      {
        name: "Href Only",
        color: DefaultTheme.INDENT_COLORS[0],
        icon: faBellSlash,
        link: {
          href: "#href",
        },
      },
      {
        name: "Both",
        color: DefaultTheme.INDENT_COLORS[1],
        icon: faPaintBrush,
        link: {
          href: "#href",
          onClick: action("noHrefClick"),
        },
      },
      {
        name: "Pin board",
        icon: faMapPin,
        link: {
          onClick: action("noHrefClick"),
        },
      },
      {
        name: "Href Only 2",
        color: DefaultTheme.INDENT_COLORS[0],
        icon: faBellSlash,
        link: {
          href: "#href",
        },
      },
      {
        name: "Both 2",
        color: DefaultTheme.INDENT_COLORS[1],
        icon: faPaintBrush,
        link: {
          href: "#href",
          onClick: action("noHrefClick"),
        },
      },
    ]}
    show={show}
    centerTop={"100px"}
    centerLeft={"100px"}
    container={container}
  />
);
PopupButtons.decorators = [
  (Story, props) => {
    const container = React.useRef<HTMLDivElement>(null);
    const [show, setShow] = React.useState(true);
    return (
      <div className="story" ref={container}>
        <button onClick={() => setShow(!show)}>Toggle visibility</button>
        {Story({
          args: {
            show,
            container,
            ...props.args,
            setShow,
          },
        })}
        <style jsx>{`
          .story {
            position: relative;
            height: 200px;
          }
          .story > :global(div) {
            margin: 10px;
          }
        `}</style>
      </div>
    );
  },
];
