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
  blocks = defineModel("blocks"),
  redactor = useRedactor(),
  slideEl = ref(null),
  moveOptions = ref({ dragContainer: slideEl });

function focus(model) {
  redactor.activeBlock = model;
}

function blur() {
  redactor.activeBlock = null;
}
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
}
</style>
