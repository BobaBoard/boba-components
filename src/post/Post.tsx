import React from "react";

import UpdatesHeader from "./UpdatesHeader";
import Header, { HeaderStyle } from "./Header";
import Footer from "./Footer";
import Tags from "./Tags";
import DropdownListMenu from "../common/DropdownListMenu";
import Card from "../common/Card";
import Button from "../common/Button";
import Reaction from "../common/Reaction";
import Editor from "@bobaboard/boba-editor";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Theme from "../theme/default";

export const modes = {
  VIEW: "VIEW",
  CREATE: "CREATE",
};

export enum PostSizes {
  REGULAR,
  WIDE,
}

export const getPostWidth = (size?: PostSizes) => {
  switch (size) {
    case PostSizes.WIDE:
      return 850;
    case PostSizes.REGULAR:
    default:
      return 550;
  }
};

const COLLAPSED_HEIGHT = 150;

const Post: React.FC<PostProps> = (props) => {
  const hasUpdate =
    props.newComments || props.newContributions || props.newPost;
  return (
    <>
      <div
        className={classnames("post-container", { centered: props.centered })}
      >
        {hasUpdate && (
          <UpdatesHeader
            newPost={props.newPost}
            newComments={props.newComments}
            newContributions={props.newContributions}
          />
        )}
        <Card
          height={props.collapsed ? COLLAPSED_HEIGHT : undefined}
          header={
            <div className="header">
              {props.menuOptions && (
                <div style={{ float: "right" }}>
                  <DropdownListMenu options={props.menuOptions}>
                    <Button icon={faEllipsisV} compact>
                      Open Menu
                    </Button>
                  </DropdownListMenu>
                </div>
              )}
              <Header
                secretIdentity={props.secretIdentity}
                userIdentity={props.userIdentity}
                createdMessage={`${props.createdTime}`}
                size={HeaderStyle.REGULAR}
              />
            </div>
          }
          footer={
            <div
              className={classnames("footer", {
                "with-reactions": !!props.reactions?.length,
              })}
            >
              <Tags tags={props.tags?.whisperTags || []} />
              <div className="notes">
                <Footer
                  onContribution={() => props.onNewContribution()}
                  onComment={() => props.onNewComment()}
                  totalContributions={props.totalContributions}
                  directContributions={props.directContributions}
                  totalComments={props.totalComments}
                  newContributions={props.newContributions}
                  newComments={props.newComments}
                  onOpenClick={props.onNotesClick}
                  notesUrl={props.notesUrl}
                  answerable={props.answerable}
                />
              </div>
              {!!props.reactable && (
                <div className="reactions">
                  {props.reactions?.map((reaction) => (
                    <div className="reaction">
                      <Reaction image={reaction.image} count={reaction.count} />
                    </div>
                  ))}
                  <div className="add-reaction">
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
              )}
            </div>
          }
        >
          <Editor
            initialText={JSON.parse(props.text)}
            editable={false}
            focus={props.focus || false}
            onSubmit={() => {
              /*no-op*/
            }}
            onTextChange={(text: any) => {
              /*no-op*/
            }}
          />
        </Card>
      </div>
      <style jsx>{`
        .header {
          border-radius: ${Theme.BORDER_RADIUS_REGULAR}
            ${Theme.BORDER_RADIUS_REGULAR} 0px 0px;
          background-color: ${Theme.POST_BACKGROUND_COLOR};
          padding: 10px;
        }
        .post-container {
          width: ${getPostWidth(props.size)}px;
          max-width: 100%;
        }
        .post-container.centered {
          margin: 0 auto;
        }
        .footer {
          position: relative;
        }
        .footer.with-reactions {
          padding-bottom: 10px;
        }
        .add-reaction {
          background-color: rgb(28, 28, 28);
          height: 25px;
          width: 25px;
          border-radius: 50%;
          text-align: center;
          line-height: 25px;
          margin-top: 5px;
        }
        .add-reaction:hover {
          cursor: pointer;
        }
        .add-reaction :global(svg) {
          color: white;
        }
        .notes {
          padding: 15px;
          padding-top: 10px;
        }
        .reactions {
          display: flex;
          position: absolute;
          right: 17px;
          bottom: -20px;
        }
        .reaction {
          margin-right: 5px;
        }
      `}</style>
    </>
  );
};

export default Post;

export interface PostProps {
  mode?: string;
  focus?: boolean;
  editable?: boolean;
  answerable?: boolean;
  text: string;
  createdTime: string;
  secretIdentity: {
    avatar: string;
    name: string;
  };
  userIdentity?: {
    avatar: string;
    name: string;
  };
  tags?: {
    whisperTags: string[];
  };
  reactions?: {
    image: string;
    count: number;
  }[];
  size?: PostSizes;
  newPost?: boolean;
  totalContributions?: number;
  directContributions?: number;
  newContributions?: number;
  totalComments?: number;
  newComments?: number;
  onNewContribution: () => void;
  onNewComment: () => void;
  collapsed?: boolean;
  onNotesClick: () => void;
  notesUrl: string;
  centered?: boolean;
  reactable?: boolean;
  menuOptions?: {
    name: string;
    onClick: () => void;
  }[];
}
