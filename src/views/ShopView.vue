<script setup>
import FiltersControl from "@/components/FiltersControl.vue";
import ItemThumb from "@/components/ItemThumb.vue";

import { computed } from "vue";

import { useInventoryStore } from "@/stores/inventory";
// import { useCartStore } from "@/stores/cart";
import { useFiltersStore } from "@/stores/filters";
const inventoryStore = useInventoryStore();
// const cartStore = useCartStore();
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
    <div class="item-thumbs">
      <ItemThumb
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        class="item-thumb"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
}
.item-thumbs {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item-thumb {
  padding: 1rem;
}
</style>
