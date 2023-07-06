import Checkbox from "common/Checkbox";
import React from "react";

type CheckboxSettingType = {
  type: "checkbox";
  name: string;
  label: string;
  currentValue: boolean;
  helperText?: string;
};

export type SettingType = CheckboxSettingType;

const CheckboxSetting: React.FC<{
  value: CheckboxSettingType;
  onValueChange: (value: CheckboxSettingType) => void;
}> = (props) => (
    <>
      <label htmlFor={props.value.name} className="label">
        {props.value.label}
      </label>
      <div className="control">
        <Checkbox
          name={props.value.name}
          value={props.value.currentValue}
          onValueChange={(value) =>
            props.onValueChange({
              ...props.value,
              currentValue: value,
            })
          }
        />
      </div>
      {props.value.helperText && (
        <div className="helper-text">{props.value.helperText}</div>
      )}
      <style jsx>{`
        .label,
        .control {
          flex: 1;
          margin: auto;
        }

        .control {
          display: flex;
          flex-direction: row-reverse;
        }

        .helper-text {
          opacity: 0.5;
          margin-top: 10px;
          width: 100%;
        }
      `}</style>
    </>
  );

const Setting: React.FC<{
  value: SettingType;
  onValueChange: (value: SettingType) => void;
}> = (props) => (
    <div className="setting">
      {
        {
          checkbox: (
            <CheckboxSetting
              value={props.value}
              onValueChange={props.onValueChange}
            />
          ),
        }[props.value.type]
      }
      <style jsx>{`
        .setting {
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          flex-wrap: wrap;
        }

        .setting:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );

interface SettingsContainerProps {
  title: string;
  values: SettingType[];
  onValueChange: (value: SettingType) => void;
  globalValue?: boolean;
  onGlobaValueChange?: (value: boolean) => void;
}
const SettingsContainer: React.FC<SettingsContainerProps> = (props) => (
    <section>
      <div className="title">
        <h2>{props.title}</h2>
        {typeof props.globalValue !== "undefined" && (
          <Checkbox
            name={props.title}
            value={!!props.globalValue}
            onValueChange={(value) => props.onGlobaValueChange?.(value)}
          />
        )}
      </div>
      {props.values.map((setting) => (
        <Setting
          key={setting.name}
          value={setting}
          onValueChange={props.onValueChange}
        />
      ))}
      <style jsx>{`
        section {
          font-size: var(--font-size-regular);
        }
        .title {
          display: flex;
          align-items: center;
        }
        .title h2 {
          flex-grow: 1;
        }
        .settings-container section + section {
          margin-top: 40px;
        }
      `}</style>
    </section>
  );

export default SettingsContainer;
