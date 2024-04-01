<template>
  <section
    ref="slideEl"
    class="slide"
    :data-background-color="settings.background"
  >
    <template v-for="(block, index) in blocks">
      <BlockText
        v-if="block.type === 'text'"
        v-model="blocks[index]"
        :move-options="moveOptions"
        :outside-target="revealEl"
        @focus="focus"
        @blur="blur"
        @init="init"
      />
    </template>
  </section>
</template>

<script setup>
const settings = defineModel("settings")
const  blocks = defineModel("blocks")

const props = defineProps({
    revealEl: {
      type: HTMLElement,
      default: document.body,
    },
  }),

const redactorStore = useRedactor()

const slideEl = ref(null)
const moveOptions = ref({ dragContainer: slideEl });

function init(model) {
  console.log('init');
  // if (redactorStore.activeBlock) redactorStore.activeBlock.blur();
  // redactorStore.changeActiveBlock(model);
  model.focus();
}

function focus(model) {
  console.log(redactorStore.activeBlock);
  if (redactorStore.activeBlock) redactorStore.activeBlock.blur();
  redactorStore.changeActiveBlock(model);
}

function blur() {
  redactorStore.changeActiveBlock(null);
}
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
}
</style>
