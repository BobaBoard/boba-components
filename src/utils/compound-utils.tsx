import React from "react";

/**
 * Returns the first component of type CompoundType in the first parameter array
 * (usually a compound component's children array).
 */
export function extractCompound<T>(
  children: React.ReactNode,
  CompoundType: React.FC<T>
): React.ReactElement<T> | undefined {
  return React.Children.toArray(children).find(
    (node) => React.isValidElement(node) && node.type === CompoundType
  ) as React.ReactElement<T>;
}

/**
 * Returns all components of type CompoundType in the first parameter array
 * (usually a compound component's children array).
 */
export function extractCompounds<T>(
  children: React.ReactNode,
  CompoundType: React.FC<T>
): React.ReactElement<T>[] {
  return React.Children.toArray(children).filter(
    (node) => React.isValidElement(node) && node.type === CompoundType
  ) as React.ReactElement<T>[];
}

/**
 * Returns all components whose types are not in the excludedCompoundTypes in the
 * first parameter array (usually a compound component's children array).
 */
export function extractRest(
  children: React.ReactNode,
  excludedCompoundTypes: React.FC<unknown>[]
) {
  return React.Children.toArray(children).filter(
    (child) =>
      !React.isValidElement(child) ||
      !excludedCompoundTypes.find((compoundType) => child.type === compoundType)
  );
}

/**
 * Create a React Component that takes props T and has the given display
 * name.
 *
 * This component does nothing but display the children passed to it.
 */
export function CreateBaseCompound<T>(displayName: string) {
  const newComponent = ({ children }: React.PropsWithChildren<T>) => (
    <>{children}</>
  );
  newComponent.displayName = displayName;
  return newComponent;
}

/**
 * Checks if the component has children.
 */
export function hasChildren(component: React.ReactNode) {
  return React.isValidElement(component) && !!component.props.children;
}

/**
 * Extract the Props type out of a component.
 *
 * Often useful for compound components.
 */
export type GetProps<C extends React.FC<unknown>> = C extends React.FC<infer T>
  ? T
  : unknown;
