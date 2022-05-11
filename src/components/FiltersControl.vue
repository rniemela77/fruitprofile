<script setup>
// import { computed, ref } from "vue";

import { useFiltersStore } from "@/stores/filters";
// import { useInventoryStore } from "@/stores/inventory";

const filtersStore = useFiltersStore();
// const inventoryStore = useInventoryStore();
</script>

<template>
  <div class="filters">
    <div class="filter-group">
      <h2 for="textSearch">Search by keyword</h2>
      <input
        type="text"
        id="textSearch"
        placeholder="Search..."
        v-model="filtersStore.selected.keywords"
      />
    </div>

    <div class="filter-group">
      <h2>Tags</h2>
      <div class="tags">
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
    </div>

    <div class="filter-group">
      <h2>Price</h2>
      <div>
        <label for="minPrice">
          Min Price: ${{ filtersStore.selected.minPrice }}</label
        >
        <input
          type="range"
          id="minPrice"
          :min="filtersStore.minPrice"
          :max="filtersStore.maxPrice"
          v-model="filtersStore.selected.minPrice"
        />
      </div>
      <div>
        <label for="maxPrice">
          Max Price: ${{ filtersStore.selected.maxPrice }}</label
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
.filters {
  display: flex;
  flex-direction: column;
}
.filter-group {
  display: flex;
  flex-direction: column;
  padding: 1rem 0 2rem;
}
.filter-group:not(:last-of-type) {
  border-bottom: 1px solid rgba(0, 189, 126, 0.24);
}
.filter-group label {
  margin-right: 0.25rem;
}
.filter-group input[type="text"] {
  padding: 0.25rem;
  font-size: 16px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
.tag input {
  display: none;
}
.tag label {
  padding: 0.25rem 0.5rem;
  display: inline-block;
  margin: 0.25rem;
  cursor: pointer;
  color: white;
  text-transform: capitalize;
  transition: 0.25s;
  font-weight: bold;
}
.tag label:hover {
  background: var(--green-dark);
}
.tag input:checked + label {
  background: var(--green-medium);
}
input {
  accent-color: var(--green-medium);
}
</style>
