<template>
    <Transition name="layer">
        <div class="layer fixed top-0 left-0 w-full h-full" v-if="show" @click="$emit('close')"></div>
    </Transition>

    <Transition name="content">
        <div class="content w-[250px] lg:w-[400px] bg-white min-h-screen fixed right-0 top-0" v-if="show">
            <slot />
        </div>
   
    </Transition>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.layer {
    background: rgba(0, 0, 0, 0.8);
}

.layer-enter-active,
.layer-leave-active {
    transition: opacity 0.2s ease;
}

.layer-enter-from,
.layer-leave-to {
    opacity: 0;
}

.content-enter-active,
.content-leave-active {
    transition: transform 0.3s ease;
}

.content-enter-from,
.content-leave-to {
    transform: translateX(100%);
}
</style>