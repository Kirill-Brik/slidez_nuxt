<template>
  <BlockLayout
    v-model="model"
    ref="move"
    :moveOptions="moveOptions"
    @toggle-focus="toggleFocus"
  >
    <Editable
      v-model="model.content"
      v-model:settings="model.settings"
      :is-editable="model.editable"
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
    outsideTarget: {
      type: HTMLElement,
      default: document.body,
    },
  });

const move = ref(null),
  content = ref(null);

function updateMove() {
  move.value.update();
}

async function toggleFocus() {
  await nextTick();
  content.value.el.focus();
}
</script>
