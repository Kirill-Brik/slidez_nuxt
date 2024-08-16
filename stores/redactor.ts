import { uniqueId } from "lodash";

export const useRedactor = defineStore("Redactor", {
  state: () => ({
    layerOptionsEl: null as HTMLElement | null
  })
});
