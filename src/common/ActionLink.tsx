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
      link.onClick(e);
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
        <style jsx>{`
          button {
            background: none repeat scroll 0 0 transparent;
            border: 0;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </button>
    );
  }
  return (
    <a className={className} href={link.href} onClick={preventDefaultCallback}>
      {children}
      <style jsx>{`
        a {
          text-decoration: inherit;
        }
      `}</style>
    </a>
  );
};

interface ActionLinkProps {
  link?: LinkWithAction;
  className?: string;
}

export default ActionLink;
