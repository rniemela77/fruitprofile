<script setup>
import FiltersControl from "@/components/FiltersControl.vue";

import { computed } from "vue";
import { RouterLink } from "vue-router";

import { useInventoryStore } from "@/stores/inventory";
import { useCartStore } from "@/stores/cart";
import { useFiltersStore } from "@/stores/filters";
const inventoryStore = useInventoryStore();
const cartStore = useCartStore();
const filtersStore = useFiltersStore();

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

const filteredItems = computed(() => {
  return inventoryStore.items.filter((item) => {
    return (
      item.price >= filtersStore.price.minPrice &&
      item.price <= filtersStore.price.maxPrice
    );
  });
});
</script>

<template>
  <main>
    <FiltersControl />

    <div v-for="item in filteredItems" :key="item.id">
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
