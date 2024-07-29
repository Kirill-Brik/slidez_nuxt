<template>
    <Application ref="appRef" :width="240" :height="240" background="aquamarine">
      <Text :style="{ fill: 'white' }">
        Hello NuxtJS World
      </Text>
    </Application>
</template>

<script setup lang="ts">
import type { ApplicationInst } from 'vue3-pixi'

const appRef = ref<ApplicationInst>()
</script>
