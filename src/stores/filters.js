import { defineStore } from "pinia";

export const useFiltersStore = defineStore({
  id: "filters",
  state: () => ({
    price: {
      minPrice: 0,
      maxPrice: 99,
    },
  }),
});
