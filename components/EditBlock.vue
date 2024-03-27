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
        <ElInputNumber v-model="textSetting.size" />
      </ElFormItem>
      <ElFormItem label="Начертание">
        <ElRadioGroup v-model="textSetting.style">
          <ElRadio v-for="style in activeFont.style" :value="style.type">{{
            style.type
          }}</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="Размер">
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
        <ElInputNumber v-if="variableActiveWeight.length > 0" v-for="weight in variableActiveWeight" v-model="textSetting.weight" :min="weight.min" :max="weight.max" />
      </ElFormItem>
    </div>
  </div>
</template>

<script setup>
const fontStore = useFont(),
  activeFont = ref(fontStore.list[0]),
  activeStyle = ref(activeFont.value.style[0]),
  variableActiveWeight = computed(() => {
    return activeStyle.value.weight.filter(weight => typeof weight === 'object')
  }),
  constActiveWeight = computed(() => {
    return activeStyle.value.weight.filter(weight => typeof weight === 'number')
  }),
  textSetting = ref({
    name: fontStore.list[0].name,
    size: 14,
    style: fontStore.list[0].style[0].type,
    weight: ''
  });

function updateActiveStyle(font) {
  activeStyle.value = font.style.find(style => style.type === activeStyle.value.type)
}

function updateTextSettings(font) {
  textSetting.value.name = font.name;
  textSetting.value.style = activeStyle.value.type;
}

watch(activeFont, (value) => {
  updateActiveStyle(value);
  updateTextSettings(value);
});

onMounted(() => {
  updateActiveStyle(activeFont.value);
  updateTextSettings(activeFont.value);
});
</script>

<style lang="scss" scoped>
.edit {
}
</style>
