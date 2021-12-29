import BoardSelector, { BoardSelectorProps } from "../tags/BoardSelector";
import { DefaultTheme, ImageUploaderContext } from "../index";
import Header, { HeaderStyle, PostHeaderProps } from "./Header";
import { SecretIdentityType, TagsType } from "../types";
import {
  faCaretDown,
  faCompressArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../buttons/Button";
import Card from "../common/Card";
import DropdownListMenu from "../common/DropdownListMenu";
import Editor from "@bobaboard/boba-editor";
import EditorFooter from "./EditorFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Spinner from "../common/Spinner";
import Tags from "../tags/Tags";
import TagsFactory from "../tags/TagsFactory";
import classnames from "classnames";
import noop from "noop-ts";
import { prepareContentSubmission } from "../utils";
import { useHotkeys } from "react-hotkeys-hook";

const computeTags = (
  tags: TagsType[],
  newTag: TagsType | undefined
): TagsType[] => {
  if (!newTag) {
    return tags;
  }

  tags.push(newTag);

  return TagsFactory.orderTags(tags);
};

export interface PostEditorHandler {
  focus: () => void;
}

const BOARD_SELECTOR_IN_HEADER_BREAKPOINT = 450;

const MemoizedTags = React.memo(Tags);
const MemoizedHeader = React.memo(Header);
const PostEditor = React.forwardRef<PostEditorHandler, PostEditorProps>(
  (props, ref) => {
    const editorRef = React.useRef<Editor>(null);
    const [isEmpty, setIsEmpty] = React.useState(true);
    const [selectedBoard, setSelectedBoard] = React.useState(
      props.initialBoard
    );
    const [tags, setTags] = React.useState<TagsType[]>(
      props.initialTags
        ? TagsFactory.getTagsFromTagObject(props.initialTags)
        : []
    );
    const [selectedView, setSelectedView] = React.useState<string | undefined>(
      props.viewOptions?.[0]?.name
    );
    const [selectedIdentity, setSelectedIdentity] = React.useState<
      string | SecretIdentityType | undefined
    >();
    const [selectedAccessory, setSelectedAccessory] = React.useState<
      string | undefined
    >();
    const [suggestedCategories, setSuggestedCategories] = React.useState(
      props.suggestedCategories
    );
    const imageUploader = React.useContext(ImageUploaderContext);
    const [boardSelectorInHeader, setBoardSelectorInHeader] = React.useState(
      false
    );

    React.useEffect(() => {
      if (
        !props.availableBoards ||
        !editorRef.current ||
        !editorRef.current.editorContainer.current
      ) {
        return;
      }
      const containerObserver = new ResizeObserver((entries) => {
        setBoardSelectorInHeader(
          entries[0].contentRect.width < BOARD_SELECTOR_IN_HEADER_BREAKPOINT
        );
      });
      containerObserver.observe(editorRef.current.editorContainer.current);
      return () => {
        containerObserver.disconnect();
      };
    }, [props.availableBoards]);

    React.useEffect(() => {
      setSelectedIdentity(props.secretIdentity);
    }, [props.secretIdentity]);

    React.useEffect(() => {
      const currentCategories = tags.filter((tag) => tag.category);
      setSuggestedCategories(
        props.suggestedCategories?.filter(
          (suggestedCategory) =>
            !currentCategories.some(
              (category) => category.name == suggestedCategory
            )
        )
      );
    }, [props.suggestedCategories, tags]);

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        // TODO: why does this not work?
        editorRef.current?.focus();
      },
    }));

    const { onSubmit } = props;
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
          viewOptionName: selectedView,
          identityId:
            typeof selectedIdentity === "object"
              ? selectedIdentity.id
              : selectedIdentity,
          accessoryId: selectedAccessory,
          boardSlug: selectedBoard,
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
      selectedBoard,
    ]);
    useHotkeys(
      "control+enter,command+enter",
      onSubmitHandler,
      { keydown: true, enableOnTags: ["INPUT"], enableOnContentEditable: true },
      [onSubmitHandler]
    );

    return (
      <>
        <div className={classnames("post-container")}>
          <Card>
            <Card.Header>
              <div className="header">
                <MemoizedHeader
                  secretIdentity={React.useMemo(() => {
                    return typeof selectedIdentity == "object"
                      ? selectedIdentity
                      : props.additionalIdentities?.find(
                          (identity) => identity.id == selectedIdentity
                        );
                  }, [selectedIdentity, props.additionalIdentities])}
                  userIdentity={props.userIdentity}
                  additionalIdentities={
                    !props.editableSections
                      ? props.additionalIdentities
                      : undefined
                  }
                  onSelectIdentity={React.useCallback((identity) => {
                    setSelectedIdentity(identity?.id);
                  }, [])}
                  accessories={props.accessories}
                  accessory={props.accessories?.find(
                    (accessory) => accessory.id === selectedAccessory
                  )}
                  onSelectAccessory={React.useCallback((accessory) => {
                    setSelectedAccessory(accessory?.id);
                  }, [])}
                  size={HeaderStyle.REGULAR}
                />
                {props.minimizable ? (
                  <Button
                    icon={faCompressArrowsAlt}
                    onClick={props.onMinimize}
                    disabled={props.loading}
                  >
                    Minimize
                  </Button>
                ) : undefined}
              </div>
              {props.availableBoards && boardSelectorInHeader && selectedBoard && (
                <div className="header-board">
                  Posting in:{" "}
                  <BoardSelector
                    availableBoards={props.availableBoards}
                    onBoardSelected={setSelectedBoard}
                    selectedBoard={selectedBoard}
                  />
                </div>
              )}
            </Card.Header>
            <div
              className={classnames("editor-container", {
                loading: props.loading,
              })}
            >
              <div className={"spinner"}>
                <Spinner />
              </div>
              <div
                className={classnames("editor", {
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
                    setIsEmpty(empty);
                  }}
                  // This is a no op because we're using the handler to access the content directly.
                  onTextChange={noop}
                />
              </div>
            </div>
            <Card.Footer>
              <div className="footer">
                <MemoizedTags
                  tags={tags}
                  onTagsAdd={React.useCallback(
                    (tag: TagsType) => setTags(computeTags(tags, tag)),
                    [tags]
                  )}
                  onTagsDelete={React.useCallback(
                    (tag: TagsType) => {
                      setTags(tags.filter((currentTag) => currentTag != tag));
                    },
                    [tags]
                  )}
                  editable
                  suggestedCategories={suggestedCategories}
                >
                  {props.availableBoards &&
                    !boardSelectorInHeader &&
                    selectedBoard && (
                      <BoardSelector
                        availableBoards={props.availableBoards}
                        onBoardSelected={setSelectedBoard}
                        selectedBoard={selectedBoard}
                      />
                    )}
                </MemoizedTags>
                <div
                  className={classnames("footer-actions", {
                    "with-options": !!props.viewOptions,
                  })}
                >
                  {props.viewOptions && (
                    <DropdownListMenu
                      options={props.viewOptions?.map((option) => ({
                        name: option.name,
                        link: {
                          onClick: () => setSelectedView(option.name),
                        },
                      }))}
                      zIndex={200}
                    >
                      <div>
                        <div className="views-dropdown">
                          <div className="default-view">
                            Default View: {selectedView}
                          </div>
                          <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                      </div>
                    </DropdownListMenu>
                  )}
                  <EditorFooter
                    onSubmit={onSubmitHandler}
                    onCancel={() => props.onCancel(isEmpty)}
                    submittable={
                      !props.loading && (!isEmpty || !!props.editableSections)
                    }
                    cancellable={!props.loading}
                  />
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        <style jsx>{`
          .post-container {
            max-width: ${DefaultTheme.POST_WIDTH_PX}px;
            width: 100%;
          }
          .header {
            padding: 10px 0;
            margin: 0 10px 5px 10px;
            border-bottom: 1px solid #d2d2d2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: calc(100% - 30px);
            width: 100%;
          }
          .header-board {
            padding-bottom: 5px;
            margin: 0px 10px 5px;
            border-bottom: 1px solid rgb(210, 210, 210);
            display: flex;
            align-content: center;
            align-items: center;
            font-size: var(--font-size-small);
            max-width: calc(100% - 30px);
          }

           {
            /** TODO: don't use global */
          }
          .header-board :global(button) {
            width: calc(100% - 80px);
            margin-left: 5px;
          }
          .header-board :global(button .board-selector) {
            width: 100%;
          }
          .footer {
            border-top: 1px solid #d2d2d2;
            padding: 0 0 10px 0;
            margin: 0 10px;
          }
          .footer-actions {
            border-top: 1px solid #d2d2d2;
            padding-top: 10px;
          }
          .footer-actions.with-options {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .views-dropdown {
            display: inline-flex;
            color: #1c1c1c;
            border-radius: 10px;
            padding: 3px 6px;
            align-items: center;
          }
          .views-dropdown :global(svg) {
            margin-left: 4px;
          }
          .views-dropdown:hover {
            cursor: pointer;
            background-color: #ececec;
          }
          .editor-container {
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
            display: none;
          }

          .editor-container.loading .spinner {
            display: flex;
          }
        `}</style>
      </>
    );
  }
);

PostEditor.displayName = "PostEditorForwardRef";
export default PostEditor;

export interface PostEditorProps {
  initialText?: string;
  initialTags?: {
    contentWarnings: string[];
    categoryTags: string[];
    whisperTags: string[];
    indexTags: string[];
  };
  secretIdentity?: SecretIdentityType;
  userIdentity: {
    avatar: string;
    name: string;
  };
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
      boardSlug?: string;
    }>
  ) => void;
  onCancel: (empty: boolean) => void;
  onMinimize?: () => void;
  minimizable?: boolean;
  viewOptions?: {
    name: string;
    iconUrl?: string;
  }[];
  accentColor?: string;
  suggestedCategories?: string[];
  editableSections?: {
    tags?: boolean;
  };
  availableBoards?: BoardSelectorProps["availableBoards"];
  initialBoard?: BoardSelectorProps["selectedBoard"];
}
