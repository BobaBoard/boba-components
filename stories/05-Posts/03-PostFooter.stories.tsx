import React from "react";
import Footer, { FooterProps } from "../../src/post/Footer";

import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

export default {
  title: "Posts/Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <div className="story">
        <h2>Large container</h2>
        <div
          style={{ width: "100%", maxWidth: "500px", backgroundColor: "white" }}
        >
          {Story()}
        </div>
        <h2>Small container</h2>
        <div
          style={{ width: "100%", maxWidth: "250px", backgroundColor: "white" }}
        >
          {Story()}
        </div>
        <style jsx>{`
          .story {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 25px;
            background-color: lightgray;
          }
        `}</style>
      </div>
    ),
  ],
};

const FooterTemplate: Story<FooterProps> = (args) => <Footer {...args} />;

export const Answerable = FooterTemplate.bind({});
Answerable.args = {
  answerable: true,
};

export const WithNotes = FooterTemplate.bind({});
WithNotes.args = {
  answerable: true,
  totalContributions: 5,
  directContributions: 2,
  totalComments: 4,
  // We need to do this because when action is given an event
  // it causes an exception
  onContribution: () => action("contribution")(),
  onComment: () => action("comment")(),
};

export const WithUpdates = FooterTemplate.bind({});
WithUpdates.args = {
  ...WithNotes.args,
  newContributions: 1,
  newComments: 3,
};

export const WithHighCounts = FooterTemplate.bind({});
WithHighCounts.args = {
  answerable: true,
  totalContributions: 305,
  directContributions: 200,
  totalComments: 690,
  newContributions: 122,
  newComments: 300,
};

export const NonAnswerable = FooterTemplate.bind({});
NonAnswerable.args = {
  ...WithUpdates.args,
  answerable: false,
};

export const NotesWithNoHref = FooterTemplate.bind({});
NotesWithNoHref.args = {
  ...WithUpdates.args,
  notesLink: {
    onClick: () => action("withoutHref")(),
  },
};

export const NotesWithHref = FooterTemplate.bind({});
NotesWithHref.args = {
  ...WithUpdates.args,
  answerable: false,
  notesLink: {
    onClick: () => action("withHref")(),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
};
