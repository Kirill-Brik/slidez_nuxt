<template>
  <main class="page__content redactor">
    <h1 class="redactor__title">Редактор</h1>
    <div class="redactor__menu">
      <h2>Меню</h2>
      <span>Текущий слайд: {{ revealState.indexh + 1 }}</span>
      <br />
      <span>Текущая ступень: {{ revealState.indexv + 1 }}</span>
      <ul>
        <li v-for="block in activeSlide.blocks" tabindex="0">
          <template v-if="block.content">
            {{ block.content.text }}
            <!-- <div v-text="block.content"></div> -->
          </template>
          <template v-else> Text </template>
        </li>
      </ul>
      <button
        type="button"
        @click="addBlock(revealState.indexh, revealState.indexv)"
      >
        Добавить контент
      </button>
      <button
        type="button"
        @click="addImageBlock(revealState.indexh, revealState.indexv)"
      >
        Добавить изображение
      </button>
    </div>
    <div
      class="redactor__reveal-wrapper"
      @click.stop="blockFocusStore.clearActiveBlock()"
    >
      <Reveal class="redactor__reveal" v-model="revealState" :slides="list">
        <section v-for="(slide, indexh) in list" :key="slide">
          <SlideRedactor
            v-model:settings="list[indexh].settings"
            v-model:blocks="list[indexh].blocks"
            class="redactor__slide"
            :reveal-el="revealState.el"
          />
          <template v-if="slide.verticalSlides">
            <SlideRedactor
              v-for="(verticalSlide, indexv) in slide.verticalSlides"
              v-model:settings="list[indexh].verticalSlides[indexv].settings"
              v-model:blocks="list[indexh].verticalSlides[indexv].blocks"
              class="redactor__slide"
              :reveal-el="revealState.el"
            />
          </template>
        </section>
      </Reveal>
    </div>
    <SettingsBlock v-if="activeBlock" class="redactor__content-editor" />
    <div class="redactor__reveal-actions">
      <button
        class="redactor__add-slide"
        type="button"
        @click="addSlide(revealState.indexh + 1)"
      >
        Добавить слайд
      </button>
      <button
        class="redactor__remove-slide"
        type="button"
        @click="removeSlide(revealState.indexh, revealState.indexv)"
        :disabled="deleteButtonDisabled"
      >
        Удалить слайд
      </button>
      <button
        class="redactor__add-subslide"
        type="button"
        @click="addVerticalSlide(revealState.indexh, revealState.indexv)"
      >
        Добавить ступень
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
const redactorStore = useRedactor();
const blockFocusStore = useBlockFocus();

const { list, activeSlide } = storeToRefs(redactorStore);
const { activeBlock } = storeToRefs(blockFocusStore);

const { addBlock, addVerticalSlide, addSlide, removeSlide, addImageBlock } =
  redactorStore;

const deleteButtonDisabled = computed(
  () => list.value.length === 1 && !list.value[0]?.verticalSlides?.length
);

const revealState = ref({ indexh: 0, indexv: 0 });

watch(
  revealState,
  (value) => {
    if (!value.indexv) activeSlide.value = list.value[value.indexh];
    else
      activeSlide.value =
        list.value[value.indexh].verticalSlides[value.indexv - 1];
  },
  { deep: true }
);
</script>

<style lang="scss">
.redactor {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: max-content 1fr 100px;
  width: 100%;
  height: 100vh;

  &__title {
    grid-row: 1/ 2;
    grid-column: 2 / 3;
  }

  &__menu {
    grid-row: 1 / 4;
    grid-column: 1 / 2;
    width: 100%;
    height: 100%;
  }

  &__reveal-wrapper {
    position: relative;
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  &__slide {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__content-editor {
    grid-row: 1 / 4;
    grid-column: 3 /4;
  }

  &__reveal-actions {
    grid-row: 3/ 4;
    grid-column: 2 /3;
  }
}
</style>
