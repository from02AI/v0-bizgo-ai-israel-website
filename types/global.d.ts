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
  export const MessageCircle: any;
  export const Mail: any;
  export const BookOpen: any;
  export const Loader2: any;
  export const FileDown: any;
  export const Download: any;
  // additional lucide icons used in the project
  export const Search: any;
  export const ShieldCheck: any;
  export const TrendingUp: any;
  export const FileText: any;
  export const BarChart3: any;
  export const AlertCircle: any;
  export const Lightbulb: any;
  export const ArrowLeft: any;
  const LucideDefault: any;
  export default LucideDefault;
}

declare module 'next/link' {
  // permissive fallback for Next.js Link component to avoid JSX typing errors
  const Link: any;
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

// @react-pdf/renderer types - PDF generation library
declare module '@react-pdf/renderer' {
  import type { ReactNode, FC, CSSProperties } from 'react';
  
  // PDF-specific style type
  export interface Style {
    [key: string]: any;
  }
  
  // Font registration
  export const Font: {
    register: (config: {
      family: string;
      fonts?: Array<{
        src: string;
        fontWeight?: number | string;
        fontStyle?: string;
      }>;
      src?: string;
    }) => void;
  };
  
  // StyleSheet helper
  export const StyleSheet: {
    create: <T extends Record<string, Style>>(styles: T) => T;
  };
  
  // PDF Components (as permissive types to avoid JSX conflicts)
  export const Document: any;
  export const Page: any;
  export const View: any;
  export const Text: any;
  export const Image: any;
  export const Link: any;
  export const Canvas: any;
  export const PDFViewer: any;
  
  // PDF Download Link component
  export interface PDFDownloadLinkProps {
    document: ReactNode;
    fileName?: string;
    className?: string;
    style?: CSSProperties;
    children: (props: {
      blob: Blob | null;
      url: string | null;
      loading: boolean;
      error: Error | null;
    }) => ReactNode;
  }
  export const PDFDownloadLink: FC<PDFDownloadLinkProps>;
  
  // PDF rendering functions
  export function pdf(element: ReactNode): {
    toBlob: () => Promise<Blob>;
    toBuffer: () => Promise<Buffer>;
    toString: () => Promise<string>;
  };
  export function renderToStream(element: ReactNode): NodeJS.ReadableStream;
  export function renderToFile(element: ReactNode, filePath: string): Promise<void>;
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
