import { defineStore } from "pinia";

export const useFiltersStore = defineStore({
  id: "filters",
  state: () => ({
    minPrice: 0,
    maxPrice: 99,

    tags: [],

    selected: {
      minPrice: 0,
      maxPrice: 99,

      tags: [],
    },
  }),
});
