import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    itemsInCart: [3],
  }),
  actions: {
    addToCart(id) {
      this.itemsInCart.push(id);
    },
  },
});
