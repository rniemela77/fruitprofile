import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    itemsInCart: [3],
  }),
  getters: {
    itemIsInCart: (state) => (id) => state.itemsInCart.includes(id),
  },
  actions: {
    addToCart(id) {
      this.itemsInCart.push(id);
    },
    removeFromCart(id) {
      this.itemsInCart = this.itemsInCart.filter((item) => item !== id);
    },
  },
});
