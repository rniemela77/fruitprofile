<script setup>
import FiltersControl from "@/components/FiltersControl.vue";
import ItemList from "@/components/ItemList.vue";

import { computed } from "vue";

import { useInventoryStore } from "@/stores/inventory";
import { useFiltersStore } from "@/stores/filters";
const inventoryStore = useInventoryStore();
const filtersStore = useFiltersStore();

const filteredItems = computed(() => {
  // Filter items by price and tags
  let items = inventoryStore.items.filter((item) => {
    return (
      item.price >= filtersStore.selected.minPrice &&
      item.price <= filtersStore.selected.maxPrice &&
      filtersStore.selected.tags.includes(item.tags)
    );
  });

  // Filter items by keywords
  if (filtersStore.selected.keywords) {
    items = items.filter((item) => {
      return (
        item.name
          .toLowerCase()
          .indexOf(filtersStore.selected.keywords.toLowerCase()) != -1 ||
        item.tags.indexOf(filtersStore.selected.keywords.toLowerCase()) != -1
      );
    });
  }

  return items;
});
</script>

<template>
  <main>
    <FiltersControl class="filters" />

    <ItemList v-if="filteredItems.length" :items="filteredItems" />

    <div v-else class="no-items-message">
      <p>No matching items.</p>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
}
.no-items-message {
  color: white;
  font-size: 2rem;
  text-align: center;
  width: 100%;
  margin: 3rem 0;
}
</style>
