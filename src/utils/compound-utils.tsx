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

export function extractRest(
  children: React.ReactNode,
  excludedCompoundTypes: React.FC<unknown>[]
) {
  return React.Children.toArray(children).filter(
    (child) =>
      !React.isValidElement(child) ||
      !excludedCompoundTypes.find((compoundType) => child.type == compoundType)
  );
}

export function CreateBaseCompound<T>(displayName: string) {
  const newComponent: React.FC<T> = ({
    children,
  }: {
    children?: React.ReactNode;
  }) => {
    return <>{children}</>;
  };
  newComponent.displayName = displayName;
  return newComponent;
}

export function hasChildren(component: React.ReactNode) {
  return React.isValidElement(component) && !!component.props.children;
}

export type GetProps<C extends React.FC<unknown>> = C extends React.FC<infer T>
  ? T
  : unknown;
