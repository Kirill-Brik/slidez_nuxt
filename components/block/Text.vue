<template>
  <Move
    v-model="model.style"
    ref="move"
    :options="fullMoveOptions"
    @init="initMove"
    @dblclick="toggleFocus"
    @click="focus"
  >
    <!-- <Editable
      v-model="model.content"
      v-model:settings="model.settings"
      :is-editable="isEdit"
      ref="content"
      @input="updateMove"
    /> -->
  </Move>
</template>

<script setup>
const redactorStore = useRedactor(),
 model = defineModel({ default: {} }),
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
  }),
  moveOptions = ref({}),
  fullMoveOptions = computed(() => {
    return { ...moveOptions.value, ...props.moveOptions };
  }),
  move = ref(null),
  content = ref(null),
  isFocus = computed(() => {
    return redactorStore.activeBlock.el === move.value.el
  }),
  isEdit = ref(false),
  emit = defineEmits(["focus", "blur"]);

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
    console.log(model.value)
    redactorStore.changeActiveBlock(model.value)
      moveOptions.value.draggable =
      moveOptions.value.resizable =
        true;
    props.outsideTarget.addEventListener("mousedown", outsideEvent);
    emit("focus", model.value);
  }
}

function outsideEvent(event) {
  if (
    event.target !== move.value.el &&
    !event.composedPath().includes(move.value.el)
  ) {

      isEdit.value =
      moveOptions.value.draggable =
      moveOptions.value.resizable =
        false;

    console.log("outside");
    props.outsideTarget.removeEventListener("mousedown", outsideEvent);
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

onMounted(async () => {
  await nextTick()
  model.value.el = move.value.el
  redactorStore.changeActiveBlock(model.value)
  // redactorStore.activeBlock = model.value
  // emit("focus", model.value);
});
</script>
