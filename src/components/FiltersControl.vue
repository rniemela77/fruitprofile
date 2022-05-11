<script setup>
import { useFiltersStore } from "@/stores/filters";
const filtersStore = useFiltersStore();
</script>

<template>
  <div class="filters">
    <div class="wrapper">
      <div class="filter-group"></div>
      <div class="filter-group">
        <h1>Price</h1>
        <label for="minPrice">
          Min Price: {{ filtersStore.price.minPrice }}</label
        >
        <input
          type="range"
          id="minPrice"
          :min="0"
          :max="99"
          v-model="filtersStore.price.minPrice"
        />
      </div>
      <div class="filter-group">
        <label for="maxPrice">
          Max Price: {{ filtersStore.price.maxPrice }}</label
        >
        <input
          type="range"
          id="maxPrice"
          :min="0"
          :max="99"
          v-model="filtersStore.price.maxPrice"
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
</style>
