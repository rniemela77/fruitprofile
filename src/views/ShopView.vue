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
</script>

<template>
  <main>
    <div v-for="item in inventoryStore.items" :key="item.id">
      <RouterLink :to="`/item/${item.id}`">{{ item }}</RouterLink>
      <button @click="addToCart(item.id)">Add to cart</button>
    </div>
    {{ cartStore.itemsInCart }}
  </main>
</template>
