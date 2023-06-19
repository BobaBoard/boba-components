import {
  faCaretDown,
  faCross,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

import { AccessoryType } from "types";
import DefaultTheme from "theme/default";
import DropdownListMenu from "common/DropdownListMenu";
import Icon from "common/Icon";
import React from "react";
import { UserMetadataStyle } from "./UserMetadata";
import classnames from "classnames";

const useAccessoriesOptions = (props: {
  accessories?: AccessoryType[];
  onSelectAccessory?: (accessory: AccessoryType | undefined) => void;
}) => {
  const { onSelectAccessory } = props;
  const accessoryOptions = React.useMemo(
    () => [
      {
        name: "None",
        icon: faCross,
        link: {
          onClick: () => onSelectAccessory?.(undefined),
        },
      },
      ...(props.accessories || []).map((accessory) => ({
        name: accessory.name,
        icon: accessory.accessory,
        link: {
          onClick: () => onSelectAccessory?.(accessory),
        },
      })),
    ],
    [props.accessories, onSelectAccessory]
  );

  if (!props.accessories) {
    return undefined;
  }
  return accessoryOptions;
};

export interface AccessorySelectorProps {
  accessories: AccessoryType[];
  onSelectAccessory: (accessory: AccessoryType | undefined) => void;
  selectedAccessory?: AccessoryType | string;
  size?: UserMetadataStyle;
}

const AccessorySelector: React.FC<AccessorySelectorProps> = (props) => {
  const accessoriesOptions = useAccessoriesOptions({
    accessories: props.accessories,
    onSelectAccessory: props.onSelectAccessory,
  });

  if (!props.accessories) {
    return null;
  }

  const selectedAccessoryDisplayName = props.selectedAccessory
    ? typeof props.selectedAccessory === "string"
      ? "Unknown"
      : props.selectedAccessory.name
    : "None";
  return (
    <DropdownListMenu
      zIndex={200}
      options={accessoriesOptions}
      label="Select accessory"
    >
      <>
        <div
          className={classnames("equip", {
            empty: !props.selectedAccessory,
            compact: props.size == UserMetadataStyle.COMPACT,
          })}
        >
          <Icon icon={faShieldAlt} />
          {props.size !== UserMetadataStyle.COMPACT && (
            <>
              <span className="title">Equip: </span>
              <span className="accessory-name">
                {selectedAccessoryDisplayName}
              </span>
              <Icon icon={faCaretDown} />
            </>
          )}
        </div>
        <style jsx>{`
          .equip {
            border-radius: 15px;
            border: none;
            font-size: var(--font-size-small);
            display: flex;
            align-items: center;
            color: ${DefaultTheme.POST_HEADER_USERNAME_COLOR};
            background-color: #efefef;
            width: min(100%, 160px);
            padding: 2px 3px 2px 8px;
          }
          .equip :global(*) {
            box-sizing: border-box;
          }
          .equip :global(svg) {
            margin-right: 3px;
          }
          .equip.compact {
            width: 30px;
            padding: 2px 3px;
          }
          .equip.compact :global(svg) {
            margin: 0 auto;
          }
          .equip.compact.empty {
            opacity: 0.5;
          }
          .equip:not(.compact) {
          }
          .equip .title {
            font-weight: bold;
            margin-right: 5px;
          }
          .equip.compact .title {
            display: none;
          }
          .equip .accessory-name {
            flex-grow: 1;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .equip:hover {
            cursor: pointer;
          }
          @media only screen and (max-width: 450px) {
            .equip .title {
              display: none;
            }
            .equip.not(.compact) :global(svg) {
              margin-right: 5px;
            }
          }
        `}</style>
      </>
    </DropdownListMenu>
  );
};

export default AccessorySelector;
