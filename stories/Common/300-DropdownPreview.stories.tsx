import {
  faBellSlash,
  faCaretDown,
  faMapPin,
  faPaintBrush,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

import Button from "buttons/Button";
import DropdownListMenu from "common/DropdownListMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Dropdown/Dropdown List Menu",
  component: DropdownListMenu,
};

export const ClassicDropdownStory = () => (
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

ClassicDropdownStory.story = {
  name: "classic",
};

export const IconDropwdownStory = () => (
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
        <DropdownListMenu.Header></DropdownListMenu.Header>
      </DropdownListMenu>
    </div>
  );

IconDropwdownStory.story = {
  name: "icon",
};

export const MultipleDropdowns = () => (
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

MultipleDropdowns.story = {
  name: "multiple",
};

export const WithHeader = () => (
    <div style={{ width: "500px", backgroundColor: "white", padding: "15px" }}>
      <DropdownListMenu
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
        <DropdownListMenu.Header>
          <div style={{ backgroundColor: "red" }}>
            This is a header, this is a header, a beautiful header
          </div>
        </DropdownListMenu.Header>
        <FontAwesomeIcon icon={faCaretDown} />
      </DropdownListMenu>
    </div>
  );

WithHeader.story = {
  name: "with header",
};
