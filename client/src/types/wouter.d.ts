declare module "wouter" {
  export type Location = string;

  export function Link(props: {
    href: string;
    children?: any;
    [key: string]: any;
  }): any;

  export function useLocation(): [string, (path: string, options?: any) => void];

  export function Route(props: {
    path?: string;
    component?: any;
    children?: any;
    [key: string]: any;
  }): any;

  export function Switch(props: { children?: any }): any;
}
