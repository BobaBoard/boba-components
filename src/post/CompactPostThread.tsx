import React from "react";

import Header, { HeaderStyle } from "./Header";
import Post, { PostSizes, getPostWidth, PostProps } from "./Post";
import Card from "../common/Card";
import Editor from "@bobaboard/boba-editor";
import classnames from "classnames";
//import { useCompact } from "../utils";

import Theme from "../theme/default";
import { PostDetailsType } from "../types";
import Tags from "../tags/Tags";
import TagsFactory from "../tags/TagsFactory";
import UpdatesHeader from "./UpdatesHeader";
import { PostHandler } from "index";

const PostContent: React.FC<
  PostDetailsType & { showHeader?: boolean; showFooter?: boolean }
> = (props) => {
  return (
    <div
      className={classnames("post", {
        old: !props.newPost,
        "with-footer": !!props.showFooter,
      })}
    >
      {props.showHeader !== false && (
        <div className="header">
          <Header
            secretIdentity={props.secretIdentity}
            userIdentity={props.userIdentity}
            createdMessage={`${props.createdTime}`}
            size={HeaderStyle.REGULAR}
            newPost={props.newPost}
          />
        </div>
      )}
      <Editor initialText={JSON.parse(props.text)} editable={false} />
      <div className={classnames("tags", { visible: !props.tags })}>
        <Tags
          tags={
            props.tags
              ? TagsFactory.getTagsFromTagObject({
                  whisperTags: props.tags.whisperTags,
                  contentWarnings: [],
                  categoryTags: props.showFooter ? props.tags.categoryTags : [],
                  indexTags: props.showFooter ? props.tags.indexTags : [],
                })
              : []
          }
        />
      </div>
      {props.showFooter !== false && (
        <div className="footer">
          {/* <Footer
            mode={footerModes.VIEW}
            onSubmit={() => console.log("Click")}
          /> */}
        </div>
      )}
      <style jsx>{`
        .post:not(.with-footer) {
        }
        .header {
          padding-top: 15px;
          padding-left: 5px;
          padding-right: 5px;
        }
        .tags {
          padding: 0 10px;
          text-align: left;
          border-top: 1px dotted rgba(0, 0, 0, 0.3);
          padding-top: 5px;
          padding-bottom: 10px;
        }
      `}</style>
    </div>
  );
};
// @ts-ignore
const ThreadContent: React.FC<{ posts: PostDetailsType[] }> = ({ posts }) => {
  // const divRef = React.createRef<HTMLDivElement>();
  // const expandDiv = useCompact(divRef, 250, "lightgrey");

  const oldPosts = posts.filter((post) => !post.newPost);
  const newPosts = posts.filter((post) => post.newPost);
  return (
    <div>
      <div className="old-posts">
        {oldPosts.map((post, index) => {
          // Don't show the last post here, keep it unminified.
          if (index == oldPosts.length - 1) {
            return;
          }
          return <PostContent key={index} {...post} showHeader={index != 0} />;
        })}
        {/* {expandDiv} */}
      </div>
      <div className="old-last">
        {<PostContent {...oldPosts[oldPosts.length - 1]} />}
      </div>
      <div className="new-posts">
        {newPosts.map((post, index) => {
          return (
            <PostContent
              key={index}
              {...post}
              showFooter={index == newPosts.length - 1}
            />
          );
        })}
      </div>
      <style jsx>
        {`
          .old-posts,
          .old-last {
            position: relative;
          }
          .post {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
};

const CompactThread: React.FC<CompactThreadProps> = (props) => {
  const lastPost = props.posts[props.posts.length - 1];
  const hasUpdate =
    lastPost.newComments || lastPost.newContributions || lastPost.newPost;
  const allWarnings = [
    ...new Set(
      props.posts
        .flatMap((post) => post.tags?.contentWarnings)
        .filter((x): x is string => x !== undefined)
    ),
  ];
  return (
    <>
      <div className="post-container">
        {hasUpdate && (
          <UpdatesHeader
            newPost={lastPost.newPost}
            newComments={lastPost.newComments}
            newContributions={lastPost.newContributions}
          />
        )}
        <div
          className={classnames("tags content-warnings", {
            hidden: !allWarnings.length,
          })}
        >
          <Tags
            tags={TagsFactory.getTagsFromTagObject({
              indexTags: [],
              categoryTags: [],
              whisperTags: [],
              contentWarnings: allWarnings || [],
            })}
            getOptionsForTag={lastPost.getOptionsForTag}
            packBottom
          />
        </div>
        <Card>
          <Card.Header>
            <div className="header"></div>
          </Card.Header>
          <Card.Footer>
            <div className="footer"></div>
          </Card.Footer>
          {props.posts.map((post, index) => {
            const isLast = index == props.posts.length - 1;
            const tags = {
              ...post.tags,
              contentWarnings: [],
              indexTags: isLast ? post.tags?.indexTags : [],
              categoryTags: isLast ? post.tags?.categoryTags : [],
            };
            const newPost = {
              ...post,
              tags,
            };
            return (
              <div className="post-separator" key={post.id || index}>
                {
                  // @ts-ignore
                  <Post
                    {...newPost}
                    menuOptions={isLast ? newPost.menuOptions : undefined}
                    hideFooter={!isLast}
                    hideUpdates
                    backgroundColor={isLast ? undefined : "transparent"}
                    ref={index === 0 ? props.innerRef : undefined}
                    forceHideIdentity={props.forceHideIdentity}
                  />
                }
              </div>
            );
          })}
        </Card>
      </div>
      <style jsx>{`
        .header {
          padding: 0;
        }
        .post-container {
          position: relative;
          max-width: 100%;
          width: ${getPostWidth(PostSizes.REGULAR)}px;
        }
        .footer {
          padding: 0;
        }
        .post-separator:first-child {
          border-radius: ${Theme.BORDER_RADIUS_REGULAR}
            ${Theme.BORDER_RADIUS_REGULAR} 0px 0px;
        }
        .post-separator:not(:last-child) {
          border-bottom: 4px dashed ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
          background-color: #e6e6e6;
        }
        .tags {
          padding: 0 10px;
          text-align: left;
        }
        .content-warnings {
          display: flex;
          align-items: flex-end;
          position: relative;
        }
        .content-warnings.hidden {
          display: none;
        }
      `}</style>
    </>
  );
};

const ForwardedCompactThread = React.forwardRef<
  PostHandler,
  CompactThreadProps
>((props, ref) => <CompactThread {...props} innerRef={ref} />);

export default ForwardedCompactThread;

export interface CompactThreadProps {
  posts: PostProps[];
  innerRef?: React.Ref<PostHandler>;
  forceHideIdentity?: boolean;
}
