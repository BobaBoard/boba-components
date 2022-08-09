import React from "react";
import CompactPostThread from "../src/post/CompactPostThread";
import HiddenThread from "../src/post/HiddenThread";

import oncelerAvatar from "./images/oncie.jpg";
import greedlerAvatar from "./images/greedler.jpg";
import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";
import hannibalAvatar from "./images/hannibal.png";
import { action } from "@storybook/addon-actions";

export default {
  title: "Post Thread Preview",
  component: CompactPostThread,
};
export const CompactThreadStory = () => {
  return (
    <CompactPostThread
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

export const HiddenThreadStory = () => {
  return(
    <HiddenThread></HiddenThread>
  );
};

HiddenThreadStory.story = {
  name: "hidden",
};
