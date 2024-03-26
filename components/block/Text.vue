<template>
  <Move
    v-model="model.style"
    ref="move"
    :options="fullMoveOptions"
    @init="initMove"
    @dblclick="toggleFocus"
    @click="focus"
  >
    <Editable
      v-model="model.content"
      :is-editable="isEdit"
      ref="content"
      @input="updateMove"
    />
  </Move>
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
  }),
  moveOptions = ref({}),
  fullMoveOptions = computed(() => {
    return { ...moveOptions.value, ...props.moveOptions };
  }),
  move = ref(null),
  content = ref(null),
  isFocus = ref(true),
  isEdit = ref(false),
  emit = defineEmits(["focus", "blur"]);

function initMove() {
  document.addEventListener("mousedown", outsideEvent);
}

function updateMove() {
  move.value.update();
}

function focus() {
  if (!isFocus.value) {
    console.log("focus");
    isEdit.value = false;
    isFocus.value =
      moveOptions.value.draggable =
      moveOptions.value.resizable =
        true;
    document.addEventListener("mousedown", outsideEvent);
    emit("focus", model.value);
  }
}

function outsideEvent(event) {
  if (
    event.target !== move.value.el &&
    !event.composedPath().includes(move.value.el)
  ) {
    isFocus.value =
      isEdit.value =
      moveOptions.value.draggable =
      moveOptions.value.resizable =
        false;

    console.log("outside");
    document.removeEventListener("mousedown", outsideEvent);
    emit("blur");
  }
}

async function toggleFocus() {
  console.log("toggleFocus");
  moveOptions.value.draggable = moveOptions.value.resizable = false;
  isFocus.value = isEdit.value = true;
  await nextTick();
  content.value.el.focus();
}

onMounted(() => {
  emit("focus", model.value);
});
</script>
