<script setup lang="ts">
import useHeight from '@/composables/useHeight'
import useWeight from '@/composables/useWeight'
import { computed, ref, watch } from 'vue'
const { height, heightinMeters } = useHeight()
const { currentWeight } = useWeight()
import useTracker from '@/composables/useTracker'


// Computed property per calcolare il BMI
const BMI = computed(() => {
  if (height.value) {
   return (currentWeight.value / (heightinMeters.value * heightinMeters.value)).toFixed(2) 
  }
  return null
})

const BMIMessage = computed(() => {
  const bmiNumber = BMI.value ? parseFloat(BMI.value) : null;
  if (bmiNumber) {
    if (bmiNumber < 18.5) {
      return 'You are Underweight';
    } else if (bmiNumber < 25) {
      return 'You are Normal';
    } else if (bmiNumber < 30) {
      return 'You are Overweight';
    } else {
      return 'You are Obese';
    }
  }
  return null;
});

const { setBMI } = useTracker();
watch(BMI, () => {
  setBMI(BMI.value); 
});


</script>

<template>
  <div class="max-w-md mx-auto my-8 p-6 dark:bg-gray-800 rounded-lg">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">BMI Calculator</h1>

    <div v-if="BMI" class="p-4 bg-white dark:bg-slate-700 rounded-md shadow">
      <p class="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Your BMI is: <span class="text-blue-600 dark:text-blue-400">{{ BMI }}</span>
      </p>
      <p class="mt-2 text-gray-700 dark:text-gray-300">{{ BMIMessage }}</p>
    </div>

    <div v-else class="p-4 bg-red-100 dark:bg-red-800 rounded-md shadow">
      <p class="text-red-700 dark:text-red-300">
        Please enter your height and weight to calculate your BMI.
      </p>
    </div>
  </div>
</template>