import React from "react";

import Header, { HeaderStyle } from "./Header";
import EditorFooter from "./EditorFooter";
import Card from "../common/Card";
import Tags from "./Tags";
import { PostSizes, getPostWidth } from "./Post";
import Spinner from "../common/Spinner";
import DropdownListMenu from "../common/DropdownListMenu";
import Editor, {
  getAllImages,
  replaceImages,
  setTumblrEmbedFetcher as libSetFetcher,
  setOEmbedFetcher as libSetEmbedFetcher,
  removeTrailingWhitespace,
  // @ts-ignore
} from "@bobaboard/boba-editor";

import Theme from "../theme/default";
import Button from "../common/Button";
import {
  faCompressArrowsAlt,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { TagsType } from "../types";
import { TagsFactory } from "../common/Tag";

export const setTumblrEmbedFetcher = libSetFetcher;
export const setOEmbedFetcher = libSetEmbedFetcher;

const prepareForSubmission = (
  text: string,
  uploadFunction: (src: string) => Promise<string>
) => {
  const delta = removeTrailingWhitespace(JSON.parse(text));
  const images = getAllImages(delta);
  return Promise.all(images.map((src: string) => uploadFunction(src))).then(
    (uploadedImages) => {
      const replacements = images.reduce(
        (obj: any, image: string, index: number) => {
          return {
            ...obj,
            [image]: uploadedImages[index],
          };
        },
        {}
      );
      replaceImages(delta, replacements);
      return JSON.stringify(delta);
    }
  );
};

const computeTags = (
  tags: TagsType[],
  newTag: TagsType | undefined,
  accentColor: string
): TagsType[] => {
  if (!newTag) {
    return tags;
  }

  tags.push(newTag);

  return TagsFactory.orderTags(tags);
};

const PostEditor = React.forwardRef<{ focus: () => void }, PostEditorProps>(
  (props, ref) => {
    const editorRef = React.useRef<any>(null);
    const [newText, setNewText] = React.useState(
      props.initialText ? props.initialText : ""
    );
    const [isEmpty, setIsEmpty] = React.useState(true);
    const [tags, setTags] = React.useState<TagsType[]>([]);
    const [selectedView, setSelectedView] = React.useState<string | undefined>(
      props.viewOptions?.[0]?.name
    );
    const [selectedIdentity, setSelectedIdentity] = React.useState<
      string | undefined
    >();

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        editorRef.current?.focus();
      },
    }));

    return (
      <>
        <div
          className={classnames("post-container", { centered: props.centered })}
        >
          <Card
            header={
              <div className="header">
                <Header
                  secretIdentity={
                    props.secretIdentity ||
                    props.additionalIdentities?.find(
                      (identity) => identity.id == selectedIdentity
                    )
                  }
                  userIdentity={props.userIdentity}
                  additionalIdentities={props.additionalIdentities}
                  onSelectIdentity={(identity) => {
                    setSelectedIdentity(identity?.id);
                  }}
                  size={HeaderStyle.REGULAR}
                >
                  {props.minimizable && (
                    <Button
                      icon={faCompressArrowsAlt}
                      onClick={props.onMinimize}
                      disabled={props.loading}
                    >
                      Minimize
                    </Button>
                  )}
                </Header>
              </div>
            }
            footer={
              <div className="footer">
                <Tags
                  tags={tags}
                  onTagsAdd={(tag: TagsType) =>
                    setTags(
                      computeTags(
                        tags,
                        tag,
                        props.accentColor || Theme.DEFAULT_ACCENT_COLOR
                      )
                    )
                  }
                  onTagsDelete={(tag: TagsType) => {
                    setTags(tags.filter((currentTag) => currentTag != tag));
                  }}
                  editable
                  onSubmit={(newTag) => {
                    if (!isEmpty) {
                      props.onSubmit(
                        prepareForSubmission(
                          newText,
                          props.onImageUploadRequest
                        ).then((uploadedText) => ({
                          text: uploadedText,
                          tags: computeTags(
                            tags,
                            newTag,
                            props.accentColor || Theme.DEFAULT_ACCENT_COLOR
                          ),
                        }))
                      );
                    }
                  }}
                  accentColor={props.accentColor}
                />
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
                    // If you change this, also change onSubmit in the editor.
                    onSubmit={() =>
                      props.onSubmit(
                        prepareForSubmission(
                          newText,
                          props.onImageUploadRequest
                        ).then((uploadedText) => ({
                          text: uploadedText,
                          tags,
                          viewOptionName: selectedView,
                          identityId: selectedIdentity,
                        }))
                      )
                    }
                    onCancel={props.onCancel}
                    submittable={!props.loading && !isEmpty}
                    cancellable={!props.loading}
                  />
                </div>
              </div>
            }
          >
            <div
              className={classnames("editor-container", {
                loading: props.loading,
              })}
            >
              <div className={"spinner"}>
                <Spinner />
              </div>
              <div className="editor">
                <Editor
                  ref={editorRef}
                  key="editor"
                  initialText={
                    props.initialText ? JSON.parse(props.initialText) : ""
                  }
                  editable={!props.loading}
                  // If you change this, also change onSubmit in the editor footer.
                  onSubmit={() =>
                    props.onSubmit(
                      prepareForSubmission(
                        newText,
                        props.onImageUploadRequest
                      ).then((uploadedText) => ({
                        text: uploadedText,
                        tags,
                        viewOptionName: selectedView,
                        identityId: selectedIdentity,
                      }))
                    )
                  }
                  onIsEmptyChange={(empty: boolean) => {
                    setIsEmpty(empty);
                  }}
                  onTextChange={(text: any) =>
                    setNewText(JSON.stringify(text.ops))
                  }
                />
              </div>
            </div>
          </Card>
        </div>
        <style jsx>{`
          .post-container {
            max-width: ${getPostWidth(
              props.defaultSize || PostSizes.REGULAR
            )}px;
          }
          .post-container.centered {
            margin: 0 auto;
          }
          .header {
            padding: 10px 0;
            margin: 0 10px 5px 10px;
            border-bottom: 1px solid #d2d2d2;
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
            padding-top: 5px;
          }
          .editor {
            min-height: 300px;
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

export default PostEditor;

export interface PostEditorProps {
  initialText?: string;
  secretIdentity?: {
    avatar: string;
    name: string;
  };
  userIdentity: {
    avatar: string;
    name: string;
  };
  additionalIdentities?: {
    id: string;
    avatar: string;
    name: string;
  }[];
  loading?: boolean;
  defaultSize?: PostSizes;
  onImageUploadRequest: (imgUrl: string) => Promise<string>;
  onSubmit: (
    postPromise: Promise<{
      text: string;
      tags?: TagsType[];
      viewOptionName?: string;
      identityId?: string;
    }>
  ) => void;
  onCancel: () => void;
  onMinimize?: () => void;
  minimizable?: boolean;
  viewOptions?: {
    name: string;
    iconUrl?: string;
  }[];
  centered?: boolean;
  accentColor?: string;
}
