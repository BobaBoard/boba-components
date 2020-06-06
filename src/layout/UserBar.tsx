import React from "react";
import Button, { ButtonStyle } from "../common/Button";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserBar: React.FC<UserBarProps> = ({ user, color, onClick }) => {
  return (
    <div className="container">
      <Button
        icon={user?.avatarUrl ? undefined : faUser}
        imageUrl={user?.avatarUrl}
        onClick={onClick}
        color={color}
        theme={ButtonStyle.DARK}
      >
        {user?.username || "Login"}
      </Button>
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
  user?: { username: string; avatarUrl?: string };
  loading?: boolean;
  color?: string;
  onClick?: () => void;
}
