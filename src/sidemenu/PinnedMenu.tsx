import CircleButton, { CircleButtonProps } from "buttons/CircleButton";
import DropdownListMenu, {
  DropdownProps,
  DropdownStyle,
} from "common/DropdownListMenu";
import Icon, { IconProps } from "common/Icon";

import ActionLink from "buttons/ActionLink";
import BoardIcon from "board/BoardIcon";
import { BoardType } from "types";
import DefaultTheme from "theme/default";
import LoadingPlaceholder from "common/LoadingPlaceholder";
import React from "react";
import classNames from "classnames";
import { extractCompounds } from "utils/compound-utils";

interface PinnedMenuItemProps {
  item: BoardType | CircleButtonProps;
  current: boolean;
  loading?: false;
  menuOptions?: DropdownProps["options"];
  label?: string;
}

interface LoadingPinnedMenuItemProps {
  loading: true;
  loadingAccentColor: string;
}

const PinnedMenuItem: React.FC<
  PinnedMenuItemProps | LoadingPinnedMenuItemProps
> = (props) => {
  const { item, current, menuOptions, label } = props as PinnedMenuItemProps;
  const { loading, loadingAccentColor } = props as LoadingPinnedMenuItemProps;

  const getNotificationlabel = (
    item: BoardType | CircleButtonProps,
    label?: string
  ) => {
    if (!label) {
      return "";
    }
    if ("slug" in item) {
      if (item.muted) {
        return `${label} muted`;
      }
      if (!item.updates) {
        return label;
      }
      if (item.outdated) {
        return `${label} has updates`;
      }
      return `${label} has new updates`;
    } else if (item.withNotification) {
      return `${label} has new updates`;
    }
    return label;
  };

  return (
    <div
      className={classNames("pinned-item", {
        button: item && !("slug" in item),
      })}
    >
      {loading ? (
        <div aria-label="pinned item is loading">
          <LoadingPlaceholder
            accentColor={
              loadingAccentColor || DefaultTheme.DEFAULT_ACCENT_COLOR
            }
            height="50px"
          />
        </div>
      ) : "slug" in item ? (
        <ActionLink
          aria-label={getNotificationlabel(item, label)}
          aria-current={current ? "page" : false}
          link={item.link}
        >
          <BoardIcon {...item} current={current} large />
        </ActionLink>
      ) : menuOptions?.length ? (
        <div className="dropdown-wrapper">
          <DropdownListMenu
            options={menuOptions}
            style={DropdownStyle.DARK}
            label={label}
          >
            <CircleButton
              {...item}
              // Pass an empty object to trigger the default rendering
              withDropdown={menuOptions?.length ? {} : undefined}
            />
          </DropdownListMenu>
        </div>
      ) : (
        <div className="button-wrapper">
          <CircleButton
            {...item}
            // Pass an empty object to trigger the default rendering
            withDropdown={menuOptions?.length ? {} : undefined}
            aria-label={getNotificationlabel(item, label)}
            selected={current}
            selectLightPosition="left"
          />
        </div>
      )}
      <style jsx>{`
        .button-wrapper {
          width: 100%;
        }
        .dropdown-wrapper {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
        }
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
          display: flex;
          align-items: center;
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
  const { icon, sectionId } = props as BasePinnedSectionProps;
  const { items, currentItemId: currentItemSlug } =
    props as WithPinnedSectionProps;
  const { loading, loadingAccentColor, loadingElementsCount } =
    props as LoadingPinnedSectionProps;

  return (
    <section>
      <div className="icon">
        <Icon
          aria-label={loading ? `${sectionId} are loading` : sectionId}
          icon={icon}
        />
      </div>
      <div className="items-container" aria-busy={!!loading}>
        {loading &&
          Array.from({ length: loadingElementsCount || 0 }).map((_, index) => (
            <PinnedMenuItem
              key={index}
              loading
              loadingAccentColor={loadingAccentColor}
            />
          ))}
        {items?.map((item, index) => (
          <PinnedMenuItem
            key={index}
            item={item}
            label={"slug" in item ? item.slug : item.id}
            menuOptions={"menuOptions" in item ? item.menuOptions : []}
            current={currentItemSlug === ("slug" in item ? item.slug : item.id)}
          />
        ))}
      </div>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        section::-webkit-scrollbar {
          display: none;
        }
        .icon {
          width: ${DefaultTheme.PINNED_BAR_WIDTH_PX}px;
          text-align: center;
          padding-top: 5px;
          color: white;
          opacity: 45%;
        }

        .items-container {
          width: 100%;
        }
        section:first-child {
          padding-top: 15px;
        }
        section + section::before {
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
    </section>
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
        // Is this supposed to be .pinned-container::-webkit-scrollbar?
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
  // For accessibility, sections need to be labeled by something beyond an icon. I've made sectionId optional so as not to break anything for now, but should really be required.
  // TODO: swap section id for aria-label
  sectionId?: string;
}
export interface WithPinnedSectionProps {
  items: (
    | BoardType
    | (CircleButtonProps & {
        id: string;
        menuOptions?: DropdownProps["options"];
      })
  )[];
  currentItemId?: string | null;
  loading?: false;
}

export interface LoadingPinnedSectionProps {
  loading: true;
  loadingElementsCount: number;
  loadingAccentColor: string;
}
