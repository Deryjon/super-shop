<template>
    <div class="product-card p-5 rounded bg-white shadow w-[300px]">
        <div class="image">
            <img :src="product.image" :alt="product.name" class="h-[250px] w-full object-cover rounded">
        </div>
        <div class="text-content">
            <h3 class="product-name text-xl text-dark-800 my-4">{{ product.name }}</h3>
            <p class="product-description text-gray-600">
                {{ product.description }}
            </p>
            <div class="price">
                <p class="text-cyan-800 font-bold text-xl my-2">${{ product.price }}</p>
            </div>
        </div>
        <div class="actions flex gap-2">
            <button class="btn delete bg-blue-500 hover:opacity-80" @click="$emit('cart')">
                <i class="fas fa-cart-shopping"></i>
                <span class="ml-2">Cart</span>
            </button>
            <button class="btn edit bg-yellow-500 hover:opacity-80" @click="$emit('edit')">
                <i class="fas fa-edit"></i>
                <span class="ml-2">Edit</span>
            </button>
            <button class="btn delete bg-red-500 hover:opacity-80" @click="$emit('delete')">
                <i class="fas fa-trash"></i>
                <span class="ml-2">Delete</span>
            </button>
        </div>
    </div>
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