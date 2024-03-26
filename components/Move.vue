<template>
  <div class="move__wrapper">
    <div
      class="move"
      ref="moveEl"
      v-bind="$attrs"
      @click="click"
      @dblclick="dblclick"
    >
      <div ref="contentEl" class="move__content">
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

<script setup>
import Moveable from "vue3-moveable";

defineOptions({
  inheritAttrs: false,
});

const interactOptions = ref({
    target: null,
    draggable: true,
    throttleDrag: 1,
    startDragRotate: 0,
    throttleDragRotate: 0,
    resizable: true,
    throttleResize: 1,
    edge: true,
  }),
  props = defineProps({
    options: {
      type: Object,
      default: {},
    },
  }),
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
  style = ref({
    ...{
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    ...model.value,
  }),
  emit = defineEmits(["init", "update", "dblclick", "click"]);

watch(
  style,
  (value) => {
    model.value = value;
  },
  { deep: true }
);

function click(event) {
  emit("click", event);
}

function dblclick(event) {
  emit("dblclick", event);
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
    style.value.width = contentRect.width;
  }
  if (style.value.height < contentRect.height) {
    moveEl.value.style.height = `${contentRect.height}px`;
    style.value.height = contentRect.height;
  }
  moveRef.value.updateRect();
  emit("update", { el: moveEl.value, style: style.value });
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
  style: style.value,
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
    height: max-content;
    width: 100%;
  }
}
</style>
