<template>
  <main class="page__content redactor">
    <h1 class="redactor__title">Редактор</h1>
    <div class="redactor__menu">
      <h2>Меню</h2>
      <span>Текущий слайд: {{ revealState.indexh + 1 }}</span>
      <ul>
        <li v-for="block in activeSlide.blocks">
          <template v-if="block.content.length > 0">
            <ul>
              <li v-for="content in block.content" :key="content.id">
                {{ content.data.text }}
              </li>
            </ul>
          </template>
          <template v-else> Text </template>
        </li>
      </ul>
      <button type="button" @click="redactor.addBlock(revealState.indexh)">Добавить контент</button>
    </div>
    <Reveal
      class="redactor__reveal"
      v-model="revealState"
      :slides="redactor.list"
    >
      <SlideRedactor
        v-for="(slide, index) in redactor.list"
        :key="slide"
        v-model:settings="redactor.list[index].settings"
        v-model:blocks="redactor.list[index].blocks"
        class="redactor__slide"
      >
      </SlideRedactor>
    </Reveal>
    <button
      class="redactor__add-slide"
      type="button"
      @click="redactor.addSlide(revealState.indexh + 1)"
    >
      Добавить слайд
    </button>
    <button
      class="redactor__remove-slide"
      type="button"
      @click="redactor.removeSlide(revealState.indexh)"
      :disabled="redactor.list.length === 1"
    >
      Удалить слайд
    </button>
    <button class="redactor__add-subslide" type="button">
      Добавить ступень
    </button>
  </main>
</template>

<script setup>
const redactor = useRedactor(),
  revealState = ref({ indexh: 0, indexv: 0 }),
  activeSlide = ref(redactor.list[0]);
watch(
  revealState,
  (value) => {
    activeSlide.value = redactor.list[value.indexh];
  },
  { deep: true }
);
</script>

<style lang="scss">
.redactor {
  display: grid;
  grid-template-columns: 300px 1fr 100px;
  grid-template-rows: max-content 1fr 100px;
  width: 100%;
  height: 100vh;

  &__title {
    grid-column: 2 / 3;
    grid-row: 1/ 2;
  }

  &__menu {
    grid-column: 1 / 2;
    grid-row: 1 / 4;
    width: 100%;
    height: 100%;
  }

  &__reveal {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  &__slide {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__add-slide {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }

  &__remove-slide {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }

  &__add-subslide {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
}
</style>
