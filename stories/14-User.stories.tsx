import React from "react";
//import { linkTo } from "@storybook/addon-links";
import UserDetails from "../src/user/UserDetails";

import goreBackground from "./images/gore.png";

export default {
  title: "Users Preview",
  component: UserDetails,
};

export const UserDetailsStory = () => (
  <div style={{ marginTop: "50px" }}>
    <UserDetails imageUrl={goreBackground} editable />
  </div>
);

UserDetailsStory.story = {
  name: "details display",
};

export const UserDetailsEdit = () => {
  const [imgSrc, setImgSrc] = React.useState(null);
  return (
    <div style={{ marginTop: "50px" }}>
      <UserDetails
        username={"Gore Lover 90"}
        imageUrl={goreBackground}
        editing
        onSubmit={(result) => {
          result.then((value) => {
            console.log(value.editedImg);
            setImgSrc(value.editedImg);
          });
        }}
      />
      <img src={imgSrc} />
    </div>
  );
};

UserDetailsEdit.story = {
  name: "details edit",
};

export const UserDetailsLoadingStory = () => (
  <div style={{ marginTop: "50px" }}>
    <UserDetails
      username={"Gore Lover 90"}
      imageUrl={goreBackground}
      editable
      loading
      editing
    />
  </div>
);

UserDetailsLoadingStory.story = {
  name: "details loading",
};
