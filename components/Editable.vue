<template>
  <div
    class="editable"
    ref="editableEl"
    :contenteditable="isEditable"
    @input="update"
    placeholder="text"
  >
    <div class="editable__text"></div>
  </div>
</template>

<script setup>
const editableEl = ref(null);
const model = defineModel({ default: { value: "", text: "" } });
const settings = defineModel("settings", { default: {} });
const props = defineProps({
  isEditable: {
    default: true,
  },
});
const selection = ref(null);
const emit = defineEmits(["input"]);

watch(
  settings,
  (value) => {
    changeStyle();
  },
  { deep: true }
);

function update(event) {
  model.value = {
    value: editableEl.value.innerHTML,
    text: editableEl.value.innerText,
  };
  emit("input", event);
}

function changeStyle() {
  const selection = document.getSelection();
  // console.log(selection);
  // if (!selection.isCollapsed)
  //   document.execCommand(
  //     "insertHTML",
  //     false,
  //     `<span class='test'>` + document.getSelection() + `</span>`
  //   );
}

function saveSelected() {
  console.log("select");
  selection.value = document.getSelection();
}

onMounted(async () => {
  await nextTick();
  editableEl.value.addEventListener("selectstart", (event) => {
    if (selection.value) {
      console.log(selection.value.anchorNode)
      document.execCommand("insertHTML", false, selection.value.toString());
    };
    document.addEventListener("selectionchange", saveSelected)
  });
});

defineExpose({
  el: editableEl,
});
</script>

<style lang="scss">
.editable {
  width: 100%;
  min-height: 20px;

  &:empty::before {
    content: attr(placeholder);
    color: gray;
  }

  &:focus {
    outline: none;
  }

  &::selection {
    background-color: cadetblue;
  }

  &__select {
    background-color: cadetblue;
  }

  &__text {
    width: 100%;
    // min-height: calc(v-bind('settings.size') * 1px);
    // font-family: v-bind('settings.name');
    // font-size: calc(v-bind('settings.size') * 1px);
    // font-weight: v-bind('settings.weight');
    // font-style: v-bind('settings.style');
  }
}
</style>
