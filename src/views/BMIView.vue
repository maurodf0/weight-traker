<script setup lang="ts">
import useHeight from '@/composables/useHeight'
import { computed, ref } from 'vue'
const { height, heightinMeters } = useHeight()

const allWeights = ref<{ weight: number; date: Date }[]>([])

  const storedWeights = localStorage.getItem('allWeights')
  if (storedWeights) {
    allWeights.value = JSON.parse(storedWeights).map((w: { weight: number; date: string }) => ({
      weight: w.weight,
      date: new Date(w.date)
    }));
  }

  const sortedWeight = computed(() => {
  return [...allWeights.value].sort((a, b) => b.date.getTime() - a.date.getTime());
});

const currentWeight = computed(() => {
  return sortedWeight.value.length > 0 ? sortedWeight.value[0].weight : 0;
});


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

<template>
    <div>
        <h1>BMI</h1>
        <p>Your BMI is: {{ BMIMessage }}</p>
    </div>
</template>