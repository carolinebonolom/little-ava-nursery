declare module "react" {
  export type ReactNode = any;

  export class Component<P = {}, S = {}> {
    props: P;
    state: S;

    constructor(props: P);
    setState(
      partial: Partial<S> | ((prevState: Readonly<S>) => Partial<S>),
      callback?: () => void
    ): void;
    render(): any;
  }
}

declare module "lucide-react" {
  export const AlertTriangle: any;
  export const RotateCcw: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
