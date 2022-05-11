<script setup>
import { computed } from "vue";

import { useRoute } from "vue-router";
import { useInventoryStore } from "@/stores/inventory";

import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

const route = useRoute();
const inventoryStore = useInventoryStore();

const item = computed(() => {
  // Convert param 'id' from string to number
  const paramId = parseInt(route.params.id);
  return inventoryStore.getItemById(paramId);
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
  <div class="item">
    <div class="item-image">
      <img :src="item.img_url" height="600" width="600" />
    </div>
    <div class="item-info">
      <h1>{{ item.name }}</h1>
      <p class="price">${{ item.price }}</p>
      <p class="description">{{ item.description }}</p>
      <p>{{ item.tags }}</p>
      <button
        v-if="!itemIsInCart(item.id)"
        @click="addToCart(item.id)"
        class="cart-button"
      >
        Add to Cart
      </button>

      <button
        v-if="itemIsInCart(item.id)"
        @click="removeFromCart(item.id)"
        class="cart-button cart-button--empty"
      >
        Remove from Cart
      </button>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
h1 {
  font-size: 3rem;
  color: var(--green-medium);
}
.price {
  color: var(--green-medium);
  font-size: 2rem;
}
.description {
  color: white;
  margin: 2rem 0;
}
.item-info {
  font-size: 1.5rem;
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
