export interface IPopupOptions {
  animation?: boolean;
  html?: boolean;
  delay?: number | {
    show: number;
    hide: number;
  };
  container?: string | HTMLElement | false;
  placement?: string | ((popupEl: HTMLElement, triggerEl: HTMLElement) => string);
  template?: string;
  offset?: number | string;
  fallbackPlacement?: string | string[];
  boundary?: string | HTMLElement;
  trigger?: string;
  sanitize?: boolean;
  sanitizeFn?: (content: string) => string;
}
