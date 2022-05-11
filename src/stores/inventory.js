import { defineStore } from "pinia";

export const useInventoryStore = defineStore({
  id: "inventory",
  state: () => ({
    items: [],
  }),
  getters: {
    getItemById: (state) => (id) => state.items.find((item) => item.id === id),
  },
});
