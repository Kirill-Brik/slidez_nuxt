<template>
  <section class="slide" :data-background-color="settings.background">
    <Drag ref="drag" v-for="(block, index) in blocks" class="slide__drag">
      <Editor v-model="block.content" class="slide__editor" @change="updateDrag(index)" />
    </Drag>
  </section>
</template>

<script setup>
const settings = defineModel("settings"),
  blocks = defineModel("blocks"),
  drag= ref([])

function updateDrag(index) {
  console.log(drag.value[index])
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
