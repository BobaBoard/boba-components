import HiddenThread, { HiddenThreadProps } from "thread/ThreadPreview";
import type { Meta, Story } from "@storybook/react";

import { action } from "@storybook/addon-actions";

export default {
  title: "Thread / Hidden Thread",
  component: HiddenThread,
};

const ThreadPreviewTemplate: Story<HiddenThreadProps> = (args) => {
  return <HiddenThread {...args} />;
};

export const Default = ThreadPreviewTemplate.bind({});
Default.args = {
  hidden: true,
  onThreadHidden: action("threadHidden"),
};
