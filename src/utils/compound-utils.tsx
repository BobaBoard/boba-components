import React from "react";

export function extractCompound<T>(
  children: React.ReactNode,
  CompoundType: React.FC<T>
): React.ReactElement<T> | undefined {
  return React.Children.toArray(children).find(
    (node) => React.isValidElement(node) && node.type == CompoundType
  ) as React.ReactElement<T>;
}

export function extractCompounds<T>(
  children: React.ReactNode,
  CompoundType: React.FC<T>
): React.ReactElement<T>[] {
  return React.Children.toArray(children).filter(
    (node) => React.isValidElement(node) && node.type == CompoundType
  ) as React.ReactElement<T>[];
}

export function CreateBaseCompound(displayName: string) {
  const newComponent = ({ children }: { children: React.ReactChildren }) => {
    return <>{children}</>;
  };
  newComponent.displayName = displayName;
  return newComponent;
}
