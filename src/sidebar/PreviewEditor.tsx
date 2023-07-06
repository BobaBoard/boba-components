import Input, { InputStyle } from "common/Input";

import ColorInput from "common/ColorInput";
import React from "react";
import classnames from "classnames";

const PreviewEditor: React.FC<{
  tagline: string;
  accentColor: string;
  onSetAccentColor: (color: string) => void;
  onSetTagline: (tagline: string) => void;
}> = ({ tagline, accentColor, onSetAccentColor, onSetTagline }) => (
    <div className={classnames("preview-editor")}>
      <Input
        id="tagline"
        label="Tagline"
        value={tagline}
        onTextChange={onSetTagline}
        theme={InputStyle.DARK}
      />
      <div className={classnames("color-picker")}>
        <ColorInput
          currentColor={accentColor}
          onColorChange={onSetAccentColor}
        />
      </div>
      <style jsx>{`
        .preview-editor {
          margin: 30px 0;
        }
        .color-picker {
          margin-top: 15px;
        }
      `}</style>
    </div>
  );

export default PreviewEditor;
