import Card, { CardHandler } from "common/Card";
import DropdownListMenu, { DropdownProps } from "common/DropdownListMenu";
import Header, { HeaderStyle } from "./Header";
import Icon, { type IconProps } from "common/Icon";
import {
  LinkWithAction,
  SecretIdentityType,
  TagsListType,
  TagsType,
  UserIdentityType,
} from "types";

import Editor from "@bobaboard/boba-editor";
import Footer from "./Footer";
import PostPreamble from "./PostPreamble";
import React from "react";
import Tags from "tags/Tags";
import TagsFactory from "tags/TagsFactory";
import Theme from "theme/default";
import classnames from "classnames";
import css from "styled-jsx/css";
import debug from "debug";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useExpand } from "utils/useExpand";

const log = debug("bobaui:post-log");

const COLLAPSED_HEIGHT = 150;

const MemoizedHeader = React.memo(Header);
const MemoizedEditor = React.memo(Editor);
const MemoizedFooter = React.memo(Footer);

const { styles: cardStyles, className: cardClassName } = css.resolve`
  footer.with-tags {
    border-top: 1px dotted #d2d2d2;
  }
  footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  header:not(.with-board) {
    padding-bottom: 4px;
    border-bottom: 1px dotted #d2d2d2;
  }
  .content {
    --text-color: ${Theme.POST_TEXT_COLOR};
  }
`;

const { styles: headerStyles, className: headerClassName } = css.resolve`
  .metadata {
    max-width: calc(100% - 20px);
  }
  .dropdown-button {
    display: block;
    width: 40px;
    height: 30px;
    font-size: var(--font-size-regular);
    color: rgb(28, 28, 28, 0.45);
    position: absolute;
    top: 5px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dropdown-button:is(:hover, :focus) {
    color: rgb(28, 28, 28);
    cursor: pointer;
  }
  @media only screen and (max-width: 500px) {
    .dropdown-button {
      // By this point the user has switched to a mobile view, so we don't
      // have to worry about the arrow. The user is also probably going
      // to use the finger, so a clickable area closer to the bottom will come in
      // handy.
      top: 0;
      width: 40px;
      height: 40px;
    }
  }
`;

const BoardInfoBadge = (props: NonNullable<PostProps["board"]>) => (
  <div className="board-info" style={{ backgroundColor: props.accentColor }}>
    {props.slug}
    <style jsx>{`
      .board-info {
        text-align: center;
        padding: 3px;
        color: white;
      }
    `}</style>
  </div>
);

export const HeaderContent = React.forwardRef<HTMLImageElement, PostProps>(
  (props, avatarRef) => (
    <>
      <MemoizedHeader
        className={classnames(headerClassName, "metadata")}
        secretIdentity={props.secretIdentity}
        userIdentity={props.userIdentity}
        createdMessage={props.createdTime}
        createdMessageLink={props.createdTimeLink}
        size={HeaderStyle.REGULAR}
        forceHide={props.forceHideIdentity}
        createdMessageIcon={props.createdMessageIcon}
        ref={avatarRef}
      />
      {(props.menuOptions || props.menuOptionsHeader) && (
        <DropdownListMenu
          buttonClassName={classnames(headerClassName, "dropdown-button")}
          options={props.menuOptions}
          label="Post options"
        >
          <DropdownListMenu.Header>
            {props.menuOptionsHeader}
          </DropdownListMenu.Header>
          <Icon icon={faEllipsisV} />
        </DropdownListMenu>
      )}
      {headerStyles}
    </>
  )
);
HeaderContent.displayName = "HeaderContent";

const Post = React.forwardRef<PostHandler, PostProps>((props, ref) => {
  const cardRef = React.useRef<CardHandler>(null);
  const avatarRef = React.createRef<HTMLImageElement>();
  const backgroundColor = props.muted ? "#dcdcdc" : props.backgroundColor;
  const clicker = useExpand(cardRef.current?.contentRef, {
    compactHeight: props.collapsed ? COLLAPSED_HEIGHT : undefined,
    backgroundColor: backgroundColor || Theme.POST_BACKGROUND_COLOR,
  });

  React.useImperativeHandle(ref, () => ({
    highlight: (color: string) => {
      log(`Highlighting post with ${color}!`);
      cardRef.current?.highlight(color);
    },
    avatarRef,
  }));

  const hasFooterTags =
    !!props.tags?.categoryTags?.length ||
    !!props.tags?.indexTags?.length ||
    !!props.tags?.whisperTags?.length;

  return (
    <article>
      <PostPreamble {...props} />
      <Card backgroundColor={backgroundColor} ref={cardRef}>
        <Card.Header
          className={classnames(cardClassName, {
            "with-board": props.board,
          })}
        >
          <HeaderContent {...props} ref={avatarRef} />
        </Card.Header>
        <Card.Content className={classnames("content", cardClassName)}>
          {props.board && <BoardInfoBadge {...props.board} />}
          <MemoizedEditor
            initialText={JSON.parse(props.text)}
            editable={false}
            onEmbedLoaded={props.onEmbedLoaded}
          />
          {clicker}
        </Card.Content>
        <Card.Footer
          className={classnames(cardClassName, {
            "with-tags": hasFooterTags,
          })}
        >
          <Tags
            tags={
              props.tags
                ? TagsFactory.getTagsFromTagObject({
                    ...props.tags,
                    contentWarnings: [],
                  })
                : []
            }
            getOptionsForTag={props.getOptionsForTag}
          />
          <MemoizedFooter
            onContribution={props.onNewContribution}
            onComment={props.onNewComment}
            totalContributions={props.totalContributions}
            directContributions={props.directContributions}
            totalComments={props.totalComments}
            newContributions={props.newContributions}
            newComments={props.newComments}
            notesLink={props.notesLink}
            allowsContribution={props.allowsContribution}
            allowsComment={props.allowsComment}
          />
        </Card.Footer>
      </Card>
      <style jsx>{`
        article {
          position: relative;
          max-width: 100%;
          width: ${Theme.POST_WIDTH_PX}px;
          pointer-events: all;
        }
      `}</style>
      {cardStyles}
    </article>
  );
});

Post.displayName = "PostForwardRef";
export default Post;

export interface PostHandler {
  highlight: (color: string) => void;
  avatarRef?: React.RefObject<HTMLImageElement>;
}

export interface PostData {
  id?: string;
  text: string;
  createdTime: string;
  createdTimeLink: LinkWithAction;
  createdMessageIcon?: IconProps["icon"];
  secretIdentity: SecretIdentityType;
  userIdentity?: UserIdentityType;
  tags?: TagsListType;
  newPost?: boolean;
  op?: boolean;
  totalContributions?: number;
  directContributions?: number;
  newContributions?: number;
  totalComments?: number;
  newComments?: number;
  board?: {
    slug: string;
    accentColor: string;
  };
}

export interface PostProps extends PostData {
  allowsComment?: boolean;
  allowsContribution?: boolean;
  onNewContribution: () => void;
  onNewComment: () => void;
  collapsed?: boolean;
  menuOptions?: DropdownProps["options"];
  menuOptionsHeader?: React.ReactNode;
  onEmbedLoaded?: () => void;
  getOptionsForTag?: (tag: TagsType) => DropdownProps["options"];
  forceHideIdentity?: boolean;
  backgroundColor?: string;
  notesLink: LinkWithAction;
  muted?: boolean;
}
