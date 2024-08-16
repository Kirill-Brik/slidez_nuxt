<template>
  <section ref="revealRef" class="reveal">
    <div class="slides">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">

const revealStore = useRevealInstance()

const revealState = defineModel({}),
  revealRef = ref(null),
  props = defineProps<{
    slides: Slide[]
  }>()

const slidesLength = computed(() => props.slides.reduce((acc,slide) => {
  return acc+= slide.verticalSlides ? slide.verticalSlides.length : 0
},
props.slides.length));

onMounted(async () => {
  await nextTick();
  revealStore.createInstance(revealRef.value)
  revealState.value = { indexh: 0, indexv: 0, el: revealRef.value };
  revealStore.reveal.on("slidechanged", (event) => {
    revealState.value.indexh = event.indexh;
    revealState.value.indexv = event.indexv;
  });
  revealStore.init()
});

watch(slidesLength, async (value, oldValue) => {
  await nextTick();
  revealStore.sync()
  if (value > oldValue) revealStore.reveal.next();
  else {
    if (revealStore.reveal.isFirstSlide()) revealStore.reveal.slide(0)
    else if (revealStore.reveal.isLastSlide()) revealStore.reveal.prev();
  }
});

onUnmounted(() => {
  reveal.value.destroy();
});
</script>

<style lang="scss">
@import "reveal.js/dist/reveal.css";
// @import "reveal.js/dist/theme/black.css";
</style>

<style lang="scss">
.reveal {
  width: 100%;
  height: 100%;

  &-viewport {
    background-color: #eeeeee;
  }

  .slides {
    text-align: start;
  }
}
</style>
