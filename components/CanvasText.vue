<template>
  <canvas
    class="canvas"
    ref="canvas"
    @focus="focus"
    @blur="blur"
    tabindex="0"
  ></canvas>
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const model = defineModel({ default: "" });
const lines = ref(adjustText(model.value));
const settings = defineModel<TextSettings[]>("settings");
const style = defineModel("style", { default: { width: 300, height: 150 } });
const isFocus = ref(false);
const cursor = ref({
  isShow: true,
  timer: setInterval(() => {}),
  position: {
    base: 0,
    line: 0,
    linePos: 0,
  },
});
const presedList = ref<string[]>([]);
const emit = defineEmits(["input"]);

watch(model, (value) => {
  renderText(value);
  createCursor(false);
});
watch(
  settings,
  () => {
    renderText(model.value);
  },
  { deep: true }
);
watch(style, () => {
  resizeLayout();
  renderText(model.value);
});

function focus() {
  isFocus.value = true;
  canvas.value?.addEventListener("keydown", keydownHandler);
  canvas.value?.addEventListener("keyup", keyUpHandler);
  createCursor(true);
}
function blur() {
  isFocus.value = false;
  canvas.value?.removeEventListener("keydown", keydownHandler);
  canvas.value?.removeEventListener("keyup", keyUpHandler);
  clearInterval(cursor.value.timer);
  renderText(model.value);
}

function keydownHandler(event: KeyboardEvent) {
  console.log(event);
  const index = presedList.value.indexOf(event.key);
  if (index === -1) presedList.value.push(event.key);
  event.stopPropagation();
  if (ctx.value) {
    switch (event.key) {
      case "Backspace":
        if (cursor.value.position.base > 0) {
          model.value = model.value.length
            ? model.value.slice(0, cursor.value.position.base - 1) +
              model.value.slice(cursor.value.position.base, model.value.length)
            : "";
          cursor.value.position.base =
            cursor.value.position.base > 0 ? --cursor.value.position.base : 0;
        }
        break;
      case "ArrowLeft":
        --cursor.value.position.linePos;
        renderText(model.value);
        normalizeCursorPosition();
        createCursor(true);
        break;
      case "ArrowRight":
        ++cursor.value.position.linePos;
        renderText(model.value);
        normalizeCursorPosition();
        createCursor(true);
        break;
      case "ArrowUp":
        --cursor.value.position.line;
        renderText(model.value);
        normalizeCursorPosition();
        createCursor(true);
        break;
      case "ArrowDown":
        ++cursor.value.position.line;
        renderText(model.value);
        normalizeCursorPosition();
        createCursor(true);
        break;
      case "Enter":
        break;
      case "Shift":
        break;
      default:
        if (event.key.length === 1) {
          model.value =
            model.value.slice(0, cursor.value.position.base) +
            event.key +
            model.value.slice(cursor.value.position.base, model.value.length);
          ++cursor.value.position.base;
        }
    }
  }
}

function keyUpHandler(event: KeyboardEvent) {
  const index = presedList.value.indexOf(event.key);
  presedList.value.splice(index, 1);
}

function renderText(text: string) {
  if (ctx.value && canvas.value) {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.value.fillStyle = "black";
    const { name, size, weight, style } = settings.value
      ? settings.value[0]
      : { name: "serif", size: 14, weight: 400, style: "normal" };
    ctx.value.font = `${style} ${weight} ${size}px ${name}`;
    const measure = ctx.value.measureText(text);
    lines.value = adjustText(text);
    lines.value.forEach((line, index) => {
      if (ctx.value)
        ctx.value.fillText(line.trimStart(), 0, size * (index + 1));
    });
    emit("input", text);
  }
}

function adjustText(text: string) {
  function checkOverflow(str: string) {
    // console.log(ctx.value.measureText(str).width, style.value.width)
    if (ctx.value) return ctx.value.measureText(str).width <= style.value.width;
    else return false;
  }

  function getLine(text: string) {
    let line = "";
    for (let key of text) {
      line = line + key;
      if (!checkOverflow(line)) {
        const wordArr = line.trim().split(" ");
        if (wordArr.length > 1) {
          wordArr.pop();
          line = wordArr.join(" ") + " ";
        } else line = line.slice(0, -1);
        break;
      }
    }
    return line;
  }
  const lines = [];
  let length = text.length;
  if (length === 0) lines.push("");
  if (ctx.value && canvas.value) {
    for (let index = 0; index < length; ) {
      const line = getLine(text.slice(index, text.length));
      lines.push(line);
      index += line.length;
    }
  }
  return lines;
}

function normalizeCursorPosition() {
  const { line, linePos } = cursor.value.position;

  if (line < 0) {
    cursor.value.position.line = 0;
  } else if (line > lines.value.length - 1) {
    cursor.value.position.line = lines.value.length - 1;
  }

  if (linePos > lines.value[line].length) {
    cursor.value.position.line =
      line < lines.value.length - 1
        ? ++cursor.value.position.line
        : lines.value.length - 1;
    cursor.value.position.linePos =
      line < lines.value.length - 1 ? 0 : lines.value[line].length;
  } else if (linePos < 0) {
    cursor.value.position.line = line > 0 ? --cursor.value.position.line : 0;
    cursor.value.position.linePos = line > 0 ? lines.value[line].length : 0;
  }
  let linesLength = 0;
  for (let currentLine = 0; currentLine < line; ++currentLine) {
    linesLength += lines.value[currentLine].length;
  }
  cursor.value.position.base = cursor.value.position.linePos + linesLength;
}

function getCursorLinePosition(position: number) {
  let line = 0;
  let linePosition = 0;
  for (let index = 0; index < position; ) {
    index += lines.value[line].length;
    if (position > index) {
      ++line;
    } else {
      linePosition = lines.value[line].length + (position - index);
    }
  }
  return { line, linePosition };
}

function renderCursor(position: number) {
  if (ctx.value && canvas.value) {
    const { line, linePosition } = getCursorLinePosition(position);
    cursor.value.position.line = line;
    cursor.value.position.linePos = linePosition;
    const measure = ctx.value.measureText(
      lines.value[line].slice(0, linePosition)
    );
    const { name, size, weight, style } = settings.value
      ? settings.value[0]
      : { name: "serif", size: 14, weight: 400, style: "normal" };
    ctx.value.fillStyle = "black";
    // console.log(linePos, line);
    ctx.value.fillRect(
      measure.width,
      measure.fontBoundingBoxDescent + size * line,
      1,
      size
    );
  }
}

function createCursor(isShow: boolean) {
  clearInterval(cursor.value.timer);
  cursor.value.isShow = isShow;
  if (cursor.value.isShow) renderCursor(cursor.value.position.base);
  cursor.value.timer = setInterval(() => {
    if (!cursor.value.isShow) renderCursor(cursor.value.position.base);
    else {
      renderText(model.value);
    }
    cursor.value.isShow = !cursor.value.isShow;
  }, 500);
}

function resizeLayout() {
  if (canvas.value && ctx.value) {
    let dpr = window.devicePixelRatio || 1;
    canvas.value.width = style.value.width * (1 / dpr);
    canvas.value.height = style.value.height * (1 / dpr);
    canvas.value.style.width = style.value.width + "px";
    canvas.value.style.height = style.value.height + "px";
    ctx.value.scale(1 / dpr, 1 / dpr);
  }
}

defineExpose({ el: canvas });

onMounted(async () => {
  await nextTick();
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d");
    style.value = { ...style.value, ...{ width: 300, height: 150 } };
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
