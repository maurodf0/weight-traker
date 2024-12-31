<script setup lang="ts">
import useHeight from '@/composables/useHeight'
import useWeight from '@/composables/useWeight'
import { computed, ref } from 'vue'
const { height, heightinMeters } = useHeight()
const { currentWeight } = useWeight()

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


</script>

<template>
    <div>
        <h1>BMI</h1>
        <div v-if="BMI">
        <p>Your BMI is: {{ BMI }} </p>
        <p>{{ BMIMessage }}</p>
        </div>

        <div v-else>
            <p>Please enter your height and weight to calculate your BMI</p>
        </div>
    </div>
</template>