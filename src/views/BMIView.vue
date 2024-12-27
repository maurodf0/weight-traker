<script setup lang="ts">
import useHeight from '@/composables/useHeight'

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

const heightinMeters = useHeight();

</script>

<template>
    <div>
        <h1>BMI</h1>
    </div>
</template>