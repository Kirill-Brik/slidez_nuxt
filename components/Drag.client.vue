<template>
  <div class="move" ref="moveEl" v-bind="$attrs">
    <div ref="contentEl" class="move__content" @mousedown="selectContent">
      <slot></slot>
    </div>
  </div>
  <Moveable
    class="test"
    ref="moveRef"
    v-bind="interactOptions"
    @drag="onDrag"
    @drag-end="onDragEnd"
    @resize="onResize"
    @resize-end="onResizeEnd"
    @click="select"
  />
</template>

<script setup>
// import interact from "interactjs";
import Moveable from "vue3-moveable";

const interactOptions = ref({
    target: null,
    draggable: true,
    throttleDrag: 1,
    startDragRotate: 0,
    throttleDragRotate: 0,
    resizable: true,
    throttleResize: 1,
  }),
  moveRef = ref(null),
  moveEl = ref(null),
  contentEl = ref(null),
  style = ref({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

defineOptions({
  inheritAttrs: false,
});

function dragEvent() {
  console.log("drag");
}

function select(event) {
  console.log("click", event.target);
}

function selectContent(event) {
  console.log("content");
  interactOptions.value.draggable = !interactOptions.value.draggable;
}

function onDrag(event) {
  event.target.style.top = `${style.value.top + event.dist[1]}px`;
  event.target.style.left = `${style.value.left + event.dist[0]}px`;
}

function onDragEnd(event) {
  if (event.lastEvent) {
    style.value.top += event.lastEvent.dist[1];
    style.value.left += event.lastEvent.dist[0];
  }
}
function onResize(event) {
  event.target.style.width = `${event.width}px`;
  event.target.style.height = `${event.height}px`;
  event.target.style.top = `${style.value.top + event.drag.dist[1]}px`;
  event.target.style.left = `${style.value.left + event.drag.dist[0]}px`;
}

function onResizeEnd(event) {
  if (event.lastEvent) {
    style.value.width = event.lastEvent.width;
    style.value.height = event.lastEvent.height;
    style.value.top += event.lastEvent.drag.dist[1];
    style.value.left += event.lastEvent.drag.dist[0];
  }
  ``;
}
function update() {
  const contentRect = contentEl.value.getBoundingClientRect();
  if (style.value.width < contentRect.width) {
    moveEl.value.style.width = `${contentEl.width}px`;
    style.value.width = contentRect.height;
  } else if (style.value.height < contentRect.height) {
    moveEl.value.style.height = `${contentEl.height}px`;
    style.value.height = contentRect.height;
  }
  moveRef.value.updateRect();
}

defineExpose({
  update,
});

onMounted(async () => {
  await nextTick();
  interactOptions.value.target = moveEl.value;
  update();
});
</script>

<style lang="scss" scoped>
.test {
  pointer-events: none;
}
.move {
  position: absolute;
  min-height: max-content;
  min-width: max-content;
  background-color: aquamarine;
  // border: 1px dashed blue;

  &__content {
    min-height: max-content;
    min-width: max-content;
  }
}
</style>
