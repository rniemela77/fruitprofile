<script setup>
import ItemList from "@/components/ItemList.vue";

import { computed } from "vue";

import { useInventoryStore } from "@/stores/inventory";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const inventoryStore = useInventoryStore();

const items = computed(() => {
  return inventoryStore.items.filter((item) => cartStore.itemIsInCart(item.id));
});
</script>

<template>
  <div class="about">
    <h1>itemsInCart the cart page</h1>

    <ItemList :items="items" />
  </div>
</template>

<style></style>
