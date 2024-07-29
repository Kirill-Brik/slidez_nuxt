<template>
  <div class="edit">
    <SettingsText
      v-if="activeBlock.type === EBlockTypes.TEXT"
      v-model="activeBlock"
    />
  </div>
</template>

<script setup>
import { EBlockTypes } from "@/stores/redactor.i.ts";

const blockFocusStore = useBlockFocus();
const { activeBlock } = storeToRefs(blockFocusStore);
</script>

<style lang="scss" scoped>
.edit {
}
</style>
