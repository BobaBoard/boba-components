import Post from "post/Post";
import React from "react";
import Theme from "theme/default";
import ThreadIndent from "post/ThreadIndent";
import { action } from "@storybook/addon-actions";
import greedlerAvatar from "stories/images/greedler.jpg";
import hannibalAvatar from "stories/images/hannibal.png";
import mamoruAvatar from "stories/images/mamoru.png";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";
import CollapsedPlaceholder from "thread/CollapsedPlaceholder";

export default {
  title: "Legacy / Legacy Thread",
  component: ThreadIndent,
};

export const Regular = () => {
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
          />
        </div>
      </ThreadIndent>
      <ThreadIndent
        level={2}
        ends={[
          {
            level: 1,
            onBeamUpClick: () => console.log("beam up click1"),
            showAddContribution: false,
            onAddContributionClick: () => console.log("contribution click"),
          },
        ]}
      >
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
          />
        </div>
      </ThreadIndent>
      <ThreadIndent level={1}>
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
            showAddContribution: true,
          },
          {
            level: 1,
            onBeamUpClick: () => console.log("click1"),
            onAddContributionClick: () => console.log("click1"),
            showAddContribution: true,
          },
          {
            level: 2,
            onBeamUpClick: () => console.log("click2"),
            onAddContributionClick: () => console.log("click2"),
            showAddContribution: true,
          },
        ]}
      >
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

// Still broken after updating props and fixing all shown ts errors.
// We may be able to simply get rid of this story as it may be covered by the CommentsThread stories in the Comments folder.
// export const ThreadedComments = () => {
//   const lvl0Indent = useIndent();
//   const lvl1Indent = useIndent();
//   const lvl1p2Indent = useIndent();
//   const lvl2Indent = useIndent();
//   const lvl3Indent = useIndent();
//   const lvl1p3Indent = useIndent();

//   return (
//     <div
//       style={{
//         marginLeft: "100px",
//         backgroundColor: "Theme.LAYOUT_BOARD_BACKGROUND_COLOR",
//       }}
//     >
//       <CompactThreadIndent level={0} startsFromViewport={lvl0Indent.bounds}>
//         <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
//           <Comment
//             createdTime="2019/05/14 at 7:34pm"
//             ref={(ref) => lvl0Indent.setHandler(ref)}
//             comments={[
//               {
//                 id: "1",
//                 text: '[{"insert": "[LVL 0] I mean, sure, but you know what also is great?"}]',
//               },
//               {
//                 id: "2",
//                 text: '[{"insert": "Deze nuts."}]',
//               },
//               {
//                 id: "3",
//                 text: '[{"insert": "Wait is that how you type it?"}]',
//               },
//             ]}
//             secretIdentity={{
//               name: "Tuxedo Mask",
//               avatar: `/${tuxedoAvatar}`,
//             }}
//             userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
//           />
//         </div>
//         <CompactThreadIndent level={1} startsFromViewport={lvl1Indent.bounds}>
//           <div style={{ paddingTop: "15px", opacity: 1 }}>
//             <Comment
//               createdTime="2019/05/14 at 7:34pm"
//               ref={(ref) => lvl1Indent.setHandler(ref)}
//               comments={[
//                 {
//                   id: "1",
//                   text: '[{"insert": "[LVL 1]I mean, sure, but you know what also is great?"}]',
//                 },
//                 {
//                   id: "2",
//                   text: '[{"insert": "Deze nuts."}]',
//                 },
//                 {
//                   id: "3",
//                   text: '[{"insert": "Wait is that how you type it?"}]',
//                 },
//               ]}
//               secretIdentity={{
//                 name: "Tuxedo Mask",
//                 avatar: `/${tuxedoAvatar}`,
//               }}
//               userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
//             />
//             <Comment
//               createdTime="2019/05/14 at 7:34pm"
//               ref={(ref) => lvl1p2Indent.setHandler(ref)}
//               comments={[
//                 {
//                   id: "1",
//                   text: '[{"insert": "[LVL 1]I mean, sure, but you know what also is great?"}]',
//                 },
//                 {
//                   id: "2",
//                   text: '[{"insert": "Deze nuts."}]',
//                 },
//                 {
//                   id: "3",
//                   text: '[{"insert": "Wait is that how you type it?"}]',
//                 },
//               ]}
//               secretIdentity={{
//                 name: "Tuxedo Mask",
//                 avatar: `/${tuxedoAvatar}`,
//               }}
//               userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
//             />
//           </div>{" "}
//           <CompactThreadIndent level={2} startsFromViewport={lvl2Indent.bounds}>
//             <div style={{ paddingTop: "15px", opacity: 1 }}>
//               <Comment
//                 createdTime="2019/05/14 at 7:34pm"
//                 ref={(ref) => lvl2Indent.setHandler(ref)}
//                 comments={[
//                   {
//                     id: "1",
//                     text: '[{"insert": "[LVL2] I mean, sure, but you know what also is great?"}]',
//                   },
//                   {
//                     id: "2",
//                     text: '[{"insert": "Deze nuts."}]',
//                   },
//                   {
//                     id: "3",
//                     text: '[{"insert": "Wait is that how you type it?"}]',
//                   },
//                 ]}
//                 secretIdentity={{
//                   name: "Tuxedo Mask",
//                   avatar: `/${tuxedoAvatar}`,
//                 }}
//                 userIdentity={{
//                   name: "SexyDaddy69",
//                   avatar: `/${mamoruAvatar}`,
//                 }}
//               />
//             </div>
//             <CompactThreadIndent
//               level={3}
//               startsFromViewport={lvl3Indent.bounds}
//             >
//               <Comment
//                 createdTime="2019/05/14 at 7:34pm"
//                 ref={(ref: CommentHandler | null) => lvl3Indent.setHandler(ref)}
//                 comments={[
//                   {
//                     id: "1",
//                     text: '[{"insert": "[LVL3] I mean, sure, but you know what also is great?"}]',
//                   },
//                   {
//                     id: "2",
//                     text: '[{"insert": "Deze nuts."}]',
//                   },
//                   {
//                     id: "3",
//                     text: '[{"insert": "Wait is that how you type it?"}]',
//                   },
//                 ]}
//                 secretIdentity={{
//                   name: "Tuxedo Mask",
//                   avatar: `/${tuxedoAvatar}`,
//                 }}
//                 userIdentity={{
//                   name: "SexyDaddy69",
//                   avatar: `/${mamoruAvatar}`,
//                 }}
//               />
//             </CompactThreadIndent>
//           </CompactThreadIndent>
//         </CompactThreadIndent>

//         <CompactThreadIndent level={1} startsFromViewport={lvl1p3Indent.bounds}>
//           <div style={{ paddingTop: "15px", opacity: 1 }}>
//             <Comment
//               createdTime="2019/05/14 at 7:34pm"
//               ref={(ref) => lvl1p3Indent.setHandler(ref)}
//               comments={[
//                 {
//                   id: "1",
//                   text: '[{"insert": "[LVL1] I mean, sure, but you know what also is great?"}]',
//                 },
//                 {
//                   id: "2",
//                   text: '[{"insert": "Deze nuts."}]',
//                 },
//                 {
//                   id: "3",
//                   text: '[{"insert": "Wait is that how you type it?"}]',
//                 },
//               ]}
//               secretIdentity={{
//                 name: "Tuxedo Mask",
//                 avatar: `/${tuxedoAvatar}`,
//               }}
//               userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
//             />
//           </div>
//         </CompactThreadIndent>
//       </CompactThreadIndent>
//     </div>
//   );
// };

// ThreadedComments.story = {
//   name: "comments",
// };

// Still broken after updating props and fixing all shown ts errors.
// We may be able to simply get rid of this story as it may be covered by the CommentsThread stories in the Comments folder.
// const TUXEDO_MASK_IDENTITY = {
//   name: "Tuxedo Mask",
//   avatar: `/${tuxedoAvatar}`,
// };
// const MAMORU_IDENTITY = { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` };
// export const SingleThreadedComments = () => {
//   const lvl0Indent = useIndent();
//
//   return (
//     <div
//       style={{
//         marginLeft: "100px",
//         backgroundColor: "Theme.LAYOUT_BOARD_BACKGROUND_COLOR",
//       }}
//     >
//       <CompactThreadIndent level={0} startsFromViewport={lvl0Indent.bounds}>
//         <div style={{ paddingTop: "15px", maxWidth: "550px" }}>
//           <Comment
//             createdTime="2019/05/14 at 7:34pm"
//             ref={(ref) => lvl0Indent.setHandler(ref)}
//             comments={React.useMemo(
//               () => [
//                 {
//                   id: "1",
//                   text: '[{"insert": "[LVL 0] I mean, sure, but you know what also is great?"}]',
//                 },
//                 {
//                   id: "2",
//                   text: '[{"attributes": {"inline-spoilers": true}, "insert": "Deze nuts."}]',
//                 },
//                 {
//                   id: "3",
//                   text: '[{"insert": "Wait is that how you type it?"}]',
//                 },
//               ],
//               []
//             )}
//             secretIdentity={TUXEDO_MASK_IDENTITY}
//             userIdentity={MAMORU_IDENTITY}
//           />
//         </div>
//       </CompactThreadIndent>
//     </div>
//   );
// };
export const CollapsePlaceholder = () => {
  return (
    <div style={{ maxWidth: "500px", textAlign: "center" }}>
      <CollapsedPlaceholder
        onUncollapseClick={{ onClick: action("uncollapse") }}
      >
        <div>
          5 comments <span style={{ color: "green" }}>manually hidden</span>.
          Reason:{" "}
          <em>
            people started talking about Coffee Shop AUs, which disgust me.
          </em>
        </div>
      </CollapsedPlaceholder>
      <CollapsedPlaceholder
        onUncollapseClick={{ onClick: action("uncollapse") }}
        onLoadBefore={{ onClick: action("loadBefore") }}
      >
        <div>
          5 comments <span style={{ color: "green" }}>manually hidden</span>.
          Reason:{" "}
          <em>
            people started talking about Coffee Shop AUs, which disgust me.
          </em>
        </div>
      </CollapsedPlaceholder>
      <CollapsedPlaceholder
        onUncollapseClick={{ onClick: action("uncollapse") }}
        onLoadAfter={{ onClick: action("loadAfter") }}
      >
        <div>
          5 comments <span style={{ color: "green" }}>manually hidden</span>.
          Reason:{" "}
          <em>
            people started talking about Coffee Shop AUs, which disgust me.
          </em>
        </div>
      </CollapsedPlaceholder>
      <CollapsedPlaceholder
        onUncollapseClick={{ onClick: action("uncollapse") }}
        onLoadBefore={{ onClick: action("loadBefore") }}
        onLoadAfter={{ onClick: action("loadAfter") }}
      >
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
