import LegacyBoardSidebar, {
  BoardSidebarProps,
} from "board/LegacyBoardSidebar";
import { Meta, Story } from "@storybook/react";

import Button from "buttons/Button";
import DefaultTheme from "theme/default";
import React from "react";
import { action } from "@storybook/addon-actions";
import goreBackground from "stories/images/gore.png";

export default {
  title: "Sidebar/Legacy Sidebar",
  component: LegacyBoardSidebar,
  decorators: [
    (Story) => (
      <div className="story">
        {Story()}
        <style jsx>{`
          .story {
            max-width: 500px;
            background-color: ${DefaultTheme.LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR};
            padding: 10px;
          }
          .story > :global(div) {
            margin: 10px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const LegacyBoardSidebarPreviewTemplate: Story<BoardSidebarProps> = (args) => {
  const [color, setColor] = React.useState("#f96680");
  return (
    <div style={{ maxWidth: "500px", backgroundColor: "#1C1C1C" }}>
      <LegacyBoardSidebar {...args} accentColor={color} />
      <Button onClick={() => setColor("#f96680")}>Pink</Button>
      <Button onClick={() => setColor("#24d282")}>Green</Button>
      <Button onClick={() => setColor("#27caba")}>Blue</Button>
    </div>
  );
};

export const LegacySidebar = LegacyBoardSidebarPreviewTemplate.bind({});
LegacySidebar.args = {
  slug: "gore",
  avatarUrl: `/${goreBackground}`,
  tagline: "Love me some bruised bois (and more).",
  previewOptions: [
    { name: "opt1", link: { onClick: action("optionOne") } },
    { name: "opt2", link: { onClick: action("option2") } },
  ],
  boardWideTags: [
    { name: "gore", color: "#f96680" },
    { name: "guro", color: "#e22b4b" },
    { name: "nsfw", color: "#27caba" },
    { name: "dead dove", color: "#f9e066" },
  ],
  canonicalTags: [
    { name: "request", color: "#27caba" },
    { name: "blood", color: "#f96680" },
    { name: "knifeplay", color: "#93b3b0" },
    { name: "aesthetic", color: "#24d282" },
    { name: "impalement", color: "#27caba" },
    { name: "skullfuck", color: "#e22b4b" },
    { name: "hanging", color: "#f9e066" },
    { name: "torture", color: "#f96680" },
    { name: "necrophilia", color: "#93b3b0" },
    { name: "shota", color: "#e22b4b" },
    { name: "fanfiction", color: "#27caba" },
    { name: "rec", color: "#f9e066" },
    { name: "doujinshi", color: "#f96680" },
    { name: "untagged", color: "#93b3b0" },
  ],
  contentRulesTags: [
    { name: "shota", allowed: true },
    { name: "nsfw", allowed: true },
    { name: "noncon", allowed: true },
    { name: "IRL", allowed: false },
    { name: "RP", allowed: false },
  ],
  otherRules: (
    <div>
      <ul>
        <li>
          Shota <strong>must</strong> be tagged.
        </li>
        <li>
          Requests go in the appropriate tag. If the same request has been made
          less than a month ago, it will be deleted by the mods.
        </li>
        <li>
          Mods might add any TWs tag as they see fit. If you need help, add
          #untagged and a mod will take care of it.
        </li>
      </ul>
    </div>
  ),
  muted: true,
};
