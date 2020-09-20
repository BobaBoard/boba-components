import React from "react";

import BoardSidebar from "../src/board/BoardSidebar";
import SidebarSection from "../src/board/SidebarSection";
import Button from "../src/common/Button";

import goreBackground from "./images/gore.png";

import { action } from "@storybook/addon-actions";

export const BoardSidebarPreview = () => {
  const [color, setColor] = React.useState("#f96680");
  return (
    <div style={{ maxWidth: "500px" }}>
      <BoardSidebar
        board={{
          slug: "gore",
          avatarUrl: `/${goreBackground}`,
          tagline: "Love me some bruised bois (and more).",
          accentColor: color,
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
                  Requests go in the appropriate tag. If the same request has
                  been made less than a month ago, it will be deleted by the
                  mods.
                </li>
                <li>
                  Mods might add any TWs tag as they see fit. If you need help,
                  add #untagged and a mod will take care of it.
                </li>
              </ul>
            </div>
          ),
        }}
      />
      <Button onClick={() => setColor("#f96680")}>Pink</Button>
      <Button onClick={() => setColor("#24d282")}>Green</Button>
      <Button onClick={() => setColor("#27caba")}>Blue</Button>
    </div>
  );
};

BoardSidebarPreview.story = {
  name: "sidebar",
};

const SidebarSectionTemplate = (args) => <SidebarSection {...args} />;
export const DescriptionSection = SidebarSectionTemplate.bind({});
DescriptionSection.args = {
  title: "Rules",
  description: '[{"insert":"A description\\n"}]',
  editable: false,
};

export const EditableDescription = SidebarSectionTemplate.bind({});
EditableDescription.args = {
  title: "Rules",
  description: '[{"insert":"Initial description\\n"}]',
  editable: true,
  onTitleChange: action("title"),
  onDescriptionChange: action("description"),
};

export default {
  title: "Board Sidebar Preview",
  component: SidebarSection,
};
