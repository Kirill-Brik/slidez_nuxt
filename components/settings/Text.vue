<template>
  <div class="edit">
    <div class="edit__text">
      <h4 class="edit__text-title">Text</h4>
      <ElFormItem label="Шрифт">
        <ClientOnly>
          <ElSelect v-model="textSetting.name" value-key="name">
            <ElOption
              v-for="font in fontStore.list"
              :key="font.name"
              :label="font.name"
              :value="font.name"
            ></ElOption>
          </ElSelect>
        </ClientOnly>
      </ElFormItem>
      <ElFormItem label="Размер">
        <ElInputNumber v-model="textSetting.size" :min="1" :max="64" />
      </ElFormItem>
      <ElFormItem label="Начертание">
        <ElRadioGroup v-if="activeFont" v-model="textSetting.style">
          <ElRadio v-for="style in activeFont.style" :value="style.type">
            {{ style.type }}
          </ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="Жирность">
        <ElSelect
          v-if="constActiveWeight.length > 0"
          v-model="textSetting.weight"
        >
          <ElOption
            v-for="weight in constActiveWeight"
            :key="weight"
            :label="weight"
            :value="weight"
          ></ElOption>
        </ElSelect>
        <ElInputNumber
          v-if="variableActiveWeight.length > 0"
          v-for="weight in variableActiveWeight"
          v-model="textSetting.weight"
          :min="weight.min"
          :max="weight.max"
        />
      </ElFormItem>
    </div>
  </div>
</template>

<script setup>
const activeBlock = defineModel({ default: {} });
const fontStore = useFont(),
  textSetting = ref(activeBlock.value.settings),
  activeFont = computed(() => {
    return fontStore.list.find((font) => font.name === textSetting.value.name);
  }),
  activeStyle = computed(() => {
    if (activeFont.value.style)
      return activeFont.value.style.find(
        (style) => style.type === textSetting.value.style
      );
    else return null;
  }),
  variableActiveWeight = computed(() => {
    if (activeStyle.value)
      return activeStyle.value.weight.filter(
        (weight) => typeof weight === "object"
      );
    else return [];
  }),
  constActiveWeight = computed(() => {
    if (activeStyle.value)
      return activeStyle.value.weight.filter(
        (weight) => typeof weight === "number"
      );
    else return [];
  });

watch(
  textSetting,
  (value) => {
    activeBlock.value.settings = textSetting.value;
  },
  { deep: true }
);

watch(activeBlock.value, (value) => {
  textSetting.value = activeBlock.value.settings;
});

onMounted(() => {
  // initDefaultSettings();
});
</script>

<style lang="scss" scoped>
.edit {
}
</style>
