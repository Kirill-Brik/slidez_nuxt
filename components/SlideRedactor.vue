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
        @focus="focus"
        @blur="blur"
      />
    </template>
  </section>
</template>

<script setup>
const settings = defineModel("settings"),
  blocks = defineModel("blocks")

const redactorStore = useRedactor()

const slideEl = ref(null)
const moveOptions = ref({ dragContainer: slideEl });

function focus(model) {
  redactorStore.activeBlock = model;
}

function blur() {
  redactorStore.activeBlock = null;
}
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
}
</style>
