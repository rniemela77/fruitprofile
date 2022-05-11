<script setup>
// import { computed, ref } from "vue";

import { useFiltersStore } from "@/stores/filters";
// import { useInventoryStore } from "@/stores/inventory";

const filtersStore = useFiltersStore();
// const inventoryStore = useInventoryStore();
</script>

<template>
  <div class="filters">
    <div class="wrapper">
      <div class="filter-group">
        <label for="textSearch"></label>
        <input
          type="text"
          id="textSearch"
          placeholder="Search..."
          v-model="filtersStore.selected.keywords"
        />
      </div>

      <div class="filter-group">
        <h1>Tags</h1>
        <div class="tag" v-for="tag in filtersStore.tags" :key="tag">
          <input
            type="checkbox"
            :id="tag"
            v-model="filtersStore.selected.tags"
            :value="tag"
          />
          <label :for="tag">{{ tag }}</label>
        </div>
      </div>

      <div class="filter-group">
        <h1>Price</h1>
        <label for="minPrice">
          Min Price: {{ filtersStore.selected.minPrice }}</label
        >
        <input
          type="range"
          id="minPrice"
          :min="filtersStore.minPrice"
          :max="filtersStore.maxPrice"
          v-model="filtersStore.selected.minPrice"
        />
      </div>
      <div class="filter-group">
        <label for="maxPrice">
          Max Price: {{ filtersStore.selected.maxPrice }}</label
        >
        <input
          type="range"
          id="maxPrice"
          :min="filtersStore.minPrice"
          :max="filtersStore.maxPrice"
          v-model="filtersStore.selected.maxPrice"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.tag {
  display: flex;
  align-items: center;
}
.tag input {
  margin-right: 0.5rem;
}
.tag label {
  text-transform: capitalize;
}
</style>
