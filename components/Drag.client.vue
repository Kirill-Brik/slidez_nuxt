<template>
  <div ref="dragEl" class="drag">
    <div ref="contentEl" class="drag__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import interact from "interactjs";

const interactState = ref(null),
  dragEl = ref(null),
  contentEl = ref(null),
  style = ref({
    top: 0,
    left: 0,
    width: "",
    height: "",
  }),
  dragOptions = ref({
    cursorChecker() {
      return null;
    },
    listeners: {
      move(event) {
        style.value.top += event.dy;
        style.value.left += event.dx;
      },
    },
  }),
  resizeOptions = ref({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move(event) {
        const contentRect = contentEl.value.getBoundingClientRect()
        style.value.width = event.rect.width;
        style.value.height = event.rect.height > contentRect.height ?  event.rect.height : contentRect.height;
        style.value.top += event.deltaRect.top;
        style.value.left += event.deltaRect.left;
      },
    },
  });

function update() {
  const contentRect = contentEl.value.getBoundingClientRect()
  style.value.width = style.value.width > contentRect.width ?  style.value.width : contentRect.width;
  style.value.height = style.value.height > contentRect.height ?  style.value.height : contentRect.height;
}

onMounted(async () => {
  await nextTick();
  interactState.value = interact(dragEl.value)
    .draggable(dragOptions.value)
    .resizable(resizeOptions.value);
});


onUnmounted(() => {
  interactState.value.unset()
})

defineExpose({
  update
})
</script>

<style lang="scss" scoped>
.drag {
  position: absolute;
  top: calc(50% + (v-bind("style.top") * 1px));
  left: calc(50% + (v-bind("style.left") * 1px));
  width: calc(v-bind("style.width") * 1px);
  height: calc(v-bind("style.height") * 1px);
  min-width: max-content;
  min-height: max-content;
  background-color: aquamarine;
  touch-action: none;
  border: 1px dashed blue;

  &__content {
    min-height: max-content;
    min-width: max-content;
  }
}
</style>
