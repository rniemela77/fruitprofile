<script setup>
import { RouterLink } from "vue-router";

import { useInventoryStore } from "@/stores/inventory";
const inventoryStore = useInventoryStore();
</script>

<template>
  <main>
    <div v-for="item in inventoryStore.items" :key="item.id">
      <RouterLink :to="`/item/${item.id}`">{{ item }}</RouterLink>
    </div>
  </main>
</template>
