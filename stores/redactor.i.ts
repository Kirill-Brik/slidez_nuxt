export enum EBlockTypes {
  TEXT = "BlockText",
  IMAGE = "BlockImage",
}

export interface SlideSettings {
  background: string;
}

export interface TextSettings {
  name: string;
  size: number;
  style: string;
  weight: number;
}

export interface SlideBlock {
  id: string;
  focused?: boolean;
  editable?: boolean;
  el: HTMLElement | null;
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
  settings: TextSettings;
  focus(): void;
  blur(): void;
}

export interface SlideImageBlock extends SlideBlock {
  type: EBlockTypes.IMAGE;
  image: {
    url: string;
  };
}

export interface Slide {
  settings: SlideSettings;
  blocks: (SlideTextBlock | SlideImageBlock)[];
  verticalSlides?: Slide[];
}
