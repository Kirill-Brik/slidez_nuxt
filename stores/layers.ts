export const useLayers = defineStore('Layers', {
 state: () => ({
   list: [],
   selected: null as Node | null
 }),
  actions: {
   addLayer(layer: any) {
    this.list.push(layer || {model: ''})
   }
  }
})
