declare module 'medium-zoom' {
    interface ZoomOptions {
      margin?: number;
      background?: string;
      scrollOffset?: number;
      container?: string | HTMLElement | null;
      template?: string | HTMLElement;
    }
  
    interface Zoom {
      show: () => void;
      hide: () => void;
      toggle: () => void;
      update: (options?: ZoomOptions) => void;
      clone: () => Zoom;
      attach: (selector: string | Element | Array<Element>) => Zoom;
      detach: () => Zoom;
      on: (type: string, listener: (event: Event) => void) => Zoom;
      off: (type: string, listener: (event: Event) => void) => Zoom;
      getOptions: () => ZoomOptions;
      getImages: () => Element[];
      getZoomedImage: () => Element | null;
    }
  
    export default function mediumZoom(
      selector?: string | Element | Array<Element>,
      options?: ZoomOptions
    ): Zoom;
  }
  