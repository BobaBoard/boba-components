import HiddenThread, { HiddenThreadProps } from "thread/ThreadPreview";
import Post, { PostProps } from "post/Post";

import React from "react";
import type { StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";

export default {
  title: "Thread / Hidden Thread",
  component: HiddenThread,
};

const ThreadPreviewTemplate: StoryFn<HiddenThreadProps & { post: PostProps }> = ({ post, ...args }) => (
  <HiddenThread {...args} >
    <Post {...post} />
  </HiddenThread>
);

const BasePost = {
  createdTime: "1 minute ago",
  text: '[{"insert":"A short post."}]',
  secretIdentity: {
    name: "Good Guy",
    avatar: `/${tuxedoAvatar}`,
  },
  onNewContribution: action("onNewContribution"),
  onNewComment: action("onNewComment"),
  notesLink: {
    onClick: action("notesLink"),
    href: "#href",
  },
  createdTimeLink: {
    onClick: action("createdTime"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  }
}

export const Default = ThreadPreviewTemplate.bind({});
Default.args = {
  hidden: true,
  onThreadHidden: action("threadHidden"),
  post: BasePost,
};

export const ContentNotice = ThreadPreviewTemplate.bind({});
ContentNotice.args = {
  ...Default.args,
  post: {
    ...BasePost,
    tags: {
      contentWarnings: ["content notice 1", "bad-content"],
      categoryTags: ["category"],
      indexTags: ["indexable"],
      whisperTags: ["a whisper tag"],
    },
  },
};
