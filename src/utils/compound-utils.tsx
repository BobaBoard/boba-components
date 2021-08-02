import React from "react";

export function extractCompound<T extends React.ReactNode>(
  children: React.ReactNode,
  CompoundType: T
): T {
  return React.Children.toArray(children).find(
    (node) => React.isValidElement(node) && node.type == CompoundType
  ) as T;
}

export function CreateBaseCompound(displayName: string) {
  const newComponent = ({ children }: { children: React.ReactChildren }) => {
    return <>{children}</>;
  };
  newComponent.displayName = displayName;
  return newComponent;
}
