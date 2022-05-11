<script setup>
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
  <div class="about">
    <h1>This is an item page</h1>
    <p>{{ item }}</p>
  </div>
</template>

<style></style>
