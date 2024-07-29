<template>
  <ModalLayout @close-modal="clearBlock" v-model:show="showModal">
    <template #content>
      <form @submit.prevent="submit">
        <input type="text" v-model="imageURL" placeholder="введите url" />
        <button>ok</button>
      </form>
    </template>
  </ModalLayout>
</template>

<script setup lang="ts">
const blockFocusStore = useBlockFocus()

const emits = defineEmits(["submit","close"]);

const showModal = defineModel("show", { default: true });
const imageURL = defineModel<string>("url", { default: "" });

const submit = () => {
  emits("submit", imageURL.value);
  showModal.value = false;
  blockFocusStore.clearActiveBlock()
};

const clearBlock = () => {
  emits("close")
};
</script>

<style scoped></style>
