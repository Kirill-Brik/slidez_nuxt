<template>
  <ModalImageInput
    v-model:show="state.showModal"
    @submit="loadImage"
    @close="clearBlock"
    url="https://media.tenor.com/t3dLLNaI50oAAAAM/cat-cats.gif"
  />
  <BlockLayout
    v-if="state.loaded"
    v-model="model"
    ref="move"
    @toggleFocus="state.showModal = true"
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
const revealStore = useRevealInstance();
const { indexh, indexv } = revealStore.reveal.getState();

const redactorStore = useRedactor();

const model = defineModel<{
    id: SlideImageBlock["id"];
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

const move = ref<any>(null);

const state = reactive({
  imageUrl: "",
  loaded: false,
  showModal: true,
});

function clearBlock() {
  if (!state.loaded) {
    redactorStore.removeBlock(indexh, indexv, model.value.id);
  }
}

function loadImage (url: string) {
  state.imageUrl = url;
  const img = new Image();

  img.onload = async function () {
    model.value.style.height = img.naturalHeight;
    model.value.style.width = img.naturalWidth;

    state.loaded = true;
    await nextTick()
    move.value?.update();
  };

  img.src = state.imageUrl;
}
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
