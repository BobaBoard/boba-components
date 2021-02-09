import React from "react";
import { LinkWithAction } from "../types";

const ActionLink: React.FC<ActionLinkProps> = ({
  children,
  link,
  className,
}) => {
  const preventDefaultCallback = React.useCallback(
    (e: React.MouseEvent) => {
      if (!link?.onClick) {
        return;
      }
      link.onClick();
      e.preventDefault();
    },
    [link]
  );
  if (!link) {
    return <>{children}</>;
  }
  if (link.onClick && !link.href) {
    return (
      <button className={className} onClick={preventDefaultCallback}>
        {children}
      </button>
    );
  }
  return (
    <a className={className} href={link.href} onClick={preventDefaultCallback}>
      {children}
    </a>
  );
};

interface ActionLinkProps {
  link?: LinkWithAction;
  className?: string;
}

export default ActionLink;
