import Thread, { CollapseGroup } from "thread/NewThread";
import {
  faAngleDoubleUp,
  faCompressArrowsAlt,
  faLink,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

import CollapsedPlaceholder from "thread/CollapsedPlaceholder";
import Comment from "post/Comment";
import { NewCommentsThread } from "index";
import Post from "post/Post";
import React from "react";
import Theme from "theme/default";
import ThreadIndent from "post/ThreadIndent";
import { action } from "@storybook/addon-actions";
import greedlerAvatar from "stories/images/greedler.jpg";
import hannibalAvatar from "stories/images/hannibal.png";
import mamoruAvatar from "stories/images/mamoru.png";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";

export default {
  title: "Thread / Full Thread",
  component: ThreadIndent,
};

const TUXEDO_MASK_IDENTITY = {
  name: "Tuxedo Mask",
  avatar: `/${tuxedoAvatar}`,
};
const MAMORU_IDENTITY = { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` };

const Spacer = () => {
  const [spacerPadding, setSpacerPadding] = React.useState(25);
  return (
    <div
      style={{
        paddingBottom: spacerPadding + "px",
        marginLeft: "25px",
        backgroundColor: "aqua",
        display: "grid",
        gridTemplateColumns: "auto auto",
        gridTemplateRows: "1fr 1fr",
        gap: "5px",
      }}
    >
      <div style={{ gridColumn: "span 2" }}>
        This spacer should not influence the starting point of the next stem
      </div>
      <button onClick={() => setSpacerPadding(spacerPadding + 10)}>
        Increase height
      </button>
      <button onClick={() => setSpacerPadding(spacerPadding - 10)}>
        Decrease height
      </button>
    </div>
  );
};

export const NewWithCollapsedPlaceholder = () => {
  const [collapsed, setCollapsed] = React.useState<string[]>([
    "level-2,1",
    "cg-1",
  ]);

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
            <Spacer />
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
                    <Spacer />
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

export const NewWithPostsAndComments = () => {
  return (
    <div
      style={{
        marginLeft: "100px",
        backgroundColor: Theme.LAYOUT_BOARD_BACKGROUND_COLOR,
      }}
    >
      <Thread
        onCollapseLevel={(levelId) => action(`onCollapseLevel${levelId}`)}
        onUncollapseLevel={(levelId) => action(`onCollapseLevel${levelId}`)}
        getCollapseReason={() => {
          return <div>Subthread manually hidden.</div>;
        }}
        getStemOptions={(levelId) => {
          return [
            {
              name: "Collapse",
              icon: faCompressArrowsAlt,
              link: {
                onClick: action(`collapseClickLevel${levelId}`),
              },
            },
            {
              name: "Beam up",
              icon: faAngleDoubleUp,
              link: {
                href: "#href",
                onClick: action("hrefClick"),
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
                createdTimeLink={{
                  onClick: action("createdTime"),
                  href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                }}
                notesLink={{
                  onClick: action("notesLink"),
                  href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                }}
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
                menuOptions={[
                  {
                    name: "Copy Link",
                    icon: faLink,
                    link: {
                      onClick: action("copy!"),
                      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    },
                  },
                ]}
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
                        createdTimeLink={{
                          onClick: action("createdTime"),
                          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        }}
                        notesLink={{
                          onClick: action("notesLink"),
                          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        }}
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
                        collapsed
                        ref={(ref) =>
                          setBoundaryElement(ref?.avatarRef?.current || null)
                        }
                      />
                    </div>
                    <Thread.Indent id="level1-1">
                      <Thread.Item>
                        <Thread.Indent id="level1-1-1">
                          <div
                            style={{
                              paddingTop: "15px",
                              marginLeft: "30px",
                              maxWidth: "550px",
                              pointerEvents: "none",
                            }}
                          >
                            <NewCommentsThread>
                              <NewCommentsThread.Item>
                                {(setBoundaryElement) => (
                                  <Comment
                                    createdTime="2019/05/14 at 7:34pm"
                                    comments={[
                                      {
                                        id: "1",
                                        text: '[{"insert": "[LVL 0] I mean, sure, but you know what also is great?"}]',
                                      },
                                      {
                                        id: "2",
                                        text: '[{"attributes": {"inline-spoilers": true}, "insert": "Deze nuts."}]',
                                      },
                                      {
                                        id: "3",
                                        text: '[{"insert": "Wait is that how you type it?"}]',
                                      },
                                    ]}
                                    secretIdentity={TUXEDO_MASK_IDENTITY}
                                    userIdentity={MAMORU_IDENTITY}
                                    ref={(ref) =>
                                      setBoundaryElement(
                                        ref?.avatarRef?.current || null
                                      )
                                    }
                                  />
                                )}
                              </NewCommentsThread.Item>
                            </NewCommentsThread>
                          </div>
                        </Thread.Indent>
                      </Thread.Item>
                      <Thread.Item>
                        {(setBoundaryElement) => (
                          <>
                            <div
                              style={{ paddingTop: "15px", maxWidth: "550px" }}
                            >
                              <Post
                                createdTimeLink={{
                                  onClick: action("createdTime"),
                                  href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                                }}
                                notesLink={{
                                  onClick: action("notesLink"),
                                  href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                                }}
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
                                allowsComment
                                allowsContribution
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
                        createdTimeLink={{
                          onClick: action("createdTime"),
                          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        }}
                        notesLink={{
                          onClick: action("notesLink"),
                          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        }}
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
                                createdTimeLink={{
                                  onClick: action("createdTime"),
                                  href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                                }}
                                notesLink={{
                                  onClick: action("notesLink"),
                                  href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                                }}
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
                                allowsComment
                                allowsContribution
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
                                      createdTimeLink={{
                                        onClick: action("createdTime"),
                                        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                                      }}
                                      notesLink={{
                                        onClick: action("notesLink"),
                                        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                                      }}
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
