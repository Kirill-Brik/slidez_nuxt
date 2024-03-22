<template>
  <section class="slide" :data-background-color="slide.background">
    <Drag ref="drag" v-for="(block, index) in blocks" class="slide__drag">
      <Editor v-model="block.content" class="slide__editor" @change="updateDrag(index)" />
    </Drag>
  </section>
</template>

<script setup>
const slide = defineModel("slide"),
  blocks = defineModel("blocks"),
  drag= ref([])

function updateDrag(index) {
  drag.value[index].update()
}
</script>

<style lang="scss" scoped>
.slide {
  position: relative;

  &__editor {
    // width: 100%;
  }
}
</style>
