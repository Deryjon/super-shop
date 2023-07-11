<template>
  <div class="product-card p-5 rounded bg-white shadow w-[300px]">
    <div class="image">
      <Skeleton class="w-full h-[250px] rounded" />
    </div>
    <div class="text-content">
      <h3 class="product-name text-xl text-dark-800 my-4">
        <Skeleton class="w-70% h-[20px] rounded" />
      </h3>
      <p class="product-description text-gray-600">
        <Skeleton class="w-full h-[60px] rounded" />
      </p>
      <div class="price">
        <p class="text-cyan-800 font-bold text-xl my-2">
          <Skeleton class="w-1/2 h-[20px] rounded" />
        </p>
      </div>
    </div>
    <div class="actions flex gap-2">
        <Skeleton class="w-1/3 h-[30px] rounded"/>
        <Skeleton class="w-1/3 h-[30px] rounded"/>
        <Skeleton class="w-1/3 h-[30px] rounded"/>
    </div>
  </div>
</template>

<script>
import Skeleton from "./Skeleton.vue";
export default {
  components: { Skeleton },
};
</script>

<style scoped>
.btn {
  @apply py-2 text-white font-semibold w-1/2 rounded;
}
</style>
