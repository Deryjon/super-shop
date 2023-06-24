<template>
  <div class="cart-item p-3 flex justify-between items-center mb-2 shadow">
    <Skeleton class="w-[70px] h-[20px]" />
    <div class="img h-[50px] w-[80px]">
      <Skeleton class="w-full h-full" />
    </div>
    <div class="counter">
      <Skeleton class="w-[45px] h-[30px]" />
    </div>
    <div class="counter">
      <Skeleton class="w-[35px] h-[36px]" />
    </div>
  </div>
</template>
<script>
import Skeleton from "../components/Skeleton.vue";
export default {
  components: {Skeleton},
};
</script>
