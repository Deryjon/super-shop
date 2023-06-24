import { defineStore } from "pinia";
import http from "../axios.config";

export const useCartStore = defineStore("useCartStore", {
  state: () => ({
    cartItems: {},
  }),
  getters: {
    getCartItems: (s) => {
      const items = [];
      Object.keys(s.cartItems).forEach((key) => {
        items.push({
          cart_id: key,
          product_id: s.cartItems[key].id,
          data: s.cartItems[key].data,
        });
      });
      return items;
    },
  },
  actions: {
    async fetchCartItems() {
      const res = await http.get("/cart.json");
      this.cartItems = res.data;
    },
    async addToCart(id, product) {
      return await http.post("/cart.json", { id: id, data: product });
    },
    async deleteFromCart(id) {
      return await http.delete("/cart/" + id + ".json");;
    },
    
  },
});
