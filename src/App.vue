<script setup>
import { onMounted, computed } from "vue";
import { RouterView } from "vue-router";
import { useInventoryStore } from "@/stores/inventory";
import { useCartStore } from "@/stores/cart";

const inventoryStore = useInventoryStore();
const cartStore = useCartStore();

onMounted(() => {
  fetchItems();
});

const fetchItems = () => {
  // Get URL of google spreadsheet. Refer to https://asbnotebook.com/fetch-google-spread-sheet-data-using-javascript/
  const sheetId = "1UTsgtcRiKEn4vjHSXIN7URM9x6n7aKJNWOgmsSKTBzE";
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = "user-data";
  const query = encodeURIComponent("Select *");
  const url = `${base}&sheet=${sheetName}&tq=${query}`;

  // Fetch all of the rows from the spreadsheet (starting at row 2)
  fetch(url)
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
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <!-- <RouterLink to="/about">About</RouterLink> -->
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
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
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

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
