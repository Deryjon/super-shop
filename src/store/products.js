import { defineStore } from "pinia";
import http from "../axios.config";

export const useProductStore  = defineStore("useProductStore ", {
  state: () => ({
    products: {},
  }),
  getters: {
    getProductList: (s) => {
      const productList = [];
      Object.keys(s.products).forEach((key) => {
        productList.push({ id: key, data: s.products[key] });
      });
      return productList
    },
  },
  actions: {
    async fetchProducts() {
      const res = await http.get("/products.json");
      this.products = res.data;
    },
    async deleteProduct(id) {
      await http.delete(`/products/${id}.json`);
    },
    async createProduct(product){
      return await http.post("/products.json", product);
    },
    async editProduct(id, product){
      return await http.patch("/products/"+ id +  ".json", product);
    },
  },
});
