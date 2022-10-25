import CompactPostThread from "post/CompactPostThread";
import React from "react";
import { action } from "@storybook/addon-actions";
import greedlerAvatar from "./images/greedler.jpg";
import mamoruAvatar from "./images/mamoru.png";
import oncelerAvatar from "./images/oncie.jpg";
import tuxedoAvatar from "./images/tuxedo-mask.jpg";

export default {
  title: "Post Thread Preview",
  component: CompactPostThread,
};
export const CompactThreadStory = () => {
  return (
    <CompactPostThread
      onNewComment={action("comment")}
      onNewContribution={action("contribute")}
      posts={[
        {
          createdTime: "5 minutes ago",
          text: '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]',
          secretIdentity: {
            name: "Good Guy",
            avatar: `/${oncelerAvatar}`,
          },
          userIdentity: {
            name: "Bad Guy",
            avatar: `/${greedlerAvatar}`,
          },
          createdTimeLink: {
            onClick: action("createdTime"),
            href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
        },
        {
          createdTime: "10 hours ago",
          text: '[{"insert":{"block-image":"https://si.wsj.net/public/resources/images/BN-GA217_legola_G_20141215080444.jpg"}}, {"attributes":{"italic":true}, "insert":"...and my bow..."}]',
          secretIdentity: {
            name: "Tuxedo Mask",
            avatar: `/${tuxedoAvatar}`,
          },
          userIdentity: {
            name: "SexyDaddy69",
            avatar: `/${mamoruAvatar}`,
          },
          newComments: 5,
          tags: {
            indexTags: ["indexable"],
            categoryTags: ["category"],
            contentWarnings: [
              "bad content (1)",
              "terrible content (2)",
              "super awful content (3)",
              "just don't look at this content (4)",
            ],
            whisperTags: [
              "tag1",
              "tag2",
              "a long tag",
              "a very very very very very long tag with many words",
              "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
            ],
          },
          createdTimeLink: {
            onClick: action("createdTime"),
            href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
        },
        {
          createdTime: "yesterday",
          text: '[{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691401632940032040/AbJqbbOwrc74AAAAAElFTkSuQmCC.png"}}]',
          secretIdentity: {
            name: "Good Guy",
            avatar: `/${oncelerAvatar}`,
          },
          userIdentity: {
            name: "Bad Guy",
            avatar: `/${greedlerAvatar}`,
          },
          newPost: true,
          tags: {
            indexTags: ["indexable"],
            categoryTags: ["category"],
            contentWarnings: [
              "bad content (1)",
              "terrible content (2)",
              "super awful content (3)",
              "just don't look at this content (4)",
            ],
            whisperTags: [
              "tag1",
              "tag2",
              "a long tag",
              "a very very very very very long tag with many words",
              "JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke",
            ],
          },
          createdTimeLink: {
            onClick: action("createdTime"),
            href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
        },
      ]}
      notesLink={{
        onClick: action("notesLink"),
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      }}
    />
  );
};

CompactThreadStory.story = {
  name: "compact",
};
