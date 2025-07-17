import type * as gsap from "https://esm.sh/gsap@3.11.4";

declare global {
  type email = `${string}@${string}.${string}`;
  interface EventListenerOptions {
    once?: boolean;
  }
  interface EventTarget {
    value: string | number | null | email;
    name: string;
    clientWidth: string | number;
    clientHeight: string | number;
    offsetLeft: string | number;
    classList: DOMTokenList;
    // style: React.CSSProperties;
    toggleAttribute(qualifiedName: string, force?: boolean): boolean;
  }
  interface Element extends ElementCSSInlineStyle {
    offsetHeight: string | number;
  }
  interface Properties {
    [key: `--${string}`]: string | number;
  }
  // eslint-disable-next-line no-var
  var scrollMaxY: number;

  namespace React {
    interface CSSProperties {
      [key: `--${string}`]: string | number;
    }
    interface HTMLAttributes<T> {
      userselect?: string;
    }
  }
}
