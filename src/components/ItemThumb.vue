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
}
h2 {
  margin: 1rem 0;
}
</style>
