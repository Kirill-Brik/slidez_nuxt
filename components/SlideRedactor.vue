<template>
  <section ref="slideEl" class="slide" :data-background-color="settings.background">
    <TextBlock v-model="blocks[index]" :move-options="moveOptions" v-for="(block, index) in blocks" />
  </section>
</template>

<script setup>
const settings = defineModel("settings"),
  blocks = defineModel("blocks"),
  slideEl = ref(null),
  moveOptions = ref({dragContainer: slideEl})
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
}
</style>
