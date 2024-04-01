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
  focus(): void,
  blur(): void,
}

interface SlideTextBlock extends SlideBlock {
  type: "text";
  content: string;
  settings: TextSettings;
}

interface Slide {
  settings: SlideSettings;
  blocks: SlideTextBlock[];
}

export const useRedactor = defineStore("redactor", () => {
  const defaultSlide = (): Slide => ({
      settings: { background: "white" },
      blocks: [],
    }),
    defaultTextBlock = (): SlideTextBlock => {
      const defaultSettings = { size: 14, style: "normal", weight: 400 };
      let style = fontStore.list[0].style.find(
        (style) => style.type === defaultSettings.style
      );
      style = style ? style : fontStore.list[0].style[0];
      const styleName = style.type;
      let weight = style.weight.find((weight) =>
        typeof weight === "number"
          ? weight === defaultSettings.weight
          : weight.min < defaultSettings.weight &&
            weight.max > defaultSettings.weight
      );
      weight = weight
        ? weight
        : typeof style.weight[0] === "number"
        ? style.weight[0]
        : style.weight[0].min;
      const settings = <TextSettings>{
        name: fontStore.list[0].name,
        size: defaultSettings.size,
        style: styleName,
        weight,
      };
      const textBlock = <SlideTextBlock>{
        type: "text",
        content: "",
        style: { width: 0, height: 0, top: 0, left: 0 },
        settings,
      };
      return textBlock;
    };

  const list = ref<Slide[]>([defaultSlide()]),
    activeBlock = ref<SlideBlock | null>(null),
    fontStore = useFont();

  function addSlide(position: number) {
    list.value.splice(position, 0, defaultSlide());
  }
  function removeSlide(position: number) {
    list.value.splice(position, 1);
  }
  function addBlock(slide: number) {
    list.value[slide].blocks.push(defaultTextBlock());
  }

  function changeActiveBlock(block: SlideBlock) {
    activeBlock.value = block
  }
  return { list, addSlide, removeSlide, activeBlock, addBlock, changeActiveBlock };
});

export type {Slide, SlideSettings, SlideBlock, TextSettings, SlideTextBlock,}
