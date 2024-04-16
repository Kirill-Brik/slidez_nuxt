<template>
  <BlockLayout
    v-model="model"
    ref="move"
    :moveOptions="moveOptions"
    @toggle-focus="toggleFocus"
    @blur="blur"
  >
    <CanvasText
      v-model="model.content"
      v-model:settings="model.settings"
      v-model:style="model.style"
      ref="content"
      @input="updateMove"
    />
  </BlockLayout>
</template>

<script setup>
const model = defineModel({ default: {} }),
  props = defineProps({
    moveOptions: {
      type: Object,
      default: {
        draggable: true,
        resizable: true,
        checkInput: false,
      },
    },
  });

const move = ref(null),
  content = ref(null);

function updateMove() {
  move.value.update();
}

async function toggleFocus() {
  await nextTick();
  updateMove()
  content.value.setEditable()
  content.value.el.focus();
}

function blur() {
  content.value.disableEditable()
}
</script>
