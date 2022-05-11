<script setup>
import { RouterLink } from "vue-router";

import { useInventoryStore } from "@/stores/inventory";
import { useCartStore } from "@/stores/cart";
const inventoryStore = useInventoryStore();
const cartStore = useCartStore();

const addToCart = (itemId) => {
  console.log("adding: ", itemId);
  cartStore.addToCart(itemId);
};

const removeFromCart = (itemId) => {
  console.log("removing: ", itemId);
  cartStore.removeFromCart(itemId);
};

const itemIsInCart = (itemId) => {
  return cartStore.itemIsInCart(itemId);
};
</script>

<template>
  <main>
    <div v-for="item in inventoryStore.items" :key="item.id">
      <RouterLink :to="`/item/${item.id}`">{{ item }}</RouterLink>

      <button v-if="!itemIsInCart(item.id)" @click="addToCart(item.id)">
        Add to cart
      </button>

      <button v-if="itemIsInCart(item.id)" @click="removeFromCart(item.id)">
        Remove from cart
      </button>
    </div>
    {{ cartStore.itemsInCart }}
  </main>
</template>
