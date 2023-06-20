<template>
    <div class="skeleton"></div>
</template>

<style>
.skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
    0% {
        background-color: hsl(200, 20%, 80%);
    }

    100% {
        background-color: hsl(200, 20%, 95%);
    }
}
</style>

<script>
export default {}
</script>