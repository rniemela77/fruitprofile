<script setup>
import { RouterLink } from "vue-router";

import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const addToCart = (itemId) => {
  cartStore.addToCart(itemId);
};

const removeFromCart = (itemId) => {
  cartStore.removeFromCart(itemId);
};

const itemIsInCart = (itemId) => {
  return cartStore.itemIsInCart(itemId);
};
</script>

<template>
  <div class="thumb">
    <RouterLink :to="`/item/${props.item.id}`">
      <img :src="props.item.img_url" height="200" width="200" />
      <div class="row">
        <h2>{{ props.item.name }}</h2>
        <p>${{ props.item.price }}</p>
      </div>

      <p>{{ props.item.tags }}</p>
    </RouterLink>

    <button
      v-if="!itemIsInCart(props.item.id)"
      @click="addToCart(props.item.id)"
      class="cart-button"
    >
      Add to Cart
    </button>

    <button
      v-if="itemIsInCart(props.item.id)"
      @click="removeFromCart(props.item.id)"
      class="cart-button cart-button--empty"
    >
      Remove from Cart
    </button>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart-button {
  width: 100%;
  padding: 0.5rem;
  background: var(--green-medium);
  border: none;
  font-weight: bold;
  transition: 0.25s;
  border: 2px solid var(--green-dark);
  color: white;
}
.cart-button--empty {
  background: var(--green-dark);
}
.cart-button:hover {
  cursor: pointer;
}
</style>
