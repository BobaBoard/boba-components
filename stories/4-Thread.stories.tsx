import React from "react";
import ThreadIndent from "../src/post/ThreadIndent";
import CollapsedPlaceholder from "../src/thread/CollapsedPlaceholder";
import Thread, { CollapseGroup } from "../src/thread/NewThread";
import NewCommentsThread from "../src/thread/NewCommentsThread";
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
import {
  faAngleDoubleUp,
  faBellSlash,
  faCompressArrowsAlt,
  faMapPin,
  faPaintBrush,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

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
                  text:
                    '[{"attributes": {"inline-spoilers": true}, "insert": "Deze nuts."}]',
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
    <div style={{ maxWidth: "500px", textAlign: "center" }}>
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
  const [spacerPadding, setSpacerPadding] = React.useState(25);

  // In real usage, indents will sometimes be wrapped within components, and they should
  // continue working anyway.
  const WrappedIndents = (props: {
    name: string;
    children?: React.ReactNode;
  }) => {
    return (
      <Thread.Item>
        <div className="fake-post">This is ({props.name})</div>
        <Thread.Indent
          id={`level-9,2,${props.name}`}
          collapsed={collapsed.includes(`level-9,2,${props.name}`)}
        >
          <Thread.Item>
            <div className="fake-post wrapped">This is ({props.name},1)</div>
            <Thread.Indent
              id={`level-9,2,1,${props.name}`}
              collapsed={collapsed.includes(`level-9,2,1,${props.name}`)}
            >
              <Thread.Item>
                <div className="fake-post wrapped">
                  This is ({props.name},1,1)
                </div>
              </Thread.Item>
              <Thread.Item>
                <div className="fake-post wrapped">
                  This is ({props.name},1,2)
                </div>
              </Thread.Item>
              {props.children}
            </Thread.Indent>
          </Thread.Item>
          <Thread.Item>
            <div className="fake-post wrapped">This is ({props.name},2)</div>
          </Thread.Item>
        </Thread.Indent>
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
      </Thread.Item>
    );
  };
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
        getCollapseReason={() => {
          return <div>Subthread manually hidden.</div>;
        }}
        getStemOptions={(levelId) => {
          return [
            {
              name: "Collapse",
              icon: faCompressArrowsAlt,
              link: {
                onClick: () => {
                  if (!levelId) {
                    return;
                  }
                  if (!collapsed.includes(levelId)) {
                    const newCollapsed = [...collapsed];
                    newCollapsed.push(levelId);
                    setCollapsed(newCollapsed);
                  }
                },
              },
            },
            {
              name: "Beam up",
              icon: faAngleDoubleUp,
              link: {
                href: "#href",
                onClick: action("noHrefClick"),
              },
            },
            {
              name: "Add Contrib",
              icon: faPlusSquare,
              link: {
                onClick: action("noHrefClick"),
              },
            },
          ];
        }}
      >
        {(setBoundaryElement) => (
          <>
            <div
              style={{
                paddingTop: spacerPadding + "px",
                marginLeft: "25px",
                backgroundColor: "aqua",
              }}
            >
              This should not be included in the stem length
              <button onClick={() => setSpacerPadding(spacerPadding + 10)}>
                Increase
              </button>
              <button onClick={() => setSpacerPadding(spacerPadding - 10)}>
                Decrease
              </button>
            </div>
            <div className="fake-post" ref={(div) => setBoundaryElement(div)}>
              This is the main post
            </div>
            <Thread.Indent
              id="level-1"
              collapsed={collapsed.includes("level-1")}
            >
              <Thread.Item>
                {(setBoundaryElement) => (
                  <>
                    <div
                      style={{
                        paddingTop: spacerPadding + "px",
                        marginLeft: "25px",
                        backgroundColor: "aqua",
                      }}
                    >
                      This should not be included in the stem length
                      <button
                        onClick={() => setSpacerPadding(spacerPadding + 10)}
                      >
                        Increase
                      </button>
                      <button
                        onClick={() => setSpacerPadding(spacerPadding - 10)}
                      >
                        Decrease
                      </button>
                    </div>
                    <div
                      ref={(div) => setBoundaryElement(div)}
                      className="fake-post"
                    >
                      This is its first child
                    </div>
                    <Thread.Indent
                      id="level-1,1"
                      collapsed={collapsed.includes("level-1,1")}
                    >
                      <Thread.Item>
                        <div className="fake-post">This is (1,1)</div>
                      </Thread.Item>
                      <Thread.Item>
                        <div style={{ pointerEvents: "none" }}>
                          <div className="fake-post">This is (1,2)</div>
                          <div
                            style={{ marginLeft: "15px" }}
                            className="fake-post"
                          >
                            This one has an element with a margin and so the
                            container needs `pointer-events: none`;
                          </div>
                        </div>
                      </Thread.Item>
                      <Thread.Item>
                        <div className="fake-post">This is (1,3)</div>
                      </Thread.Item>
                    </Thread.Indent>
                  </>
                )}
              </Thread.Item>
              <Thread.Item>
                <div className="fake-post">This is its second child</div>
              </Thread.Item>
              <CollapseGroup id="cg-1" collapsed={collapsed.includes("cg-1")}>
                <Thread.Item>
                  <div className="fake-post">This is its third child</div>
                </Thread.Item>
                <Thread.Item>
                  <div className="fake-post">This is its fourth child</div>
                  <Thread.Indent
                    id="level-4,1"
                    collapsed={collapsed.includes("level-4,1")}
                  >
                    <Thread.Item>
                      <div className="fake-post">This is (4,1)</div>
                      <Thread.Indent
                        id="level-4,1,1"
                        collapsed={collapsed.includes("level-4,1,1")}
                      >
                        <Thread.Item>
                          <div className="fake-post">This is (4,1,1)</div>
                        </Thread.Item>
                      </Thread.Indent>
                    </Thread.Item>
                    <Thread.Item>
                      <div className="fake-post">This is (4,2)</div>
                    </Thread.Item>
                  </Thread.Indent>
                </Thread.Item>
                <Thread.Item>
                  <div className="fake-post">This is its fifth child</div>
                </Thread.Item>
                <Thread.Item>
                  <div className="fake-post">This is its sixth child</div>
                </Thread.Item>
                <Thread.Item>
                  <div className="fake-post">This is its seventh child</div>
                </Thread.Item>
              </CollapseGroup>
              <Thread.Item>
                <div className="fake-post">This is its eight child</div>
              </Thread.Item>
              <WrappedIndents name="9">
                <WrappedIndents name="9,1,3" />
              </WrappedIndents>
            </Thread.Indent>
          </>
        )}
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

export const NewRegularThread = () => {
  const lvl0Indent = useIndent();
  return (
    <div
      style={{
        marginLeft: "100px",
        backgroundColor: Theme.LAYOUT_BOARD_BACKGROUND_COLOR,
      }}
    >
      <Thread
        onCollapseLevel={(levelId) => {}}
        onUncollapseLevel={(levelId) => {}}
        getCollapseReason={() => {
          return <div>Subthread manually hidden.</div>;
        }}
        getStemOptions={(levelId) => {
          return [
            {
              name: "Collapse",
              icon: faCompressArrowsAlt,
              link: {
                onClick: () => {},
              },
            },
            {
              name: "Beam up",
              icon: faAngleDoubleUp,
              link: {
                href: "#href",
                onClick: action("noHrefClick"),
              },
            },
            {
              name: "Add Contrib",
              icon: faPlusSquare,
              link: {
                onClick: action("noHrefClick"),
              },
            },
          ];
        }}
      >
        {(setBoundaryElement) => (
          <>
            <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
              <Post
                createdTime="2019/05/14 at 7:34pm"
                text={
                  '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]'
                }
                secretIdentity={{
                  name: "Tuxedo Mask",
                  avatar: `/${tuxedoAvatar}`,
                }}
                userIdentity={{
                  name: "SexyDaddy69",
                  avatar: `/${mamoruAvatar}`,
                }}
                onNewContribution={() => console.log("click!")}
                onNewComment={() => console.log("click!")}
                newComments={3}
                newContributions={5}
                ref={(ref) =>
                  setBoundaryElement(ref?.avatarRef?.current || null)
                }
              />
            </div>
            <Thread.Indent id="level-1">
              <Thread.Item>
                {(setBoundaryElement) => (
                  <>
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
                        ref={(ref) =>
                          setBoundaryElement(ref?.avatarRef?.current || null)
                        }
                      />
                    </div>
                    <Thread.Indent id="level1-1">
                      <Thread.Item>
                        <div
                          style={{
                            paddingTop: "15px",
                            marginLeft: "30px",
                            maxWidth: "550px",
                            pointerEvents: "none",
                          }}
                        >
                          <CompactThreadIndent
                            level={0}
                            startsFromViewport={lvl0Indent.bounds}
                          >
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
                                    text:
                                      '[{"attributes": {"inline-spoilers": true}, "insert": "Deze nuts."}]',
                                  },
                                  {
                                    id: "3",
                                    text:
                                      '[{"insert": "Wait is that how you type it?"}]',
                                  },
                                ],
                                []
                              )}
                              secretIdentity={TUXEDO_MASK_IDENTITY}
                              userIdentity={MAMORU_IDENTITY}
                            />
                          </CompactThreadIndent>
                        </div>
                      </Thread.Item>
                      <Thread.Item>
                        {(setBoundaryElement) => (
                          <>
                            <div
                              style={{ paddingTop: "15px", maxWidth: "550px" }}
                            >
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
                                ref={(ref) =>
                                  setBoundaryElement(
                                    ref?.avatarRef?.current || null
                                  )
                                }
                              />
                            </div>
                          </>
                        )}
                      </Thread.Item>
                    </Thread.Indent>
                  </>
                )}
              </Thread.Item>
              <Thread.Item>
                {(setBoundaryElement) => (
                  <>
                    <div
                      style={{
                        paddingTop: "15px",
                        maxWidth: "550px",
                      }}
                    >
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
                        ref={(ref) =>
                          setBoundaryElement(ref?.avatarRef?.current || null)
                        }
                      />
                    </div>
                    <Thread.Indent id="level1-1-1">
                      <Thread.Item>
                        {(setBoundaryElement) => (
                          <>
                            <div
                              style={{ paddingTop: "15px", maxWidth: "550px" }}
                            >
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
                                ref={(ref) =>
                                  setBoundaryElement(
                                    ref?.avatarRef?.current || null
                                  )
                                }
                              />
                            </div>
                            <Thread.Indent id="level1-1-1">
                              <Thread.Item>
                                {(setBoundaryElement) => (
                                  <div
                                    style={{
                                      paddingTop: "15px",
                                      maxWidth: "550px",
                                    }}
                                  >
                                    <Post
                                      createdTime="2019/05/14 at 7:34pm"
                                      text={
                                        '[{"insert":{"block-image":"https://littlelessonslearned.files.wordpress.com/2012/03/the-lorax-pic091.jpg"}}]'
                                      }
                                      secretIdentity={{
                                        name: "Bad Guy",
                                        avatar: `/${greedlerAvatar}`,
                                      }}
                                      onNewContribution={() =>
                                        console.log("click!")
                                      }
                                      onNewComment={() => console.log("click!")}
                                      ref={(ref) =>
                                        setBoundaryElement(
                                          ref?.avatarRef?.current || null
                                        )
                                      }
                                    />
                                  </div>
                                )}
                              </Thread.Item>
                            </Thread.Indent>
                          </>
                        )}
                      </Thread.Item>
                    </Thread.Indent>
                  </>
                )}
              </Thread.Item>
            </Thread.Indent>
          </>
        )}
      </Thread>
    </div>
  );
};

export const CommentsThread = () => {
  const [additionalComments, setAdditionalComments] = React.useState(0);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginLeft: "100px",
            backgroundColor: "Theme.LAYOUT_BOARD_BACKGROUND_COLOR",
          }}
        >
          <div
            style={{
              height: "70px",
              backgroundColor: "red",
              position: "sticky",
              top: 0,
            }}
          >
            This Div simulates Boba's sticky header
          </div>
          <NewCommentsThread>
            {(setBoundaryElement) => (
              <>
                <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
                  <CommentChain
                    ref={(ref) =>
                      setBoundaryElement(ref?.avatarRef?.current || null)
                    }
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
                    userIdentity={{
                      name: "SexyDaddy69",
                      avatar: `/${mamoruAvatar}`,
                    }}
                  />
                </div>
                <NewCommentsThread.Indent>
                  <NewCommentsThread.Item>
                    {(setBoundaryElement) => (
                      <CommentChain
                        ref={(ref) =>
                          setBoundaryElement(ref?.avatarRef?.current || null)
                        }
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
                            text:
                              '[{"insert": "Wait is that how you type it?"}]',
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
                        onExtraAction={action("extra")}
                      />
                    )}
                  </NewCommentsThread.Item>
                  {additionalComments > 0 && (
                    <NewCommentsThread.Item>
                      {(setBoundaryElement) => (
                        <>
                          <CommentChain
                            ref={(ref) =>
                              setBoundaryElement(
                                ref?.avatarRef?.current || null
                              )
                            }
                            comments={[
                              {
                                id: "1",
                                text:
                                  '[{"insert": "[ADDITIONAL 1]I mean, sure, but you know what also is great?"}]',
                              },
                              {
                                id: "2",
                                text: '[{"insert": "Deze nuts."}]',
                              },
                              {
                                id: "3",
                                text:
                                  '[{"insert": "Wait is that how you type it?"}]',
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
                          {additionalComments > 1 && (
                            <NewCommentsThread.Indent>
                              <NewCommentsThread.Item>
                                {(setBoundaryElement) => (
                                  <>
                                    <CommentChain
                                      ref={(ref) =>
                                        setBoundaryElement(
                                          ref?.avatarRef?.current || null
                                        )
                                      }
                                      comments={[
                                        {
                                          id: "1",
                                          text:
                                            '[{"insert": "[ADDITIONAL 2] I mean, sure, but you know what also is great?"}]',
                                        },
                                        {
                                          id: "2",
                                          text: '[{"insert": "Deze nuts."}]',
                                        },
                                        {
                                          id: "3",
                                          text:
                                            '[{"insert": "Wait is that how you type it?"}]',
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
                                    <NewCommentsThread.Indent>
                                      <NewCommentsThread.Item>
                                        {(setBoundaryElement) => (
                                          <CommentChain
                                            ref={(ref) =>
                                              setBoundaryElement(
                                                ref?.avatarRef?.current || null
                                              )
                                            }
                                            comments={[
                                              {
                                                id: "1",
                                                text:
                                                  '[{"insert": "[ADDITIONAL 2] I mean, sure, but you know what also is great?"}]',
                                              },
                                              {
                                                id: "2",
                                                text:
                                                  '[{"insert": "Deze nuts."}]',
                                              },
                                              {
                                                id: "3",
                                                text:
                                                  '[{"insert": "Wait is that how you type it?"}]',
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
                                            onExtraAction={action("extra")}
                                          />
                                        )}
                                      </NewCommentsThread.Item>
                                    </NewCommentsThread.Indent>
                                  </>
                                )}
                              </NewCommentsThread.Item>
                            </NewCommentsThread.Indent>
                          )}
                        </>
                      )}
                    </NewCommentsThread.Item>
                  )}
                  <NewCommentsThread.Item>
                    {(setBoundaryElement) => (
                      <>
                        <CommentChain
                          ref={(ref) =>
                            setBoundaryElement(ref?.avatarRef?.current || null)
                          }
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
                              text:
                                '[{"insert": "Wait is that how you type it?"}]',
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
                        <NewCommentsThread.Indent>
                          <NewCommentsThread.Item>
                            {(setBoundaryElement) => (
                              <>
                                <CommentChain
                                  ref={(ref) =>
                                    setBoundaryElement(
                                      ref?.avatarRef?.current || null
                                    )
                                  }
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
                                      text:
                                        '[{"insert": "Wait is that how you type it?"}]',
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
                                <NewCommentsThread.Indent>
                                  <NewCommentsThread.Item>
                                    {(setBoundaryElement) => (
                                      <>
                                        <CommentChain
                                          ref={(ref) =>
                                            setBoundaryElement(
                                              ref?.avatarRef?.current || null
                                            )
                                          }
                                          comments={[
                                            {
                                              id: "1",
                                              text:
                                                '[{"insert": "[LVL3] I mean, sure, but you know what also is great?"}]',
                                            },
                                            {
                                              id: "2",
                                              text:
                                                '[{"insert": "Deze nuts."}]',
                                            },
                                            {
                                              id: "3",
                                              text:
                                                '[{"insert": "Wait is that how you type it?"}]',
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
                                        {additionalComments > 2 && (
                                          <NewCommentsThread.Indent>
                                            <NewCommentsThread.Item>
                                              {(setBoundaryElement) => (
                                                <CommentChain
                                                  ref={(ref) =>
                                                    setBoundaryElement(
                                                      ref?.avatarRef?.current ||
                                                        null
                                                    )
                                                  }
                                                  comments={[
                                                    {
                                                      id: "1",
                                                      text:
                                                        '[{"insert": "[ADDITIONAL 3] I mean, sure, but you know what also is great?"}]',
                                                    },
                                                    {
                                                      id: "2",
                                                      text:
                                                        '[{"insert": "Deze nuts."}]',
                                                    },
                                                    {
                                                      id: "3",
                                                      text:
                                                        '[{"insert": "Wait is that how you type it?"}]',
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
                                                  onExtraAction={action(
                                                    "extra"
                                                  )}
                                                />
                                              )}
                                            </NewCommentsThread.Item>
                                          </NewCommentsThread.Indent>
                                        )}
                                      </>
                                    )}
                                  </NewCommentsThread.Item>
                                </NewCommentsThread.Indent>
                              </>
                            )}
                          </NewCommentsThread.Item>
                        </NewCommentsThread.Indent>
                      </>
                    )}
                  </NewCommentsThread.Item>
                  <NewCommentsThread.Item>
                    {(setBoundaryElement) => (
                      <CommentChain
                        ref={(ref) =>
                          setBoundaryElement(ref?.avatarRef?.current || null)
                        }
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
                            text:
                              '[{"insert": "Wait is that how you type it?"}]',
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
                        onExtraAction={action("extra")}
                      />
                    )}
                  </NewCommentsThread.Item>
                </NewCommentsThread.Indent>
              </>
            )}
          </NewCommentsThread>
        </div>
        <div style={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
          <button
            onClick={() => setAdditionalComments((comments) => comments + 1)}
          >
            Add Comments
          </button>
          <button
            onClick={() => setAdditionalComments((comments) => comments - 1)}
          >
            Remove Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export const MultipleCommentsThread = () => {
  const [threads, setAdditionalThreads] = React.useState([{}]);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginLeft: "100px",
            backgroundColor: "Theme.LAYOUT_BOARD_BACKGROUND_COLOR",
          }}
        >
          <div
            style={{
              height: "70px",
              backgroundColor: "red",
              position: "sticky",
              top: 0,
            }}
          >
            This Div simulates Boba's sticky header
          </div>
          {threads.map((_, index) => (
            <NewCommentsThread key={index}>
              {(setBoundaryElement) => (
                <>
                  <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
                    <CommentChain
                      ref={(ref) =>
                        setBoundaryElement(ref?.avatarRef?.current || null)
                      }
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
                      userIdentity={{
                        name: "SexyDaddy69",
                        avatar: `/${mamoruAvatar}`,
                      }}
                    />
                  </div>
                  <NewCommentsThread.Indent>
                    <NewCommentsThread.Item>
                      {(setBoundaryElement) => (
                        <CommentChain
                          ref={(ref) =>
                            setBoundaryElement(ref?.avatarRef?.current || null)
                          }
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
                              text:
                                '[{"insert": "Wait is that how you type it?"}]',
                            },
                          ]}
                          secretIdentity={{
                            name: "Tuxedo Mask",
                            avatar: `/${tuxedoAvatar}`,
                          }}
                          onExtraAction={action("extra")}
                        />
                      )}
                    </NewCommentsThread.Item>
                    <NewCommentsThread.Item>
                      {(setBoundaryElement) => (
                        <>
                          <CommentChain
                            ref={(ref) =>
                              setBoundaryElement(
                                ref?.avatarRef?.current || null
                              )
                            }
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
                                text:
                                  '[{"insert": "Wait is that how you type it?"}]',
                              },
                            ]}
                            secretIdentity={{
                              name: "Tuxedo Mask",
                              avatar: `/${tuxedoAvatar}`,
                            }}
                          />
                          <NewCommentsThread.Indent>
                            <NewCommentsThread.Item>
                              {(setBoundaryElement) => (
                                <>
                                  <CommentChain
                                    ref={(ref) =>
                                      setBoundaryElement(
                                        ref?.avatarRef?.current || null
                                      )
                                    }
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
                                        text:
                                          '[{"insert": "Wait is that how you type it?"}]',
                                      },
                                    ]}
                                    secretIdentity={{
                                      name: "Tuxedo Mask",
                                      avatar: `/${tuxedoAvatar}`,
                                    }}
                                  />
                                  <NewCommentsThread.Indent>
                                    <NewCommentsThread.Item>
                                      {(setBoundaryElement) => (
                                        <>
                                          <CommentChain
                                            ref={(ref) =>
                                              setBoundaryElement(
                                                ref?.avatarRef?.current || null
                                              )
                                            }
                                            comments={[
                                              {
                                                id: "1",
                                                text:
                                                  '[{"insert": "[LVL3] I mean, sure, but you know what also is great?"}]',
                                              },
                                              {
                                                id: "2",
                                                text:
                                                  '[{"insert": "Deze nuts."}]',
                                              },
                                              {
                                                id: "3",
                                                text:
                                                  '[{"insert": "Wait is that how you type it?"}]',
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
                                        </>
                                      )}
                                    </NewCommentsThread.Item>
                                  </NewCommentsThread.Indent>
                                </>
                              )}
                            </NewCommentsThread.Item>
                          </NewCommentsThread.Indent>
                        </>
                      )}
                    </NewCommentsThread.Item>
                    <NewCommentsThread.Item>
                      {(setBoundaryElement) => (
                        <CommentChain
                          ref={(ref) =>
                            setBoundaryElement(ref?.avatarRef?.current || null)
                          }
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
                              text:
                                '[{"insert": "Wait is that how you type it?"}]',
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
                          onExtraAction={action("extra")}
                        />
                      )}
                    </NewCommentsThread.Item>
                  </NewCommentsThread.Indent>
                </>
              )}
            </NewCommentsThread>
          ))}
        </div>
        <div style={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
          <button onClick={() => setAdditionalThreads([...threads, {}])}>
            Add Thread
          </button>
          {/* <button
            onClick={() => threads.pop()}
          >
            Remove Thread
          </button> */}
        </div>
      </div>
    </div>
  );
};
