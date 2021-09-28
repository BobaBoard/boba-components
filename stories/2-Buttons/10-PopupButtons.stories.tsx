import React from "react";
import PopupButtonsComponent from "../../src/buttons/PopupButtons";
import DefaultTheme from "../../src/theme/default";
import {
  faMapPin,
  faBellSlash,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Buttons/Popup Buttons",
  component: PopupButtonsComponent,
} as Meta;

export const PopupButtons = () => {
  const container = React.useRef<HTMLDivElement>();
  const [show, setShow] = React.useState(true);
  return (
    <div ref={container}>
      <button onClick={() => setShow(!show)}>Toggle visibility</button>
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
    </div>
  );
};
PopupButtons.decorators = [
  (Story: Story) => (
    <div className="story">
      <Story />
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
  ),
];
