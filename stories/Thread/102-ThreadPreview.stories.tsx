import HiddenThread, { HiddenThreadProps } from "thread/ThreadPreview";

import type { Meta, Story/*, StoryObj*/ } from "@storybook/react";

export default {
  title: "ThreadPreview / Hidden Thread",
  component: HiddenThread,
};

const mockUnhide =  ({ 
  threadId,
  boardId,
  hide, 
} : { 
  threadId: string, 
  boardId: string, 
  hide: boolean 
}) => {
  if(hide) {
    console.log("hiding thread %s on board %s", threadId, boardId);
  } else {
    console.log("unhiding thread %s on board %s", threadId, boardId);
  }
};

const ThreadPreviewTemplate: Story<HiddenThreadProps> = (args) => {
  return <HiddenThread {...args} />;
};

export const Default = ThreadPreviewTemplate.bind({});
Default.args = {
  threadId: '0',
  boardId: '0',
  hide: true,
  onThreadHidden: {action: 'noHref'},
};
