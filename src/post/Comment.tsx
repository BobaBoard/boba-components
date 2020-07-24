import React from "react";
import classNames from "classnames";
// @ts-ignore
import Editor from "@bobaboard/boba-editor";
import Header, { HeaderStyle } from "./Header";
import useComponentSize from "@rehooks/component-size";
import debug from "debug";
const log = debug("bobaui:comment-log");

const SIZES = {
  REGULAR: "REGULAR",
  COMPACT: "COMPACT",
};
const SIZE_TRIGGER = 315;

const Comment = React.forwardRef<CommentHandler, CommentProps>((props, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
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
        <div className="header">
          <Header
            size={HeaderStyle.COMPACT}
            secretIdentity={props.secretIdentity}
            userIdentity={props.userIdentity}
          />
        </div>
        <div className={classNames("comment")}>
          <Editor
            key={props.id + "_editor"}
            editable={false}
            initialText={JSON.parse(props.initialText)}
            onTextChange={(text: any) => {}}
            focus={!!props.focus}
            onCharactersChange={(characters: number) => {}}
            onSubmit={() => {}}
            singleLine={true}
            showTooltip={false}
          />
        </div>
      </div>
      <style jsx>{`
        .comment-container.muted {
          opacity: 0.8;
        }
        .comment-container {
          padding-top: 15px;
          padding-left: 30px;
          align-items: start;
          display: flex;
          max-width: 550px;
        }
        .header {
          margin-right: 10px;
          cursor: pointer;
        }
        .comment {
          position: relative;
          padding: 15px 20px;
          color: black;
          flex-grow: 1;
          min-width: 0;
        }
        .comment {
          align-self: flex-end;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
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
          border-radius: 15px;
          transition: box-shadow 0.5s ease-out;
          box-shadow: 0px 0px 5px 3px var(--comment-container-shadow);
        }
      `}</style>
    </>
  );
});

export interface CommentHandler {
  highlight: (color: string) => void;
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
}

export default Comment;
