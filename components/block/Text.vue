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
      v-model:settings="model.settings"
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
    outsideTarget: {
      type: HTMLElement,
      default: document.body,
    },
    isFocus: {
      type: Boolean,
      default: false,
    },
  }),
  moveOptions = ref({}),
  fullMoveOptions = computed(() => {
    return { ...moveOptions.value, ...props.moveOptions };
  }),
  move = ref(null),
  content = ref(null),
  isFocus = ref(false),
  isEdit = ref(false),
  emit = defineEmits(["focus", "blur", "init"]),
  redactor = useRedactor();

function initMove() {
  props.outsideTarget.addEventListener("mousedown", outsideEvent);
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
    props.outsideTarget.addEventListener("mousedown", outsideEvent);
    emit("focus", model.value);
  }
}

function blur() {
  isFocus.value =
    isEdit.value =
    moveOptions.value.draggable =
    moveOptions.value.resizable =
      false;

  console.log("outside");
  props.outsideTarget.removeEventListener("mousedown", outsideEvent);
  emit("blur");
}

function outsideEvent(event) {
  if (
    event.target !== move.value.el &&
    !event.composedPath().includes(move.value.el)
  )
    blur();
}

async function toggleFocus() {
  console.log("toggleFocus");
  moveOptions.value.draggable = moveOptions.value.resizable = false;
  isFocus.value = isEdit.value = true;
  await nextTick();
  content.value.el.focus();
}

onMounted(async () => {
  model.value.focus = focus;
  model.value.blur = blur;
  await nextTick();
  model.value.el = move.value.el;
  emit("init", model.value);
});
</script>
