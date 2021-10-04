import React from "react";
import { BoardType } from "types";

import BoardIcon from "../board/BoardIcon";
import DefaultTheme from "../theme/default";
import LoadingPlaceholder from "../common/LoadingPlaceholder";
import Icon, { IconProps } from "../common/Icon";
import CircleButton, {
  CircleButtonProps,
  SelectLightPosition,
} from "../buttons/CircleButton";
import ActionLink from "../buttons/ActionLink";

import { extractCompounds } from "../utils/compound-utils";

interface PinnedMenuItemProps {
  item: BoardType | CircleButtonProps;
  current: boolean;
  loading?: false;
}

interface LoadingPinnedMenuItemProps {
  loading: true;
  loadingAccentColor: string;
}

const PinnedMenuItem: React.FC<
  PinnedMenuItemProps | LoadingPinnedMenuItemProps
> = (props) => {
  const { item, current } = props as PinnedMenuItemProps;
  const { loading, loadingAccentColor } = props as LoadingPinnedMenuItemProps;

  return (
    <div className="single-board">
      {loading ? (
        <LoadingPlaceholder
          accentColor={loadingAccentColor || DefaultTheme.DEFAULT_ACCENT_COLOR}
          height="50px"
        />
      ) : "slug" in item ? (
        <ActionLink link={item.link}>
          <BoardIcon {...item} current={current} large />
        </ActionLink>
      ) : (
        <CircleButton
          {...item}
          selected={current}
          selectLightPosition={SelectLightPosition.LEFT}
        />
      )}
      <style jsx>{`
        .single-board {
          padding: 15px 7px 0;
          width: 50px;
          height: 50px;
        }
        .single-board:last-child {
          padding-bottom: 15px;
        }
      `}</style>
      `
    </div>
  );
};

const Section: React.FC<PinnedMenuProps> = (props) => {
  const { icon } = props as BaseBoardsMenuProps;
  const {
    items,
    currentItemId: currentItemSlug,
  } = props as WithPinnedMenuProps;
  const {
    loading,
    loadingAccentColor,
    loadingElementsCount,
  } = props as LoadingPinnedMenuProps;

  return (
    <>
      <div className="icon">
        <Icon icon={icon} />
      </div>
      <div className="board-pinned">
        {loading &&
          Array.from({ length: loadingElementsCount || 0 }).map((_, index) => (
            <PinnedMenuItem
              key={index}
              loading
              loadingAccentColor={loadingAccentColor}
            />
          ))}
        {items?.map((board, index) => (
          <PinnedMenuItem
            key={index}
            item={board}
            current={currentItemSlug == ("id" in board ? board.id : board.slug)}
          />
        ))}
      </div>
      <style jsx>{`
        .board-pinned {
          background: ${DefaultTheme.PINNED_BAR_BACKGROUND};
          width: ${DefaultTheme.PINNED_BAR_WIDTH_PX}px;
          height: 100%;
          scrollbar-width: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .board-pinned::-webkit-scrollbar {
          display: none;
        }
        .icon {
          background: ${DefaultTheme.PINNED_BAR_BACKGROUND};
          width: ${DefaultTheme.PINNED_BAR_WIDTH_PX}px;
          text-align: center;
          padding-top: 15px;
          color: white;
        }

        @media only screen and (max-width: 600px) {
          .board-pinned {
            height: 100vh;
          }
        }
      `}</style>
    </>
  );
};

const PinnedMenu: React.FC<{ children: React.ReactNode }> & {
  Section: typeof Section;
} = ({ children }) => {
  const sections = extractCompounds(children, Section);
  return <>{sections}</>;
};

PinnedMenu.Section = Section;

export default PinnedMenu;

export type PinnedMenuProps = BaseBoardsMenuProps &
  (WithPinnedMenuProps | LoadingPinnedMenuProps);

export interface BaseBoardsMenuProps {
  icon: IconProps["icon"];
}
export interface WithPinnedMenuProps {
  items: (BoardType | CircleButtonProps)[];
  currentItemId?: string | null;
  loading?: false;
}

export interface LoadingPinnedMenuProps {
  loading: true;
  loadingElementsCount: number;
  loadingAccentColor: string;
}
