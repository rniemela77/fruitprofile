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

const total = computed(() => {
  return items.value.reduce((total, item) => {
    return total + item.price;
  }, 0);
});
</script>

<template>
  <div class="about">
    <h1>Cart</h1>

    <template v-if="items.length">
      <h2>
        Total: <span class="price">${{ total }}</span>
      </h2>
      <ItemList :items="items" />
    </template>

    <div class="empty-cart-message" v-else>
      <p>No items in cart!</p>
      <RouterLink to="/">Go to shop</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.empty-cart-message {
  font-size: 3rem;
  text-align: center;
}
.price {
  color: var(--green-medium);
  font-weight: bold;
}
</style>
