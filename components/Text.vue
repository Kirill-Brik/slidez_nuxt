<template>
  <div class="editor">
    <ckeditor ref="editor" class="editor__field" v-model="model" :config="config" :editor="ClassicEditor"
              @ready="onReady" @focus="focusHandler" @blur="blurHandler"/>
    <code class="editor__value">{{ model }}</code>
  </div>
</template>

<script setup lang="ts">
import {
  ClassicEditor,
  AccessibilityHelp,
  Autosave,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Highlight,
  Italic,
  Paragraph,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ru.js';
import 'ckeditor5/ckeditor5.css';

const redactor = useRedactor()
const editor = ref<{ instance: ClassicEditor }>()
const config = reactive({
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'selectAll',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      'code',
      'removeFormat',
      '|',
      'specialCharacters',
      'highlight',
      '|',
      'accessibilityHelp'
    ],
    shouldNotGroupWhenFull: true
  },
  plugins: [
    AccessibilityHelp,
    Autosave,
    Bold,
    Code,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Highlight,
    Italic,
    Paragraph,
    RemoveFormat,
    SelectAll,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Subscript,
    Superscript,
    Underline,
    Undo
  ],
  fontFamily: {
    supportAllValues: true
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true
  },
  language: 'ru',
  translations: [translations]
})
const toolbarEl = ref<HTMLElement>()
const model = defineModel()
const isFocus = computed(() => editor.value?.instance?.ui.focusTracker.isFocused || false)

function focusHandler() {
  if (toolbarEl.value) {
    toolbarEl.value = redactor.layerOptionsEl?.appendChild(toolbarEl.value)
  }
}

function blurHandler() {
  toolbarEl.value?.remove()
}

function onReady(editorState: ClassicEditor) {
  if (!editorState.ui.view.toolbar.element) return
  toolbarEl.value = editorState.ui.view.toolbar.element
}

watch(isFocus, (value) => {
  console.log(value)
})

onUnmounted(() => {
  editor.value?.instance.destroy()
})
</script>

<style lang="scss" scoped>
.editor {
  position: relative;

  &:deep() {
    .ck-editor {
      height: 100%;
      width: 100%;

      &__main {
        height: 100%;
        min-width: 100%;
      }

      .ck-content {
        height: 100%;
        width: 100%;
      }

    }
  }

  &__value {
    position: absolute;
    top: 100%;
    left: 0;
    pointer-events: none;
  }
}
</style>
