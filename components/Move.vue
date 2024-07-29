<template>
  <div class="move__wrapper">
    <div
      class="move"
      ref="moveEl"
      v-bind="$attrs"
      @click="click"
      @dblclick="dblclick"
      :style="{
        width: `${model.width}px`,
        height: `${model.height}px`,
      }"
    >
      <div
        ref="contentEl"
        class="move__content"
        :style="{
          height: contentEqualToWindow ? '100%' : 'auto',
        }"
      >
        <slot></slot>
      </div>
    </div>
    <Moveable
      class="test"
      ref="moveRef"
      v-bind="fullOptions"
      @drag="onDrag"
      @drag-end="onDragEnd"
      @resize="onResize"
      @resize-end="onResizeEnd"
    />
  </div>
</template>

<script setup lang="ts">
import Moveable from "vue3-moveable";

defineOptions({
  inheritAttrs: false,
});

const interactOptions = ref({
  target: null,
  draggable: false,
  throttleDrag: 1,
  startDragRotate: 0,
  throttleDragRotate: 0,
  resizable: false,
  throttleResize: 1,
  edge: true,
});

const props = defineProps<{
    options?: {};
    contentEqualToWindow?: false;
  }>(),
  fullOptions = computed(() => {
    return { ...interactOptions.value, ...props.options };
  }),
  moveRef = ref(null),
  moveEl = ref(null),
  contentEl = ref(null),
  model = defineModel({
    default: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
  }),
  emit = defineEmits(["init", "update", "dblclick", "click"]);

function click(event) {
  emit("click", event);
}

function dblclick(event) {
  emit("dblclick", event);
}

function onDrag(event) {
  event.target.style.top = `${model.value.top + event.dist[1]}px`;
  event.target.style.left = `${model.value.left + event.dist[0]}px`;
}

function onDragEnd(event) {
  if (event.lastEvent) {
    model.value.top += event.lastEvent.dist[1];
    model.value.left += event.lastEvent.dist[0];
  }
}

function onResize(event) {
  event.target.style.width = `${event.width}px`;
  model.value.width = event.width;

  event.target.style.height = `${event.height}px`;
  model.value.height = event.height;

  event.target.style.top = `${model.value.top + event.drag.dist[1]}px`;
  event.target.style.left = `${model.value.left + event.drag.dist[0]}px`;
}

function onResizeEnd(event) {
  if (event.lastEvent) {
    model.value.top += event.lastEvent.drag.dist[1];
    model.value.left += event.lastEvent.drag.dist[0];
  }
}

function update() {
  const contentRect = contentEl.value.getBoundingClientRect();
  if (model.value.width < contentRect.width) {
    model.value.width = contentRect.width;
  }
  if (model.value.height < contentRect.height) {
    moveEl.value.style.height = `${contentRect.height}px`;
    model.value.height = contentRect.height;
  }
  moveRef.value.updateRect();
  emit("update", { el: moveEl.value, style: model.value });
}

onMounted(async () => {
  await nextTick();
  interactOptions.value.target = moveEl.value;
  update();
  emit("init");
});

defineExpose({
  update,
  el: moveEl,
  style: model.value,
  options: fullOptions.value,
});
</script>

<style lang="scss" scoped>
.test {
  pointer-events: none;
}
.move {
  position: absolute;
  background-color: aquamarine;
  // border: 1px dashed blue;
  width: 150px;
  height: 20px;

  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    z-index: 1;

    &:focus {
      .mode {
        background-color: red;
      }
    }
  }

  &__content {
    position: relative;
    z-index: 1;
    width: 100%;
  }
}
</style>
