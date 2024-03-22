<template>
  <div ref="dragEl" class="drag">
    <slot></slot>
  </div>
</template>

<script setup>
import interact from "interactjs";

const interactState = ref(null),
  dragEl = ref(null),
  position = ref({ x: 0, y: 0 }),
  dragOptions = ref({
    cursorChecker() {
      return null;
    },
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        position.value.x += event.dx;
        position.value.y += event.dy;
        event.target.style.top = `calc(50% + ${position.value.y}px)`;
        event.target.style.left = `calc(50% + ${position.value.x}px)`;
      },
    },
  }),
  resizeOptions = ref({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset

        position.value.x += (parseFloat(x) || 0) + event.deltaRect.left
        position.value.y += (parseFloat(y) || 0) + event.deltaRect.top
        console.log(x, y)

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          top: `calc(50% + ${position.value.y}px)`,
          left: `calc(50% + ${position.value.x}px)`
        })
      }
    }
  })

onMounted(async () => {
  await nextTick();
  interactState.value = interact(dragEl.value).draggable(dragOptions.value).resizable(resizeOptions.value);
});
</script>

<style lang="scss" scoped>
.drag {
  position: absolute;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
  width: max-content;
  height: max-content;
  background-color: aquamarine;
  touch-action: none;
  border: 1px dashed blue;
}
</style>
