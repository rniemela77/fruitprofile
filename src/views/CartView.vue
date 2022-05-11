<script setup>
import { computed } from "vue";

import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

const itemsInCart = computed(() => {
  return cartStore.itemsInCart;
});
</script>

<template>
  <div class="about">
    <h1>itemsInCart the cart page</h1>
    <p>{{ itemsInCart }}</p>
  </div>
</template>

<style></style>
