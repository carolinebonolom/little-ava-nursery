import React from "react";

type RouteProps = {
  path?: string;
  component?: React.ComponentType<any>;
  children?: React.ReactNode;
};

export function Route(_props: RouteProps) {
  return null;
}

export function Switch({ children }: { children?: React.ReactNode }) {
  const location = typeof window === "undefined" ? "/" : window.location.pathname;

  const items = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<RouteProps>[];

  for (const child of items) {
    const { path, component: Component, children: childContent } = child.props;
    const matches = !path || location === path;

    if (matches) {
      return Component ? <Component /> : <>{childContent}</>;
    }
  }

  return null;
}
