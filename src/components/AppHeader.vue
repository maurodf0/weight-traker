<script setup lang="ts">
    import { RouterLink } from 'vue-router'

</script>

<template>

    <header class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center border-b-2 border-gray-100 mb-6 pb-6">
                <div class="flex items-center">
                    <img class="h-8 w-auto" src="../assets/logo.svg" alt="Workflow">
                    <span class="ml-3 text-xl font-bold text-gray-900">Weight Traker</span>
                </div>
                <div class="flex items-center gap-x-4">
                    <RouterLink to="/" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">Home</RouterLink>
                    <RouterLink to="/about" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">About</RouterLink>
                    <RouterLink to="/contact" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">Contact</RouterLink>                   
                </div>
            </div>
        </div>
    </header>

</template>

<style scoped>

</style>