import React from "react";
import classNames from "classnames";
// @ts-ignore
import Editor from "@bobaboard/boba-editor";
import Header, { HeaderStyle } from "./Header";
import useComponentSize from "@rehooks/component-size";
import debug from "debug";
import Theme from "../theme/default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
const log = debug("bobaui:comment-log");

const SIZES = {
  REGULAR: "REGULAR",
  COMPACT: "COMPACT",
};
const SIZE_TRIGGER = 315;

const Comment = React.forwardRef<CommentHandler, CommentProps>((props, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  // @ts-ignore
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [size, setSize] = React.useState(SIZES.COMPACT);
  const [sized, setSized] = React.useState(false);
  // @ts-ignore
  let { width, height } = useComponentSize(containerRef);
  React.useLayoutEffect(() => {
    setSize(width > SIZE_TRIGGER ? SIZES.REGULAR : SIZES.COMPACT);
    setSized(true);
  }, [width]);

  React.useImperativeHandle(ref, () => ({
    editorRef: editorRef,
    headerRef: headerRef,
    highlight: (color: string) => {
      log(`Highlighting post with ${color}!`);
      if (!containerRef.current) {
        return;
      }
      containerRef.current.ontransitionend = () => {
        containerRef.current?.style.setProperty(
          "--comment-container-shadow",
          null
        );
      };
      containerRef.current.style.setProperty(
        "--comment-container-shadow",
        color
      );
    },
  }));

  log(`Extra action ${props.onExtraAction}`);
  log(`Extra action ${!!props.onExtraAction}`);

  return (
    <>
      <div
        className={classNames("comment-container", {
          compact: size == SIZES.COMPACT,
          sized: sized,
          muted: props.muted,
        })}
        ref={containerRef}
      >
        <div className="header" ref={headerRef}>
          <Header
            size={HeaderStyle.COMPACT}
            secretIdentity={props.secretIdentity}
            userIdentity={props.userIdentity}
            backgroundColor={Theme.LAYOUT_BOARD_BACKGROUND_COLOR}
          />
        </div>
        <div className={classNames("comment")} ref={editorRef}>
          <Editor
            key={props.id + "_editor"}
            editable={false}
            initialText={JSON.parse(props.initialText)}
            onTextChange={(text: any) => {}}
            onCharactersChange={(characters: number) => {}}
            onSubmit={() => {}}
            singleLine={true}
            showTooltip={false}
          />
        </div>
        <div
          className={classNames("extra-action", {
            visible: !!props.onExtraAction,
          })}
          onClick={props.onExtraAction}
        >
          <FontAwesomeIcon icon={faComment} />
        </div>
      </div>
      <style jsx>{`
        .extra-action {
          position: absolute;
          bottom: 0;
          right: 0;
          transform: translate(50%, 50%);
          border-radius: 50%;
          background-color: #5e5e5f;
          border: 1px solid rgba(255, 255, 255, 0.3);
          width: 24px;
          height: 24px;
          color: rgba(255, 255, 255, 0.6);
          display: none;
          transition: all 0.2s ease-out;
        }
        .extra-action.visible {
          display: block;
        }
        .extra-action :global(svg) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
        }
        .extra-action:hover {
          cursor: pointer;
          color: white;
          background-color: #757575;
        }

        .extra-action:hover {
        }
        .comment-container {
          margin-top: ${props.paddingTop || "15px"};
          margin-left: 10px;
          align-items: start;
          display: flex;
          max-width: 550px;
          position: relative;
        }
        .header {
          margin-right: 10px;
          cursor: pointer;
        }
        .comment {
          position: relative;
          padding: 10px 15px;
          color: black;
          flex-grow: 1;
          min-width: 0;
          align-self: flex-end;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: #5e5e5f;
          border-radius: ${Theme.BORDER_RADIUS_REGULAR};
        }
        .comment-container.muted .comment {
          color: rgba(255, 255, 255, 0.8);
        }
        .comment::after {
          content: "";
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          opacity: 0.8;
          border-radius: var(
            --comment-container-stacked-radius,
            ${Theme.BORDER_RADIUS_REGULAR}
          );
          transition: box-shadow 0.5s ease-out;
          box-shadow: 0px 0px 5px 3px var(--comment-container-shadow);
        }
        .comment-container:first-child .comment::after {
          border-top-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
          border-top-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
        }
        .comment-container:last-child .comment::after {
          border-bottom-left-radius: ${Theme.BORDER_RADIUS_REGULAR};
          border-bottom-right-radius: ${Theme.BORDER_RADIUS_REGULAR};
        }
      `}</style>
    </>
  );
});

export interface CommentHandler {
  highlight: (color: string) => void;
  editorRef?: React.RefObject<HTMLDivElement>;
  headerRef?: React.RefObject<HTMLDivElement>;
}

export interface CommentProps {
  id: string;
  focus?: boolean;
  initialText: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  muted?: boolean;
  paddingTop?: string;
  onExtraAction?: () => void;
}

export default Comment;
