export enum EDITOR_TEXT_VALUES {
  WITH_IMAGE = "WITH_IMAGE",
  LONG_WORD = "LONG_WORD",
}

export const getInitialText = (textValue: EDITOR_TEXT_VALUES) => {
  return JSON.parse(getInitialTextString(textValue));
};

export const getInitialTextString = (textValue: EDITOR_TEXT_VALUES) => {
  switch (textValue) {
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
};
