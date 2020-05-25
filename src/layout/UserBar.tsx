import React from "react";
import Button, { ButtonStyle } from "../common/Button";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserBar: React.FC<UserBarProps> = ({ color }) => {
  return (
    <div className="container">
      <Button
        icon={faUser}
        compact
        onClick={() => console.log("click!")}
        color={color}
        theme={ButtonStyle.DARK}
      >
        User Menu
      </Button>{" "}
      <style jsx>{`
        .sidebar {
          padding: 20px;
        }
        .board-details {
          margin-top: 30px;
        }
      `}</style>
    </div>
  );
};

export default UserBar;

export interface UserBarProps {
  color?: string;
}
