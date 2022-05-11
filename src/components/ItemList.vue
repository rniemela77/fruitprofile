<script setup>
import ItemThumb from "@/components/ItemThumb.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="item-thumbs">
    <ItemThumb
      v-for="item in props.items"
      :key="item.id"
      :item="item"
      class="item-thumb"
    />
  </div>
</template>

<style scoped>
.item-thumbs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.item-thumb {
  padding: 2rem;
}
</style>
