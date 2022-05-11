<script setup>
import CartButtons from "@/components/CartButtons.vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="thumb">
    <RouterLink :to="`/item/${props.item.id}`">
      <img :src="props.item.img_url" height="200" width="200" />
      <div class="row">
        <h2>{{ props.item.name }}</h2>
        <p>${{ props.item.price }}</p>
      </div>
    </RouterLink>

    <CartButtons :id="props.item.id" />
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  object-fit: cover;
  display: block;
  transition: 0.25s;
  border: 1px solid var(--green-dark);
}
h2 {
  margin: 1rem 0;
}
.thumb:hover img {
  box-shadow: 6px 6px 0px var(--green-dark);
  transform: translate(-3px, -3px);
  border: 1px solid var(--green-medium);
}
</style>
