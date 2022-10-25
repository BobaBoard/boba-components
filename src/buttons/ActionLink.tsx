import React, { AriaAttributes, PropsWithChildren } from "react";

import { LinkWithAction } from "types";

// TODO: see if we can bring in a library for this
type WithRequiredProperty<Type, Key extends keyof Type> = Type &
  {
    [Property in Key]-?: Type[Property];
  };

/**
 * The most neutral of all buttons. Absolutely uninvasive.
 * Does what you expect it to do and tries not to get in
 * your way.
 */
const NeutralButton: React.FC<ActionLinkProps> = (props) => {
  const { children, link, className, allowDefault } = props;
  return (
    <button
      className={className}
      onClick={React.useCallback(
        (e: React.MouseEvent) => {
          // If there's no an onClick event defined, do nothing;
          // If there is an onClick event defined, do it, then
          // prevent the default action from happening (if not
          // forced to happen through `allowDefault`).
          // TODO: see about moving "allowDefault" directly on Link
          if (!link?.onClick) {
            return;
          }
          link.onClick(e);
          if (!allowDefault) {
            e.preventDefault();
          }
        },
        [link, allowDefault]
      )}
      aria-label={link?.label ?? props["aria-label"]}
      aria-current={props["aria-current"]}
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
};

/**
 * The most neutral of all anchors. Absolutely uninvasive.
 * Does what you expect it to do and tries not to get in
 * your way.
 */
const NeutralAnchor: React.FC<WithRequiredProperty<ActionLinkProps, "link">> = (
  props
) => {
  const { children, link, className, allowDefault } = props;

  return (
    <a
      className={className}
      href={link.href}
      onClick={React.useCallback(
        (e: React.MouseEvent) => {
          // If there's no an onClick event defined, do nothing;
          // If there is an onClick event defined, do it, then
          // prevent the default action from happening (if not
          // forced to happen through `allowDefault`).
          // TODO: see about moving "allowDefault" directly on Link
          if (!link?.onClick) {
            return;
          }
          link.onClick(e);
          if (!allowDefault) {
            e.preventDefault();
          }
        },
        [link, allowDefault]
      )}
      aria-label={link?.label ?? props["aria-label"]}
      aria-current={props["aria-current"]}
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

/**
 * ActionLink wraps element with links or actions, and renders
 * as either a `<a>` or ` <button>` tag according to which one
 * is more semantically correct given the type of action passed
 * to it. Furthermore, if a link is not given, it takes the tag
 * completely out of the way, and simply renders a `<span>`.
 *
 * For example, if passed only an href, it renders as an anchor.
 * If it has only an onClick handler, it renders as a button.
 * If it has both, it will render as an anchor so that the behavior
 * with keyboard shortcuts (e.g. left-click) will go to the href,
 * but if effectively clicked it will prevent the default but call
 * the onclick event.
 * If it has none, renders as a span if given a classname, or
 * completely disappears if not necessary.
 */
// TODO: check where this abstraction leaks.
const ActionLink = (props: PropsWithChildren<ActionLinkProps>) => {
  const { children, link, className } = props;

  if (!link) {
    return className ? (
      // TODO: check if we can just pass the classname directly to the
      // underlying element.
      <span className={className} aria-label={props["aria-label"]}>
        {children}
      </span>
    ) : (
      // Needs to be wrapped or typescript will complain
      <>{children}</>
    );
  }
  if (link.onClick && !link.href) {
    return <NeutralButton {...props} />;
  }
  return <NeutralAnchor {...props} link={link} />;
};

// TODO: this should probably be turned into a generic (#typescript)
// TODO: the type with link optional should also be extracted in its own
// type (#typescript)
interface ActionLinkProps extends AriaAttributes {
  link?: LinkWithAction<unknown>;
  className?: string;
  allowDefault?: boolean;
}

export default ActionLink;
