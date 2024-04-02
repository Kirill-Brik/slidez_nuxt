import {EBlockTypes} from './redactor.i.ts'

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
        type: EBlockTypes.TEXT,
        content: "",
        style: { width: 0, height: 0, top: 0, left: 0 },
        settings,
      };
      return textBlock;
    },
    defaultImageBlock = (): SlideImageBlock => {

    }

  const list = ref<Slide[]>([defaultSlide()]),
    activeSlide = ref<Slide>(list.value[0]),
    fontStore = useFont();

  function addSlide(h: number) {
    list.value.splice(h, 0, defaultSlide());
  }
  function removeSlide(h: number, v: number) {
    if (!list.value[h]?.verticalSlides?.length) {
      list.value.splice(h, 1);
      return
    }
    if (!v) {
      const nextSlideH = list.value[h].verticalSlides[0]
      nextSlideH.verticalSlides = list.value[h].verticalSlides.slice(1)

      list.value[h] = nextSlideH
      return
    }
    list.value[h].verticalSlides.splice(v-1,1)
  }
  function addVerticalSlide(h:number,v:number) {
    if (list.value[h]?.verticalSlides?.length) {
      list.value[h].verticalSlides.splice(v-1, 0, defaultSlide())
      return
    }
    list.value[h].verticalSlides = [defaultSlide()]
  }
  function changeActiveSlide(slide: Slide) {
    activeSlide.value = slide
  }
  function addBlock(h: number, v:number) {
    if (!v) {
      list.value[h].blocks.push(defaultTextBlock());
      return
    }
    if (list.value[h].verticalSlides) {
      list.value[h].verticalSlides[v-1].blocks.push(defaultTextBlock())
    }
  }
  function addImageBlock (h: number, v: number) {
    if (!v) {
      list.value[h].blocks.push(defaultTextBlock());
      return
    }
    if (list.value[h].verticalSlides) {
      list.value[h].verticalSlides[v-1].blocks.push(defaultTextBlock())
    }
  }
  return {
    list,
    addSlide,
    addVerticalSlide,
    removeSlide,
    activeSlide,
    changeActiveSlide,
    addBlock,
    addImageBlock,
  };
});
