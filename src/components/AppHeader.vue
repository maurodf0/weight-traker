<script setup lang="ts">
    import { RouterLink } from 'vue-router'

</script>

<template>

    <header class="max-w-md mx-auto my-3 bg-white p-4 rounded-lg bg-slate-300">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                   <RouterLink to="/"><span class="ml-3 text-xl font-bold text-gray-900">Weight Traker</span> </RouterLink> 
 
                <div class="flex items-center gap-x-4">
                    <RouterLink to="/bmi" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">BMI</RouterLink>                   
                    <RouterLink to="/tdee" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">TDEE</RouterLink>
                    <RouterLink to="/settings" class="text-gray-500 hover:text-gray-700 transition-colors duration-200">Settings</RouterLink>
                </div>
            </div>
        </div>
    </header>

</template>

<style scoped>

</style>