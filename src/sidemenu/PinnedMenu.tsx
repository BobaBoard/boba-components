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
import classNames from "classnames";

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
    <div
      className={classNames("pinned-item", {
        button: item && !("slug" in item),
      })}
    >
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
        .pinned-item {
          margin-top: 15px;
          padding: 0 7px;
          width: 50px;
          height: 50px;
        }
        .pinned-item.button {
          margin-top: 8px;
          padding: 0;
          width: 100%;
        }
        .pinned-item:first-child {
          margin-top: 10px;
        }
        .pinned-item:last-child {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

const Section: React.FC<PinnedMenuSectionProps> = (props) => {
  const { icon } = props as BasePinnedSectionProps;
  const {
    items,
    currentItemId: currentItemSlug,
  } = props as WithPinnedSectionProps;
  const {
    loading,
    loadingAccentColor,
    loadingElementsCount,
  } = props as LoadingPinnedSectionProps;

  return (
    <div className="pinned-section">
      <div className="icon">
        <Icon icon={icon} />
      </div>
      <div>
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
        .pinned-section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pinned-section::-webkit-scrollbar {
          display: none;
        }
        .icon {
          width: ${DefaultTheme.PINNED_BAR_WIDTH_PX}px;
          text-align: center;
          padding-top: 5px;
          color: white;
          opacity: 45%;
        }
        .pinned-section:first-child {
          padding-top: 15px;
        }
        .pinned-section + .pinned-section::before {
          content: "";
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 15%,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.2) 40%,
            rgba(255, 255, 255, 0.2) 60%,
            rgba(255, 255, 255, 0.2) 80%,
            rgba(255, 255, 255, 0) 85%,
            rgba(255, 255, 255, 0) 100%
          );
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

const PinnedMenu: React.FC<{ children: React.ReactNode }> & {
  Section: typeof Section;
} = ({ children }) => {
  const sections = extractCompounds(children, Section);
  return (
    <div className="pinned-container">
      {sections}
      <style jsx>{`
        .pinned-container {
          background: ${DefaultTheme.PINNED_BAR_BACKGROUND};
          width: ${DefaultTheme.PINNED_BAR_WIDTH_PX}px;
          height: 100%;
          scrollbar-width: none;
        }
        .pinned-section::-webkit-scrollbar {
          display: none;
        }

        @media only screen and (max-width: 600px) {
          .pinned-container {
            height: 100vh;
          }
        }
      `}</style>
    </div>
  );
};

PinnedMenu.Section = Section;

export default PinnedMenu;

export type PinnedMenuSectionProps = BasePinnedSectionProps &
  (WithPinnedSectionProps | LoadingPinnedSectionProps);

export interface BasePinnedSectionProps {
  icon: IconProps["icon"];
}
export interface WithPinnedSectionProps {
  items: (BoardType | CircleButtonProps)[];
  currentItemId?: string | null;
  loading?: false;
}

export interface LoadingPinnedSectionProps {
  loading: true;
  loadingElementsCount: number;
  loadingAccentColor: string;
}
