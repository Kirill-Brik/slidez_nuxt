<template>
  <main class="page__content editor">
    <h1> редактор презентаций</h1>
    <NuxtLink to="redactor">редактор</NuxtLink>
    <ElButton @click="layers.addLayer">Добавить Текст</ElButton>
    <div class="editor__wrapper">
      <div class="editor__viewport">
        <Text class="editor__layer" v-for="(layer, index) in layers.list" v-model="layers[index]"/>
      </div>
      <div ref="options" class="editor__options"></div>
    </div>
  </main>
</template>
<script setup lang="ts">
const layers = useLayers()
const redactor = useRedactor()
const options = ref()

watch(options, (value) => {
redactor.layerOptionsEl = options
})
</script>

<style lang="scss" scoped>
.editor {
  display: flex;
  flex-direction: column;

  &__wrapper {
    flex: 1 0 auto;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 300px;
  }

  &__layer {
    width: 300px;
    height: 300px;
  }
}


</style>
