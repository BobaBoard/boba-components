import React from "react";

import UserBar from "../src/layout/UserBar";
import mamoru from "./images/mamoru.png";

export default {
  title: "UserBar",
  component: UserBar,
};

export const LoggedOut = () => {
  return (
    <>
      <div style={{ margin: "25px" }}>
        <UserBar onClick={() => console.log("click!")} />
      </div>
      <div style={{ margin: "25px" }}>
        <UserBar onClick={() => console.log("click!")} color="orange" />
      </div>
    </>
  );
};

LoggedOut.story = {
  name: "logged out",
};

export const LoggedIn = () => {
  return (
    <>
      <div style={{ margin: "25px" }}>
        <UserBar
          user={{
            username: "SexyDaddy69",
          }}
          onClick={() => console.log("click!")}
        />
      </div>
      <div style={{ margin: "25px" }}>
        <UserBar
          user={{
            username: "SexyDaddy69",
          }}
          onClick={() => console.log("click!")}
          color="orange"
        />
      </div>
      <div style={{ margin: "25px" }}>
        <UserBar
          user={{
            username: "SexyDaddy69",
            avatarUrl: mamoru,
          }}
          onClick={() => console.log("click!")}
        />
      </div>
      <div style={{ margin: "25px" }}>
        <UserBar
          user={{
            username: "SexyDaddy69",
            avatarUrl: mamoru,
          }}
          onClick={() => console.log("click!")}
          color="orange"
        />
      </div>
    </>
  );
};

LoggedIn.story = {
  name: "logged in",
};

export const Loading = () => {
  return (
    <>
      <div style={{ margin: "25px" }}>
        <UserBar
          user={{
            username: "SexyDaddy69",
          }}
          onClick={() => console.log("click!")}
          loading={true}
        />
      </div>
      <div style={{ margin: "25px" }}>
        <UserBar
          user={{
            username: "SexyDaddy69",
          }}
          onClick={() => console.log("click!")}
          color="orange"
          loading={true}
        />
      </div>
    </>
  );
};

Loading.story = {
  name: "loading",
};
