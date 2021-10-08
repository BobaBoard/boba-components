import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { LinkWithAction } from "../types";
import { useBackdrop } from "../utils";

import Tooltip from "./Tooltip";
import Theme from "../theme/default";
import ReactDOM from "react-dom";
import Color from "color";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ActionLink from "../buttons/ActionLink";
import css from "styled-jsx/css";
import {
  CreateBaseCompound,
  extractCompound,
  extractRest,
} from "../utils/compound-utils";

const { className: buttonClass, styles: buttonStyles } = css.resolve`
  button {
    display: block;
    width: 100%;
  }
`;

const { className: popoverIconClass, styles: popoverIconStyles } = css.resolve`
  .popover-icon {
    box-sizing: border-box;
    margin-right: 10px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
  }
  .popover-icon.with-image {
    background-size: cover;
    border-radius: 50%;
  }
  .popover-icon > :global(svg) {
    display: block;
    margin: auto;
  }
`;

export enum DropdownStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface DropdownProps {
  children: React.ReactNode;
  // If Options are empty, children is simply returned.
  options?: ({
    name: string;
    icon?: IconDefinition | string;
    color?: string;
  } & ({ link: LinkWithAction } | { options: DropdownProps["options"] }))[];
  style?: DropdownStyle;
  accentColor?: string;
  zIndex?: number;
  onOpen?: () => void;
}

const isSmallScreen = () => {
  return typeof matchMedia === "undefined"
    ? false
    : matchMedia("only screen and (max-width: 575px)").matches;
};

const getThemeColors = (style?: DropdownStyle) => {
  const themeColor =
    DropdownStyle.DARK == style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_DARK
      : Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT;
  const reverseThemeColor =
    DropdownStyle.DARK == style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT
      : Theme.DROPDOWN_BACKGROUND_COLOR_DARK;
  const hoverBackgroundColor =
    DropdownStyle.DARK == style
      ? Color(themeColor.toLowerCase()).lighten(0.85).hex()
      : Color(themeColor.toLowerCase()).darken(0.15).hex();

  return {
    themeColor,
    reverseThemeColor,
    hoverBackgroundColor,
  };
};

const DropdownItem: React.FC<{
  option: NonNullable<DropdownProps["options"]>[0];
  onNestedOptions: (options: DropdownProps["options"]) => void;
  onCloseRequest: () => void;
  style?: DropdownStyle;
}> = ({ option, onNestedOptions, onCloseRequest, style }) => {
  const link = React.useMemo(
    () => ({
      onClick: (e: React.MouseEvent) => {
        if ("options" in option) {
          onNestedOptions(option.options);
          e?.preventDefault();
          return;
        }
        if (option.link.onClick) {
          e?.preventDefault();
        }
        onCloseRequest();
        option.link.onClick?.(e);
      },
      href: option["link"]?.href,
    }),
    [onNestedOptions, onCloseRequest, option]
  );
  const { reverseThemeColor, hoverBackgroundColor } = getThemeColors(style);

  return (
    <ActionLink
      className={buttonClass}
      key={option.name}
      link={link}
      allowDefault
    >
      <div
        className={classnames("option", {
          nested: "options" in option,
        })}
      >
        {!!option.icon && (
          <div
            className={classnames("popover-icon", {
              "with-image": typeof option.icon === "string",
              [popoverIconClass]: true,
            })}
            style={{
              backgroundImage:
                typeof option.icon === "string"
                  ? `url(${option.icon}`
                  : undefined,
              border: option.color ? `2px solid ${option.color}` : "",
            }}
          >
            {typeof option.icon !== "string" && (
              <FontAwesomeIcon icon={option.icon} />
            )}
          </div>
        )}
        <div className="option-text">{option.name}</div>
        <div className="nested-icon">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      {buttonStyles}
      {popoverIconStyles}
      <style jsx>{`
        .option {
          border-radius: 5px;
          padding: 8px;
          color: ${reverseThemeColor};
          text-decoration: none;
          white-space: nowrap;
          display: flex;
          align-items: center;
          text-align: left;
        }
        .option:hover {
          background-color: ${hoverBackgroundColor};
          cursor: pointer;
        }
        .nested .option-text {
          flex-grow: 1;
        }
        .nested-icon {
          display: none;
        }
        .nested .nested-icon {
          display: block;
          color: rgb(87, 87, 87);
        }
        .nested-icon > :global(svg) {
          display: block;
          margin: auto;
        }
        @media only screen and (max-width: 575px) {
          .option {
            padding: 12px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .option-text {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      `}</style>
    </ActionLink>
  );
};

const DropdownContent = React.forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    options: DropdownProps["options"];
    onCloseRequest: () => void;
    onNestedOptions: (options: DropdownProps["options"]) => void;
    onPreviousOption: (previousOption: OptionInfo) => void;
    previousOption: OptionInfo | undefined;
    minWidthPx?: number;
    style?: DropdownStyle;
  }
>((props, ref) => {
  const {
    reverseThemeColor,
    themeColor,
    hoverBackgroundColor,
  } = getThemeColors(props.style);
  return (
    <div className={classnames("menu")} ref={ref}>
      {!!props.previousOption && (
        <>
          <button
            className="back option"
            onClick={() =>
              props.onPreviousOption(props.previousOption as OptionInfo)
            }
            key="prev-option"
          >
            <div className={`popover-icon ${popoverIconClass}`}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            back
          </button>
          <div className="separator"></div>
        </>
      )}
      {props.options?.map((option) => (
        <DropdownItem
          key={option.name}
          option={option}
          onCloseRequest={props.onCloseRequest}
          onNestedOptions={props.onNestedOptions}
          style={props.style}
        />
      ))}
      {popoverIconStyles}
      <style jsx>{`
        .menu {
          min-width: ${Math.max(props.minWidthPx || 0, 250)}px;
          color: ${reverseThemeColor};
          text-align: left;
          flex-shrink: 0;
          padding: 5px;
          max-height: 400px;
          overflow-y: auto;
          box-sizing: border-box;
        }
        .menu {
          scrollbar-width: thin;
          scrollbar-color: ${reverseThemeColor} ${themeColor};
        }
        .menu::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 5px 0px ${hoverBackgroundColor};
          border-radius: 10px;
        }

        .menu::-webkit-scrollbar {
          width: 10px;
          background-color: ${hoverBackgroundColor};
        }

        .menu::-webkit-scrollbar-thumb {
          border-radius: 15px;
          -webkit-box-shadow: inset 0 0px 2px 1px ${reverseThemeColor};
          background-color: ${reverseThemeColor};
        }
        .back:focus {
          outline: none;
        }
        .back:focus-visible {
          outline: auto;
        }
        .back.option {
          border: none;
          background-color: transparent;
          cursor: pointer;
          width: 100%;
          text-align: left;
          text-transform: uppercase;
          font-size: var(--font-size-small);
          letter-spacing: 1px;
          padding: 4px 8px;
          color: rgb(87, 87, 87);
          position: relative;
        }
        .option {
          border-radius: 5px;
          padding: 8px;
          color: ${reverseThemeColor};
          text-decoration: none;
          white-space: nowrap;
          display: flex;
          align-items: center;
          text-align: left;
        }
        .option:hover {
          background-color: ${hoverBackgroundColor};
          cursor: pointer;
        }
        .separator {
          height: 1px;
          background-color: black;
          opacity: 0.15;
          margin: 4px 8px;
        }

        @media only screen and (max-width: 575px) {
          .menu {
            background-color: ${themeColor};
            width: 100%;
          }
          .popover-icon {
            margin-right: 12px;
          }
          .option,
          .back.option {
            padding: 12px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .option-text {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      `}</style>
    </div>
  );
});
DropdownContent.displayName = "DropdownContentForwardRef";

const getMenuOffsetInSlider = (refs: {
  menuRef?: React.RefObject<HTMLDivElement>;
  sliderRef: HTMLDivElement;
}) => {
  const currentMenuRect = refs.menuRef?.current?.getBoundingClientRect();
  const containerRect = refs.sliderRef.getBoundingClientRect();
  return (currentMenuRect?.x || 0) - (containerRect?.x || 0);
};

interface OptionInfo {
  ref: React.RefObject<HTMLDivElement>;
  options: DropdownProps["options"];
}
const TOOLTIP_BORDER = { width: "2px", radius: "10px" };

const DropdownHeader = CreateBaseCompound("DropdownHeader");
const DropdownMenu: React.FC<DropdownProps> & {
  Header: React.FC<{ children: React.ReactNode }>;
} = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), [setOpen]);
  const { setOpen: setBackdropOpen } = useBackdrop({
    id: "dropdown",
    zIndex: 101,
    onClick: close,
  });
  const [optionsStack, setOptionsStack] = React.useState<OptionInfo[]>([
    {
      ref: React.createRef<HTMLDivElement>(),
      options: props.options,
    },
  ]);
  // We use states for this cause refs don't cause a re-render on dom update
  const [
    optionsWrapper,
    setOptionsWrapper,
  ] = React.useState<HTMLDivElement | null>(null);
  const [
    optionsSlider,
    setOptionsSlider,
  ] = React.useState<HTMLDivElement | null>(null);
  const [
    contentWrapper,
    setContentWrapper,
  ] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setOptionsStack([
      {
        ref: React.createRef<HTMLDivElement>(),
        options: props.options,
      },
    ]);
  }, [props.options]);

  const {
    slideToNextOption,
    slideToPreviousOption,
    appendNestedOptions,
  } = React.useMemo(
    () => ({
      slideToNextOption: (option: OptionInfo) => {
        if (!optionsWrapper || !optionsSlider) {
          return;
        }
        const currentMenuRect = option.ref.current?.getBoundingClientRect();
        optionsWrapper.style.height = (currentMenuRect?.height || 0) + "px";
        if (!isSmallScreen()) {
          optionsWrapper.style.width = (currentMenuRect?.width || 0) + "px";
        } else {
          optionsSlider.style.width =
            optionsWrapper.getBoundingClientRect().width + "px";
        }
        // Only turn it in absolute when we're effectively in a multistack situation
        // so we don't interfere with the popover operation.
        optionsSlider.style.position = "absolute";
        optionsSlider.style.left =
          -getMenuOffsetInSlider({
            menuRef: option.ref,
            sliderRef: optionsSlider,
          }) + "px";
      },
      slideToPreviousOption: (option: OptionInfo) => {
        if (!optionsWrapper || !optionsSlider) {
          return;
        }
        const previousMenuRect = option.ref.current?.getBoundingClientRect();
        if (!isSmallScreen()) {
          optionsWrapper.style.width = (previousMenuRect?.width || 0) + "px";
        }
        optionsWrapper.style.height = (previousMenuRect?.height || 0) + "px";

        optionsSlider.style.left =
          -getMenuOffsetInSlider({
            menuRef: option.ref,
            sliderRef: optionsSlider,
          }) + "px";
        optionsSlider.addEventListener(
          "transitionend",
          () => {
            setOptionsStack((stack) => stack.slice(0, stack.length - 1));
          },
          { once: true }
        );
      },
      appendNestedOptions: (options: DropdownProps["options"]) => {
        setOptionsStack((optionsStack) => [
          ...optionsStack,
          { ref: React.createRef(), options },
        ]);
      },
    }),
    [optionsWrapper, optionsSlider]
  );

  React.useEffect(() => {
    if (isOpen && isSmallScreen()) {
      setBackdropOpen(true);
    } else {
      setBackdropOpen(false);
    }
  }, [isOpen, setBackdropOpen]);

  const { onOpen } = props;
  React.useEffect(() => {
    if (isOpen) {
      // Wait a little bit to make sure the transition is done.
      setTimeout(() => {
        onOpen?.();
      }, 300);
    }
  }, [isOpen, onOpen]);

  React.useEffect(() => {
    if (!isOpen || optionsStack.length < 1) {
      return;
    }
    slideToNextOption(optionsStack[optionsStack.length - 1]);
  }, [optionsStack, isOpen, slideToNextOption]);

  React.useEffect(() => {
    if (!isOpen) {
      if (!optionsWrapper || !optionsSlider) {
        return;
      }
      optionsSlider.style.position = "relative";
      optionsSlider.style.left = "0px";
      optionsWrapper.style.width = "auto";
      optionsWrapper.style.height = "auto";
      setOptionsStack((optionsStack) => [optionsStack[0]]);
    }
  }, [isOpen, optionsSlider, optionsWrapper]);

  const themeColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_DARK
      : Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT;

  const content = React.useMemo(
    () =>
      isOpen
        ? optionsStack.map(({ options, ref }, index) => {
            return (
              <DropdownContent
                ref={ref}
                key={index}
                style={props.style}
                options={options}
                isOpen={isOpen}
                previousOption={index > 0 ? optionsStack[index - 1] : undefined}
                minWidthPx={
                  !isSmallScreen()
                    ? contentWrapper?.getBoundingClientRect().width || 0
                    : undefined
                }
                onPreviousOption={slideToPreviousOption}
                onCloseRequest={close}
                onNestedOptions={appendNestedOptions}
              />
            );
          })
        : [],
    [
      props.style,
      isOpen,
      optionsStack,
      slideToPreviousOption,
      close,
      appendNestedOptions,
      contentWrapper,
    ]
  );

  const header = extractCompound(props.children, DropdownHeader);
  const rest = extractRest(props.children, [DropdownHeader]);

  if (!props.options && !header) {
    return <>{props.children}</>;
  }

  return (
    <>
      <Tooltip
        isOpen={isOpen && !isSmallScreen()}
        position="bottom"
        content={
          isOpen ? (
            <div
              ref={(ref) => setContentWrapper(ref)}
              className={classnames("content-wrapper", {
                "has-options": !!props.options,
                "has-header": !!header,
              })}
            >
              {header}
              <div
                className="options-wrapper"
                ref={(ref) => setOptionsWrapper(ref)}
              >
                <div
                  className="options-slider"
                  ref={(ref) => setOptionsSlider(ref)}
                >
                  {content}
                </div>
              </div>
            </div>
          ) : (
            <div />
          )
        }
        padding={0}
        zIndex={props.zIndex}
        onClickOutside={close}
        background={themeColor}
        border={TOOLTIP_BORDER}
      >
        <button
          className={classnames("button-wrapper", {
            "with-options": props.options,
            "with-header": header,
          })}
          tabIndex={0}
          onClick={() => setOpen(!isOpen)}
        >
          {rest}
        </button>
      </Tooltip>
      {isSmallScreen() &&
        ReactDOM.createPortal(
          <div
            className={classnames("portal-content", {
              visible: isOpen,
              "has-header": header,
            })}
          >
            <div className="header-wrapper">{header}</div>
            <div
              className="options-wrapper"
              ref={(ref) => setOptionsWrapper(ref)}
            >
              <div
                className="options-slider"
                ref={(ref) => setOptionsSlider(ref)}
              >
                {content}
              </div>
            </div>
          </div>,
          document.body
        )}
      <style jsx>{`
        .portal-content {
          display: none;
        }
        .portal-content.visible {
          display: block;
        }
        .content-wrapper:not(.has-options) .options-wrapper {
          display: none;
        }
        .options-wrapper {
          overflow: hidden;
          min-width: 30px;
          min-height: 30px;
          transition: all 0.2s ease-out;
        }
        .content-wrapper {
          font-size: var(--font-size-regular);
        }
        .content-wrapper.has-header .options-wrapper {
          // This is a kinda hackish solution to remove the menu
          // padding without having to pass down whether a header exists.
          // TODO: avoid this.
          margin-top: -5px;
        }
        .options-slider {
          display: flex;
          align-items: flex-start;
          transition: left 0.2s ease-out;
          left: 0;
        }
        .button-wrapper {
          background: none;
          border: none;
          padding: 0;
          text-align: inherit;
          max-width: 100%;
        }
        .button-wrapper:focus {
          outline: none;
        }
        .button-wrapper:focus-visible {
          outline: auto;
        }
        .button-wrapper.with-options:hover {
          cursor: pointer;
        }
        .button-wrapper.with-header:hover {
          cursor: pointer;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 100%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0%);
          }
        }
        @media only screen and (max-width: 575px) {
          .portal-content {
            overflow: hidden;
            background-color: ${themeColor};
            border-radius: 5px 5px 0px 0px;
            width: 95%;
            position: fixed;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 0%);
            animation-name: slideUp;
            animation-duration: 0.2s;
            z-index: 102;
          }
          .header-wrapper {
            // This is a kinda hackish solution to remove the menu
            // padding without having to pass down whether a header exists.
            // TODO: avoid this.
            z-index: 103;
            position: relative;
          }
          .portal-content.has-header .options-wrapper {
            // This is a kinda hackish solution to remove the menu
            // padding without having to pass down whether a header exists.
            // TODO: avoid this.
            margin-top: -5px;
          }
          .options-slider {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
};

DropdownMenu.Header = DropdownHeader;

export default DropdownMenu;
