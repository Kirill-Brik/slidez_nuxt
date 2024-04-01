<template>
  <div
    class="editable"
    ref="editableEl"
    :contenteditable="isEditable"
    @input="update"
    placeholder="text"
    @focus="focus"
    @blur="blur"
  >
    <div class="editable__text"></div>
  </div>
</template>

<script setup>
const editableEl = ref(null),
  model = defineModel({ default: { value: "", text: "" } }),
  settings = defineModel("settings", { default: {} }),
  props = defineProps({
    isEditable: {
      default: true,
    },
  }),
  emit = defineEmits(["input"]);

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

function focus(event) {
  console.log("focus");
}

function blur(event) {
  console.log("blur");
  // const selection = document.getSelection();
  // if (!selection.isCollapsed)
  //   console.log(selection.toString())
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
  const selection = document.getSelection();
  if (!selection.isCollapsed)
    document
      .getSelection()
      .setBaseAndExtent(
        editableEl.value,
        0,
        editableEl.value,
        editableEl.value.childNodes.length
      );
}

onMounted(() => {
  document.addEventListener("selectionchange", (event) => {
    const selection = document.getSelection();
    if (!selection.isCollapsed) {
      console.log(selection.toString());
      const end = selection.focusOffset;
      const start = selection.anchorOffset;
      const endNode = selection.focusNode;
      console.log(selection.anchorOffset, selection.focusOffset);
      document.execCommand(
        "insertHTML",
        false,
        `<span class='editable__select'>` + document.getSelection() + `</span>`
      );
      const newselection = document.getSelection();
      if (start > end) newselection.collapse(endNode, end);
    }
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

  &__select {
    background-color: red;
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
