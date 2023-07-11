<template>
    <v-card class="product-card p-5 rounded bg-white shadow w-[300px]">
        <v-img class="image">
            <img :src="product.image" :alt="product.name" class="h-[250px] w-full object-cover rounded">
        </v-img>
        <div class="text-content">
            <v-card-title class="product-name text-xl text-dark-800 my-4">{{ product.name }}</v-card-title>
            <v-card-text class="product-description text-gray-600">
                {{ product.description }}
            </v-card-text>
            <v-card-subtitle class="price">
                <p class="text-cyan-800 font-bold text-xl my-2">${{ product.price }}</p>
            </v-card-subtitle>
        </div>
        <v-card-actions class="actions ">
            <v-btn class="btn delete w-1/3 bg-blue-500 hover:opacity-80" @click="$emit('cart')">
                <i class="fas fa-cart-shopping"></i>
                <span class="ml-2">Cart</span>
            </v-btn>
            <v-btn class="btn edit w-1/3 bg-yellow-500 hover:opacity-80" @click="$emit('edit')">
                <i class="fas fa-edit"></i>
                <span class="ml-2">Edit</span>
            </v-btn>
            <v-btn class="btn delete w-1/3 bg-red-500 hover:opacity-80" @click="$emit('delete')">
                <i class="fas fa-trash"></i>
                <span class="ml-2">Delete</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style scoped>
.btn {
    @apply py-2 text-white font-semibold w-1/3 rounded;
}
</style>