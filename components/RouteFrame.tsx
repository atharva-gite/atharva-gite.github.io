import { ViewTransition, type ReactNode } from "react";

const routeMotion = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
} as const;

export function RouteFrame({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={routeMotion} exit={routeMotion} default="none">
      {children}
    </ViewTransition>
  );
}
