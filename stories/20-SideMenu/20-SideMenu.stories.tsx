import React from "react";
import SideMenu, {
  SideMenuHandler,
  SideMenuProps,
} from "../../src/sidemenu/SideMenu";

import { Empty, Loading, Regular, Long } from "./00-BoardsMenuSection.stories";
import { Icons, Boards } from "./01-PinnedMenu.stories";

import { Story } from "@storybook/react";

import PinnedMenu from "../../src/sidemenu/PinnedMenu";
import BoardsMenuSection from "../../src/sidemenu/BoardsMenuSection";

export default {
  title: "Side Menu/Side Menu",
  component: SideMenu,
};

const SideMenuPreviewTemplate: Story<
  SideMenuProps & {
    loading: boolean;
  }
> = (args, context) => {
  return (
    <SideMenu showPinned={args.showPinned} ref={context?.menuRef}>
      <PinnedMenu>
        {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
        <PinnedMenu.Section {...Icons.args} />
        {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
        <PinnedMenu.Section {...Boards.args} />
      </PinnedMenu>
      {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
      <BoardsMenuSection {...Regular.args} />
      {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
      <BoardsMenuSection {...Loading.args} loading={args.loading} />
      {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
      <BoardsMenuSection {...Empty.args} />
      {/* @ts-expect-error (see: https://github.com/storybookjs/storybook/issues/13747) */}
      <BoardsMenuSection {...Long.args} />
    </SideMenu>
  );
};

export const SideMenuPreview = SideMenuPreviewTemplate.bind({});
SideMenuPreview.args = {
  showPinned: true,
  loading: true,
};
SideMenuPreview.decorators = [
  (Story) => {
    const menuRef = React.useRef<SideMenuHandler>(null);
    return (
      <div>
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button onClick={() => menuRef.current?.focusBoardFilter()}>
            Focus filter
          </button>
        </div>
        <div
          style={{
            minHeight: "500px",
          }}
        >
          {/* @ts-ignore */}
          <Story menuRef={menuRef} />
        </div>
      </div>
    );
  },
];
