<template>
  <main class="container py-[50px]">
    <div class="head flex justify-between items-center mb-6">
      <h2 class="text-3xl text-gray-700">
        
      {{ $route.params.id ? 'Edit product' : 'Create product' }}
      </h2>
      <v-btn
        class="btn py-2 px-7 bg-blue-600 text-white rounded hover:opacity-80"
        @click="$router.push({ name: 'home' })"
      >
        <i class="fas fa-home mr-2"></i>
        <span>Go Home</span>
    </v-btn>
    </div>

    <form
      class="form w-full max-w-[400px] mx-auto p-5 rounded bg-white shadow"
      @submit.prevent="handleAction"
    >
      <h3 class="text-xl mb-2">
        {{ $route.params.id ? 'Edit ' : 'New product' }}
      </h3>
      <!--  -->
      <div class="form-controll mb-1">
        <label for="name" class="inline-block w-full text-sm text-gray-400"
          >Product name</label
        >
        <input
          type="text"
          id="name"
          class="input"
          v-model.trim="product.name"
        />
        <p class="error-message text-xs text-red-400" v-if="errors.name">
          {{ errors.name }}
        </p>
      </div>
      <!--  -->
      <div class="form-controll mb-1">
        <label
          for="description"
          class="inline-block w-full text-sm text-gray-400"
          >Product description</label
        >
        <input
          type="text"
          id="description"
          class="input"
          v-model.trim="product.description"
        />
        <p class="error-message text-xs text-red-400" v-if="errors.description">
          {{ errors.description }}
        </p>
      </div>
      <!--  -->
      <div class="form-controll mb-1">
        <label for="price" class="inline-block w-full text-sm text-gray-400"
          >Product price</label
        >
        <input
          type="text"
          id="price"
          class="input"
          v-model.number="product.price"
          pattern="[0-9]*"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        />
        <p class="error-message text-xs text-red-400" v-if="errors.price">
          {{ errors.price }}
        </p>
      </div>
      <!--  -->
      <div class="form-controll mb-1">
        <label for="image" class="inline-block w-full text-sm text-gray-400"
          >Product image</label
        >
        <input
          type="text"
          id="image"
          class="input"
          v-model.trim="product.image"
        />
        <p class="error-message text-xs text-red-400" v-if="errors.image">
          {{ errors.image }}
        </p>
      </div>
      <!--  -->
      <div class="image-preview mb-1" v-if="product.image">
        <img :src="product.image" alt="preview" class="w-full">
      </div>
      <div class="action flex justify-end">
        <v-btn
        v-if="!$route.params.id"
          class="btn px-5 py-2 text-white bg-blue-500 rounded"
          :class="{ 'opacity-50': !isValid || loading }"
          :disabled="!isValid || loading"
        >
          <i class="fas fa-plus mr-2" v-if="!loading"></i>
          <span>{{ loading ? "Loading..." : "Create" }}</span>
        </v-btn>

        <v-btn
        v-else
          class="btn px-5 py-2 text-white bg-blue-500 rounded"
          :class="{ 'opacity-50': !isValid || loading }"
          :disabled="!isValid || loading"
        >
          <i class="fas fa-edit mr-2" v-if="!loading"></i>
          <span>{{ loading ? "Loading..." : "Edit" }}</span>
        </v-btn>
      </div>
    </form>
  </main>
</template>

<script>
import http from "../axios.config";
import { useToast } from "vue-toastification";
import { useProductStore } from "../store/products";

export default {
  data() {
    return {
      productStore: useProductStore(),
      loading: false,
      toast: useToast(),

      errors: {
        name: "",
        description: "",
        price: "",
        image: "",
      },
      product: {
        name: "",
        description: "",
        price: "",
        image: "",
      },
    };
  },
  computed: {
    isValid() {
      if (
        this.errors.name === "" &&
        this.errors.description === "" &&
        this.errors.price === "" &&
        this.errors.image === "" &&
        this.product.name !== "" &&
        this.product.description !== "" &&
        this.product.price !== "" &&
        this.product.image !== ""
      ) {
        return true;
      } else {
        this.errors.name = "Minimum length is 5";
        this.errors.description = "Minimum length is 5";
        this.errors.price = "Minimum length is 1";
        this.errors.image = "Minimum length is 1";
        return false;
      }
    },
  },
  watch: {
    product: {
      handler(newValue) {
        if (newValue.name.length < 5) {
          this.errors.name = "Minimum length is 5";
        } else if (newValue.name.length > 20) {
          this.errors.name = "At least 20 characters!";
        } else {
          this.errors.name = "";
        }

        if (newValue.description.length < 5) {
          this.errors.description = "Minimum length is 5";
        } else if (newValue.description.length > 50) {
          this.errors.description = "At least 50 characters!";
        } else {
          this.errors.description = "";
        }

        if (newValue.price.length < 1) {
          this.errors.price = "Minimum length is 1";
        } else if (typeof newValue.price !== "number") {
          this.errors.price = "Enter only numbers!";
        } else {
          this.errors.price = "";
        }

        const httpRegex =
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

        if (newValue.image.length < 1) {
          this.errors.image = "Minimum length is 1";
        } else if (!httpRegex.test(newValue.image)) {
          this.errors.image = "Enter correct image url!";
        } else {
          this.errors.image = "";
        }
      },
      deep: true,
    },
  },
  methods: {
    handleAction() {
      if(this.$route.params.id) {
        this.editProduct()
      } else{
       this.createProduct()
      }
    },
    async createProduct() {
      if (!this.isValid) return;
      this.loading = true;
      await this.productStore.createProduct(this.product)
      this.loading = false;
      (this.product = {
        name: "",
        description: "",
        price: "",
        image: "",
      }),
        this.toast.success("Product has been created!");
      this.$router.push({ name: "home" });
    },
    async editProduct() {
      if (!this.isValid) return;
      const id = this.$route.params.id
      this.loading = true;
      await this.productStore.editProduct(id, this.product)
      this.loading = false;
      (this.product = {
        name: "",
        description: "",
        price: "",
        image: "",
      }),
        this.toast.success("Product has been edited!");
      this.$router.push({ name: "home" });
    },
    async fetchProductById() {
      const id = this.$route.params.id;
      if (!id) return;
      const res = await http.get('/products/' + id + '.json')
      this.product = res.data
    },
  },
  mounted() {
    if(this.$route.params.id){
      this.fetchProductById()
    }
  }
};
</script>

<style>
.input {
  @apply inline-block w-full rounded p-2 shadow outline-blue-400;
}
</style>
