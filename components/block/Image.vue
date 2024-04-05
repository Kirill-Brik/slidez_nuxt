<template>
  <BlockLayout
    v-if="state.loaded"
    v-model="model"
    ref="move"
    :moveOptions="moveOptions"
    :contentEqualToWindow="true"
    :keepRatio="true"
  >
    <div
      class="image-block"
      :style="{
        backgroundImage: `url(${state.imageUrl})`,
        width: model.style.width + 'px',
        height: model.style.height + 'px',
      }"
    ></div>
  </BlockLayout>
</template>

<script setup lang="ts">
const { changeActiveBlock } = useBlockFocus();

const model = defineModel<{
    style: {
      height: number;
      width: number;
    };
  }>({ default: {} }),
  props = defineProps({
    moveOptions: {
      type: Object,
      default: {
        draggable: true,
        resizable: true,
        checkInput: false,
      },
    },
  });

const move = ref(null),
  img = ref(null);

const state = reactive({
  imageUrl: "https://media.tenor.com/t3dLLNaI50oAAAAM/cat-cats.gif",
  loaded: false,
});
onMounted(() => {
  const img = new Image();

  img.onload = function () {
    console.log("w: " + img.naturalWidth, "h: " + img.naturalHeight);
    model.value.style.height = img.naturalHeight;
    model.value.style.width = img.naturalWidth;

    state.loaded = true;
  };

  img.src = state.imageUrl;
});
</script>

<style lang="scss">
.image-block {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
