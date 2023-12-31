<template>
  <main class="container py-[50px]">
    <div class="head flex gap-10 sm:justify-between items-center">
      <h2 class="text-3xl text-gray-700">SuperMarket</h2>

      <div class="">
        <button
          class="btn py-2 mr-2 px-7 bg-yellow-600 text-white rounded hover:opacity-80"
          @click="showCart = true"
        >
          <i class="fas fa-cart-shopping mr-2"></i>
          <span>Go to Cart</span>
        </button>
        <button
          class="btn py-2 px-7 bg-blue-600 text-white rounded hover:opacity-80 mt-3"
          @click="$router.push({ name: 'create-product' })"
        >
          <i class="fas fa-plus mr-2"></i>
          <span>Add new</span>
        </button>
      </div>
    </div>

    <div class="wrapper flex justify-center gap-4 flex-wrap mt-5">
      <ProductCardSkeleton
        v-for="i in 8"
        v-if="!productStore.getProductList.length"
      />
      <ProductCard
        v-else
        v-for="item in productStore.getProductList"
        :key="item.id"
        :product="item.data"
        @delete="productToDelete = item.id"
        @edit="$router.push({ name: 'edit-product', params: { id: item.id } })"
        @cart="addToCart(item.id, item.data)"
      />
    </div>

    <!-- modal -->
    <Popup :show="productToDelete">
      <div class="">
        <h3 class="text-2xl font-semibold text-center pb-5">Are you sure?</h3>
      </div>
      <div class="actions flex gap-2">
        <button
          class="btn py-2 text-sm bg-gray-600 w-1/2 text-white rounded"
          @click="productToDelete = null"
        >
          Cancel
        </button>
        <button
          class="btn py-2 text-sm bg-red-600 w-1/2 text-white rounded"
          @click="deleteProduct(productToDelete)"
        >
          Delete
        </button>
      </div>
    </Popup>

    <!-- cart -->
    <CurtainPopup :show="showCart" @close="showCart = false">
      <div class="wrapper p-5">
        <h2 class="text-2xl font-semibold mb-5">Cart</h2>

        <div
          class="cart-item p-3 flex justify-between items-center mb-2 shadow"
          v-for="item in cartStore.getCartItems"
          :key="item.cart_id"
        >
          {{ item.data.name }}
          <div class="img h-[50px] w-[80px]">
            <img :src="item.data.image" alt="image" class="w-full h-full" />
          </div>
          <div class="counter flex items-center gap-2">
            <span>{{ getCount(item.cart_id) }}</span>
            <div class="buttons flex gap-1 items-center">
              <button @click="increment(item.cart_id)" class="text-[20px]">
                +
              </button>
              <button @click="decrement(item.cart_id)" class="text-[20px]">
                -
              </button>
            </div>
          </div>
          <button
            class="btn py-2 text-sm bg-red-600 w-[35px] text-white rounded"
            @click="deleteCartProduct(item.cart_id, item.data.name)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <CartItemSkeleton
          v-for="item in !cartStore.getCartItems
            ? 12
            : cartStore.getCartItems.length
            ? 0
            : 12"
          :key="item"
        />
      </div>
      <button
        class="btn bg-yellow-500 p-3 text-base text-bold rounded ml-[150px]"
        @click="orderProduct"
      >
        Заказать
      </button>
    </CurtainPopup>
  </main>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import ProductCardSkeleton from "../components/ProductCard.skeleton.vue";
import http from "../axios.config";
import { useToast } from "vue-toastification";
import Popup from "../components/Popup.vue";
import CurtainPopup from "../components/CurtainPopup.vue";
import CartItemSkeleton from "../components/CartItem.skeleton.vue";
import { useProductStore } from "../store/products";
import { useCartStore } from "../store/cart";

export default {
  components: {
    ProductCard,
    ProductCardSkeleton,
    Popup,
    CurtainPopup,
    CartItemSkeleton,
  },
  data() {
    return {
      productStore: useProductStore(),
      cartStore: useCartStore(),
      productToDelete: null,
      toast: useToast(),
      showCart: false,
      counts: {},
    };
  },
  methods: {
    async deleteProduct(id) {
      if (!id) return;
      const cartItem = this.cartStore.getCartItems.find(
        (item) => item.product_id === id
      );
      if (cartItem) {
        const cartItemId = cartItem.cart_id;
        this.cartStore.getCartItems = this.cartStore.getCartItems.filter(
          (item) => item.cart_id !== cartItemId
        );
        await http.delete(`/cart/${cartItemId}.json`);
      }
      await this.productStore.deleteProduct(id);
      this.productToDelete = null;
      this.toast.success("Product has been deleted!");
      this.productStore.fetchProducts();
    },
    async addToCart(id, product) {
      const item = this.cartStore.getCartItems.find(
        (product) => product.product_id === id
      );
      if (item) {
        this.toast.warning(product.name + " already in the cart!");
        return;
      }
      await this.cartStore.addToCart(id, product);
      this.toast.success(product.name + " - added to cart!");
      this.cartStore.fetchCartItems();
    },
    async deleteCartProduct(id, productName) {
      if (!id) return;
      const name = productName;
      await this.cartStore.deleteFromCart(id);
      this.cartStore.fetchCartItems();
      this.toast.success(name + " removed from cart!");
      this.showCart = false;
    },
    getCount(cartId) {
      return this.counts[cartId] || 0;
    },

    increment(cartId) {
      if (!this.counts[cartId]) {
        this.counts[cartId] = 1;
      } else {
        this.counts[cartId]++;
      }
    },

    decrement(cartId) {
      if (this.counts[cartId] && this.counts[cartId] > 0) {
        this.counts[cartId]--;
      }
    },
    orderProduct() {
      if (this.cartStore.getCartItems.length > 0) {
        const productNames = this.cartStore.getCartItems.map(
          (item) => item.data.name
        );
        const message =
          "Спасибо за заказ! Вы заказали следующие продукты:\n" +
          productNames.join(", ") +
          "\nСкоро с вами свяжутся!";
        alert(message);
      } else {
        alert("Ваша корзина пуста. Нет продуктов для заказа.");
      }
      this.showCart = false;
    },
  },
  mounted() {
    this.productStore.fetchProducts();
    this.cartStore.fetchCartItems();
  },
};
</script>
