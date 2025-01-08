<script setup lang="ts">
import { ref } from 'vue'
import useHeight from '@/composables/useHeight'

const { height } = useHeight()

const heightInput = ref<number | null>(null)


defineEmits(['heightHandle'])
</script>


<template>
  <form class="flex flex-col gap-4" @submit.prevent="$emit('heightHandle', heightInput)">
    <input step="0.1" 
           class="px-4 py-2 border border-gray-300 focus:border-slate-500 focus:ring focus:ring-blue-200 rounded-lg"
           type="number"
           id="height" 
           v-model="height"
           placeholder="Enter your height in cm">
    <button class="bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-slate-600" type="submit">
      Submit
    </button>
  </form>
</template>