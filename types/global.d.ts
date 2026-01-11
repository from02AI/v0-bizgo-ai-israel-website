// Minimal module and JSX declarations to silence editor/TS errors when
// the full @types/react / React packages are not installed locally.
// This is a temporary developer convenience. For full type-safety, install
// the appropriate packages (react, @types/react, lucide-react types, etc.).


declare module 'lucide-react' {
  // provide common named exports used in the repo as permissive anys
  export const ArrowRight: any;
  export const AlertTriangle: any;
  export const CheckCircle: any;
  export const Check: any;
  export const X: any;
  export const RotateCcw: any;
  const LucideDefault: any;
  export default LucideDefault;
}

declare module 'next/link' {
  import React from 'react';
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module 'react' {
  // Minimal but typed React hook signatures to allow generic use (e.g. useState<number>())
  export function useState<S = any>(initialState?: S | (() => S)):
    [S, (value: S | ((prev: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useMemo<T>(factory: () => T, deps?: any[]): T;
  export function useCallback<T extends (...args: any[]) => any>(cb: T, deps?: any[]): T;
  export function useRef<T>(initial: T | null): { current: T | null };
  export function useContext<T = any>(context: any): T;
  export function createContext<T = any>(defaultValue: T): any;
  export const Fragment: any;
  export const Children: any;
  export type FC<P = {}> = any;
  export type ReactNode = any;
  export type PropsWithChildren<T> = any;

  // Common event types used in handlers
  export type ChangeEvent<T = any> = { target: T };
  export type FormEvent<T = any> = any;

  const ReactAny: any;
  export default ReactAny;
}

declare global {
  // Provide global React namespace used by JSX typings and event annotations
  namespace React {
    type ChangeEvent<T = any> = { target: T };
    type FormEvent<T = any> = any;
    type ReactNode = any;
    type FC<P = {}> = any;
  }
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element {
    [key: string]: any;
  }
  interface ElementClass {
    render: any;
  }
}
