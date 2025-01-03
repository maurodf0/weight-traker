<script setup lang="ts">
import { ref } from 'vue'

defineProps({
    info: {
        type: [String, Number, null],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    suffix: {
        type: String,
        default: ''
    }
})

</script>

<template>
    <div class="flex flex-col gap-2 p-6 bg-gray-100 dark:bg-slate-700 rounded-lg">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            {{ info }} / <span class="text-gray-500 dark:text-gray-400 text-sm"> {{ suffix }} </span>
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
            {{ description }}
        </p>
    </div>
</template>