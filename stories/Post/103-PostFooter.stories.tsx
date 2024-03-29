import Footer, { FooterProps } from "post/Footer";
import { Meta, Story } from "@storybook/react";

import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Posts/Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <div className="story">
        <h2>Large container</h2>
        <div
          style={{ width: "100%", maxWidth: "500px", backgroundColor: "white" }}
          data-testid="large-container"
        >
          {Story()}
        </div>
        <h2>Small container</h2>
        <div
          style={{ width: "100%", maxWidth: "250px", backgroundColor: "white" }}
          data-testid="small-container"
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
} as Meta;

const FooterTemplate: Story<FooterProps> = (args) => <Footer {...args} />;

export const Answerable = FooterTemplate.bind({});
Answerable.args = {
  allowsComment: true,
  allowsContribution: true,
  onContribution: () => action("onContribution")(),
  onComment: () => action("onComment")(),
};

export const WithNotes = FooterTemplate.bind({});
WithNotes.args = {
  allowsComment: true,
  allowsContribution: true,
  totalContributions: 5,
  directContributions: 2,
  totalComments: 4,
  onContribution: action("contribution"),
  onComment: action("comment"),
};

export const WithUpdates = FooterTemplate.bind({});
WithUpdates.args = {
  ...WithNotes.args,
  newContributions: 1,
  newComments: 3,
};

export const WithHighCounts = FooterTemplate.bind({});
WithHighCounts.args = {
  allowsComment: true,
  allowsContribution: true,
  totalContributions: 305,
  directContributions: 200,
  totalComments: 690,
  newContributions: 122,
  newComments: 300,
};

export const NonAnswerable = FooterTemplate.bind({});
NonAnswerable.args = {
  ...WithUpdates.args,
  allowsComment: false,
  allowsContribution: false,
};

export const ContributeOnly = FooterTemplate.bind({});
ContributeOnly.args = {
  ...WithUpdates.args,
  allowsComment: false,
  allowsContribution: true,
};

export const CommentOnly = FooterTemplate.bind({});
CommentOnly.args = {
  ...WithUpdates.args,
  allowsComment: true,
  allowsContribution: false,
};

export const NotesWithNoHref = FooterTemplate.bind({});
NotesWithNoHref.args = {
  ...WithUpdates.args,
  notesLink: {
    onClick: action("withoutHref"),
  },
};

export const NotesWithHref = FooterTemplate.bind({});
NotesWithHref.args = {
  ...WithUpdates.args,
  allowsComment: false,
  allowsContribution: false,
  notesLink: {
    onClick: action("withHref"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
};
