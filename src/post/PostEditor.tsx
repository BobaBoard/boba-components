import {
  AccessoryType,
  BoardDataType,
  SecretIdentityType,
  TagsListType,
  TagsType,
  UserIdentityType,
} from "types";
import BoardSelector, { BoardSelectorProps } from "tags/BoardSelector";
import Card, { CardHandler } from "common/Card";
import { DefaultTheme, ImageUploaderContext } from "../index";
import Header, { HeaderStyle, PostHeaderProps } from "./Header";
import ViewSelector, { ViewOption } from "./ViewSelector";

import Editor from "@bobaboard/boba-editor";
import EditorFooter from "./EditorFooter";
import React from "react";
import Spinner from "common/Spinner";
import Tags from "tags/Tags";
import TagsFactory from "tags/TagsFactory";
import classnames from "classnames";
import css from "styled-jsx/css";
import noop from "noop-ts";
import { prepareContentSubmission } from "utils";
import useDimensions from "react-cool-dimensions";
import { useHotkeys } from "react-hotkeys-hook";

export interface PostEditorHandler {
  focus: () => void;
}

// TODO: change all these `| undefined` to `| null`
interface AccessorySelector {
  selectedAccessory: AccessoryType | undefined;
  accessories: AccessoryType[] | undefined;
  onSelectAccessory: (accessory: AccessoryType | undefined) => void;
}

interface IdentitySelector {
  userIdentity: UserIdentityType | undefined;
  // TODO: why was this typed as string? #typescript
  selectedIdentity: string | SecretIdentityType | undefined;
  additionalIdentities: SecretIdentityType[] | undefined;
  onSelectIdentity: (identity: string | SecretIdentityType | undefined) => void;
}

interface BoardSelector {
  selectedBoard: BoardDataType;
  availableBoards: BoardDataType[];
  onSelectBoard: (board: BoardDataType | undefined) => void;
}

const BOARD_SELECTOR_IN_HEADER_BREAKPOINT = 450;

const MemoizedTags = React.memo(Tags);
const MemoizedHeader = React.memo(Header);

const { styles: headerStyles, className: headerClassName } = css.resolve`
  .header {
    border-bottom: 1px solid #d2d2d2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 5px;
  }
  .header:last-child {
    padding-bottom: 10px;
  }
`;

const PostEditorHeader = (
  props: AccessorySelector &
    IdentitySelector &
    Partial<BoardSelector> & { showBoardSelector: boolean }
) => {
  // TODO: double-check whether we ever have a string here or can directly
  // use "selected identity".
  const selectedIdentity =
    typeof props.selectedIdentity === "object"
      ? props.selectedIdentity
      : props.additionalIdentities?.find(
          (identity) => identity.id === props.selectedIdentity
        );

  return (
    <>
      <MemoizedHeader
        className={classnames("header", headerClassName)}
        secretIdentity={selectedIdentity}
        userIdentity={props.userIdentity}
        additionalIdentities={props.additionalIdentities}
        onSelectIdentity={props.onSelectIdentity}
        accessories={props.accessories}
        accessory={props.selectedAccessory}
        onSelectAccessory={props.onSelectAccessory}
        size={HeaderStyle.REGULAR}
      />
      {props.availableBoards &&
        // TODO: remove this condition when the board can be null in
        // the post editor
        props.selectedBoard &&
        props.onSelectBoard &&
        props.showBoardSelector && (
          <div className="select-board">
            Posting in:{" "}
            <BoardSelector
              availableBoards={props.availableBoards}
              onBoardSelected={props.onSelectBoard}
              selectedBoard={props.selectedBoard}
            />
          </div>
        )}
      <style jsx>{`
        .select-board {
          padding: 3px 0;
          border-bottom: 1px solid #d2d2d2;
          display: flex;
          align-content: center;
          align-items: center;
          font-size: var(--font-size-small);
          white-space: nowrap;
          gap: 5px;
        }
      `}</style>
      {headerStyles}
    </>
  );
};

const { styles: tagsStyles, className: tagsClassName } = css.resolve`
  border-top: 1px solid #d2d2d2;
`;
const PostEditorFooter = (
  props: Partial<BoardSelector> & {
    suggestibleCategories: string[] | undefined;
    tags: TagsType[];
    onTagsChange: (tags: TagsType[]) => void;
    showBoardSelector: boolean;
    canSubmit: boolean;
    onSubmit: () => void;
    canCancel: boolean;
    views: ViewOption[] | undefined;
    selectedView: ViewOption | undefined;
    onSelectView: (selectedView: ViewOption) => void;
    onCancel: () => void;
  }
) => {
  const currentlyUsedCategories = props.tags.filter((tag) => tag.category);
  const toSuggest = props.suggestibleCategories?.filter(
    (suggestibleCategory) =>
      !currentlyUsedCategories.some(
        (usedCategory) => usedCategory.name === suggestibleCategory
      )
  );
  const { tags, onTagsChange } = props;
  return (
    <>
      <MemoizedTags
        tags={props.tags}
        onTagsAdd={React.useCallback(
          (newTag: TagsType) => {
            if (!newTag) {
              return onTagsChange(tags);
            }
            onTagsChange(TagsFactory.orderTags([...tags, newTag]));
          },
          [tags, onTagsChange]
        )}
        onTagsDelete={React.useCallback(
          (tag: TagsType) => {
            onTagsChange(tags.filter((currentTag) => currentTag !== tag));
          },
          [tags, onTagsChange]
        )}
        editable
        suggestedCategories={toSuggest}
        className={tagsClassName}
      >
        {props.availableBoards &&
          props.showBoardSelector &&
          props.onSelectBoard &&
          props.selectedBoard && (
            <BoardSelector
              availableBoards={props.availableBoards}
              onBoardSelected={props.onSelectBoard}
              selectedBoard={props.selectedBoard}
            />
          )}
      </MemoizedTags>
      <div
        className={classnames("footer-actions", {
          "with-options": !!props.views,
        })}
      >
        {props.views && (
          <ViewSelector
            views={props.views}
            selectedView={props.selectedView}
            onSelectView={props.onSelectView}
          />
        )}
        <EditorFooter
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
          submittable={props.canSubmit}
          cancellable={props.canCancel}
        />
      </div>
      <style jsx>{`
        .footer-actions {
          border-top: 1px solid #d2d2d2;
          padding-top: 5px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .footer-actions.with-options {
          justify-content: space-between;
        }
      `}</style>
      {tagsStyles}
    </>
  );
};

const { styles: cardStyles, className: cardClassName } = css.resolve`
  .post-editor {
    max-width: ${DefaultTheme.POST_WIDTH_PX}px;
    width: 100%;
  }
  .editor {
    min-height: 300px;
  }
  .editor:not(.can-edit) {
    opacity: 0.7;
  }
  .editor-container.loading .editor {
    opacity: 0.5;
  }
  .spinner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .editor-container:not(.loading) .spinner {
    display: none !important;
  }
`;
const PostEditor = React.forwardRef<PostEditorHandler, PostEditorProps>(
  (props, ref) => {
    const editorRef = React.useRef<Editor>(null);
    const [isEmpty, setIsEmpty] = React.useState(true);
    const [selectedIdentity, setSelectedIdentity] = React.useState<
      string | SecretIdentityType | undefined
    >(props.secretIdentity);
    const [selectedAccessory, setSelectedAccessory] =
      React.useState<AccessoryType | undefined>();
    const imageUploader = React.useContext(ImageUploaderContext);

    const [tags, setTags] = React.useState<TagsType[]>(
      props.initialTags
        ? TagsFactory.getTagsFromTagObject(props.initialTags)
        : []
    );
    const [selectedView, setSelectedView] = React.useState<
      ViewOption | undefined
    >(props.viewOptions?.[0]);

    const {
      observe: dimensionsObserver,
      currentBreakpoint: boardSelectorPosition,
    } = useDimensions<HTMLDivElement>({
      breakpoints: {
        header: 0,
        footer: BOARD_SELECTOR_IN_HEADER_BREAKPOINT,
      },
      updateOnBreakpointChange: true,
    });

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        // TODO: why does this not work?
        editorRef.current?.focus();
      },
    }));

    const { onSubmit, onCancel } = props;
    const onSubmitHandler = React.useCallback(() => {
      if (!props.editableSections && isEmpty) {
        return;
      }
      if (!imageUploader?.onImageUploadRequest) {
        throw new Error("An image uploader context must be provided");
      }
      onSubmit(
        prepareContentSubmission(
          editorRef.current?.getEditorContents(),
          imageUploader.onImageUploadRequest
        ).then((uploadedText) => ({
          text: uploadedText,
          tags,
          viewOptionName: selectedView?.name,
          identityId:
            typeof selectedIdentity === "object"
              ? selectedIdentity.id
              : selectedIdentity,
          accessoryId: selectedAccessory?.id,
        }))
      );
    }, [
      props.editableSections,
      isEmpty,
      imageUploader,
      selectedView,
      selectedIdentity,
      selectedAccessory,
      onSubmit,
      tags,
    ]);

    useHotkeys(
      "control+enter,command+enter",
      onSubmitHandler,
      { keydown: true, enableOnTags: ["INPUT"], enableOnContentEditable: true },
      [onSubmitHandler]
    );
    return (
      <Card
        className={classnames(cardClassName, "post-editor")}
        ref={React.useCallback(
          (ref: CardHandler | null) => {
            if (ref?.cardRef && ref.cardRef.current) {
              dimensionsObserver(ref.cardRef.current);
            }
          },
          [dimensionsObserver]
        )}
      >
        <Card.Header>
          <PostEditorHeader
            selectedAccessory={selectedAccessory}
            accessories={props.editableSections ? undefined : props.accessories}
            onSelectAccessory={setSelectedAccessory}
            userIdentity={props.userIdentity}
            selectedIdentity={selectedIdentity}
            additionalIdentities={
              props.editableSections ? undefined : props.additionalIdentities
            }
            onSelectIdentity={setSelectedIdentity}
            selectedBoard={props.selectedBoard}
            availableBoards={
              props.editableSections ? undefined : props.availableBoards
            }
            onSelectBoard={props.onSelectBoard}
            showBoardSelector={boardSelectorPosition === "header"}
          />
        </Card.Header>
        <Card.Content
          className={classnames(cardClassName, "editor-container", {
            loading: props.loading,
          })}
        >
          <Spinner className={classnames(cardClassName, "spinner")} />
          <div
            className={classnames("editor", cardClassName, {
              "can-edit": !props.editableSections,
            })}
          >
            <Editor
              ref={editorRef}
              key="editor"
              initialText={
                props.initialText ? JSON.parse(props.initialText) : ""
              }
              editable={!props.loading && !props.editableSections}
              onIsEmptyChange={(empty: boolean) => {
                setIsEmpty((currentlyEmpty) => {
                  if (currentlyEmpty !== empty) {
                    props.onIsEmptyChange?.(empty);
                  }
                  return empty;
                });
              }}
              // This is a no op because we're using the handler to access the content directly.
              onTextChange={noop}
            />
          </div>
        </Card.Content>
        <Card.Footer aria-label="The post editor footer">
          <PostEditorFooter
            selectedBoard={props.selectedBoard}
            availableBoards={
              props.editableSections ? undefined : props.availableBoards
            }
            onSelectBoard={props.onSelectBoard}
            showBoardSelector={boardSelectorPosition === "footer"}
            suggestibleCategories={props.suggestedCategories}
            tags={tags}
            onTagsChange={setTags}
            views={props.editableSections ? undefined : props.viewOptions}
            selectedView={selectedView}
            onSelectView={setSelectedView}
            canSubmit={!props.loading && (!isEmpty || !!props.editableSections)}
            onSubmit={onSubmitHandler}
            canCancel={!props.loading}
            onCancel={React.useCallback(
              () => onCancel(isEmpty),
              [isEmpty, onCancel]
            )}
          />
        </Card.Footer>
        {cardStyles}
      </Card>
    );
  }
);

PostEditor.displayName = "PostEditorForwardRef";
export default PostEditor;

export interface PostEditorProps {
  initialText?: string;
  initialTags?: TagsListType;
  secretIdentity?: SecretIdentityType;
  userIdentity: UserIdentityType;
  additionalIdentities?: PostHeaderProps["additionalIdentities"];
  accessories?: PostHeaderProps["accessories"];
  loading?: boolean;
  onSubmit: (
    postPromise: Promise<{
      text: string;
      tags: TagsType[];
      viewOptionName?: string;
      identityId?: string;
      accessoryId?: string;
    }>
  ) => void;
  onCancel: (empty: boolean) => void;
  viewOptions?: ViewOption[];
  accentColor?: string;
  // TODO: maybe rename this something like "suggestible categories"?
  suggestedCategories?: string[];
  editableSections?: {
    tags?: boolean;
  };
  availableBoards?: BoardSelectorProps["availableBoards"];
  selectedBoard?: BoardSelectorProps["selectedBoard"];
  onSelectBoard?: BoardSelectorProps["onBoardSelected"];
  onIsEmptyChange?: (empty: boolean) => void;
}
