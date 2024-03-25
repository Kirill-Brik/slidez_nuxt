interface SlideSettings {
  background: string
}

interface slideBlock {
  content: string
}

interface Slide {
  settings: SlideSettings,
  blocks: slideBlock[]
}

export const useRedactor = defineStore('redactor', () => {
  const defaultSlide = <Slide>{settings: {background: 'white'}, blocks: []},
  defaultBlock = <slideBlock>{content: ''}

  const list = ref<Slide[]>([defaultSlide])

  function addSlide(position: number) {
    list.value.splice(position, 0, defaultSlide)
  }
  function removeSlide(position: number) {
    list.value.splice(position, 1)
  }
  function addBlock(slide:number) {
    list.value[slide].blocks.push(defaultBlock)
  }
  return {list, addSlide, removeSlide, addBlock}
})
