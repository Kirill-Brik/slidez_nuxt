<template>
  <section ref="revealRef" class="reveal">
    <div class="slides">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.js";

const revealState = defineModel({}),
  reveal = ref(null),
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
  reveal.value = new Reveal(revealRef.value, {
    disableLayout: true,
    // plugins: [Markdown],
  });
  revealState.value = { indexh: 0, indexv: 0, el: revealRef.value };
  reveal.value.on("slidechanged", (event) => {
    revealState.value.indexh = event.indexh;
    revealState.value.indexv = event.indexv;
  });
  reveal.value.initialize();
});

watch(slidesLength, async (value, oldValue) => {
  await nextTick();
  reveal.value.sync();
  if (value > oldValue) reveal.value.next();
  else {
    if (reveal.value.isFirstSlide()) reveal.value.slide(0)
    else if (reveal.value.isLastSlide()) reveal.value.prev();
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
