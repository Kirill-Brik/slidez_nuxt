<template>
  <section class="slide" :data-background-color="slide.background">
    <Drag v-for="block in blocks">
      <Editor v-model="block.content" />
    </Drag>
  </section>
</template>

<script setup>
const slide = defineModel("slide"),
  blocks = defineModel("blocks")
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
}
</style>
