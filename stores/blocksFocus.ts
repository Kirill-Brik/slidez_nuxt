export const useBlockFocus = defineStore("blockFocus", () => {
  const activeBlock = ref<SlideBlock | null>(null);

  function changeActiveBlock(block: SlideBlock) {
    if (activeBlock.value) {
      activeBlock.value.editable = activeBlock.value.focused = false;
    }

    activeBlock.value = block;
    activeBlock.value.editable = false;
    activeBlock.value.focused = true;
  }

  function clearActiveBlock() {
    if (activeBlock.value) {
      console.log("outside");
      activeBlock.value.editable = activeBlock.value.focused = false;
      activeBlock.value = null;
    }
  }

  function makeEditable() {
    activeBlock.value.editable = true;
  }

  return {
    activeBlock,
    changeActiveBlock,
    clearActiveBlock,
    makeEditable,
  };
});
