interface Font {
  name: string;
  style: {
    type: "normal" | "italic";
    weight: (number | { min: number; max: number })[];
  }[];
}

const mockFontData = <Font[]>[
  {
    name: "Roboto",
    style: [
      { type: "normal", weight: [100, 300, 400, 500, 700, 900] },
      { type: "italic", weight: [100, 300, 400, 500, 700, 900] },
    ],
  },
  {
    name: "Playfair Display",
    style: [
      { type: "normal", weight: [{ min: 400, max: 900 }] },
      { type: "italic", weight: [{ min: 400, max: 900 }] },
    ],
  },
  {
    name: 'Montserrat',
    style: [
      { type: "normal", weight: [{ min: 100, max: 900 }] },
      { type: "italic", weight: [{ min: 100, max: 900 }] },
    ],
  }
];

export const useFont = defineStore("font", () => {
  const list = ref<Font[]>(mockFontData);

  return {list}
});
