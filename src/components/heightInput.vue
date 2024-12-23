<script setup lang="ts">
import { ref } from 'vue'

const heightInput = ref<number | null>(null)

const heightHandle = (e: Event) => {
  if (!heightInput.value) {
    alert('Please enter a height')
    heightInput.value = null;
    return;
  } else if (heightInput.value < 0) {
    alert('Height cannot be negative')
    heightInput.value = null;
    return;
  }
  let newHeight = {
    height: heightInput.value,
    date: new Date()
  }

}




</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="heightHandle">
    <input step="0.1" 
           class="px-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg"
           type="number"
           id="height" 
           v-model="heightInput"
           placeholder="Enter your height">
    <button class="bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600" type="submit">
      Submit
    </button>
  </form>
</template>