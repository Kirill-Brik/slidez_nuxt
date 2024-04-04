<template>
  <div
    class="editable"
    ref="editableEl"
    :contenteditable="isEditable"
    @input="update"
    placeholder="text"
  ></div>
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
    setStyle();
  },
  { deep: true }
);

function update(event) {
  model.value = {
    value: editableEl.value,
    text: editableEl.value.innerText,
  };
  emit("input", event);
}

function settingsToStyle(settings) {
  let style = "";
  for (let key in settings) {
    switch (key) {
      case "name":
        style = style + `font-family: ${settings[key]};`;
        break;
      case "size":
        style = style + `font-size: ${settings[key]}px;`;
        break;
      case "style":
        style = style + `font-style: ${settings[key]};`;
        break;
      case "weight":
        style = style + `font-weight: ${settings[key]};`;
        break;
      default:
        style = style + `${key}: ${settings[key]};`;
    }
  }
  return style;
}

function setStyle() {
  console.log(selection.value);
  // if (!selection.isCollapsed)
  let style = settingsToStyle(settings.value);
  let elem = document.createElement("span");
  elem.style = style;
  const id = 'h' + new Date().getTime()
  elem.setAttribute('id', id)

  elem.appendChild(document.createTextNode('test'))
  console.log(style, elem);
  // setSelection();
  document.execCommand("insertHTML", false, elem.outerHTML);
  const node = editableEl.value.querySelector(`#${id}`)
  console.dir(node)
  // document.getSelection().extend(node, 0);
}

function updateSelection() {
  selection.value = {};
  if (!document.getSelection().isCollapsed)
    for (let key in document.getSelection()) {
      if (typeof document.getSelection()[key] !== "function")
        selection.value[key] = document.getSelection()[key];
    }
  else selection.value = null;
  console.log("select", document.getSelection());
}

// function setSelection() {
//   document
//     .getSelection()
//     .setBaseAndExtent(
//       selection.value.anchorNode,
//       selection.value.anchorOffset,
//       selection.value.focusNode,
//       selection.value.focusOffset
//     );
// }

// function clearSelection() {
//   setSelection();
//   document.execCommand("insertHTML", false, document.getSelection().toString());
//   console.log('clear')
//   selection.value = null;
// }

// async function saveSelected() {
//   console.log("blur");
//   if (selection.value) {
//     document.execCommand(
//       "insertHTML",
//       false,
//       `<span class='editable__select'>` +
//         document.getSelection() +
//         `</span>`
//     );
//     for (let key in document.getSelection()) {
//       if (typeof document.getSelection()[key] !== "function")
//         if (key !== "anchorOffset")
//           selection.value[key] = document.getSelection()[key];
//         else selection.value[key] = 0;
//     }
//     console.log( 'save', selection.value);
//   }
//   document.removeEventListener("selectionchange", updateSelection);
// }

// function init () {
//   editableEl.value.addEventListener("selectstart", (event) => {
//     // console.log(selection.value);
//     // if (selection.value) {
//     //   clearSelection();
//     // }
//     // selection.value = null;
//     document.addEventListener("selectionchange", updateSelection);
//   });
// }

onMounted(async () => {
  await nextTick();
  document.addEventListener("selectionchange", updateSelection);
  // init()
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
