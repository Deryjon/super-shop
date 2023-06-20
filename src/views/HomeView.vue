<template>
  <main class="container py-[50px]">
    <div class="head flex justify-between items-center">
      <h2 class="text-3xl text-gray-700">SuperMarket</h2>

      <button

        class="btn py-2 px-7 bg-blue-600 text-white rounded hover:opacity-80"
        @click="$router.push({ name: 'create-product' })"
      >
        <i class="fas fa-plus mr-2"></i>
        <span>Add new</span>
      </button>
    </div>

    <div class="wrapper flex justify-center gap-4 flex-wrap mt-5">
      <ProductCardSkeleton v-for="item in 8" v-if="!products.length"/>
      <ProductCard 
      v-for="item in products" 
      :key="item.id"
      :product="item.data"
      v-else 
      @delete="productToDelete = item.id"
      />
    </div>
    <Popup :show="productToDelete">
      <div class="actions flex gap-2">
    <button class="btn py-2 text-sm bg-gray-600 w-1/2 text-white rounded" @click="productToDelete = null">Cancel</button>
    <button class="btn py-2 text-sm bg-red-600 w-1/2 text-white rounded">Delete</button>
  </div>
    </Popup>
  </main>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import ProductCardSkeleton from "../components/ProductCard.skeleton.vue";
import http from "../axios.config";
import { useToast } from "vue-toastification"
import Popup from "../components/Popup.vue";

export default {
  components: { ProductCard, ProductCardSkeleton, Popup },
  data() {
    return {
      products: [],
      productToDelete: null,
      toast: useToast()
    };
  },
  methods: {
    async fetchProducts() {
      const res = await http.get("/products.json");
      const productList = [];

      Object.keys(res.data).forEach((key) => {
        productList.push({ id: key, data: res.data[key] });
      });
      this.products = productList
    },
  },
  mounted() {
    this.fetchProducts();

  },
};
</script>
