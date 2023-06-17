<template>
    <div class="product-card p-5 rounded bg-white shadow w-[300px]">
        <div class="image">
            <img src="https://images.uzum.uz/ci021sb6edfostigd050/original.jpg" alt="product-image"
                class="h-[250px] w-full object-cover rounded">
        </div>
        <div class="text-content">
            <h3 class="product-name text-xl text-dark-800 my-4">Product name</h3>
            <p class="product-description text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni consectetur
                deserunt nihil sit blanditiis vitae accusantium ducimus, inventore necessitatibus! Similique?
            </p>
            <div class="price">
                <p class="text-cyan-800 font-bold text-xl my-2">5600$</p>
            </div>
        </div>
        <div class="actions flex gap-2">
            <button class="btn edit bg-yellow-500 hover:opacity-80">
                <i class="fas fa-edit"></i>
                <span class="ml-2">Edit</span>
            </button>
            <button class="btn delete bg-red-500 hover:opacity-80">
                <i class="fas fa-trash"></i>
                <span class="ml-2">Delete</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.btn {
    @apply py-2 text-white font-semibold w-1/2 rounded;
}
</style>