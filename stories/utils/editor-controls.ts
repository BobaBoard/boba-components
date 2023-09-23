import oncelerAvatar from "stories/images/oncie.jpg";
import tuxedoAvatar from "stories/images/tuxedo-mask.jpg";

export enum EDITOR_TEXT_VALUES {
  WITH_IMAGE = "WITH_IMAGE",
  LONG_WORD = "LONG_WORD",
  LONG_TEXT = "LONG_TEXT",
}

export const getInitialText = (textValue: EDITOR_TEXT_VALUES) =>
  JSON.parse(getInitialTextString(textValue));

export const getInitialTextString = (textValue: EDITOR_TEXT_VALUES) => {
  switch (textValue) {
    case EDITOR_TEXT_VALUES.LONG_TEXT:
      return '[{"insert":"Hi my name is Ebony Dark’ness Dementia Raven Way and I have long ebony black hair (that’s how I got my name) with purple streaks and red tips that reaches my mid-back and icy blue eyes like limpid tears and a lot of people tell me I look like Amy Lee (AN: if u don’t know who she is get da hell out of here!). I’m not related to Gerard Way but I wish I was because he’s a major fucking hottie. I’m a vampire but my teeth are straight and white. I have pale white skin. I’m also a witch, and I go to a magic school called Hogwarts in England where I’m in the seventh year (I’m seventeen). I’m a goth (in case you couldn’t tell) and I wear mostly black. I love Hot Topic and I buy all my clothes from there. For example today I was wearing a black corset with matching lace around it and a black leather miniskirt, pink fishnets and black combat boots. I was wearing black lipstick, white foundation, black eyeliner and red eye shadow. I was walking outside Hogwarts. It was snowing and raining so there was no sun, which I was very happy about. A lot of preps stared at me. I put up my middle finger at them."}]';
    case EDITOR_TEXT_VALUES.LONG_WORD:
      return '[{"insert":"This card has a really long word: JugemuJugemuGokonoSurikireKaijarisuigyonoSuigyomatsuUnraimatsuFuraimatsuKuNeruTokoroniSumuTokoroYaburaKojinoBuraKojiPaipopaipoPaiponoShuringanShuringannoGurindaiGurindainoPonpokopinoPonpokonanoChokyumeinoChosuke."}]';
    case EDITOR_TEXT_VALUES.WITH_IMAGE:
      return '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]';
    default:
      return "[]";
  }
};

export interface EditorControlsType {
  editorText: EDITOR_TEXT_VALUES;
}

export const editorArgTypes = {
  editorText: {
    options: Object.values(EDITOR_TEXT_VALUES),
    control: { type: "select" },
  },
  secretIdentity: {
    options: ["sexydaddy", "oncie"],
    mapping: {
      sexydaddy: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
      oncie: {
        name: "Good Guy",
        avatar: `/${oncelerAvatar}`,
      },
    },
  },
};
