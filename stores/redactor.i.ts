export enum EBlockTypes {
  TEXT = "text",
  IMAGE = 'image',
}

interface SlideSettings {
  background: string;
}

interface TextSettings {
  name: string;
  size: number;
  style: string;
  weight: number;
}

interface SlideBlock {
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

interface SlideTextBlock extends SlideBlock {
  type: EBlockTypes.TEXT;
  content: string;
  settings: TextSettings;
  focus(): void,
  blur(): void,
}

interface SlideImageBlock extends SlideBlock {
  type: EBlockTypes.IMAGE;
  image: {
    url: string
  };
  settings: TextSettings;
  focus(): void,
  blur(): void,
}

interface Slide {
  settings: SlideSettings;
  blocks: SlideTextBlock[];
  verticalSlides?: Slide[];
}
