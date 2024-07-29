import { defineStore } from 'pinia'
import Reveal from "reveal.js";

export const useRevealInstance = defineStore('revealInstance', () => {
  const reveal = ref<any>(null)

  function createInstance (el: any) {
    reveal.value = new Reveal(el, {
      disableLayout: true,
      // plugins: [Markdown],
    });
  }

  function init () {
    reveal.value.initialize();
  }

  function sync () {
    reveal.value.sync();
  }

  return {
    reveal,
    createInstance,
    init,
    sync
  }
})
