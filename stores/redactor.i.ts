export enum EBlockTypes {
  TEXT = "text",
  IMAGE = 'image',
}

export interface SlideSettings {
  background: string;
}

export interface TextSettings {
  position: number,
  name: string;
  size: number;
  style: string;
  weight: number;
}

export interface SlideBlock {
  focused?: boolean,
  editable?: boolean,
  el: HTMLElement | null,
  style: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
}

export interface SlideTextBlock extends SlideBlock {
  type: EBlockTypes.TEXT;
  content: string;
  settings: TextSettings[];
  focus(): void,
  blur(): void,
}

export interface SlideImageBlock extends SlideBlock {
  type: EBlockTypes.IMAGE;
  image: {
    url: string
  };
  settings: TextSettings;
  focus(): void,
  blur(): void,
}

export interface Slide {
  settings: SlideSettings;
  blocks: SlideTextBlock[];
  verticalSlides?: Slide[];
}
