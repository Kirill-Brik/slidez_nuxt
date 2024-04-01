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
  el: HTMLElement | null,
  style: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
}

interface SlideTextBlock extends SlideBlock {
  type: "text";
  content: string;
  settings: TextSettings;
}

interface Slide {
  settings: SlideSettings;
  blocks: SlideTextBlock[];
  verticalSlides?: Slide[];
}
