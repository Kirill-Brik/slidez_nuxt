<template>
  <div class="editable" ref="editableEl" :contenteditable="isEditable" @input="update"></div>
</template>

<script setup>
const editableEl = ref(null),
  model = defineModel({default: {value: '', text: ''}}),
  props = defineProps({
    isEditable: {
      default: true
    }
  }),
  emit = defineEmits(['input'])

function update(event) {
  model.value = {
    value: editableEl.value.innerHTML,
    text: editableEl.value.innerText
  }
  emit('input', event)
}

defineExpose({
  el: editableEl,
})
</script>

<style lang="scss" scoped>
.editable {
  width: 100%;
  min-height: 20px;
  height: max-content;

  &:focus {
    outline: none;
  }
}
</style>
