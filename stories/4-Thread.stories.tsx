import React from "react";
import ThreadIndent from "../src/post/ThreadIndent";
import CollapsedPlaceholder from "../src/thread/CollapsedPlaceholder";
import Thread, { Indent, CollapseGroup } from "../src/thread/NewThread";
import CompactThreadIndent, {
  useIndent,
} from "../src/post/CompactThreadIndent";
import Post, { PostSizes } from "../src/post/Post";

import Theme from "../src/theme/default";

import oncelerAvatar from "./images/oncie.jpg";
import greedlerAvatar from "./images/greedler.jpg";
import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";
import hannibalAvatar from "./images/hannibal.png";
import CommentChain from "../src/post/CommentChain";
import { CommentHandler } from "index";
import { action } from "@storybook/addon-actions";

export default {
  title: "Thread Preview",
  component: ThreadIndent,
};

export const RegularThread = () => {
  return (
    <div
      style={{
        marginLeft: "100px",
        backgroundColor: Theme.LAYOUT_BOARD_BACKGROUND_COLOR,
      }}
    >
      <ThreadIndent level={0}>
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <Post
            createdTime="2019/05/14 at 7:34pm"
            text={
              '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
            }
            secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
            userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
            onNewContribution={() => console.log("click!")}
            onNewComment={() => console.log("click!")}
            newComments={3}
            newContributions={5}
          />
        </div>
      </ThreadIndent>
      <ThreadIndent level={1}>
        <div style={{ paddingTop: "15px", opacity: 0.7 }}>
          <Post
            createdTime="2019/05/14 at 7:34pm"
            text={
              '[{"insert":{"block-image":"https://si.wsj.net/public/resources/images/BN-GA217_legola_G_20141215080444.jpg"}}, {"attributes":{"italic":true}, "insert":"...and my bow..."}]'
            }
            secretIdentity={{
              name: "Nice Therapist",
              avatar: `/${hannibalAvatar}`,
            }}
            userIdentity={{
              name: "xXxChesapeakeRipperxXx",
              avatar: `/${hannibalAvatar}`,
            }}
            onNewContribution={() => console.log("click!")}
            onNewComment={() => console.log("click!")}
            size={PostSizes.WIDE}
            collapsed
          />
        </div>
      </ThreadIndent>
      <ThreadIndent
        level={2}
        ends={[{ level: 1, onClick: () => console.log("click1") }]}
      >
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <Post
            createdTime="2019/05/14 at 7:34pm"
            text={
              '[{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691401632940032040/AbJqbbOwrc74AAAAAElFTkSuQmCC.png"}}]'
            }
            secretIdentity={{
              name: "Bad Guy",
              avatar: `/${greedlerAvatar}`,
            }}
            onNewContribution={() => console.log("click!")}
            onNewComment={() => console.log("click!")}
            muted
            answerable
          />
        </div>
      </ThreadIndent>
      <ThreadIndent level={1}>
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <Post
            createdTime="2019/05/14 at 7:34pm"
            text={
              '[{"insert":{"block-image":"https://si.wsj.net/public/resources/images/BN-GA217_legola_G_20141215080444.jpg"}}, {"attributes":{"italic":true}, "insert":"...and my bow..."}]'
            }
            secretIdentity={{
              name: "Nice Therapist",
              avatar: `/${hannibalAvatar}`,
            }}
            userIdentity={{
              name: "xXxChesapeakeRipperxXx",
              avatar: `/${hannibalAvatar}`,
            }}
            onNewContribution={() => console.log("click!")}
            onNewComment={() => console.log("click!")}
          />
        </div>
      </ThreadIndent>
      <ThreadIndent level={2}>
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <Post
            createdTime="2019/05/14 at 7:34pm"
            text={
              '[{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691401632940032040/AbJqbbOwrc74AAAAAElFTkSuQmCC.png"}}]'
            }
            secretIdentity={{
              name: "Bad Guy",
              avatar: `/${greedlerAvatar}`,
            }}
            onNewContribution={() => console.log("click!")}
            onNewComment={() => console.log("click!")}
          />
        </div>
      </ThreadIndent>
      <ThreadIndent
        level={3}
        ends={[
          {
            level: 0,
            onBeamUpClick: () => console.log("click0"),
            onAddContributionClick: () => console.log("click0"),
          },
          {
            level: 1,
            onBeamUpClick: () => console.log("click1"),
            onAddContributionClick: () => console.log("click1"),
          },
          {
            level: 2,
            onBeamUpClick: () => console.log("click2"),
            onAddContributionClick: () => console.log("click2"),
          },
        ]}
      >
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <Post
            createdTime="2019/05/14 at 7:34pm"
            text={
              '[{"insert":{"block-image":"https://littlelessonslearned.files.wordpress.com/2012/03/the-lorax-pic091.jpg"}}]'
            }
            secretIdentity={{
              name: "Bad Guy",
              avatar: `/${greedlerAvatar}`,
            }}
            onNewContribution={() => console.log("click!")}
            onNewComment={() => console.log("click!")}
          />
        </div>
      </ThreadIndent>
    </div>
  );
};

RegularThread.story = {
  name: "regular",
};

export const ShortContent = () => {
  return (
    <div
      style={{
        marginLeft: "100px",
        backgroundColor: Theme.LAYOUT_BOARD_BACKGROUND_COLOR,
      }}
    >
      <ThreadIndent level={0}>
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <Post
            createdTime="2019/05/14 at 7:34pm"
            text={
              '[{"insert":"Open RP"}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
            }
            secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
            userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
            onNewContribution={() => console.log("click!")}
            onNewComment={() => console.log("click!")}
            newComments={3}
            newContributions={5}
          />
        </div>
      </ThreadIndent>
      <ThreadIndent level={1}>
        <div style={{ paddingTop: "15px", opacity: 0.7 }}>
          <Post
            createdTime="2019/05/14 at 7:34pm"
            text={
              '[{"attributes":{"italic":true}, "insert":"...and my bow..."}]'
            }
            secretIdentity={{
              name: "Nice Therapist",
              avatar: `/${hannibalAvatar}`,
            }}
            userIdentity={{
              name: "xXxChesapeakeRipperxXx",
              avatar: `/${hannibalAvatar}`,
            }}
            onNewContribution={() => console.log("click!")}
            onNewComment={() => console.log("click!")}
          />
        </div>
      </ThreadIndent>
    </div>
  );
};

ShortContent.story = {
  name: "short content (flex)",
};

export const ThreadedComments = () => {
  const lvl0Indent = useIndent();
  const lvl1Indent = useIndent();
  const lvl1p2Indent = useIndent();
  const lvl2Indent = useIndent();
  const lvl3Indent = useIndent();
  const lvl1p3Indent = useIndent();

  return (
    <div
      style={{
        marginLeft: "100px",
        backgroundColor: "Theme.LAYOUT_BOARD_BACKGROUND_COLOR",
      }}
    >
      <CompactThreadIndent level={0} startsFromViewport={lvl0Indent.bounds}>
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <CommentChain
            ref={(ref) => lvl0Indent.setHandler(ref)}
            comments={[
              {
                id: "1",
                text:
                  '[{"insert": "[LVL 0] I mean, sure, but you know what also is great?"}]',
              },
              {
                id: "2",
                text: '[{"insert": "Deze nuts."}]',
              },
              {
                id: "3",
                text: '[{"insert": "Wait is that how you type it?"}]',
              },
            ]}
            secretIdentity={{
              name: "Tuxedo Mask",
              avatar: `/${tuxedoAvatar}`,
            }}
            userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
          />
        </div>
        <CompactThreadIndent level={1} startsFromViewport={lvl1Indent.bounds}>
          <div style={{ paddingTop: "15px", opacity: 1 }}>
            <CommentChain
              ref={(ref) => lvl1Indent.setHandler(ref)}
              comments={[
                {
                  id: "1",
                  text:
                    '[{"insert": "[LVL 1]I mean, sure, but you know what also is great?"}]',
                },
                {
                  id: "2",
                  text: '[{"insert": "Deze nuts."}]',
                },
                {
                  id: "3",
                  text: '[{"insert": "Wait is that how you type it?"}]',
                },
              ]}
              secretIdentity={{
                name: "Tuxedo Mask",
                avatar: `/${tuxedoAvatar}`,
              }}
              userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
            />
            <CommentChain
              ref={(ref) => lvl1p2Indent.setHandler(ref)}
              comments={[
                {
                  id: "1",
                  text:
                    '[{"insert": "[LVL 1]I mean, sure, but you know what also is great?"}]',
                },
                {
                  id: "2",
                  text: '[{"insert": "Deze nuts."}]',
                },
                {
                  id: "3",
                  text: '[{"insert": "Wait is that how you type it?"}]',
                },
              ]}
              secretIdentity={{
                name: "Tuxedo Mask",
                avatar: `/${tuxedoAvatar}`,
              }}
              userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
            />
          </div>{" "}
          <CompactThreadIndent level={2} startsFromViewport={lvl2Indent.bounds}>
            <div style={{ paddingTop: "15px", opacity: 1 }}>
              <CommentChain
                ref={(ref) => lvl2Indent.setHandler(ref)}
                comments={[
                  {
                    id: "1",
                    text:
                      '[{"insert": "[LVL2] I mean, sure, but you know what also is great?"}]',
                  },
                  {
                    id: "2",
                    text: '[{"insert": "Deze nuts."}]',
                  },
                  {
                    id: "3",
                    text: '[{"insert": "Wait is that how you type it?"}]',
                  },
                ]}
                secretIdentity={{
                  name: "Tuxedo Mask",
                  avatar: `/${tuxedoAvatar}`,
                }}
                userIdentity={{
                  name: "SexyDaddy69",
                  avatar: `/${mamoruAvatar}`,
                }}
              />
            </div>
            <CompactThreadIndent
              level={3}
              startsFromViewport={lvl3Indent.bounds}
            >
              <CommentChain
                ref={(ref: CommentHandler | null) => lvl3Indent.setHandler(ref)}
                comments={[
                  {
                    id: "1",
                    text:
                      '[{"insert": "[LVL3] I mean, sure, but you know what also is great?"}]',
                  },
                  {
                    id: "2",
                    text: '[{"insert": "Deze nuts."}]',
                  },
                  {
                    id: "3",
                    text: '[{"insert": "Wait is that how you type it?"}]',
                  },
                ]}
                secretIdentity={{
                  name: "Tuxedo Mask",
                  avatar: `/${tuxedoAvatar}`,
                }}
                userIdentity={{
                  name: "SexyDaddy69",
                  avatar: `/${mamoruAvatar}`,
                }}
              />
            </CompactThreadIndent>
          </CompactThreadIndent>
        </CompactThreadIndent>

        <CompactThreadIndent level={1} startsFromViewport={lvl1p3Indent.bounds}>
          <div style={{ paddingTop: "15px", opacity: 1 }}>
            <CommentChain
              ref={(ref) => lvl1p3Indent.setHandler(ref)}
              comments={[
                {
                  id: "1",
                  text:
                    '[{"insert": "[LVL1] I mean, sure, but you know what also is great?"}]',
                },
                {
                  id: "2",
                  text: '[{"insert": "Deze nuts."}]',
                },
                {
                  id: "3",
                  text: '[{"insert": "Wait is that how you type it?"}]',
                },
              ]}
              secretIdentity={{
                name: "Tuxedo Mask",
                avatar: `/${tuxedoAvatar}`,
              }}
              userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
            />
          </div>
        </CompactThreadIndent>
      </CompactThreadIndent>
    </div>
  );
};

ThreadedComments.story = {
  name: "comments",
};

const TUXEDO_MASK_IDENTITY = {
  name: "Tuxedo Mask",
  avatar: `/${tuxedoAvatar}`,
};
const MAMORU_IDENTITY = { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` };
export const SingleThreadedComments = () => {
  const lvl0Indent = useIndent();

  return (
    <div
      style={{
        marginLeft: "100px",
        backgroundColor: "Theme.LAYOUT_BOARD_BACKGROUND_COLOR",
      }}
    >
      <CompactThreadIndent level={0} startsFromViewport={lvl0Indent.bounds}>
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <CommentChain
            ref={(ref) => lvl0Indent.setHandler(ref)}
            comments={React.useMemo(
              () => [
                {
                  id: "1",
                  text:
                    '[{"insert": "[LVL 0] I mean, sure, but you know what also is great?"}]',
                },
                {
                  id: "2",
                  text: '[{"insert": "Deze nuts."}]',
                },
                {
                  id: "3",
                  text: '[{"insert": "Wait is that how you type it?"}]',
                },
              ],
              []
            )}
            secretIdentity={TUXEDO_MASK_IDENTITY}
            userIdentity={MAMORU_IDENTITY}
          />
        </div>
      </CompactThreadIndent>
    </div>
  );
};

export const CollapsePlaceholderStory = () => {
  return (
    <div style={{ maxWidth: "500px" }}>
      <CollapsedPlaceholder onUncollapseClick={action("uncollapse")}>
        <div>
          5 comments <span style={{ color: "green" }}>manually hidden</span>.
          Reason:{" "}
          <em>
            people started talking about Coffee Shop AUs, which disgust me.
          </em>
        </div>
      </CollapsedPlaceholder>
    </div>
  );
};

export const NewThreadStory = () => {
  const [collapsed, setCollapsed] = React.useState<string[]>([
    "level-2,1",
    "cg-1",
  ]);
  return (
    <div className="container">
      <Thread
        onCollapseLevel={(levelId) => {
          if (!collapsed.includes(levelId)) {
            const newCollapsed = [...collapsed];
            newCollapsed.push(levelId);
            setCollapsed(newCollapsed);
          }
        }}
        onUncollapseLevel={(levelId) => {
          console.log(levelId);
          if (collapsed.includes(levelId)) {
            const newCollapsed = collapsed.filter((level) => level != levelId);
            setCollapsed(newCollapsed);
          }
        }}
        getCollapseReason={(levelId) => {
          return <div>Subthread manually hidden.</div>;
        }}
      >
        <div className="fake-post">This is the main post</div>
        <Indent id="level-1" collapsed={collapsed.includes("level-1")}>
          <div className="fake-post">This is its first child</div>
          <Indent id="level-2,1" collapsed={collapsed.includes("level-2,1")}>
            <div className="fake-post">This is (1,1)</div>
            <div className="fake-post">This is (1,2)</div>
            <div className="fake-post">This is (1,3)</div>
          </Indent>
          <div className="fake-post">This is its second child</div>
          <CollapseGroup id="cg-1" collapsed={collapsed.includes("cg-1")}>
            <div className="fake-post">This is its third child</div>
            <div className="fake-post">This is its fourth child</div>
            <Indent id="level-4,1" collapsed={collapsed.includes("level-4,1")}>
              <div className="fake-post">This is (4,1)</div>
              <Indent
                id="level-4,1,1"
                collapsed={collapsed.includes("level-4,1,1")}
              >
                <div className="fake-post">This is (4,1,1)</div>
              </Indent>
            </Indent>
            <div className="fake-post">This is its fifth child</div>
            <div className="fake-post">This is its sixth child</div>
            <div className="fake-post">This is its seventh child</div>
          </CollapseGroup>
          <div className="fake-post">This is its eight child</div>
          <div className="fake-post">This is its ninth child</div>
          <Indent id="level-9,2" collapsed={collapsed.includes("level-9,2")}>
            <div className="fake-post">This is (9,1)</div>
            <Indent id="level-9,1" collapsed={collapsed.includes("level-9,1")}>
              <div className="fake-post">This is (9,1,1)</div>
              <div className="fake-post">This is (9,1,2)</div>
            </Indent>
          </Indent>
        </Indent>
      </Thread>
      <style jsx>{`
        .container {
          max-width: 500px;
        }
        .fake-post {
          background-color: white;
          max-width: 500px;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        .fake-post:hover {
          background-color: red;
        }
      `}</style>
    </div>
  );
};
