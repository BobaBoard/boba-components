import React from "react";
import CompactThread from "../src/post/CompactThread";
import ThreadIndent from "../src/post/ThreadIndent";
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

export default {
  title: "Thread Preview",
  component: CompactThread,
};

export const CompactThreadStory = () => {
  return (
    <CompactThread
      posts={[
        {
          createdTime: "5 minutes ago",
          text:
            '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]',
          secretIdentity: {
            name: "Good Guy",
            avatar: `/${oncelerAvatar}`,
          },
        },
        {
          createdTime: "10 hours ago",
          text:
            '[{"insert":{"block-image":"https://si.wsj.net/public/resources/images/BN-GA217_legola_G_20141215080444.jpg"}}, {"attributes":{"italic":true}, "insert":"...and my bow..."}]',
          secretIdentity: {
            name: "Tuxedo Mask",
            avatar: `/${tuxedoAvatar}`,
          },
          userIdentity: {
            name: "SexyDaddy69",
            avatar: `/${mamoruAvatar}`,
          },
          newComments: 5,
        },
        {
          createdTime: "yesterday",
          text:
            '[{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691401632940032040/AbJqbbOwrc74AAAAAElFTkSuQmCC.png"}}]',
          secretIdentity: {
            name: "Bad Guy",
            avatar: `/${greedlerAvatar}`,
          },
          newPost: true,
        },
      ]}
      onNewComment={() => console.log("click")}
      onNewContribution={() => console.log("click")}
    />
  );
};

CompactThreadStory.story = {
  name: "compact",
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
      <CompactThreadIndent
        level={0}
        startsFromViewport={lvl0Indent.bounds}
        nestedHandlers={[
          lvl1Indent.bounds,
          lvl1p2Indent.bounds,
          lvl1p3Indent.bounds,
        ]}
      >
        <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
          <CommentChain
            ref={lvl0Indent.handler}
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
              ref={lvl1Indent.handler}
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
              ref={lvl1p2Indent.handler}
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
                ref={lvl2Indent.handler}
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
                ref={lvl3Indent.handler}
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
              ref={lvl1p3Indent.handler}
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
