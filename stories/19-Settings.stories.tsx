import SettingsContainer, { SettingType } from "layout/SettingsContainer";

import FeedWithMenu from "feeds/FeedWithMenu";
import Layout from "layout/Layout";
import { Meta } from "@storybook/react";
import React from "react";
import TabsGroup from "layout/TabsGroup";
import { action } from "@storybook/addon-actions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "Settings Preview",
  component: SettingsContainer,
} as Meta;

export const SettingsLayout = () => {
  const link = {
    onClick: action("option"),
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  };
  const [globalSettingValue, setGlobalSettingValue] =
    React.useState<boolean>(true);
  const [currentSettings, setCurrentSettings] = React.useState<SettingType[]>([
    {
      type: "checkbox",
      name: "cursor",
      label: "Custom Cursor",
      currentValue: true,
    },

    {
      type: "checkbox",
      name: "trail",
      label: "Cursor trail",
      currentValue: false,
      helperText: "Whether to show the trail following a custom cursor.",
    },
  ]);

  return (
    <Layout
      onUserBarClick={{ onClick: action("onUserbarClick") }}
      hasNotifications
      hasOutdatedNotifications={false}
      title="test!"
      headerAccent="purple"
    >
      <Layout.SideMenuContent></Layout.SideMenuContent>
      <Layout.MainContent>
        {" "}
        <FeedWithMenu>
          <FeedWithMenu.Sidebar>
            <div id="a11y-target">
              <TabsGroup title="User Settings">
                <TabsGroup.Option link={link}>Name</TabsGroup.Option>
                <TabsGroup.Option link={link} selected>
                  Avatar
                </TabsGroup.Option>
                <TabsGroup.Option link={link}>Name</TabsGroup.Option>
              </TabsGroup>
              <TabsGroup title="Other Settings" icon={faSearch}>
                <TabsGroup.Option link={link}>Name</TabsGroup.Option>
                <TabsGroup.Option link={link} selected>
                  Avatar
                </TabsGroup.Option>
                <TabsGroup.Option link={link}>Name</TabsGroup.Option>
              </TabsGroup>
              <style jsx>{`
                #a11y-target {
                  padding: 20px;
                }
              `}</style>
            </div>
          </FeedWithMenu.Sidebar>
          <FeedWithMenu.FeedContent>
            <div className="settings-container">
              <SettingsContainer
                title="Cursor Settings"
                values={currentSettings}
                globalValue={globalSettingValue}
                onGlobaValueChange={(newValue) => {
                  setCurrentSettings((values) =>
                    values.map((value) => ({
                      ...value,
                      currentValue: newValue,
                    }))
                  );
                  setGlobalSettingValue(newValue);
                }}
                onValueChange={(changedValue) => {
                  const updatedSettingIndex = currentSettings.findIndex(
                    (el) => el.name == changedValue.name
                  );
                  const newSettings = [...currentSettings];
                  newSettings[updatedSettingIndex] = changedValue;
                  setCurrentSettings(newSettings);
                  setGlobalSettingValue(
                    newSettings.some((value) => value.currentValue)
                  );
                }}
              />
            </div>
            <style jsx>{`
              .settings-container {
                font-size: 1.6rem;
                color: white;
                max-width: 100%;
                width: 600px;
                padding: 20px 20px 50px 20px;
              }

              .settings-container :global(section + section) {
                margin-top: 40px;
              }
            `}</style>
          </FeedWithMenu.FeedContent>
        </FeedWithMenu>
      </Layout.MainContent>
    </Layout>
  );
};

SettingsLayout.story = {
  name: "settings layout",
  a11y: {
    element: "#a11y-target",
  },
};
