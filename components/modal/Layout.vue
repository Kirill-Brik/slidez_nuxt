<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <template v-if="show">
        <div class="modal" @click="closeModal">
          <div class="modal__content" @click.stop>
            <slot name="content">

            </slot>
          </div>
        </div>
      </template>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
const emits = defineEmits(['closeModal'])

const show = defineModel<boolean>('show',{ default: false });

const closeModal = () => {
  show.value = false
  emits('closeModal')
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.192);

  width: 100%;
  height: 100%;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    padding: 30px;

    background: white;
    border: 2px rgb(179, 179, 179) solid;
    border-radius: 10px;
  }
}
</style>
