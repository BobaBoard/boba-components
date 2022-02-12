import { LinkWithAction } from "../types";
import React from "react";

const ActionLink: React.FC<ActionLinkProps> = ({
  children,
  link,
  label,
  className,
  allowDefault,
  current,
}) => {
  const preventDefaultCallback = React.useCallback(
    (e: React.MouseEvent) => {
      if (!link?.onClick) {
        return;
      }
      link.onClick(e);
      if (!allowDefault) {
        e.preventDefault();
      }
    },
    [link, allowDefault]
  );
  if (!link) {
    return className ? (
      <span className={className} aria-label={label}>
        {children}
      </span>
    ) : (
      <>{children}</>
    );
  }
  if (link.onClick && !link.href) {
    return (
      <button
        className={className}
        onClick={preventDefaultCallback}
        aria-label={link?.label ?? label}
        aria-current={current ?? false}
      >
        {children}
        <style jsx>{`
          button {
            background: none repeat scroll 0 0 transparent;
            border: 0;
            margin: 0;
            padding: 0;
          }
          button:hover {
            cursor: pointer;
          }
          button:focus {
            outline: none;
          }
          button:focus-visible {
            outline: auto;
          }
        `}</style>
      </button>
    );
  }
  return (
    <a
      className={className}
      href={link.href}
      onClick={preventDefaultCallback}
      aria-label={link?.label ?? label}
      aria-current={current ?? false}
    >
      {children}
      <style jsx>{`
        a {
          text-decoration: inherit;
          color: inherit;
        }
      `}</style>
    </a>
  );
};

interface ActionLinkProps {
  link?: LinkWithAction<unknown>;
  className?: string;
  allowDefault?: boolean;
  label?: string;
  // Allows aria-current to be set as appropriate
  current?: boolean | "time" | "false" | "true" | "page" | "step" | "location" | "date" | undefined;
}

export default ActionLink;
