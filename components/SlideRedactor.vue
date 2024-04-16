<template>
  <section
    ref="slideEl"
    class="slide"
    :data-background-color="settings.background"
  >
    <template v-for="(block, index) in blocks">
      <BlockText
      @click.stop
        v-if="block.type === EBlockTypes.TEXT"
        v-model="blocks[index]"
        :move-options="moveOptions"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
import {EBlockTypes} from '@/stores/redactor.i.ts'

const settings = defineModel("settings");
const blocks = defineModel("blocks");

const slideEl = ref(null);
const moveOptions = ref({ dragContainer: slideEl });
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
}
</style>
