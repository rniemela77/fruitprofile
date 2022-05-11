<script setup>
import { onMounted, computed } from "vue";
import { RouterView } from "vue-router";
import { useInventoryStore } from "@/stores/inventory";
import { useCartStore } from "@/stores/cart";
import { useFiltersStore } from "./stores/filters";

const inventoryStore = useInventoryStore();
const cartStore = useCartStore();
const filtersStore = useFiltersStore();

onMounted(async () => {
  await fetchItems();
  setPriceFilters();
  setTagFilters();
});

const setPriceFilters = () => {
  // Find the min and max price in the inventory
  const findMinPrice = inventoryStore.items.reduce(function (prev, curr) {
    return prev.price <= curr.price ? prev : curr;
  }).price;

  const findMaxPrice = inventoryStore.items.reduce(function (prev, curr) {
    return prev.price >= curr.price ? prev : curr;
  }).price;

  // Set min and max price for sliders
  filtersStore.minPrice = findMinPrice;
  filtersStore.maxPrice = findMaxPrice;

  // Filter for all prices by default
  filtersStore.selected.minPrice = findMinPrice;
  filtersStore.selected.maxPrice = findMaxPrice;
};

const setTagFilters = () => {
  const allTags = inventoryStore.items.map((item) => item.tags);

  const uniqueTags = [...new Set(allTags.flat())];

  // Create a list of unique tags in the store
  uniqueTags.forEach((tag) => {
    filtersStore.tags.push(tag);
  });

  // Filter for all tags by default
  filtersStore.selected.tags = filtersStore.tags;
};

const fetchItems = async () => {
  // Get URL of google spreadsheet. Refer to https://asbnotebook.com/fetch-google-spread-sheet-data-using-javascript/
  const sheetId = "1UTsgtcRiKEn4vjHSXIN7URM9x6n7aKJNWOgmsSKTBzE";
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = "user-data";
  const query = encodeURIComponent("Select *");
  const url = `${base}&sheet=${sheetName}&tq=${query}`;

  // Fetch all of the rows from the spreadsheet (starting at row 2)
  await fetch(url)
    .then((res) => res.text())
    .then((resp) => {
      // Extract row data from the spreadsheet (starting at row 2)
      const jsonData = JSON.parse(resp.substring(47).slice(0, -2));
      const cols = jsonData.table.cols;
      const rows = jsonData.table.rows;

      // Create array of objects (with key of column name and value of column data)
      const sheetData = rows.map((row) => {
        const obj = {};
        row.c.forEach((cell, i) => {
          obj[cols[i].label] = cell.v;
        });
        return obj;
      });

      // Put the data into the store
      inventoryStore.items = sheetData;
    });
};

const cartQuantity = computed(() => {
  return cartStore.itemsInCart.length;
});
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>FruitShop</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cart">Cart({{ cartQuantity }})</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: var(--green-medium);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: var(--green-dark);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
