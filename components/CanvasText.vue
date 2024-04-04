<template>
  <canvas
    class="canvas"
    ref="canvas"
    @focus="focus"
    @blur="blur"
    tabindex="0"
    :width="style.width"
    :height="style.height"
  ></canvas>
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const model = defineModel({ default: "" });
const settings = defineModel<TextSettings[]>("settings");
const style = ref({ width: 300, height: 100 });
const isFocus = ref(false);
const cursorTimer = ref();
const emit = defineEmits(["input"]);

watch(model, renderText);
watch(
  settings,
  () => {
    renderText(model.value);
  },
  { deep: true }
);

function focus() {
  isFocus.value = true;
  canvas.value?.addEventListener("keydown", keydownHandler);
  createCursor();
}
function blur() {
  isFocus.value = false;
  canvas.value?.removeEventListener("keydown", keydownHandler);
  clearInterval(cursorTimer.value);
  clearCursor(model.value);
}

function keydownHandler(event: KeyboardEvent) {
  console.log(event);
  event.stopPropagation();
  if (event.key === "Backspace")
    model.value = model.value.length
      ? model.value.slice(0, model.value.length - 1)
      : "";
  else if (event.key === "Control") {
  }
  else if (event.key === "Alt") {
  }
  else if (event.key === "Enter") {
  }
  else if (event.key === "Shift") {
  } else model.value = model.value + event.key;
}

function renderText(text: string) {
  if (ctx.value && canvas.value) {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.value.fillStyle = "black";
    const { name, size, weight, style } = settings.value
      ? settings.value[0]
      : { name: "serif", size: 14, weight: 400, style: "normal" };
    ctx.value.font = `${style} ${weight} ${size}px serif`;
    console.log(ctx.value.font);
    ctx.value.fillText(text, 0, size);
    emit("input", text);
  }
}

function renderCursor(text: string) {
  if (ctx.value && canvas.value) {
    const mesaure = ctx.value.measureText(text);
    const { name, size, weight, style } = settings.value
      ? settings.value[0]
      : { name: "serif", size: 14, weight: 400, style: "normal" };
    ctx.value.fillStyle = "black";
    ctx.value.fillRect(
      Math.round(mesaure.width) + 1,
      mesaure.fontBoundingBoxDescent,
      1,
      size
    );
  }
}

function clearCursor(text: string) {
  if (ctx.value && canvas.value) {
    const mesaure = ctx.value.measureText(text);
    const { name, size, weight, style } = settings.value
      ? settings.value[0]
      : { name: "serif", size: 14, weight: 400, style: "normal" };
    ctx.value.fillStyle = "black";
    ctx.value.clearRect(
      Math.round(mesaure.width),
      mesaure.fontBoundingBoxDescent - 1,
      3,
      size + 3
    );
  }
}

function createCursor() {
  let isShowCursor = true;
  cursorTimer.value = setInterval(() => {
    if (isShowCursor) renderCursor(model.value);
    else clearCursor(model.value);
    isShowCursor = !isShowCursor;
  }, 500);
}

defineExpose({ el: canvas });

onMounted(async () => {
  await nextTick();
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    console.log(dpr);
    let rect = canvas.value.getBoundingClientRect();
    canvas.value.width = rect.width *  (1 / dpr);
    canvas.value.height = rect.height * (1 / dpr);
    canvas.value.style.width = rect.width + 'px'
    canvas.value.style.height = rect.height + 'px'
    if (ctx.value) ctx.value.scale((1 / dpr), (1 / dpr));
  }
});
</script>

<style lang="scss" scoped>
.canvas {
  display: block;
  &:focus-visible {
    outline: none;
  }
}
</style>
