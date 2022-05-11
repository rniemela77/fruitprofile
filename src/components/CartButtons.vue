<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

const props = defineProps({
  id: {
    type: Number,
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
  <div>
    <button
      v-if="!itemIsInCart(props.id)"
      @click="addToCart(props.id)"
      class="cart-button"
    >
      Add to Cart
    </button>

    <button
      v-if="itemIsInCart(props.id)"
      @click="removeFromCart(props.id)"
      class="cart-button cart-button--empty"
    >
      Remove from Cart
    </button>
  </div>
</template>

<style scoped>
.cart-button {
  width: 100%;
  padding: 0.5rem;
  background: var(--green-medium);
  border: none;
  font-weight: bold;
  transition: 0.25s;
  border: 2px solid var(--green-medium);
  color: white;
}
.cart-button--empty {
  background: transparent;
}
.cart-button--empty:hover {
  color: var(--red);
  border-color: var(--red);
}
.cart-button:hover {
  cursor: pointer;
  filter: brightness(1.2);
}
</style>
