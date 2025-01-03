<script setup lang="ts">
import { ref } from 'vue'

defineProps({
    info: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

</script>

<template>
    <div class="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {{ info }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
            {{ description }}
        </p>
    </div>
</template>