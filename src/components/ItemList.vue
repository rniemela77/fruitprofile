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
    <transition-group name="list">
      <ItemThumb
        v-for="item in props.items"
        :key="item.id"
        :item="item"
        class="item-thumb"
      />
    </transition-group>
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

.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
