<script setup>
import CartButtons from "@/components/CartButtons.vue";

import { computed } from "vue";

import { useRoute } from "vue-router";
import { useInventoryStore } from "@/stores/inventory";

const route = useRoute();
const inventoryStore = useInventoryStore();

const item = computed(() => {
  // Convert param 'id' from string to number
  const paramId = parseInt(route.params.id);
  return inventoryStore.getItemById(paramId);
});
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

      <CartButtons :id="item.id" />
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
</style>
