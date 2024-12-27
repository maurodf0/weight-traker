<template>
  <div>
    <h1>Settings</h1>
    <p>Current Mode: {{ mode.value }}</p>
    <button class="bg-slate-600 my-4 text-white py-2 px-4 rounded-lg" @click="toggleMode">
      Change Color Mode, current mode: {{ mode.value }}
    </button>

    <h2>Height</h2>
       <HeightInput class="mt-10" @heightHandle="submitHeight" />
    <h4 class="text-2xl font-bold text-center text-gray-600">{{ BMIMessage }}</h4>

  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode() // Ref<'dark' | 'light'>

const toggleMode = () => {
  // Accediamo a mode.value per leggere e modificare la modalità
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

const submitHeight = (newHeight: number) => {
  height.value = newHeight
}

const heightinMeters = computed(() => {
  return height.value / 100
})


// Computed property per calcolare il BMI
const BMI = computed(() => {
  if (height.value) {
   return currentWeight.value / (heightinMeters.value * heightinMeters.value) 
  }
  return null
})

const BMIMessage = computed(() => {
  if (BMI.value) {
    if (BMI.value < 18.5) {
      return 'You are Underweight'
    } else if (BMI.value < 25) {
      return 'You are Normal'
    } else if (BMI.value < 30) {
      return 'You are Overweight'
    } else {
      return 'You are Obese'
    }
  }
  return null
})
</script>
