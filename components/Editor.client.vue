<template>
  <div ref="editorEl" class="editor"></div>
</template>

<script setup>
import EditorJS from "@editorjs/editorjs";

const editor = ref(null),
  editorEl = ref(null),
  data = defineModel(),
  emit = defineEmits(['change'])

onMounted(async () => {
  await nextTick();
  editor.value = new EditorJS({
    holder: editorEl.value,
    minHeight: 0,
    autofocus: true,
    placeholder: "Введите текст",
    onChange: async (api, event) => {
      emit('change', event)
      await api.saver.save().then((res) => {
        data.value = res.blocks;
      });
    },
    onReady: async (event) => {
      emit('change', event)
    }
  });
});
onUnmounted(() => {
  editor.value.destroy();
});
</script>

<style lang="scss">
.editor {
  position: relative;
  z-index: 1;

  background-color: red;

  .codex-editor__redactor {
    margin-right: 0;
  }

  .ce-toolbar__actions {
    right: 0;
    transform: translate(100%);
  }
  .cdx-block {
    padding: 0;
  }
}
</style>
