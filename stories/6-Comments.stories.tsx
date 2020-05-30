import React from "react";
//import { linkTo } from "@storybook/addon-links";
import Comment from "../src/post/Comment";
import CommentEditor from "../src/post/CommentEditor";
import Button from "../src/common/Button";

import tuxedoAvatar from "./images/tuxedo-mask.jpg";
import mamoruAvatar from "./images/mamoru.png";

export default {
  title: "Comments",
  component: Comment,
};

export const Editable = () => (
  <>
    <div style={{}}>
      <CommentEditor
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onSubmit={(text) => console.log(text)}
        onCancel={() => console.log("click!")}
      />
    </div>

    <div style={{ width: "250px" }}>
      <CommentEditor
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
        onSubmit={(text) => console.log(text)}
        onCancel={() => console.log("click!")}
      />
    </div>
  </>
);

Editable.story = {
  name: "editable",
};

export const NonEditable = () => (
  <>
    <div style={{}}>
      <Comment
        id="comment"
        initialText={
          '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      />
    </div>

    <div style={{ width: "250px" }}>
      <Comment
        id="comment"
        initialText={
          '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]'
        }
        secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
        userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
      />
    </div>
  </>
);

NonEditable.story = {
  name: "non editable",
};

export const LoadingState = () => {
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      <div style={{}}>
        <CommentEditor
          initialText={'[{ "insert": "Text text text" }]'}
          secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
          userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
          onSubmit={(text) => console.log(text)}
          onCancel={() => console.log("click!")}
          loading={loading}
        />
      </div>

      <div style={{ width: "250px" }}>
        <CommentEditor
          initialText={'[{ "insert": "Text text text" }]'}
          secretIdentity={{ name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` }}
          userIdentity={{ name: "SexyDaddy69", avatar: `/${mamoruAvatar}` }}
          onSubmit={(text) => console.log(text)}
          onCancel={() => console.log("click!")}
          loading={loading}
        />
      </div>
      <Button onClick={() => setLoading(!loading)}>Change Load State</Button>
    </>
  );
};

LoadingState.story = {
  name: "loading",
};
