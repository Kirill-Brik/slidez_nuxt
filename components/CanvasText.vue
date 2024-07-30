<template>
  <Application ref="appRef" :width="240" :height="240" background="aquamarine" tabindex="0"
               @focus="createCursor" @blur="removeCursor">
    <Text ref="textRef">
            <Text ref="symbolsRefList" v-for="(symbol, index) in text.split('')" @render="renderSymbol(index)">
              {{ symbol }}
            </Text>
<!--      {{ text }}-->
      <Graphics v-if="cursor.isShow" @render="renderCursor"/>
    </Text>
  </Application>
</template>

<script setup lang="ts">
import {onTick} from 'vue3-pixi'
import type {ApplicationInst, TextInst, GraphicsInst} from 'vue3-pixi'


const appRef = ref<ApplicationInst>()
const textRef = ref<TextInst>()
const symbolsRefList = ref<TextInst[]>()
const cursor = reactive({
  isShow: false,
  timer: null as null | ReturnType<typeof setTimeout>,
  delay: 600
})
const text = ref('Hello NuxtJS World')

function renderCursor(graphics: GraphicsInst) {
  graphics.beginFill('black');
  graphics.drawRect(0, 0, 3, textRef.value?.height || 10);
}

function createCursor() {
  console.log(symbolsRefList.value)
  if (cursor.timer) clearTimeout(cursor.timer)
  cursor.isShow = true
  cursor.timer = setInterval(() => {
    cursor.isShow = !cursor.isShow
  }, cursor.delay)
}

function removeCursor() {
  if (cursor.timer) clearTimeout(cursor.timer)
  cursor.isShow = false
}

function renderSymbol(index: number) {
  if (!index || !symbolsRefList.value) return
  symbolsRefList.value[index].x = symbolsRefList.value[index - 1].x + symbolsRefList.value[index - 1].width
}

</script>
