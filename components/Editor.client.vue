<template>
  <div ref="editorEl" class="editor"></div>
</template>

<script setup>
import EditorJS from "@editorjs/editorjs";

const editor = ref(null),
  editorEl = ref(null),
  data = defineModel();

onMounted(async () => {
  await nextTick();
  editor.value = new EditorJS({
    holder: editorEl.value,
    minHeight: 0,
    autofocus: true,
    placeholder: "Введите текст",
    onChange: async (api, event) => {
      await api.saver.save().then((res) => {
        console.log(res);
        data.value = res.blocks;
      });
    },
  });
  editor.value.isReady.then(() => {
    console.log(editor.value);
  });
});
onUnmounted(() => {
  editor.value.destroy();
});
</script>

<style lang="scss">
.editor {
  min-width: 150px;
  width: 100%;
  height: 100%;

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
