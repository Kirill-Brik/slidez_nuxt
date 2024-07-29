<template>
  <Move
    v-model="block.style"
    :options="fullMoveOptions"
    :contentEqualToWindow="contentEqualToWindow"
    @dblclick="toggleFocus"
    @click.stop="focus"
    ref="move"
  >
    <slot> </slot>
  </Move>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    moveOptions?: {};
    contentEqualToWindow?: boolean;
    keepRatio?: boolean;
  }>(),
  {
    moveOptions: {},
    contentEqualToWindow: false,
    keepRatio: false,
  }
);

const block = defineModel({ default: {} });
const emits = defineEmits(["toggleFocus"]);

const move = ref(null);

const { changeActiveBlock, makeEditable } = useBlockFocus();

const fullMoveOptions = computed(() => {
  return {
    keepRatio: props.keepRatio,
    draggable: !block.value.editable && block.value.focused,
    resizable: !block.value.editable && block.value.focused,
    ...props.moveOptions,
  };
});

function toggleFocus() {
  console.log("toggleFocus");
  makeEditable();
  emits("toggleFocus");
}

function focus() {
  if (!block.value.focused) {
    changeActiveBlock(block.value);
  }
}

onMounted(async () => {
  await nextTick();
  block.value.el = move.value.el;
  focus();
});
defineExpose({
  update: () => move.value.update(),
});
</script>

<style lang="scss"></style>
