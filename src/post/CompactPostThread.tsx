import { HeaderContent, PostData, PostProps } from "./Post";
import { LinkWithAction, TagsListType } from "types";
import PostPreamble, { PostBadges } from "./PostPreamble";

import Card from "common/Card";
import Editor from "@bobaboard/boba-editor";
import Footer from "./Footer";
import { PostHandler } from "../index";
import React from "react";
import Tags from "tags/Tags";
import TagsFactory from "tags/TagsFactory";
import Theme from "theme/default";
import TinyHeader from "./TinyHeader";
import classnames from "classnames";
import css from "styled-jsx/css";
import { useExpand } from "utils/useExpand";

const { styles: footerStyles, className: footerClassName } = css.resolve`
  footer.with-tags {
    border-top: 1px dotted rgba(0, 0, 0, 0.3);
  }
  footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  footer.interstitial {
    padding: 5px 12px;
  }

  footer.interstial:not(.with-tags) {
    padding-top: 0;
  }
`;

const { styles: headerStyles, className: headerClassName } = css.resolve`
  header {
    background-color: #dddddd;
  }
  .badges {
    bottom: 0;
  }
`;

const hasFooterTags = (post: PostData) => {
  return (
    !!post.tags?.categoryTags?.length ||
    !!post.tags?.indexTags?.length ||
    !!post.tags?.whisperTags?.length
  );
};

// TODO: make this only include posts that aren't marked as being new
const PreviousContent = (props: CompactThreadProps) => {
  const innerPosts = props.posts.slice(0, props.posts.length - 1);
  const container = React.useRef<HTMLDivElement>(null);
  const clicker = useExpand(container, {
    compactHeight: 350,
  });
  return (
    <div className={classnames("previous-content")} ref={container}>
      {innerPosts.map((post, index) => {
        const whisperTags: TagsListType = {
          whisperTags: post.tags?.whisperTags ?? [],
          contentWarnings: [],
          indexTags: [],
          categoryTags: [],
        };
        return (
          <article key={post.id || index}>
            {index > 0 && (
              // Do not show the header on the first post as that's taken care of by
              // the card itself
              <header>
                <PostBadges
                  {...post}
                  className={classnames("badges", headerClassName)}
                />
                <TinyHeader {...post} />
              </header>
            )}
            <Editor
              initialText={JSON.parse(post.text)}
              editable={false}
              onEmbedLoaded={props.onEmbedLoaded}
            />
            <footer
              className={classnames(footerClassName, "interstitial", {
                "with-tags": hasFooterTags(post),
              })}
            >
              {hasFooterTags(post) && (
                <Tags
                  tags={TagsFactory.getTagsFromTagObject(whisperTags)}
                  getOptionsForTag={props.getOptionsForTag}
                />
              )}
              <Footer
                onContribution={props.onNewContribution}
                onComment={props.onNewComment}
                totalContributions={post.totalContributions}
                directContributions={post.directContributions}
                totalComments={post.totalComments}
                newContributions={post.newContributions}
                newComments={post.newComments}
                notesLink={post.createdTimeLink}
              />
            </footer>
          </article>
        );
      })}
      {clicker}
      <style jsx>{`
        .previous-content {
          position: relative;
          background-color: #dddddd;
        }
        .previous-content[data-shrunk] {
          filter: grayscale(0.6);
        }
        article + article {
          padding-top: 3px;
          border-top: 4px dashed ${Theme.LAYOUT_BOARD_BACKGROUND_COLOR};
        }
        article header {
          position: relative;
        }
      `}</style>
    </div>
  );
};

const CompactThread: React.FC<CompactThreadProps> = (props) => {
  const lastPost = props.posts[props.posts.length - 1];

  return (
    <>
      <article>
        <PostPreamble
          {...props}
          {...props.posts[0]}
          tags={React.useMemo(
            () => ({
              indexTags: [],
              categoryTags: [],
              whisperTags: [],
              contentWarnings: [
                ...new Set(
                  props.posts
                    .flatMap((post) => post.tags?.contentWarnings)
                    .filter((x): x is string => x !== undefined)
                ),
              ],
            }),
            [props.posts]
          )}
        />
        <Card>
          <Card.Header className={classnames(headerClassName)}>
            <HeaderContent {...props} {...props.posts[0]} />
          </Card.Header>
          <Card.Content>
            <PreviousContent {...props} />
            <article key={lastPost.id || props.posts.length}>
              <header>
                <PostBadges {...lastPost} />
                <TinyHeader {...lastPost} />
              </header>
              <Editor
                initialText={JSON.parse(lastPost.text)}
                editable={false}
                onEmbedLoaded={props.onEmbedLoaded}
              />
            </article>
          </Card.Content>
          <Card.Footer
            className={classnames(footerClassName, {
              "with-tags": hasFooterTags(lastPost),
            })}
          >
            <Tags
              tags={TagsFactory.getTagsFromTagObject({
                whisperTags: lastPost.tags?.whisperTags ?? [],
                categoryTags: lastPost.tags?.categoryTags ?? [],
                indexTags: lastPost.tags?.indexTags ?? [],
                contentWarnings: [],
              })}
              getOptionsForTag={props.getOptionsForTag}
            />
            <Footer
              onContribution={props.onNewContribution}
              onComment={props.onNewComment}
              totalContributions={lastPost.totalContributions}
              directContributions={lastPost.directContributions}
              totalComments={lastPost.totalComments}
              newContributions={lastPost.newContributions}
              newComments={lastPost.newComments}
              notesLink={props.notesLink}
              allowsContribution={props.allowsContribution}
              allowsComment={props.allowsComment}
            />
          </Card.Footer>
        </Card>
      </article>
      <style jsx>{`
        article {
          position: relative;
          max-width: 100%;
          width: ${Theme.POST_WIDTH_PX}px;
        }
        article article header {
          position: relative;
        }
      `}</style>
      {headerStyles}
      {footerStyles}
    </>
  );
};

const ForwardedCompactThread = React.forwardRef<
  PostHandler,
  CompactThreadProps
>((props, ref) => <CompactThread {...props} innerRef={ref} />);

export default ForwardedCompactThread;

export interface CompactThreadProps extends Omit<PostProps, keyof PostData> {
  posts: PostData[];
  innerRef?: React.Ref<PostHandler>;
  forceHideIdentity?: boolean;
  notesLink: LinkWithAction;
}
