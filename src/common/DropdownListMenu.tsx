import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { LinkWithAction } from "types";
import { useBackdrop } from "../utils";

import Tooltip from "./Tooltip";
import Theme from "../theme/default";
import ReactDOM from "react-dom";
import Color from "color";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export enum DropdownStyle {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface DropdownProps {
  children: JSX.Element;
  // If Options are empty, children is simply returned.
  options?: ({
    name: string;
    icon?: IconDefinition | string;
  } & ({ link: LinkWithAction } | { options: DropdownProps["options"] }))[];
  style?: DropdownStyle;
  accentColor?: string;
  zIndex?: number;
}

const isSmallScreen = () => {
  return typeof matchMedia === "undefined"
    ? false
    : matchMedia("only screen and (max-width: 575px)").matches;
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
    width?: string;
    style?: DropdownStyle;
  }
>((props, ref) => {
  const themeColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_DARK
      : Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT;
  const reverseThemeColor =
    DropdownStyle.DARK == props.style
      ? Theme.DROPDOWN_BACKGROUND_COLOR_LIGHT
      : Theme.DROPDOWN_BACKGROUND_COLOR_DARK;
  const hoverBackgroundColor =
    DropdownStyle.DARK == props.style
      ? Color(themeColor).lighten(0.85).hex()
      : Color(themeColor).darken(0.15).hex();
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
            <div className="popover-icon">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            back
          </button>
          <div className="separator"></div>
        </>
      )}
      {props.options?.map((option) => (
        // TODO: this should be a button if there's no href.
        <a
          key={option.name}
          className={classnames("option", {
            nested: "options" in option,
          })}
          onClick={(e) => {
            e.preventDefault();
            if ("options" in option) {
              props.onNestedOptions(option.options);
              return;
            }
            props.onCloseRequest();
            option.link.onClick?.();
          }}
          href={option["link"]?.href || "#none"}
        >
          {!!option.icon && (
            <div
              className={classnames("popover-icon", {
                "with-image": typeof option.icon === "string",
              })}
              style={{
                backgroundImage:
                  typeof option.icon === "string"
                    ? `url(${option.icon}`
                    : undefined,
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
        </a>
      ))}
      <style jsx>{`
        .menu {
          min-width: 250px;
          color: ${reverseThemeColor};
          text-align: left;
          flex-shrink: 0;
          padding: 5px;
        }
        .back.option {
          border: none;
          background-color: transparent;
          font-family: inherit;
          cursor: pointer;
          width: 100%;
          text-align: left;
          text-transform: uppercase;
          font-size: 13px;
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
          align-items: center;
          display: flex;
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
        .popover-icon {
          margin-right: 10px;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
        }
        .popover-icon.with-image {
          background-size: cover;
          border-radius: 50%;
        }
        .popover-icon > :global(svg),
        .nested-icon > :global(svg) {
          display: block;
          margin: auto;
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
            width: calc(100% - 10px);
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
const DropdownMenu: React.FC<DropdownProps> = (props) => {
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
      optionsStack.map(({ options, ref }, index) => {
        if (!isOpen) {
          return <></>;
        }
        return (
          <DropdownContent
            ref={ref}
            key={index}
            style={props.style}
            options={options}
            isOpen={isOpen}
            previousOption={index > 0 ? optionsStack[index - 1] : undefined}
            width={
              isSmallScreen()
                ? (optionsWrapper?.getBoundingClientRect().width || 0) + "px"
                : undefined
            }
            onPreviousOption={slideToPreviousOption}
            onCloseRequest={close}
            onNestedOptions={appendNestedOptions}
          />
        );
      }),
    [
      props.style,
      isOpen,
      optionsStack,
      slideToPreviousOption,
      close,
      appendNestedOptions,
      optionsWrapper,
    ]
  );

  if (!props.options) {
    return props.children;
  }

  return (
    <>
      <Tooltip
        isOpen={isOpen && !isSmallScreen()}
        position="bottom"
        content={
          isOpen ? (
            <div
              className="content-wrapper"
              ref={(ref) => setOptionsWrapper(ref)}
            >
              <div
                className="content-slider"
                ref={(ref) => setOptionsSlider(ref)}
              >
                {content}
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
          })}
          tabIndex={0}
          onClick={() => setOpen(!isOpen)}
        >
          {props.children}
        </button>
      </Tooltip>
      {isSmallScreen() &&
        ReactDOM.createPortal(
          <div className={classnames("portal-content", { visible: isOpen })}>
            <div
              className="content-wrapper"
              ref={(ref) => setOptionsWrapper(ref)}
            >
              <div
                className="content-slider"
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
        .content-wrapper {
          overflow: hidden;
          min-width: 30px;
          min-height: 30px;
          transition: all 0.2s ease-out;
        }
        .content-slider {
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
        }
        .button-wrapper:focus {
          outline: none;
        }
        .button-wrapper.with-options:hover {
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
          .content-slider {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
};

export default DropdownMenu;
