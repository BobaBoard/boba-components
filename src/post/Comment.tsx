import React from "react";
import classNames from "classnames";
import Editor from "@bobaboard/boba-editor";
import Header, { HeaderStyle } from "./Header";
import useComponentSize from "@rehooks/component-size";

const SIZES = {
  REGULAR: "REGULAR",
  COMPACT: "COMPACT",
};
const SIZE_TRIGGER = 315;

const Comment: React.FC<CommentProps> = (props) => {
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

  return (
    <>
      <div
        className={classNames("comment-container", {
          compact: size == SIZES.COMPACT,
          sized: sized,
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
            onTextChange={(text) => {}}
            focus={!!props.focus}
            onCharactersChange={(text) => {}}
            onSubmit={() => {}}
            singleLine={true}
            showTooltip={false}
          />
        </div>
      </div>
      <style jsx>{`
        .comment-container {
          margin-top: 15px;
          margin-left: 30px;
          align-items: start;
          display: flex;
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
      `}</style>
    </>
  );
};

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
}

export default Comment;
