interface SlideSettings {
  background: string;
}

interface slideBlock {
  type: "text";
  content: string;
  style: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
}

interface Slide {
  settings: SlideSettings;
  blocks: slideBlock[];
}

export const useRedactor = defineStore("redactor", () => {
  const defaultSlide = (): Slide => ({
      settings: { background: "white" },
      blocks: [],
    }),
    defaultBlock = (): slideBlock => ({
      type: "text",
      content: "",
      style: { width: 0, height: 0, top: 0, left: 0 },
    });

  const list = ref<Slide[]>([defaultSlide()]),
    activeBlock = ref<slideBlock | null>(null);

  function addSlide(position: number) {
    list.value.splice(position, 0, defaultSlide());
  }
  function removeSlide(position: number) {
    list.value.splice(position, 1);
  }
  function addBlock(slide: number) {
    list.value[slide].blocks.push(defaultBlock());
  }
  return { list, addSlide, removeSlide, addBlock, activeBlock };
});
