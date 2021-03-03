import React from "react";
import DropdownListMenu from "../src/common/DropdownListMenu";
import PopupButtons from "../src/common/PopupButtons";
import Button from "../src/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faMapPin,
  faVolumeMute,
  faBellSlash,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { action } from "@storybook/addon-actions";
import DefaultTheme from "../src/theme/default";

export default {
  title: "Dropdown Preview",
  component: DropdownListMenu,
};

export const ClassicDropdownStory = () => {
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "15px" }}>
      <DropdownListMenu
        options={[
          {
            name: "Pin board",
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Mute board",
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Dismiss notifications",
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Customize Summary",
            link: {
              onClick: action("noHrefClick"),
            },
          },
        ]}
        zIndex={51}
      >
        <Button>Click me!</Button>
      </DropdownListMenu>
    </div>
  );
};

ClassicDropdownStory.story = {
  name: "classic",
};

export const IconDropwdownStory = () => {
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "15px" }}>
      <DropdownListMenu
        options={[
          {
            name: "Pin board",
            icon: faMapPin,
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Mute board",
            icon: faVolumeMute,
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Dismiss notifications",
            icon: faBellSlash,
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Customize Summary",
            icon: faPaintBrush,
            link: {
              onClick: action("noHrefClick"),
            },
          },
        ]}
        zIndex={51}
      >
        <FontAwesomeIcon icon={faCaretDown} />
      </DropdownListMenu>
    </div>
  );
};

IconDropwdownStory.story = {
  name: "icon",
};

export const MultipleDropdowns = () => {
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "15px" }}>
      <DropdownListMenu
        options={[
          {
            name: "Pin board",
            icon: faMapPin,
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Inner Options",
            icon: faVolumeMute,
            options: [
              {
                name: "Inner Option 1",
                icon: faBellSlash,
                link: {
                  onClick: action("noHrefClick"),
                },
              },
              {
                name: "Inner Option 2",
                icon: faPaintBrush,
                options: [
                  {
                    name: "Inner Option 21",
                    icon: faBellSlash,
                    link: {
                      onClick: action("noHrefClick"),
                    },
                  },
                  {
                    name: "Inner Option 22",
                    icon: faPaintBrush,
                    link: {
                      onClick: action("noHrefClick"),
                    },
                  },
                  {
                    name: "Inner Option 23",
                    icon: faPaintBrush,
                    link: {
                      onClick: action("noHrefClick"),
                    },
                  },
                  {
                    name: "Inner Option 2424242424242424242424",
                    icon: faPaintBrush,
                    link: {
                      onClick: action("noHrefClick"),
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "Dismiss notifications",
            icon: faBellSlash,
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Customize Summary",
            icon: faPaintBrush,
            link: {
              onClick: action("noHrefClick"),
            },
          },
        ]}
        zIndex={51}
      >
        <FontAwesomeIcon icon={faCaretDown} />
      </DropdownListMenu>
    </div>
  );
};

MultipleDropdowns.story = {
  name: "multiple",
};

export const WithHeader = () => {
  return (
    <div style={{ width: "500px", backgroundColor: "white", padding: "15px" }}>
      <DropdownListMenu
        header={
          <div style={{ backgroundColor: "red" }}>
            This is a header, this is a header, a beautiful header
          </div>
        }
        options={[
          {
            name: "OnClick Only",
            icon: faMapPin,
            link: {
              onClick: action("noHrefClick"),
            },
          },
          {
            name: "Inner Options",
            icon: faVolumeMute,
            options: [
              {
                name: "Inner Option 1",
                icon: faBellSlash,
                link: {
                  onClick: action("noHrefClick"),
                },
              },
              {
                name: "Inner Option 2",
                icon: faPaintBrush,
                options: [
                  {
                    name: "Inner Option 21",
                    icon: faBellSlash,
                    link: {
                      onClick: action("noHrefClick"),
                    },
                  },
                  {
                    name: "Inner Option 22",
                    icon: faPaintBrush,
                    link: {
                      onClick: action("noHrefClick"),
                    },
                  },
                  {
                    name: "Inner Option 23",
                    icon: faPaintBrush,
                    link: {
                      onClick: action("noHrefClick"),
                    },
                  },
                  {
                    name: "Inner Option 2424242424242424242424",
                    icon: faPaintBrush,
                    link: {
                      onClick: action("noHrefClick"),
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "Href Only",
            icon: faBellSlash,
            link: {
              href: "#href",
            },
          },
          {
            name: "Both",
            icon: faPaintBrush,
            link: {
              href: "#href",
              onClick: action("noHrefClick"),
            },
          },
        ]}
        zIndex={51}
      >
        <FontAwesomeIcon icon={faCaretDown} />
      </DropdownListMenu>
    </div>
  );
};

WithHeader.story = {
  name: "with header",
};

export const PopupButtonsStory = () => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle visibility</button>
      <PopupButtons
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
          // {
          //   name: "Href Only",
          //   color: DefaultTheme.INDENT_COLORS[0],
          //   icon: faBellSlash,
          //   link: {
          //     href: "#href",
          //   },
          // },
          // {
          //   name: "Both",
          //   color: DefaultTheme.INDENT_COLORS[1],
          //   icon: faPaintBrush,
          //   link: {
          //     href: "#href",
          //     onClick: action("noHrefClick"),
          //   },
          // },
        ]}
        show={show}
        centerTop={"100px"}
        centerLeft={"100px"}
      />
    </>
  );
};
